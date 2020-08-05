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
import { ShopConfig } from '../../config/shop.config';
import { AppService } from '../../tator-app/angular-app/modules/tator-core/services/app.service';
import { ShopRegisterService } from './shop-register.service';
import { ProductType } from './api/product-type.entity';
import { Checkout } from './api/checkout.entity';


export const ShopTables = [
    'payment',
    'discount',
    'supplier',
    'currency',
    'shipping',
    'manufacturer',
    'tax',
    'product-group',
    'product-category',
    'product',
    'order',
    'checkout'
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

    config = ShopConfig;
    loading = false;
    updating = false;
    ready = false;

    cart: CartObject[] = [];
    previewProduct;
    barcodes = [];

    currentOrder;
    currentProduct;
    currentProductType;
    currentProductCategory;
    currentProductGroup;
    currentManufacturer;
    currentPayment;
    currentDiscount;
    currentShipping;
    currentCurrency;
    currentTax;

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
        'default'
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
        this.init(() => {
            register.init(this);
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
        this.loadLocalSettings();
        this.getData(() => {
            this.loading = false;
            this.ready = true;
            if (success) {
                success();
            }
        });
        this.app.websocket.onBarcode().subscribe(barcode => {
            this.onReceiveBarcode(barcode);
        });
    }

    onDetectBarcode(barcode: any) {
        if (barcode && barcode.data && barcode.data.codeResult) {
            const code = barcode.data.codeResult.code;
            let productExist = false;
            for (let product of this.app.data.table('product')) {
                product = product as Product;
                productExist = true;
                if (code === product.itemNumber) {
                    this.previewProduct = product;
                }
            }
            if (!productExist && this.localSettings.receiveBarcode) {
                this.app.showPage('barcode');
            }
        }
    }

    onReceiveBarcode(barcode: any) {
        if (this.localSettings.receiveBarcode) {
            if (barcode && barcode.userId && barcode.userId === this.app.user.id) {
                this.barcodes.push(barcode);
                if (barcode && barcode.data && barcode.data.codeResult) {
                    const code = barcode.data.codeResult.code;
                    let codeExist = false;
                    for (let product of this.app.data.table('product')) {
                        product = product as Product;
                        if (code === product.itemNumber) {
                            codeExist = true;
                            this.register.addProduct(product);
                        }
                    }
                    if (!codeExist) {

                    }
                }
            }
        }
    }

    getData(success: any = false) {
        this.loading = true;
        this.app.loadDataTables(ShopTables, () => {
            this.getCartFromLocalStorage();
            if (success) {
                success();
            }
            this.loading = false;
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
        this.previewProduct = product;
    }

    newProduct() {
        this.currentProduct = new Product();
        if (this.filterMethod === 'product_category' && this.filterValue) {
            this.currentProduct.categoryId = parseInt(this.filterValue, 10);
        } else if (this.filterMethod === 'product_group' && this.filterValue) {
            this.currentProduct.groupId = parseInt(this.filterValue, 10);
        }
        this.currentProduct.itemNumber = this.newItemNumber();
        return this.currentProduct;
    }

    newItemNumber() {
        const segments = this.config.itemNumber.split('#');
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

    productPrice(product: Product, amount = 1) {
        let grossPrice = product.price * amount;
        let netPrice = grossPrice;
        let tax: any;
        if (product.taxId) {
            tax = this.app.data.byId('tax', product.taxId);
        }
        if (tax && tax.value) {
            netPrice += (product.price * tax.value / 100)
        }
        let currency = this.defaultCurrency;
        if (product.currencyId) {
            currency = this.app.data.byId('currency', product.currencyId);
        }
        return {
            price: product.price,
            amount: grossPrice,
            gross: grossPrice,
            net: netPrice,
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
        return this.removeProductCategoryById(element.id, success);
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

    initSelection() {
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
    }

}
