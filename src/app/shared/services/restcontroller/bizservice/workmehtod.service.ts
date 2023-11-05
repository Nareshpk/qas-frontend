import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Workmethod001mb } from "../entities/Workmethod001mb";
import { BaseService } from "../../services/base.service";


@Injectable()
export class WorkMehodManager extends BaseService {

    private workUrl: string = `${environment.apiUrl}/Workmethod`;

    workall() {
        return this.getCallService(`${this.workUrl}` + "/findAll");
    }

    worksave(workmethod001mb: Workmethod001mb) {
        return this.postCallService(`${this.workUrl}` + "/save", {}, workmethod001mb);
    }
    workupdate(workmethod001mb: Workmethod001mb) {
        return this.putCallService(`${this.workUrl}` + "/update", {}, workmethod001mb);
    }

    workdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.workUrl}` + "/delete", data);
    }
}
