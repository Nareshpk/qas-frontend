import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Expenses001mb } from "../entities/Expenses001mb";


@Injectable()
export class ExpensesManager extends BaseService {

    private salaryUrl: string = `${environment.apiUrl}/Expenses`;

    expensesall() {
        return this.getCallService(`${this.salaryUrl}` + "/findAll");
    }

    expensessave(expenses001mb: Expenses001mb) {
        return this.postCallService(`${this.salaryUrl}` + "/save", {}, expenses001mb);
    }
    expensesupdate(expenses001mb: Expenses001mb) {
        return this.putCallService(`${this.salaryUrl}` + "/update", {}, expenses001mb);
    }

    expensesdelete(id: any) {
        const data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.salaryUrl}` + "/delete", data);
    }
}
