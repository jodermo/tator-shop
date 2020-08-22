import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../../tator-app/angular-app/src/app/services/app.service';
import { ShopService } from '../../../shop.service';

@Component({
    selector: 'app-purchase',
    templateUrl: './purchase.component.html',
    styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

    constructor(public app: AppService, public shop: ShopService) {
    }

    ngOnInit(): void {
    }

}
