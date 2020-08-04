import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from '../../api/product.entity';
import { ShopService } from '../../shop.service';
import { AppService } from '../../../../tator-app/angular-app/modules/tator-core/services/app.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnChanges {
    @Input() product: Product;
    @Input() cart = true;
    @Input() edit = true;
    @Input() barcode = true;
    reload;
    longDescription = false;


    constructor(public app: AppService, public shop: ShopService) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.reload = true;
        setTimeout(() => {
            this.reload = false;
        }, 0)
    }

}
