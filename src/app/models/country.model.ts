import { HashMap } from "../interfaces/HashMap.interface";

/**
 * Class for the country data
 *
 * @author Jose Cruz
 * @version 1.0
 */
export class Country {
  name!: string;
  translations!: HashMap;
  callingCodes!: Array<string>;
  flag!: string;
}
