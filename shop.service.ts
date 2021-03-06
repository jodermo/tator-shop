import { Injectable } from '@angular/core';
import { Product } from './api/product.entity';
import { ProductCategory } from './api/product-category.entity';
import { ProductGroup } from './api/product-group.entity';
import { Discount } from './api/discount.entity';
import { Order } from './api/order.entity';
import { Manufacturer } from './api/manufacturer.entity';
import { Payment } from './api/payment.entity';
import { Shipping } from './api/shipping.entity';
import { Tax } from './api/tax.entity';
import { Currency } from './api/currency.entity';
import { AppService } from '../../tator-app/angular-app/src/app/services/app.service';
import { ShopRegisterService } from './shop-register.service';
import { ProductType } from './api/product-type.entity';
import { Checkout } from './api/checkout.entity';
import { Purchase } from './api/purchase.entity';


export const ShopTables = [
    'product',
    'product-type',
    'product-group',
    'product-category',
    'register-settings',
    'checkout',
    'payment',
    'discount',
    'supplier',
    'currency',
    'shipping',
    'manufacturer',
    'tax',
    'order',
    'purchase'
];


export class CartObject {
    userId: number;
    productId: number;
    amount = 0;
}


@Injectable({
    providedIn: 'root'
})
export class ShopService {
    loading = true;
    updating = false;
    ready = false;
    cart: CartObject[] = [];

    currentOrder: Order;
    currentProduct: Product;
    currentProductType: ProductType;
    currentProductCategory: ProductCategory;
    currentProductGroup: ProductGroup;
    currentManufacturer: Manufacturer;
    currentPayment: Payment;
    currentDiscount: Discount;
    currentShipping: Shipping;
    currentCurrency: Currency;
    currentTax: Tax;
    currentPurchase: Purchase;

    localSettings: any = {
        receiveBarcode: false,
        showRegisterProduct: true
    };

    lastCheckout: Checkout;

    newProductValue = false;

    defaultCurrency = {
        name: 'Euro',
        iso: 'EUR',
        alias: 'euro',
        symbol: '€',
        rate: 1
    } as Currency;

    defaultTax = {
        name: 'Keine Steuer',
        value: 0
    } as Tax;

    productCategoryTypes = [
        'default'
    ];

    productGroupTypes = [
        'default'
    ];

    discountTypes = [
        'default'
    ];
    currencyTypes = [
        'default'
    ];
    manufacturerTypes = [
        'default'
    ];
    shippingTypes = [
        'default'
    ];

    paymentTypes = [
        'cash',
        'card',
        'online',
        'device'
    ];

    productTypes = [
        'default'
    ];

    taxTypes = [
        'default'
    ];


    filterMethods = [
        'none',
        'product_category',
        'product_group'
    ];
    filterMethod = this.filterMethods[0];
    filterValue: string;

    constructor(public app: AppService, public register: ShopRegisterService) {
        this.loadLocalSettings();

        this.init(() => {
            register.init(this);
            this.ready = true;
            this.loading = false;
        });
        this.app.websocket.onBarcode().subscribe(barcode => {
            console.log('onBarcode', this.app.currentPage);
            if (this.app.currentPage &&
                (this.app.currentPage.alias === 'cash' || this.app.currentPage.alias === 'shop' || this.app.currentPage.alias === 'barcode')
            ) {
                this.onReceiveBarcode(barcode);
            }
        });
        this.app.onDetectBarcode((barcode) => {
            this.onDetectBarcode(barcode);
        });
    }

    saveLocalSettings() {
        localStorage.setItem('local-shop-settings', JSON.stringify(this.localSettings));
    }

    loadLocalSettings() {
        const storage = localStorage.getItem('local-shop-settings');
        if (storage) {
            this.localSettings = JSON.parse(storage)
        }
    }

    setLocalSettings(name: string, value: any) {
        this.localSettings[name] = value;
        this.saveLocalSettings();
    }

    init(success: any = null) {
        this.loading = true;
        this.getData(() => {
            if (success) {
                success();
            }
        });

    }


    getData(success: any = false) {
        this.loading = true;
        this.app.loadDataTables(ShopTables, () => {

            this.getCartFromLocalStorage();
            if (success) {
                success();
            }
        });

    }

    /* Cart */

    addToCart(product: Product, amount = 1) {
        for (const cartObject of this.cart) {
            if (cartObject.productId === product.id) {
                return cartObject.amount += amount;
            }
        }
        this.cart.push({
            productId: product.id,
            userId: this.app.user.id,
            amount
        } as CartObject);
        this.saveCartInLocalStorage();
    }


    removeFromCart(product: Product, amount = 0) {
        for (let i = 0; i < this.cart.length; i++) {
            if (this.cart[i].productId === product.id) {
                if (amount && amount > this.cart[i].amount) {
                    return this.cart[i].amount -= amount;
                } else {
                    return this.cart.splice(i, 1);
                }
            }
        }
        this.saveCartInLocalStorage();
    }

    getCartFromLocalStorage() {
        if (this.app.user) {
            let cart: any = localStorage.getItem('shop-cart');
            this.cart = [];
            if (cart) {
                cart = JSON.parse(cart);
                for (const cartObject of cart) {
                    if ((cartObject as CartObject).userId === this.app.user.id) {
                        this.cart.push((cartObject as CartObject));
                    }
                }
            }
        }
    }

    saveCartInLocalStorage() {
        const cart = JSON.stringify(this.cart);
        localStorage.setItem('shop-cart', cart);
    }

    /* Products */

    showProduct(product: Product, page = 'shop', category = 'products') {
        if (page) {
            this.app.showPage(page, category || null);
        }
        this.app.currentElement = new Product();
        setTimeout(() => {
            this.app.currentElement = product;
            this.register.sendDisplayData();
        }, 0);

    }

    onReceiveBarcode(barcode: any) {
        if (this.localSettings.receiveBarcode) {
            const product = this.barcodeProduct(barcode);
            if (product) {
                this.register.addProduct(product);
            }

        }
    }

    onDetectBarcode(barcode: any) {
        const product = this.barcodeProduct(barcode);
        if (product) {
            if (!this.app.localSettings.barcodeToCheckout) {
                this.app.currentElement = product;
            } else {
                this.register.addProduct(product);
            }
        }

    }

    barcodeProduct(barcode: any) {
        if (barcode && barcode.userId && barcode.userId === this.app.user.id) {
            if (barcode && barcode.data && barcode.data.codeResult) {
                const code = barcode.data.codeResult.code;
                for (let product of this.app.data.table('product')) {
                    product = product as Product;
                    if (code === product.itemNumber) {
                        return product;
                    }
                }
            }
        }
        return null;
    }

    newProduct() {
        this.currentProduct = new Product();
        if (this.filterMethod === 'product_category' && this.filterValue) {
            this.currentProduct.categoryId = parseInt(this.filterValue, 10);
        } else if (this.filterMethod === 'product_group' && this.filterValue) {
            if (this.currentProduct.groupIds) {
                this.currentProduct.groupIds.push(parseInt(this.filterValue, 10));
            } else {
                this.currentProduct.groupIds = [parseInt(this.filterValue, 10)];
            }
        }
        this.currentProduct.itemNumber = this.newItemNumber();
        return this.currentProduct;
    }

    newItemNumber() {
        const segments = this.app.config.itemNumber.split('#');
        const productCount = this.app.data.table('product').length + 1;
        const productCountString = productCount + '';
        let itemNumber = '';
        let count = 0;
        for (const seg of segments) {
            if (seg === '') {
                count++;
            }
        }
        let i = 0;
        for (const seg of segments) {
            if (seg === '') {
                i++;
                if (count - i < productCountString.length) {
                    itemNumber += productCountString[count - i];
                } else {
                    itemNumber += '0';
                }

            } else {
                itemNumber += seg;
            }
        }
        return itemNumber;
    }

    productById(id: number) {
        return this.app.data.byId('product', id);
    }

    productsByCategory(categoryId: number) {
        return this.app.data.table('product').filter(
            element => element.categoryId === categoryId
        );
    }

    productsByGroup(groupId: number) {
        return this.app.data.table('product').filter(
            element => element.groupId === groupId
        );
    }

    addProduct(element: any, success: any = false) {
        this.app.data.add('product', element, success);
    }

    updateProduct(element: any, success: any = false) {
        this.app.data.update('product', element['id'], element, success);
    }

    updateOrAddProduct(element: any, success: any = false) {
        if (element['id']) {
            this.updateProduct(element, success);
        } else {
            this.addProduct(element, success);
        }
    }

    removeProduct(element: any, success: any = false) {
        return this.removeProductById(element.id, success);
    }

    removeProductById(id: number, success: any = false) {
        if (confirm(this.app.text('confirm_action'))) {
            this.app.data.delete('product', id, success);
        } else {
            if (success) {
                success(false);
            }
        }
    }

    productPrice(product: Product, amount = 1, currency: Currency = null, tax: Tax = null, inputIsNet = false) {
        /* gross price */
        let grossPrice = product.price * amount;
        let symbol = '€';
        if (currency) {
            /* currency rate */
            if (currency.rate) {
                grossPrice = grossPrice * currency.rate;
            }
            /* currency symbol */
            if (currency.symbol) {
                symbol = currency.symbol;
            }
        }

        /* gross / net price */
        let netPrice = grossPrice;
        if (inputIsNet) {
            if (tax && tax.value) {
                grossPrice = grossPrice - (product.price * tax.value / 100);
            }
        } else {
            if (tax && tax.value) {
                netPrice += (product.price * tax.value / 100);
            }
        }


        return {
            price: product.price,
            amount: grossPrice,
            gross: grossPrice,
            net: netPrice,
            symbol: symbol,
            currency: currency,
            tax: tax
        };
    }

    /* Product Types */

    newProductType() {
        this.newProductValue = true;
        return this.currentProductType = new ProductType();
    }

    productTypeById(id: number) {
        return this.app.data.byId('product-type', id);
    }

    addProductType(element: any, success: any = false) {
        this.app.data.add('product-type', element, (e) => {
            if (success) {
                success(e)
            }
            this.newProductValue = false;
        });
    }

    updateProductType(element: any, success: any = false) {
        this.app.data.update('product-type', element['id'], element, success);
    }

    updateOrAddProductType(category: any) {
        this.updating = true;
        if (category['id']) {
            this.updateProductType(category, () => {
                this.currentProductType = null;
                this.updating = false;
            });
        } else {
            this.addProductType(category, () => {
                this.currentProductType = null;
                this.updating = false;
            });
        }
    }

    removeProductType(element: any, success: any = false) {
        return this.removeProductTypeById(element.id, success);
    }

    removeProductTypeById(id: number, success: any = false) {
        if (confirm(this.app.text('confirm_action'))) {
            this.app.data.delete('product-type', id, success);
        } else {
            if (success) {
                success(false);
            }
        }
    }

    /* Product Categories */

    newProductCategory() {
        this.newProductValue = true;
        return this.currentProductCategory = new ProductCategory();
    }

    productCategoryById(id: number) {
        return this.app.data.byId('product-category', id);
    }

    addProductCategory(element: any, success: any = false) {
        this.app.data.add('product-category', element, (e) => {
            if (success) {
                success(e)
            }
            this.newProductValue = false;
        });
    }

    updateProductCategory(element: any, success: any = false) {
        this.app.data.update('product-category', element['id'], element, success);
    }

    updateOrAddProductCategory(category: any) {
        this.updating = true;
        if (category['id']) {
            this.updateProductCategory(category, () => {
                this.currentProductCategory = null;
                this.updating = false;
            });
        } else {
            this.addProductCategory(category, () => {
                this.currentProductCategory = null;
                this.updating = false;
            });
        }
    }

    removeProductCategory(element: any, success: any = false) {
        return this.removeProductCategoryById(element.id, success);
    }

    removeProductCategoryById(id: number, success: any = false) {
        if (confirm(this.app.text('confirm_action'))) {
            this.app.data.delete('product-category', id, success);
        } else {
            if (success) {
                success(false);
            }
        }
    }

    /* Product Groups */

    newProductGroup() {
        this.newProductValue = true;
        return this.currentProductGroup = new ProductGroup();
    }

    productGroupById(id: number) {
        return this.app.data.byId('product-group', id);
    }

    addProductGroup(element: any, success: any = false) {
        this.app.data.add('product-group', element, (e) => {
            if (success) {
                success(e)
            }
            this.newProductValue = false;
        });
    }

    updateProductGroup(element: any, success: any = false) {
        this.app.data.update('product-group', element['id'], element, success);
    }

    updateOrAddProductGroup(group: any) {
        this.updating = true;
        if (group['id']) {
            this.updateProductGroup(group, () => {
                this.currentProductGroup = null;
                this.updating = false;
            });
        } else {
            this.addProductGroup(group, () => {
                this.currentProductGroup = null;
                this.updating = false;
            });
        }
    }

    removeProductGroup(element: any, success: any = false) {
        return this.removeProductGroupById(element.id, success);
    }

    removeProductGroupById(id: number, success: any = false) {
        if (confirm(this.app.text('confirm_action'))) {
            this.app.data.delete('product-group', id, success);
        } else {
            if (success) {
                success(false);
            }
        }
    }

    /* Taxes */

    newTax() {
        this.newProductValue = true;
        return this.currentTax = new Tax();
    }

    taxById(id: number) {
        return this.app.data.byId('tax', id);
    }

    addTax(element: any, success: any = false) {
        this.app.data.add('tax', element, (e) => {
            if (success) {
                success(e)
            }
            this.newProductValue = false;
        });
    }

    updateTax(element: any, success: any = false) {
        this.app.data.update('tax', element['id'], element, success);
    }

    updateOrAddTax(tax: any) {
        this.updating = true;
        if (tax['id']) {
            this.updateTax(tax, () => {
                this.currentTax = null;
                this.updating = false;
            });
        } else {
            this.addTax(tax, () => {
                this.currentTax = null;
                this.updating = false;
            });
        }
    }

    removeTax(element: any, success: any = false) {
        return this.removeTaxById(element.id, success);
    }

    removeTaxById(id: number, success: any = false) {
        if (confirm(this.app.text('confirm_action'))) {
            this.app.data.delete('tax', id, success);
        } else {
            if (success) {
                success(false);
            }
        }
    }

    /* Discount */

    newDiscount() {
        this.newProductValue = true;
        return this.currentDiscount = new Discount();
    }

    discountById(id: number) {
        return this.app.data.byId('discount', id);
    }

    addDiscount(element: any, success: any = false) {
        this.app.data.add('discount', element, (e) => {
            if (success) {
                success(e)
            }
            this.newProductValue = false;
        });
    }

    updateDiscount(element: any, success: any = false) {
        this.app.data.update('discount', element['id'], element, success);
    }

    updateOrAddDiscount(element: any) {
        this.updating = true;
        if (element['id']) {
            this.updateDiscount(element, () => {
                this.currentDiscount = null;
                this.updating = false;
            });
        } else {
            this.addDiscount(element, () => {
                this.currentDiscount = null;
                this.updating = false;
            });
        }
    }

    removeDiscount(element: any, success: any = false) {
        return this.removeDiscountById(element.id, success);
    }

    removeDiscountById(id: number, success: any = false) {
        if (confirm(this.app.text('confirm_action'))) {
            this.app.data.delete('discount', id, success);
        } else {
            if (success) {
                success(false);
            }
        }
    }

    /* Orders */

    newOrder() {
        this.newProductValue = true;
        return this.currentOrder = new Order();
    }

    orderById(id: number) {
        return this.app.data.byId('order', id);
    }

    addOrder(element: any, success: any = false) {
        this.app.data.add('order', element, (e) => {
            if (success) {
                success(e)
            }
            this.newProductValue = false;
        });
    }

    updateOrder(element: any, success: any = false) {
        this.app.data.update('order', element['id'], element, success);
    }

    updateOrAddOrder(element: any) {
        this.updating = true;
        if (element['id']) {
            this.updateOrder(element, () => {
                this.currentOrder = null;
                this.updating = false;
            });
        } else {
            this.addOrder(element, () => {
                this.currentOrder = null;
                this.updating = false;
            });
        }
    }

    removeOrder(element: any, success: any = false) {
        return this.removeOrderById(element.id, success);
    }

    removeOrderById(id: number, success: any = false) {
        if (confirm(this.app.text('confirm_action'))) {
            this.app.data.delete('order', id, success);
        } else {
            if (success) {
                success(false);
            }
        }
    }

    /* Manufacturer */


    newManufacturer() {
        this.newProductValue = true;
        return this.currentManufacturer = new Manufacturer();
    }

    manufacturerById(id: number) {
        return this.app.data.byId('manufacturer', id);
    }

    addManufacturer(element: any, success: any = false) {
        this.app.data.add('manufacturer', element, (e) => {
            if (success) {
                success(e)
            }
            this.newProductValue = false;
        });
    }

    updateManufacturer(element: any, success: any = false) {
        this.app.data.update('manufacturer', element['id'], element, success);
    }

    updateOrAddManufacturer(element: any) {
        this.updating = true;
        if (element['id']) {
            this.updateManufacturer(element, () => {
                this.currentManufacturer = null;
                this.updating = false;
            });
        } else {
            this.addManufacturer(element, () => {
                this.currentManufacturer = null;
                this.updating = false;
            });
        }
    }

    removeManufacturer(element: any, success: any = false) {
        return this.removeManufacturerById(element.id, success);
    }

    removeManufacturerById(id: number, success: any = false) {
        if (confirm(this.app.text('confirm_action'))) {
            this.app.data.delete('manufacturer', id, success);
        } else {
            if (success) {
                success(false);
            }
        }
    }

    /* Currencies */

    newCurrency() {
        this.newProductValue = true;
        return this.currentCurrency = new Currency();
    }

    currencyById(id: number) {
        return this.app.data.byId('currency', id);
    }

    addCurrency(element: any, success: any = false) {
        this.app.data.add('currency', element, (e) => {
            if (success) {
                success(e)
            }
            this.newProductValue = false;
        });
    }

    updateCurrency(element: any, success: any = false) {
        this.app.data.update('currency', element['id'], element, success);
    }

    updateOrAddCurrency(element: any) {
        this.updating = true;
        if (element['id']) {
            this.updateCurrency(element, () => {
                this.currentCurrency = null;
                this.updating = false;
            });
        } else {
            this.addCurrency(element, () => {
                this.currentCurrency = null;
                this.updating = false;
            });
        }
    }

    removeCurrency(element: any, success: any = false) {
        return this.removeCurrencyById(element.id, success);
    }

    removeCurrencyById(id: number, success: any = false) {
        if (confirm(this.app.text('confirm_action'))) {
            this.app.data.delete('currency', id, success);
        } else {
            if (success) {
                success(false);
            }
        }
    }

    /* Payments */

    newPayment() {
        this.newProductValue = true;
        return this.currentPayment = new Payment();
    }

    paymentById(id: number) {
        return this.app.data.byId('payment', id);
    }

    addPayment(element: any, success: any = false) {
        this.app.data.add('payment', element, (e) => {
            if (success) {
                success(e)
            }
            this.newProductValue = false;
        });
    }

    updatePayment(element: any, success: any = false) {
        this.app.data.update('payment', element['id'], element, success);
    }

    updateOrAddPayment(element: any) {
        this.updating = true;
        if (element['id']) {
            this.updatePayment(element, () => {
                this.currentPayment = null;
                this.updating = false;
            });
        } else {
            this.addPayment(element, () => {
                this.currentPayment = null;
                this.updating = false;
            });
        }
    }

    removePayment(element: any, success: any = false) {
        return this.removePaymentById(element.id, success);
    }

    removePaymentById(id: number, success: any = false) {
        if (confirm(this.app.text('confirm_action'))) {
            this.app.data.delete('payment', id, success);
        } else {
            if (success) {
                success(false);
            }
        }
    }

    /* Shipping */

    newShipping() {
        this.newProductValue = true;
        return this.currentShipping = new Shipping();
    }

    shippingById(id: number) {
        return this.app.data.byId('shipping', id);
    }

    addShipping(element: any, success: any = false) {
        this.app.data.add('shipping', element, (e) => {
            if (success) {
                success(e)
            }
            this.newProductValue = false;
        });
    }

    updateShipping(element: any, success: any = false) {
        this.app.data.update('shipping', element['id'], element, success);
    }

    updateOrAddShipping(element: any) {
        this.updating = true;
        if (element['id']) {
            this.updateShipping(element, () => {
                this.currentShipping = null;
                this.updating = false;
            });
        } else {
            this.addShipping(element, () => {
                this.currentShipping = null;
                this.updating = false;
            });
        }
    }

    removeShipping(element: any, success: any = false) {
        return this.removeShippingById(element.id, success);
    }

    removeShippingById(id: number, success: any = false) {
        if (confirm(this.app.text('confirm_action'))) {
            this.app.data.delete('shipping', id, success);
        } else {
            if (success) {
                success(false);
            }
        }
    }


    /* purchase */

    newPurchase() {
        this.currentPurchase = new Purchase();
        this.currentPurchase.userId = this.app.user.id;
        if (this.defaultCurrency) {
            this.currentPurchase.currencyId = this.defaultCurrency.id;
        }
        if (this.defaultTax) {
            this.currentPurchase.taxId = this.defaultTax.id;
        }
        return this.currentPurchase;
    }

    purchaseById(id: number) {
        return this.app.data.byId('purchase', id);
    }

    addPurchase(element: any, success: any = false) {
        this.app.data.add('purchase', element, (e) => {
            if (success) {
                success(e)
            }
        });
    }

    updatePurchase(element: any, success: any = false) {
        this.app.data.update('purchase', element['id'], element, success);
    }

    updateOrAddPurchase(element: any) {
        this.updating = true;
        if (element['id']) {
            this.updatePurchase(element, () => {
                this.currentPurchase = null;
                this.updating = false;
            });
        } else {
            this.addPurchase(element, () => {
                this.currentPurchase = null;
                this.updating = false;
            });
        }
    }

    removePurchase(element: any, success: any = false) {
        return this.removePurchaseById(element.id, success);
    }

    removePurchaseById(id: number, success: any = false) {
        if (confirm(this.app.text('confirm_action'))) {
            this.app.data.delete('purchase', id, success);
        } else {
            if (success) {
                success(false);
            }
        }
    }


    initSelection() {
        this.newProductValue = false;
        this.currentProduct = null;
        this.currentProductGroup = null;
        this.currentProductCategory = null;
        this.currentDiscount = null;
        this.currentTax = null;
        this.currentShipping = null;
        this.currentCurrency = null;
        this.currentPayment = null;
        this.currentManufacturer = null;
        this.currentOrder = null;
        this.currentProductType = null;
        this.currentPurchase = null;
    }

}
