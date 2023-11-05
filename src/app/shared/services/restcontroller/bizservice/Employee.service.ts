import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Workmethod001mb } from "../entities/Workmethod001mb";
import { Employee001mb } from "../entities/Employee001mb";
import { BaseService } from "../../services/base.service";


@Injectable()
export class EmployeeeManager extends BaseService {

    private employeeUrl: string = `${environment.apiUrl}/employee`;

    employeeall() {
        return this.getCallService(`${this.employeeUrl}` + "/findAll");
    }

    employeesave(employee001mb: Employee001mb) {
        return this.postCallService(`${this.employeeUrl}` + "/save", {}, employee001mb);
    }
    employeeupdate(employee001mb: Employee001mb) {
        return this.putCallService(`${this.employeeUrl}` + "/update", {}, employee001mb);
    }

    employeedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.employeeUrl}` + "/delete", data);
    }
}
