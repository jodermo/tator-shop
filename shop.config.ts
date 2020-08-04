import { BackendPage } from '../../tator-app/angular-app/modules/tator-core/classes/backend.page';

export const ShopBackend: BackendPage = {
    alias: 'shop',
    icon: 'shop',
    restriction: 'admin',
    categories: [
        {alias: 'overview'},
        {alias: 'products'},
        {alias: 'configuration'},
    ]
} as BackendPage;

export const CashRegisterBackend: BackendPage = {
    alias: 'cash',
    icon: 'cash-register',
    restriction: 'admin',
    categories: [
        {alias: 'cash_register'},
        {alias: 'checkout_overview'}
    ]
} as BackendPage;

export const BarcodeBackend: BackendPage = {
    alias: 'barcode',
    icon: 'barcode',
    restriction: 'admin'
} as BackendPage;


export const ShopDatabaseConfig = {
    jsonFields: [
        'groupIds',
        'shippingIds',
    ],
    jsonTableFields: {},
};
