import { Campaing } from "./campaing.model";
import { Role } from "./role.model";
import { Traffic } from "./traffic.model";
import { Function } from "./function.model";
import { HashMap } from "../interfaces/HashMap.interface";

/**
 * Class for store and manage users
 *
 * @author Jose Cruz
 * @version 1.0
 */
export class User {
  _id: String = "";
  username: String = "";
  name: HashMap = {firstname: "", lastname: ""};
  contact: HashMap = {phone: {code: 0, number: ""}, email: ""}
  country: String = "";
  password: String = "";
  image: String = "";
  roles: Array<Role> = [];
  functions: Array<Function> = [];
  traffic: Array<Traffic> = [];
  campaign: Array<Campaing> = [];
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
}
