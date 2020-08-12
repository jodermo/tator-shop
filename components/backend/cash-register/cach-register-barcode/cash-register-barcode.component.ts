import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../../../tator-app/angular-app/src/app/services/app.service';
import { ShopService } from '../../../../shop.service';


@Component({
    selector: 'app-cash-register-barcode',
    templateUrl: './cash-register-barcode.component.html',
    styleUrls: ['./cash-register-barcode.component.scss']
})
export class CashRegisterBarcodeComponent implements OnInit {

    constructor(public app: AppService, public shop: ShopService) {
    }

    ngOnInit(): void {
    }
}
