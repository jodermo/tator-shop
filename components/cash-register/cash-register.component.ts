import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ShopService } from '../../shop.service';
import { AppService } from '../../../../tator-app/angular-app/modules/tator-core/services/app.service';
import { Product } from '../../api/product.entity';
import { ProductOverviewComponent } from '../backend/product-overview/product-overview.component';


@Component({
    selector: 'app-cash-register',
    templateUrl: './cash-register.component.html',
    styleUrls: ['./cash-register.component.scss']
})
export class CashRegisterComponent extends ProductOverviewComponent {

    layouts = [
        'default',
        'classic'
    ];

    layout = this.layouts[0];

    getProducts() {
        this.products = this.app.data.table('product').filter(product => {
            return product.cashRegister === true;
        });
    }

    layoutChange(layout = this.layout) {
        this.layout = layout;
        this.saveLayout();
    }

    loadLayout() {
        this.layout = localStorage.getItem('cash-register-layout') || this.layout;
    }

    saveLayout() {
        localStorage.setItem('cash-register-layout', this.layout);
    }
}
