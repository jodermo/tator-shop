import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../../../tator-app/angular-app/src/app/services/app.service';
import { ShopService } from '../../../../shop.service';


@Component({
    selector: 'app-cash-register-barcode-data',
    templateUrl: './cash-register-barcode-data.component.html',
    styleUrls: ['./cash-register-barcode-data.component.scss']
})
export class CashRegisterBarcodeDataComponent implements OnInit {

    constructor(public app: AppService, public shop: ShopService) {
    }

    ngOnInit(): void {
    }
}
