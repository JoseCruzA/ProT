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
  color: String = "";
  link: String = "";
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
}