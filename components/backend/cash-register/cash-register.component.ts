import { Component } from '@angular/core';
import { ProductOverviewComponent } from '../../backend/product-overview/product-overview.component';
import { Product } from '../../../api/product.entity';


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

    individualProduct: Product = null;

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

    newIndividualProduct() {
        this.individualProduct = new Product();
    }

    addIndividualProduct() {
        if (this.individualProduct) {
            this.shop.register.addProduct(this.individualProduct);
            this.individualProduct = null;
        }
    }
}
