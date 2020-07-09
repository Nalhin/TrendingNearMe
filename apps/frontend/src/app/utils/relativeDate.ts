import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function toRelativeDate(date: string) {
  return dayjs(date).from(dayjs());
}
