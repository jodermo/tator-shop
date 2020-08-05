import { NgModule } from '@angular/core';
import { ProductComponent } from './components/product/product.component';
import { ProductOverviewComponent } from './components/backend/product-overview/product-overview.component';
import { CartComponent } from './components/cart/cart.component';
import { ShopConfigurationComponent } from './components/backend/shop-configuration/shop-configuration.component';
import { CashRegisterComponent } from './components/cash-register/cash-register.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { TatorUiComponentsModule } from '../../tator-app/angular-app/modules/tator-core/tator-ui-components.module';
import { TatorImportsModule } from '../../tator-app/angular-app/src/app/tator-imports.module';
import { TatorDataComponentsModule } from '../../tator-app/angular-app/modules/tator-core/tator-data-components.module';
import { TatorFileComponentsModule } from '../../tator-app/angular-app/modules/tator-core/tator-file-components.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CheckoutOverviewComponent } from './components/backend/checkout-overview/checkout-overview.component';
import { CheckoutDataComponent } from './components/backend/checkout-data/checkout-data.component';
import { TatorUserComponentsModule } from '../../tator-app/angular-app/modules/tator-core/tator-user-components.module';
import { TatorFormComponentsModule } from '../../tator-app/angular-app/modules/tator-core/tator-form-components.module';
import { CashRegisterBarcodeComponent } from './components/cash-register/cach-register-barcode/cash-register-barcode.component';

@NgModule({
    declarations: [
        ProductListComponent,
        ProductComponent,
        ProductOverviewComponent,
        CheckoutOverviewComponent,
        CheckoutDataComponent,
        ShopConfigurationComponent,
        CartComponent,
        CashRegisterComponent,
        CashRegisterBarcodeComponent,
        CalculatorComponent
    ],
    imports: [
        TatorImportsModule,
        TatorDataComponentsModule,
        TatorFileComponentsModule,
        TatorUiComponentsModule,
        TatorFormComponentsModule,
        TatorUserComponentsModule,
    ],
    providers: [],
    exports: [
        ProductListComponent,
        ProductComponent,
        ProductOverviewComponent,
        CheckoutOverviewComponent,
        CheckoutDataComponent,
        ShopConfigurationComponent,
        CartComponent,
        CashRegisterComponent,
        CashRegisterBarcodeComponent,
    ]
})
export class TatorShopModule {
}
