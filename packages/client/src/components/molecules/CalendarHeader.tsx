import { DayHeaderContentArg } from '@fullcalendar/core';
import cn from "classnames";
import { toZonedTime } from 'date-fns-tz';

interface CalendarHeaderProps {
  dayHeaderContent: DayHeaderContentArg;
  isSmallScreen: boolean;
}

export default function CalendarHeader({ isSmallScreen, dayHeaderContent }: CalendarHeaderProps) {
  const { view: { type }, date, dateStr, text } = dayHeaderContent;
  const utcDate = toZonedTime(date, 'UTC');

  const goToDay = () => {
    const calendarApi = dayHeaderContent.view.calendar;
    calendarApi.changeView('timeGridDay', dateStr);
  }

  const renderDateInfo = (
    formatKey: 'narrow' | 'short' | 'long',
    showDayNumber = false,
    fontSize = 'small'
  ) => {
    const contents = [
      (<span key="top" className={isSmallScreen && showDayNumber ? 'w-[25px] h-[25px] rounded-full p-1 bg-pink-200 text-sm' : 'large'}>{utcDate.getDate()}</span>),
      (<span key="bottom" className={fontSize}>
        { utcDate.toLocaleDateString(navigator.language, { weekday: formatKey })}
      </span>)

    ];
    const contentOrders = isSmallScreen && showDayNumber ? contents.reverse() : contents;
    return (
      <div onClick={goToDay} className={cn("flex flex-col curor-pointer text-pale-400", {
        "text-pale-400": isSmallScreen
      })}>
        {showDayNumber && contentOrders[0]}
        {contentOrders[1]}
      </div>);
  };

  switch (type) {
    case 'dayGridMonth':
      return renderDateInfo(isSmallScreen ? 'narrow' : 'short', false, 'medium');
    case 'timeGridWeek':
    case 'timeGridDay':
      return renderDateInfo(isSmallScreen ? 'short' : 'short', true);
    default:
      return text;
  }
}
