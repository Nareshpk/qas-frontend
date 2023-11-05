import { BaseEntity } from "./BaseEntity";
import { Departments001mb } from "./Departments001mb";
import { UnitMaster001mb } from "./unitmaster001mb";

export class User001mb extends BaseEntity {
  personId?: number;
  roleid?: number;
  firstname?: string;
  lastname?: string;
  username?: string;
  password?: string;
  status?: string;
  email?: string;
  role?:any
}
