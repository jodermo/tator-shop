import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../../tator-app/angular-app/src/app/services/app.service';
import { ShopService } from '../../../shop.service';


@Component({
    selector: 'app-cash-register-settings',
    templateUrl: './cash-register-settings.component.html',
    styleUrls: ['./cash-register-settings.component.scss']
})
export class CashRegisterSettingsComponent implements OnInit {

    constructor(public app: AppService, public shop: ShopService) {
    }

    ngOnInit(): void {

    }

}
