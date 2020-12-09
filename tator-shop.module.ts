import { NgModule } from '@angular/core';
import { ProductComponent } from './components/product/product.component';
import { ProductOverviewComponent } from './components/backend/product-overview/product-overview.component';
import { CartComponent } from './components/cart/cart.component';
import { ShopConfigurationComponent } from './components/backend/shop-configuration/shop-configuration.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CashRegisterBarcodeComponent } from './components/backend/cash-register/cach-register-barcode/cash-register-barcode.component';
import { CashRegisterComponent } from './components/backend/cash-register/cash-register.component';
import { CheckoutDataComponent } from './components/backend/checkout-overview/checkout-data/checkout-data.component';
import { CheckoutTableComponent } from './components/backend/checkout-overview/checkout-table/checkout-table.component';
import { CheckoutOverviewComponent } from './components/backend/checkout-overview/checkout-overview.component';
import { CashRegisterSettingsComponent } from './components/backend/cash-register-settings/cash-register-settings.component';
import { IndividualProductComponent } from './components/backend/cash-register/individual-product/individual-product.component';
import { CashRegisterBarcodeDataComponent } from './components/backend/cash-register/cach-register-barcode-data/cash-register-barcode-data.component';
import { PurchaseComponent } from './components/backend/purchase/purchase.component';
import { CustomerDisplayComponent } from './components/backend/customer-display/customer-display.component';
import { ExtensionImportsModule } from '../../tator-app/angular-app/src/app/extension-imports.module';

@NgModule({
    declarations: [
        ProductListComponent,
        ProductComponent,
        IndividualProductComponent,
        ProductOverviewComponent,
        CheckoutOverviewComponent,
        CheckoutTableComponent,
        CheckoutDataComponent,
        ShopConfigurationComponent,
        CartComponent,
        CashRegisterComponent,
        CashRegisterSettingsComponent,
        CashRegisterBarcodeComponent,
        CashRegisterBarcodeDataComponent,
        CalculatorComponent,
        PurchaseComponent,
        CustomerDisplayComponent
    ],
    imports: [
        ExtensionImportsModule
    ],
    providers: [],
    exports: [
        ProductListComponent,
        ProductComponent,
        IndividualProductComponent,
        ProductOverviewComponent,
        CheckoutOverviewComponent,
        CheckoutTableComponent,
        CheckoutDataComponent,
        ShopConfigurationComponent,
        CartComponent,
        CashRegisterComponent,
        CashRegisterSettingsComponent,
        CashRegisterBarcodeComponent,
        CashRegisterBarcodeDataComponent,
        CalculatorComponent,
        PurchaseComponent,
        CustomerDisplayComponent
    ]
})
export class TatorShopModule {
}
