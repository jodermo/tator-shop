import { Injectable } from '@angular/core';
import { ShopService } from './shop.service';
import { AppService } from '../../tator-app/angular-app/src/app/services/app.service';
import { Product } from './api/product.entity';
import { Checkout } from './api/checkout.entity';
import { Payment } from './api/payment.entity';
import { Tax } from './api/tax.entity';
import { Currency } from './api/currency.entity';


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
    checkoutData: Checkout;

    currency: Currency = new Currency();
    selectedTax: Tax;
    inputIsNet = false;
    individualProduct: Product = null;
    individualProducts: Product[] = [];



    constructor(public app: AppService) {
    }


    sendDisplayData() {
        let lastCheckout = null;
        if (!this.registerProducts || !this.registerProducts.length) {
            lastCheckout = this.shop.lastCheckout;
        }
        this.app.websocket.sendDisplayData({
            registerProducts: this.registerProducts,
            productAmount: this.productAmount,
            checkoutData: this.checkoutData,
            lastCheckout: lastCheckout,
            currency: this.currency,
            selectedTax: this.selectedTax,
            inputIsNet: this.inputIsNet,
            individualProducts: this.individualProducts,
            total: this.total,
            currentProduct: this.app.currentElement as Product
        }, 'cash-register-data');
    }


    init(shop: ShopService) {
        this.shop = shop;
        this.ready = true;
    }

    update() {
        this.getRegisterProducts();
        this.calculateTotalPrice();
        this.sendDisplayData();
    }

    calculateTotalPrice() {
        let grossPrice = 0;
        let netPrice = 0;
        let amount = 0;
        for (const product of this.registerProducts) {
            amount += this.productAmount[product.id];
            grossPrice += this.price(product, this.productAmount[product.id]).gross;
            netPrice += this.price(product, this.productAmount[product.id]).net;
        }
        this.total.amount = amount;
        this.total.gross =  grossPrice;
        this.total.net =  netPrice;
    }

    price(product, amount = 1, currency: Currency = this.currency, tax: Tax = this.selectedTax, inputIsNet = this.inputIsNet) {
        return this.shop.productPrice(product, amount, currency, tax, inputIsNet);
    }

    clearProducts() {
        this.productAmount = {};
        this.registerProducts = [];
        this.individualProducts = [];
        this.update();
    }

    uniqId() {
        return Date.now();
    }

    addProduct(product: Product) {
        this.checkoutData = null;

        if (product.id === 0 && product.type === 'individual') {
            product.id = this.uniqId();
            product.itemNumber += '_' + product.id;
            this.individualProducts.push(product);
        }
        if (!this.productAmount[product.id]) {
            this.productAmount[product.id] = 1;
        } else {
            this.productAmount[product.id]++;
        }
        this.individualProduct = null;

        this.update();
        this.app.popupLayout = 'right';
        this.shop.showProduct(product, 'cash', 'cash_register');
        this.app.playAudio('scanner');

    }

    removeProduct(product: Product) {
        if (this.productAmount[product.id] && this.productAmount[product.id] > 0) {
            this.productAmount[product.id]--;
        }
        this.app.playAudio('remove');
        this.update();
    }

    getRegisterProducts() {
        this.registerProducts = this.app.data.table('product').filter(product => {
            return this.productAmount[product.id] && this.productAmount[product.id] > 0;
        });
        for (const product of this.individualProducts) {
            this.registerProducts.push(product);
        }
    }

    checkout() {
        this.app.currentElement = null;
        this.checkoutData = new Checkout();
        this.checkoutData.data = this.getCheckoutData();
        this.sendDisplayData();
    }

    confirmCheckout(payment: Payment) {
        if (confirm(this.app.text('confirm_action'))) {
            this.addNewCheckout(payment, (result) => {
                this.checkoutDone(result as Checkout);
            });
        }
    }

    checkoutDone(checkout: Checkout) {
        this.shop.lastCheckout = checkout;
        this.app.playAudio('cash');
        this.app.showPage('cash', 'checkout_overview');
        this.clearProducts();
        this.sendDisplayData();
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
            const price = this.price(product);
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
