import { BackendPage } from '../../tator-app/angular-app/src/app/classes/backend.page';
import { AppConfig, BackendStartPage } from '../../config/app.config';
import { ShopText } from './shop.text';

export class ShopConfig extends AppConfig {
    config = {
        itemNumber: 'item#########'
    };
    backendPages = [
        CashRegisterBackend,
        CashDisplayBackend,
        BarcodeBackend,
    ];
    defaultText = ShopText;
    backendStartPage = {
        page: 'cash',
        category: 'cash_register'
    } as BackendStartPage;
    jsonFields: [
        'groupIds',
        'shippingIds',
    ];
    jsonTableFields: {};
}

export const CashRegisterBackend: BackendPage = {
    alias: 'cash',
    icon: 'cash-register',
    restriction: 'employee',
    categories: [
        {alias: 'cash_register', icon: 'cash-register'},
        {alias: 'checkout_overview', icon: 'dashboard'},
        {alias: 'purchase', icon: 'purchase'},
        {alias: 'products', icon: 'shop-products'},
        {alias: 'settings', icon: 'settings'},
        {alias: 'configuration', icon: 'config'},
        {alias: 'barcode_scanner', icon: 'barcode', page: 'barcode', category: 'scan_barcode'},
        {alias: 'display', icon: 'dashboard', page: 'display'},
    ]
} as BackendPage;

export const CashDisplayBackend: BackendPage = {
    alias: 'display',
    icon: 'dashboard',
    restriction: 'employee',
} as BackendPage;

export const BarcodeBackend: BackendPage = {
    alias: 'barcode',
    icon: 'barcode',
    restriction: 'employee',
    categories: [
        {alias: 'scan_barcode', icon: 'barcode'},
        {alias: 'barcodes', icon: 'dashboard'},
        {alias: 'configuration', icon: 'config', page: 'barcode', category: 'scan_barcode', element: 'settings'},
        {alias: 'products', icon: 'shop-products', page: 'shop', category: 'products'},
        {alias: 'cash_register', icon: 'cash-register', page: 'cash', category: 'cash_register'},
    ]
} as BackendPage;
