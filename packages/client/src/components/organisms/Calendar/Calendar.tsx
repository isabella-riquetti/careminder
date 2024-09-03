import './Calendar.scss';

import { UserAction } from '@careminder/shared/types';
import { DateSelectArg, DayHeaderContentArg, EventClickArg, EventContentArg, EventDropArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg, EventResizeDoneArg } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { addMilliseconds, addMinutes, format, isSameDay, startOfDay } from 'date-fns';
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

  const handleDateClick = (arg: DateClickArg) => {
    const targetElement = arg.jsEvent.target as HTMLElement;
    if (targetElement?.classList.contains("fc-daygrid-day-number")) {
      const calendarApi = arg.view.calendar;
      calendarApi.changeView('timeGridDay', arg.dateStr);
    } else {
      const end = arg.view.type !== "dayGridMonth" ? addMinutes(arg.date, 30) : arg.date;
      setUserAction({
        start_at: arg.date,
        end_at: end,
        all_day: arg.view.type === "dayGridMonth",
      });
      setIsAddModalOpen(true);
    }
  };

  const handleDateRangeSelect = (arg: DateSelectArg) => {
    if (arg.view.type === "dayGridMonth" && isSameDay(arg.start, addMilliseconds(arg.end, -1))) return;

    const end = arg.view.type !== "dayGridMonth" ? addMinutes(arg.end, 30) : arg.end;
    setUserAction({
      start_at: arg.start,
      end_at: end,
      all_day: arg.view.type === "dayGridMonth",
    });
    setIsAddModalOpen(true);
  };

  function handleEventClick(arg: EventClickArg): void {
    const { start, end } = arg.event;

    if(!start) return;

    setUserAction({
      ...arg.event.extendedProps,
      start_at: start,
      end_at: end ?? start,
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
      nowIndicator={true}
      selectable={true}
      editable={true}
      droppable={true}
      eventStartEditable={true}
      eventResizableFromStart={true}
      eventDurationEditable={true}
      events={parsedEvents}
      eventDrop={handleEventDrop}
      eventResize={handleEventResize}
      dateClick={handleDateClick}
      select={handleDateRangeSelect}
      dayHeaderContent={renderDayHeader}
      eventContent={renderEventContent}
      eventClick={handleEventClick}
    />
  )
}