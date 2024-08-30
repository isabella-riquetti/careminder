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
    const { view, date, text } = arg;
    
    const dayFormats: { [key: string]: "narrow" | "short" | "long" } = {
      dayGridMonth: isSmallScreen ? "narrow" : "short",
      timeGridWeek: isSmallScreen ? "long" : "short",
      timeGridDay: "long",
    };
  
    const getDayName = (format: "narrow" | "short" | "long") => 
      date.toLocaleDateString("en-US", { weekday: format });
  
    const renderDate = (dayFormat: "narrow" | "short" | "long", sizeClass: string) => (
      <div className={`flex flex-col ${sizeClass}`}>
        <span>{getDayName(dayFormat).substring(0, isSmallScreen ? 1 : undefined)}</span>
        <span className={`w-[25px] h-[25px] rounded-full p-1 bg-pink-200 text-sm ${sizeClass !== '' && 'text-pale-400'}`}>
          {date.getDate()}
        </span>
      </div>
    );
  
    switch (view.type) {
      case 'dayGridMonth':
        return <span className="medium">{getDayName(dayFormats.dayGridMonth)}</span>;
  
      case 'timeGridWeek':
        return renderDate(dayFormats.timeGridWeek, isSmallScreen ? '' : 'text-pale-400');
  
      case 'timeGridDay':
        return renderDate(dayFormats.timeGridDay, isSmallScreen ? 'items-center' : 'text-pale-400');
  
      default:
        return text;
    }
  };
  
  

  return (
    <FullCalendar
      height={"calc(100vh - 24px)"}
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
      initialView="dayGridMonth"
      fixedWeekCount={false}
      headerToolbar={{
        left: 'title',
        center: 'prev,next',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      }}
      dayHeaderContent={renderDayHeader}
    />
  )
}