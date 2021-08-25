import { HashMap } from "../interfaces/HashMap.interface";

/**
 * Class for store and maage events
 *
 * @author Jose Cruz
 * @version 1.0
 */
export class Event {
  _id: string = "";
  name: string = "";
  sarts_at!: string;
  end_at!: string;
  date!: Date;
  color?: {
    primary: string,
    secondary: string
  };
  link: string = "";
  rrule?: {
    freq: any;
    bymonth?: any;
    bymonthday?: any;
    byweekday?: any;
  };
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
}
