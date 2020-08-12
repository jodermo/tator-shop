import { BackendPage } from '../../tator-app/angular-app/src/app/classes/backend.page';


export const CashRegisterBackend: BackendPage = {
    alias: 'cash',
    icon: 'cash-register',
    restriction: 'admin',
    categories: [
        {alias: 'cash_register', icon: 'cash-register'},
        {alias: 'checkout_overview', icon: 'dashboard'},
        {alias: 'products', icon: 'shop-products'},
        {alias: 'configuration', icon: 'config'},
        {alias: 'barcode_scanner', icon: 'barcode', page: 'barcode', category: 'scan_barcode'},
    ]
} as BackendPage;

export const ShopBackend: BackendPage = {
    alias: 'shop',
    icon: 'shop-config',
    restriction: 'admin',
    categories: [
        {alias: 'products', icon: 'shop-products'},
        {alias: 'configuration', icon: 'config'},
        {alias: 'cash_register', icon: 'cash-register', page: 'cash'},
        {alias: 'files', icon: 'files', page: 'files'},
        {alias: 'website', icon: 'editor', page: 'frontend_editor'},
        {alias: 'barcode_scanner', icon: 'barcode', page: 'barcode', category: 'scan_barcode'},
    ]
} as BackendPage;


export const BarcodeBackend: BackendPage = {
    alias: 'barcode',
    icon: 'barcode',
    restriction: 'admin',
    categories: [
        {alias: 'scan_barcode', icon: 'barcode'},
        {alias: 'barcodes', icon: 'dashboard'},
        {alias: 'configuration', icon: 'config', page: 'barcode', category: 'scan_barcode', element: 'settings'},
        {alias: 'products', icon: 'shop-products', page: 'shop', category: 'products'},
        {alias: 'cash_register', icon: 'cash-register', page: 'cash', category: 'cash_register'},
    ]
} as BackendPage;


export const ShopDatabaseConfig = {
    jsonFields: [
        'groupIds',
        'shippingIds',
    ],
    jsonTableFields: {},
};
