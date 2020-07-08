import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function toRelativeDate(date: string) {
  return dayjs(date).from(dayjs());
}
