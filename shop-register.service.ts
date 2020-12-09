import { Injectable } from '@angular/core';
import { ShopService } from './shop.service';
import { AppService } from '../../tator-app/angular-app/src/app/services/app.service';
import { Product } from './api/product.entity';
import { Checkout } from './api/checkout.entity';
import { Payment } from './api/payment.entity';
import { Tax } from './api/tax.entity';
import { Currency } from './api/currency.entity';
import { DisplayService } from '../../tator-app/angular-app/src/app/modules/tator-display/display.service';


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
        net: 0,
        tip: 0,
    };
    ready = false;
    checkoutData: Checkout;
    showCheckout = false;

    currency: Currency = new Currency();
    selectedTax: Tax;
    inputIsNet = false;
    individualProduct: Product = null;
    individualProducts: Product[] = [];


    constructor(public app: AppService, public display: DisplayService) {

    }

    loadLastCheckout() {
        const lastCheckoutId = localStorage.getItem('last-checkout-id');
        if (lastCheckoutId) {
            this.checkoutData = this.app.data.byId('checkout', parseInt(lastCheckoutId));
            if (this.checkoutData && this.checkoutData.data && this.checkoutData.data.products) {
                for (const product of this.checkoutData.data.products) {
                    console.log(product.type, product);
                    if (product.type === 'individual') {
                        this.individualProducts.push(product);
                    }
                    this.productAmount[product.id] = product.amount || 0;
                    this.update();
                }
            }
        }
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
        this.loadLastCheckout();
        this.ready = true;
    }

    update() {
        this.getRegisterProducts();
        this.calculateTotalPrice();
        this.sendDisplayData();
    }

    calculateTotalPrice(tip = 0) {
        let grossPrice = 0;
        let netPrice = 0;
        let amount = 0;
        for (const product of this.registerProducts) {
            amount += this.productAmount[product.id];
            grossPrice += this.price(product, this.productAmount[product.id]).gross;
            netPrice += this.price(product, this.productAmount[product.id]).net;
        }
        if (!tip && this.checkoutData) {
            tip = this.checkoutData.tip;
        }
        this.total.amount = amount;
        this.total.gross = grossPrice;
        this.total.tip = tip;
        this.total.net = netPrice;
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
        if (!this.checkoutData) {
            this.newCheckout()
        } else {
            this.updateCheckout(this.checkoutData);
        }
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

    newCheckout() {
        if (!this.checkoutData || this.checkoutData.endDate) {
            const checkout = new Checkout();

            this.addNewCheckout(checkout, (result) => {
                console.log('newCheckout', result);
                this.checkoutData = result as Checkout;
                localStorage.setItem('last-checkout-id', String(this.checkoutData.id));
                this.sendDisplayData();
            });
        }

    }

    confirmCheckout(payment: Payment) {
        if (this.checkoutData && confirm(this.app.text('confirm_action'))) {
            this.checkoutData.paymentId = payment.id;
            this.checkoutData.endDate = Date.now();
            this.app.currentElement = null;
            this.updateCheckout(this.checkoutData, (result) => {
                this.checkoutDone(this.checkoutData);
            });
        }
    }

    cancelCheckout() {
        this.checkoutData.canceled = true;
        this.checkoutData.endDate = Date.now();
        this.updateCheckout(this.checkoutData, (result) => {
            this.checkoutData = null;
            localStorage.removeItem('last-checkout-id');
        });
    }

    checkoutDone(checkout: Checkout) {
        this.shop.lastCheckout = checkout;
        this.app.playAudio('cash');
        this.app.showPage('cash', 'checkout_overview');
        this.checkoutData = null;
        localStorage.removeItem('last-checkout-id');
        this.clearProducts();
        this.sendDisplayData();
    }

    addNewCheckout(checkout: Checkout, success: any = null) {
        if (checkout) {
            checkout.amount = this.total.net;
            checkout.userId = this.app.user.id;
            checkout.data = this.checkoutData;
            checkout.history = this.getCheckoutHistory();
            checkout.data = this.getCheckoutData();
            this.app.data.add('checkout', checkout, (e) => {
                if (success) {
                    success(e);
                }
            });
        }
    }

    updateCheckout(checkout = this.checkoutData, success: any = null) {
        if (checkout) {
            checkout.history = this.getCheckoutHistory();
            checkout.data = this.getCheckoutData();
            this.app.data.update('checkout', checkout.id, checkout, (e) => {
                if (success) {
                    success(e);
                }
            });
        }
    }

    getCheckoutHistory() {
        return [];
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
                type: product.type,
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
