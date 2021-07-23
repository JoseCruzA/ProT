import { Function } from "./function.model";

/**
 * Class for manage and store the user functions
 *
 * @author Jose Cruz
 * @version 1.0
 */
export class Role {
  _id: String = "";
  name: String = "";
  description: String = "";
  functions: Array<Function> = [];
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
}
