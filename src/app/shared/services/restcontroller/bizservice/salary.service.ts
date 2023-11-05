import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Salary001mb } from "../entities/Salary001mb";
import { BaseService } from "../../services/base.service";


@Injectable()
export class SalaryManager extends BaseService {

    private salaryUrl: string = `${environment.apiUrl}/salary`;

    salaryall() {
        return this.getCallService(`${this.salaryUrl}` + "/findAll");
    }

    salarysave(salary001mb: Salary001mb) {
        return this.postCallService(`${this.salaryUrl}` + "/save", {}, salary001mb);
    }
    salaryupdate(salary001mb: Salary001mb) {
        return this.putCallService(`${this.salaryUrl}` + "/update", {}, salary001mb);
    }

    salarydelete(id: any) {
        const data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.salaryUrl}` + "/delete", data);
    }
}
