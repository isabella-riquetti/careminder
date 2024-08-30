import './Calendar.scss';

import { DayHeaderContentArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useState } from 'react';

export default function Calendar() {
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
    if (!isSmallScreen) return arg.text;
    if (arg.view.type === "dayGridMonth") return arg.text.substring(0, 1);
    if (arg.view.type === "timeGridWeek") return <div className='flex flex-col'>
      <span>{arg.date.toLocaleDateString('en-US', { weekday: 'long' }).substring(0, 1)}</span>
      <span className='w-[25px] h-[25px] rounded-full p-1 bg-pink-200 text-sm'>{arg.date.getDate()}</span>
    </div>;

    return arg.text;
  };

  return (
    <FullCalendar
      height={"calc(100vh - 24px)"}
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: 'title',
        center: 'prev,next',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      }}
      dayHeaderContent={renderDayHeader}
    />
  )
}