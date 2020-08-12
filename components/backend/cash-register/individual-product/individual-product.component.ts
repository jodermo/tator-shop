import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from '../../../../../../tator-app/angular-app/src/app/services/app.service';
import { ShopService } from '../../../../shop.service';
import { Product } from '../../../../api/product.entity';


@Component({
    selector: 'app-individual-product',
    templateUrl: './individual-product.component.html',
    styleUrls: ['./individual-product.component.scss']
})
export class IndividualProductComponent implements OnInit {

    @Input() product: Product;

    @Output() onChange = new EventEmitter<any>();

    constructor(public app: AppService, public shop: ShopService) {
    }

    ngOnInit(): void {
    }

    productChange() {
        this.onChange.emit(this.product);
    }
}
