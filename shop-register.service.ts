import { Injectable } from '@angular/core';
import { ShopService } from './shop.service';
import { AppService } from '../../tator-app/angular-app/modules/tator-core/services/app.service';
import { Product } from './api/product.entity';
import { Checkout } from './api/checkout.entity';
import { Payment } from './api/payment.entity';


@Injectable({
    providedIn: 'root'
})
export class ShopRegisterService {

    shop: ShopService;
    registerProducts: Product[];
    productAmount = {};
    total = {
        amount: 0,
        gross: 0,
        net: 0
    };
    ready = false;
    checkoutData;

    constructor(public app: AppService) {
    }

    init(shop: ShopService) {
        this.shop = shop;
        this.ready = true;
    }

    update() {
        this.getRegisterProducts();
        this.calculateTotalPrice();
    }

    calculateTotalPrice() {
        let grossPrice = 0;
        let netPrice = 0;
        let amount = 0;
        for (const product of this.registerProducts) {
            amount += this.productAmount[product.id];
            grossPrice += this.shop.productPrice(product, this.productAmount[product.id]).gross;
            netPrice += this.shop.productPrice(product, this.productAmount[product.id]).net;
        }
        this.total.amount = amount;
        this.total.gross = grossPrice;
        this.total.net = netPrice;
    }




    addProduct(product: Product) {
        if (!this.productAmount[product.id]) {
            this.productAmount[product.id] = 1;
        } else {
            this.productAmount[product.id]++;
        }
        this.update();
        this.app.playAudio('cash_beep');
    }

    removeProduct(product: Product) {
        if (this.productAmount[product.id] && this.productAmount[product.id] > 0) {
            this.productAmount[product.id]--;
        }
        this.update();
    }

    getRegisterProducts() {
        this.registerProducts = this.app.data.table('product').filter(product => {
            return this.productAmount[product.id] && this.productAmount[product.id] > 0;
        });
    }

    checkout() {
        this.checkoutData = new Checkout();
    }

    confirmCheckout(payment: Payment) {
        if (confirm(this.app.text('confirm_action'))) {
            this.addNewCheckout(payment, () => {
                this.app.playAudio('cash_register');
                this.app.showPage('cash', 'checkout_overview')
            });
        }
    }

    addNewCheckout(payment: Payment, success: any = null) {
        if (this.checkoutData) {
            this.checkoutData.amount = this.total.net;
            this.checkoutData.userId = this.app.user.id;
            this.checkoutData.data = this.checkoutData;
            this.checkoutData.paymentId = payment.id;
            this.checkoutData.data = this.getCheckoutData();
            this.app.data.add('checkout', this.checkoutData, (e) => {
                this.checkoutData = null;
                if (success) {
                    success(e);
                }
            });
        }
    }

    getCheckoutData() {
        const checkoutProducts = [];
        for (const product of this.registerProducts) {
            const price = this.shop.productPrice(product);
            let tax = 0;
            if (price.tax && price.tax.value) {
                tax = price.tax.value;
            }

            checkoutProducts.push({
                id: product.id,
                itemNumber: product.itemNumber,
                name: product.name,
                description: product.description,
                price: price.price,
                tax: tax,
                amount: this.productAmount[product.id]
            });
        }
        return {
            products: checkoutProducts
        };
    }


}
