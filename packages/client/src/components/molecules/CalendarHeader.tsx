import { DayHeaderContentArg } from '@fullcalendar/core';

interface CalendarHeaderProps {
  dayHeaderContent: DayHeaderContentArg;
  isSmallScreen: boolean;
}

export default function CalendarHeader({ isSmallScreen, dayHeaderContent }: CalendarHeaderProps) {

  const { view: { type }, date, text } = dayHeaderContent;

  const renderDateInfo = (
    formatKey: 'narrow' | 'short' | 'long',
    showDayNumber = false,
    fontSize = isSmallScreen ? 'medium' : 'small'
  ) => {
    const contents = [
      (<span key="top" className={isSmallScreen && showDayNumber ? 'w-[25px] h-[25px] rounded-full p-1 bg-pink-200 text-sm' : 'large'}>{date.getDate()}</span>),
      (<span key="bottom" className={fontSize}>
        { date.toLocaleDateString('en-US', { weekday: formatKey })}
      </span>)

    ];
    const contentOrders = isSmallScreen && showDayNumber ? contents.reverse() : contents;
    return (<div className={`flex flex-col ${!isSmallScreen && 'text-pale-400'} items-center`}>
      {showDayNumber && contentOrders[0]}
      {contentOrders[1]}
    </div>);
  };

  switch (type) {
    case 'dayGridMonth':
      return renderDateInfo(isSmallScreen ? 'narrow' : 'short', false, 'medium');
    case 'timeGridWeek':
    case 'timeGridDay':
      return renderDateInfo(isSmallScreen ? 'short' : 'long', true);
    default:
      return text;
  }
}
