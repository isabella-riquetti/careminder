import { EventContentArg } from '@fullcalendar/core';
import cn from "classnames";
import { differenceInMinutes, format, isSameDay } from 'date-fns';

import { getColoredIcon, getEventColor } from '@/utils/category';

interface EventContentProps {
  eventInfo: EventContentArg;
  isSmallScreen: boolean;
}

export default function EventContent({ isSmallScreen, eventInfo }: EventContentProps) {
  const { view: { type }, event } = eventInfo;
  const { actions, start_at, end_at, all_day } = event.extendedProps;
  const dayView = type === "timeGridDay";
  const timeView = type === "timeGridDay" || type === "timeGridWeek";

  const singleDay = isSameDay(start_at, end_at);
  const durationInMinutes = !all_day && !end_at ? 0 : differenceInMinutes(end_at, start_at);
  const smallTextDuration = timeView ? 15 : 5;
  const hideIconDuration = timeView ? 30 : 15;
  const smallText = durationInMinutes < smallTextDuration;
  const hideIcon = durationInMinutes < hideIconDuration;

  const date: string[] = [];
  if (!all_day) date.push(format(start_at, 'p'));
  if (!all_day && end_at && !singleDay) date.push(format(end_at, 'p'));

  const Icon = getColoredIcon(actions.category);

  const renderMonthView = () => (
    <div className="flex items-center gap-1 overflow-hidden shadow-sm w-full" style={{
      backgroundColor: getEventColor(actions.category),
      color: "#4c4c4c"
    }}>
      {!isSmallScreen && <Icon className='w-5 h-5 mr-1' />}
      <span className="text-md truncate" title={actions.name}>{actions.name}</span>
    </div>
  )

  const renderWeekView = () => {
    return (
    <div className="flex gap-1 items-start overflow-hidden w-full" style={{
      backgroundColor: getEventColor(actions.category),
      color: "#4c4c4c"
    }}>
      {!isSmallScreen && !hideIcon && <Icon className='min-w-7 min-h-7 max-w-7 max-h-7 mr-1' />}
      <div className={cn('flex  overflow-hidden', {
        'flex-row-reverse items-center gap-2': !timeView || smallText || dayView,
        'flex-col': timeView && !smallText && !dayView
      })}>
        <span className={cn("font-bold", {
          "text-[10px] leading-3 truncate": smallText,
          "text-wrap": !smallText,
          "text-xs": !smallText && isSmallScreen,
          "text-md": !smallText && !isSmallScreen
        })} title={actions.name}>{actions.name}</span>
        <span className={cn({
          'text-[10px] leading-3 whitespace-nowrap': smallText,
          'text-xs': !smallText,
        })}>{date.join(" - ")}</span>
      </div>
    </div>)
  }

  switch (type) {
    case 'dayGridMonth':
      return renderMonthView();
    case 'timeGridWeek':
    case 'timeGridDay':
      return renderWeekView();
    default:
      return actions.name;
  }
}
