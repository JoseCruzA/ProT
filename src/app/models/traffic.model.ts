/**
 * Class for store and manage the traffic
 *
 * @author Jose Cruz
 * @version 1.0
 */
export class Traffic {
  _id: String = "";
  link: String = "";
  browser: String = "";
  device: String = "";
  date!: Date;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
}
