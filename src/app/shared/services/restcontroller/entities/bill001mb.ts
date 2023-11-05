import { Payment001wb } from "./payment001wb";

export class Bill001mb {
  slNo?: number;
  billno?: string;
  cusname?: string;
  mobile?: number;
  address?: string;
  date?: Date | any;
  veichalmodel?: string;
  regno?: string;
  kms?: string;
  totalamount?: number;
  payment?: string;
  payment001wbs: Payment001wb[] | any;
}
