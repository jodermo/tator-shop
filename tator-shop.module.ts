import { NgModule } from '@angular/core';
import { ProductComponent } from './components/product/product.component';
import { ProductOverviewComponent } from './components/backend/product-overview/product-overview.component';
import { CartComponent } from './components/cart/cart.component';
import { ShopConfigurationComponent } from './components/backend/shop-configuration/shop-configuration.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { TatorImportsModule } from '../../tator-app/angular-app/src/app/tator-imports.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CashRegisterBarcodeComponent } from './components/backend/cash-register/cach-register-barcode/cash-register-barcode.component';
import { CashRegisterComponent } from './components/backend/cash-register/cash-register.component';
import { CheckoutDataComponent } from './components/backend/checkout-overview/checkout-data/checkout-data.component';
import { CheckoutTableComponent } from './components/backend/checkout-overview/checkout-table/checkout-table.component';
import { CheckoutOverviewComponent } from './components/backend/checkout-overview/checkout-overview.component';
import { CashRegisterSettingsComponent } from './components/backend/cash-register-settings/cash-register-settings.component';
import { IndividualProductComponent } from './components/backend/cash-register/individual-product/individual-product.component';
import { TatorUiComponentsModule } from '../../tator-app/angular-app/src/app/modules/tator-core/tator-ui-components.module';
import { TatorFileComponentsModule } from '../../tator-app/angular-app/src/app/modules/tator-core/tator-file-components.module';
import { TatorFormComponentsModule } from '../../tator-app/angular-app/src/app/modules/tator-core/tator-form-components.module';
import { TatorUserComponentsModule } from '../../tator-app/angular-app/src/app/modules/tator-core/tator-user-components.module';
import { TatorDataComponentsModule } from '../../tator-app/angular-app/src/app/modules/tator-core/tator-data-components.module';
import { CashRegisterBarcodeDataComponent } from './components/backend/cash-register/cach-register-barcode-data/cash-register-barcode-data.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { PurchaseComponent } from './components/backend/purchase/purchase.component';
import { CustomerDisplayComponent } from './components/backend/customer-display/customer-display.component';

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
        TatorImportsModule,
        TatorDataComponentsModule,
        TatorFileComponentsModule,
        TatorUiComponentsModule,
        TatorFormComponentsModule,
        TatorUserComponentsModule,
        FlatpickrModule,
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
