import './Calendar.scss';

import { UserAction, UserActionType } from '@careminder/shared/types';
import { DateSelectArg, DayHeaderContentArg, EventClickArg, EventContentArg, EventDropArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg, EventResizeDoneArg } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { addMinutes, differenceInMinutes, format, startOfDay } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react';

import { useGetUserActionsQuery, useUpdateUserActionMutation } from '@/api/userActions';
import CalendarHeader from '@/components/molecules/CalendarHeader';
import EventContent from '@/components/molecules/EventContent';
import { getEventColor } from '@/utils/category';

interface CalendarProps {
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUserAction:  React.Dispatch<React.SetStateAction<Partial<UserAction>>>;
}
export default function Calendar({ setIsAddModalOpen, setUserAction }: CalendarProps) {
  const [timeZone, setTimeZone] = useState('local');
  const { data: userActions } = useGetUserActionsQuery();

  const parsedEvents = useMemo(() => userActions?.map(u => ({
    id: u.id.toString(),
    title: u.actions.name,
    start: u.start_at,
    end: u.end_at,
    textColor: "#4c4c4c",
    allDay: u.all_day,
    backgroundColor: getEventColor(u.actions.category),
    borderColor: getEventColor(u.actions.category),
    extendedProps: u
  })), [userActions]);

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimeZone(userTimeZone);

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderDayHeader = (dayHeaderContent: DayHeaderContentArg) => {
    return <CalendarHeader isSmallScreen={isSmallScreen} dayHeaderContent={dayHeaderContent} />;
  };

  const renderEventContent = (eventInfo: EventContentArg) => {
    return <EventContent isSmallScreen={isSmallScreen} eventInfo={eventInfo} />;
  };

  const handleDateRangeSelect = (arg: DateSelectArg) => {
    if(arg?.jsEvent?.target) {
      const targetElement = arg.jsEvent.target as HTMLElement;
      if (targetElement?.classList.contains("fc-daygrid-day-number")) {
        const calendarApi = arg.view.calendar;
        calendarApi.changeView('timeGridDay', arg.startStr);
        return;
      }
    }

    const expectedClickDifference = arg.view.type === "dayGridMonth" ? (24*60) : 10;
    const expectedAllDayDifference = 24*60;
    const isSimpleClick = differenceInMinutes(arg.end, arg.start) === expectedClickDifference
     || (arg.allDay && differenceInMinutes(arg.end, arg.start) === expectedAllDayDifference);

    setUserAction({
      start_at: arg.start,
      end_at: arg.allDay ? addMinutes(arg.start, 10) : arg.end,
      all_day: arg.allDay,
      type: isSimpleClick ? UserActionType.REMINDER : UserActionType.TASK,
    });
    setIsAddModalOpen(true);
  };

  const handleDateClick = (arg: DateClickArg) => {
    const targetElement = arg.jsEvent.target as HTMLElement;
    if (targetElement?.classList.contains("fc-daygrid-day-number")) {
      const calendarApi = arg.view.calendar;
      calendarApi.changeView('timeGridDay', arg.dateStr);
    }
  };

  function handleEventClick(arg: EventClickArg): void {
    const { start, end } = arg.event;

    if(!start) return;

    const props = arg.event.extendedProps;
    // eslint-disable-next-line react/prop-types
    const frequency = props?.["frequency"];
    setUserAction({
      ...props,
      start_at: start,
      end_at: !end ? undefined : end,
      frequency: frequency ? {
        ...frequency,
        end_date: new Date(frequency.end_date)
      } : {}
   });
    setTimeout(() => setIsAddModalOpen(true), 200);
  }
  const [updateUserActionMutation] = useUpdateUserActionMutation();
  const updateUserAction = async (req: Partial<UserAction>): Promise<UserAction> =>
    updateUserActionMutation(req).unwrap();

  const callUpdateUserAction = async (id: number, newStart: Date, newEnd: Date) => {
    await updateUserAction({
      id,
      start_at: newStart,
      end_at: newEnd,
    });
  };

  const handleEventDrop = (arg: EventDropArg): void => {
    const { start, end, id } = arg.event;
    if (start) {
      callUpdateUserAction(Number(id), start, end || start);
    }
  };

  const handleEventResize = (arg: EventResizeDoneArg): void => {
    const { start, end, id } = arg.event;
    if (start && end) {
      callUpdateUserAction(Number(id), start, end);
    }
  };

  const now = new Date();
  const scrollTime = now.getHours() > 1 ? addMinutes(new Date(), -30) : startOfDay(now);
  return (
    <FullCalendar
      height={"calc(100vh - 24px)"}
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
      initialView="timeGridDay"
      scrollTime={format(scrollTime, 'p')}
      fixedWeekCount={false}
      headerToolbar={{
        left: 'title today',
        center: 'prev,next',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      }}
      timeZone={timeZone}
      views={{
        dayGridMonth: {
          buttonText: 'Month'
        },
        timeGridWeek: {
          buttonText: 'Week'
        },
        timeGridDay: {
          buttonText: 'Day'
        },
        listWeek: {
          buttonText: 'List'
        }
      }}
      firstDay={1}
      defaultTimedEventDuration='00:10'
      slotDuration='00:10'
      nowIndicator={true}
      selectable={true}
      editable={true}
      droppable={true}
      eventStartEditable={true}
      eventResizableFromStart={true}
      eventDurationEditable={true}
      events={parsedEvents}
      dateClick={handleDateClick}
      eventDrop={handleEventDrop}
      eventResize={handleEventResize}
      select={handleDateRangeSelect}
      dayHeaderContent={renderDayHeader}
      eventContent={renderEventContent}
      eventClick={handleEventClick}
    />
  )
}