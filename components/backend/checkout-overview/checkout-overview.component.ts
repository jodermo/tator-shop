import { Component, Input, OnInit } from '@angular/core';
import { ShopService } from '../../../shop.service';
import { AppService } from '../../../../../tator-app/angular-app/modules/tator-core/services/app.service';
import { Checkout } from '../../../api/checkout.entity';

@Component({
    selector: 'app-checkout-overview',
    templateUrl: './checkout-overview.component.html',
    styleUrls: ['./checkout-overview.component.scss']
})
export class CheckoutOverviewComponent implements OnInit {
    @Input() startDate = null;
    @Input() endDate = null;
    checkoutData: Checkout[];

    constructor(public app: AppService, public shop: ShopService) {
    }

    ngOnInit(): void {
        this.getCheckoutData();
    }

    getCheckoutData() {
        this.checkoutData = this.app.data.table('checkout');
    }

}
