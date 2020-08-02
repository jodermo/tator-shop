import { BackendPage } from '../../tator-app/angular-app/modules/tator-core/classes/backend.page';

export const ShopBackend: BackendPage = {
    alias: 'shop',
    icon: 'shop',
    restriction: 'admin',
    categories: [
        {alias: 'overview'},
        {alias: 'products'},
        {alias: 'orders'},
        {alias: 'shipping'},
        {alias: 'manufacturer'},
        {alias: 'configuration'},
    ]
} as BackendPage;

export const CashRegisterBackend: BackendPage = {
    alias: 'cash',
    icon: 'cash-register',
    restriction: 'admin',
    categories: [
        {alias: 'cash_register'},
    ],
} as BackendPage;
