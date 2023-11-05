import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Bill001mb } from '../entities/bill001mb';
import { Register001mb } from '../entities/Register001mb';
import { BaseService } from '../../services/base.service';

@Injectable()
export class RegisterManager extends BaseService {
    private registerfUrl: string = `${environment.apiUrl}/register`;

    RgisterAll() {
        return this.getCallService(`${this.registerfUrl}` + "/findAll");
    }
    registersave(register001mb: Register001mb) {
        return this.postCallService(`${this.registerfUrl}` + '/save', {}, register001mb);
    }
}
