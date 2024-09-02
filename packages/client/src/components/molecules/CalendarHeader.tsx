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
  ) => (
    <div className={`flex flex-col ${!isSmallScreen && 'text-pale-400'} items-center`}>
      {showDayNumber && <span className="large">{date.getDate()}</span>}
      <span className={isSmallScreen && showDayNumber ? 'w-[25px] h-[25px] rounded-full p-1 bg-pink-200 text-sm' : fontSize}>
        {date.toLocaleDateString('en-US', { weekday: formatKey })}
      </span>
    </div>
  );

  switch (type) {
    case 'dayGridMonth':
      return renderDateInfo(isSmallScreen ? 'narrow' : 'short', false, 'medium');
    case 'timeGridWeek':
    case 'timeGridDay':
      return renderDateInfo('long', true);
    default:
      return text;
  }
}
