/**
 * Interface for recurring events
 *
 * @author Jose Cruz
 * @version 1.0
 */
export interface RecurringEvent {
  title: string;
  color: any;
  start: string;
  end: string;
  date: Date;
  rrule?: {
    freq: any;
    bymonth?: number;
    bymonthday?: number;
    byweekday?: any;
  },
  meta?: {
    id?: any,
    link?: any,
  }
}
