import './Calendar.scss';

import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

export default function Calendar() {
  return (
    <FullCalendar
      height={"calc(100vh - 24px)"}
      plugins={[ dayGridPlugin, timeGridPlugin, listPlugin ]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: 'dayGridMonth,timeGridWeek,timeGridDay',
        center: 'title',
        right: 'prev,next',
      }}
    />
  )
}