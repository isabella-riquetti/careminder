import './Calendar.scss';

import { DateSelectArg, DayHeaderContentArg, EventContentArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { addMinutes } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react';

import { useGetUserActionsQuery } from '@/api/userActions';
import CalendarHeader from '@/components/molecules/CalendarHeader';
import EventContent from '@/components/molecules/EventContent';
import { getEventColor } from '@/utils/category';

interface CalendarProps {
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setAllDay: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Calendar({ setIsAddModalOpen, setStartDate, setEndDate, setAllDay }: CalendarProps) {
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
    const end = arg.view.type !== "dayGridMonth" ? addMinutes(arg.date, 30) : arg.date;
    setAllDay(arg.view.type === "dayGridMonth");
    setStartDate(arg.date);
    setEndDate(end);
    setIsAddModalOpen(true);
  };

  const handleDateRangeSelect = (arg: DateSelectArg) => {
    const end = arg.view.type !== "dayGridMonth" ? addMinutes(arg.end, 30) : arg.end;
    setAllDay(arg.view.type === "dayGridMonth");
    setStartDate(arg.start);
    setEndDate(end);
    setIsAddModalOpen(true);
  };

  return (
    <FullCalendar
      height={"calc(100vh - 24px)"}
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      fixedWeekCount={false}
      headerToolbar={{
        left: 'title today',
        center: 'prev,next',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      }}
      nowIndicator={true}
      selectable={true}
      events={parsedEvents}
      dateClick={handleDateClick}
      select={handleDateRangeSelect}
      dayHeaderContent={renderDayHeader}
      eventContent={renderEventContent}
    />
  )
}