import './Calendar.scss';

import { DayHeaderContentArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; 
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import React, { useEffect, useState } from 'react';

interface CalendarProps {
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

}
export default function Calendar({ setIsAddModalOpen }: CalendarProps) {
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

  const renderDayHeader = (arg: DayHeaderContentArg) => {
    if (arg.view.type === "dayGridMonth") return isSmallScreen
      ? <span className='medium'>{arg.date.toLocaleDateString('en-US', { weekday: 'narrow' })}</span> : (
      <span className='medium'>{arg.date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
    );
    if (arg.view.type === "timeGridWeek") return isSmallScreen
    ? (
      <div className='flex flex-col'>
        <span>{arg.date.toLocaleDateString('en-US', { weekday: 'long' }).substring(0, 1)}</span>
        <span className='w-[25px] h-[25px] rounded-full p-1 bg-pink-200 text-sm '>{arg.date.getDate()}</span>
      </div>)
    : (
      <div className='flex flex-col text-pale-400 '>
        <span className='large'>{arg.date.getDate()}</span>
        <span className='small'>{arg.date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
      </div>
    );
    if (arg.view.type === "timeGridDay") return  isSmallScreen
      ? (
      <div className='flex flex-col items-center'>
        <span>{arg.date.toLocaleDateString('en-US', { weekday: 'long' })}</span>
        <span className='w-[25px] h-[25px] rounded-full p-1 bg-pink-200 text-sm'>{arg.date.getDate()}</span>
      </div>)
      : (
        <div className='flex flex-col text-pale-400 '>
          <span className='large'>{arg.date.getDate()}</span>
          <span className='small'>{arg.date.toLocaleDateString('en-US', { weekday: 'long' })}</span>
        </div>
      );

    return arg.text;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateClick = (arg: any) => {
    setIsAddModalOpen(true);
    console.log(arg)
    // You can perform other actions here, like opening a modal, creating an event, etc.
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
      dateClick={handleDateClick}
      select={handleDateClick}
      selectable={true}
      events="https://fullcalendar.io/api/demo-feeds/events.json"
      dayHeaderContent={renderDayHeader}
    />
  )
}