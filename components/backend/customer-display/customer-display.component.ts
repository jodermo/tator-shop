import { AfterViewInit, Component } from '@angular/core';
import { DisplayDataComponent } from '../../../../../tator-app/angular-app/src/app/modules/tator-display/display-data/display-data.component';
import { Product } from '../../../api/product.entity';
import { Checkout } from '../../../api/checkout.entity';
import { Currency } from '../../../api/currency.entity';
import { Tax } from '../../../api/tax.entity';
import { AppService } from '../../../../../tator-app/angular-app/src/app/services/app.service';
import { DisplayService } from '../../../../../tator-app/angular-app/src/app/modules/tator-display/display.service';
import { ShopService } from '../../../shop.service';

@Component({
    selector: 'app-customer-display',
    templateUrl: './customer-display.component.html',
    styleUrls: ['./customer-display.component.scss']
})
export class CustomerDisplayComponent extends DisplayDataComponent {

    registerProducts: Product[];
    productAmount = {};
    total = {
        amount: 0,
        gross: 0,
        net: 0
    };
    ready = false;
    checkoutData: Checkout;
    lastCheckout: Checkout;
    currency: Currency;
    selectedTax: Tax;
    inputIsNet = false;
    currentProduct: Product;

    constructor(public app: AppService, public display: DisplayService, public shop: ShopService) {
        super(app, display);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.initData();

    }

    initData() {
        const data = this.display.dataByType('cash-register-data');
        if (data) {
            this.onReceiveData(data);
        }
        this.app.helper.fullscreen(false);
    }

    onReceiveData(displayData: any) {
        super.onReceiveData(displayData);
        if (displayData.type === 'cash-register-data') {
            if (displayData.data) {
                for (const key in displayData.data) {

                    if (key === 'currentProduct') {
                        this[key] = new Product();
                        setTimeout(() => {
                            this[key] = displayData.data[key];
                        }, 0);
                    } else {
                        this[key] = displayData.data[key];
                    }


                }
            }
        }
        this.calculateTotalPrice();
    }

    calculateTotalPrice() {
        let grossPrice = 0;
        let netPrice = 0;
        let amount = 0;
        if (this.registerProducts && this.registerProducts.length) {
            for (const product of this.registerProducts) {
                amount += this.productAmount[product.id];
                grossPrice += this.price(product, this.productAmount[product.id]).gross;
                netPrice += this.price(product, this.productAmount[product.id]).net;
            }
        }
        if (this.total) {
            this.total.amount = amount;
            this.total.gross = grossPrice;
            this.total.net = netPrice;
        }

    }

    price(product, amount = 1, currency: Currency = this.currency, tax: Tax = this.selectedTax, inputIsNet = this.inputIsNet) {
        return this.shop.productPrice(product, amount, currency, tax, inputIsNet);
    }
}
