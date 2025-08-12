import { IPerson } from "./IPerson";
import { IRol } from "./IRol";

export interface IUser {
  id: number;
  userName: string;
  email?: string;
  password?: string;
  active: boolean;
  personId : number;
  person?: IPerson;
  Roles?: IRol;
}
