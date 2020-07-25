import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../../shop.service';
import { AppService } from '../../../../../tator-app/angular-app/modules/tator-core/services/app.service';

@Component({
    selector: 'app-product-overview',
    templateUrl: './product-overview.component.html',
    styleUrls: ['./product-overview.component.scss']
})
export class ProductOverviewComponent implements OnInit {

    constructor(public app: AppService, public shop: ShopService) {
    }

    ngOnInit(): void {
    }

    addNewData(data) {
        console.log(data)
        if (data && data.name && data.name === 'product_category') {
            this.shop.newProductCategory();
        } else if (data && data.name && data.name === 'product_group') {
            this.shop.newProductGroup();
        } else if (data && data.name && data.name === 'currency') {
            this.shop.newCurrency();
        } else if (data && data.name && data.name === 'payment') {
            this.shop.newPayment();
        } else if (data && data.name && data.name === 'manufacturer') {
            this.shop.newManufacturer();
        } else if (data && data.name && data.name === 'tax') {
            this.shop.newTax();
        } else if (data && data.name && data.name === 'discount') {
            this.shop.newDiscount();
        } else if (data && data.name && data.name === 'shipping') {
            this.shop.newShipping();
        }


    }

}
