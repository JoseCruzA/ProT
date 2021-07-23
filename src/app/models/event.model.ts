/**
 * Class for store and maage events
 *
 * @author Jose Cruz
 * @version 1.0
 */
export class Event {
  _id: String = "";
  name: String = "";
  sarts_at!: Date;
  end_at!: Date;
  frequency: String = "";
  frequency_date!: Number;
  frequecy_type: String = "";
  color: String = "";
  link: String = "";
  inserted_at: Date = new Date();
  updated_at: Date = new Date();
}
