import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../api/product.entity';
import { ShopService } from '../../shop.service';
import { AppService } from '../../../../tator-app/angular-app/src/app/services/app.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
    @Input() products: Product[];

    constructor(public app: AppService, public shop: ShopService) {
    }

    ngOnInit() {
    }

}
