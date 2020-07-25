import { NgModule } from '@angular/core';
import { ProductComponent } from './components/product/product.component';
import { ProductOverviewComponent } from './components/backend/product-overview/product-overview.component';
import { CartComponent } from './components/cart/cart.component';
import { ShopOverviewComponent } from './components/backend/shop-overview/shop-overview.component';
import { ShopConfigurationComponent } from './components/backend/shop-configuration/shop-configuration.component';
import { CashRegisterComponent } from './components/cash-register/cash-register.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { TatorUiComponentsModule } from '../../tator-app/angular-app/modules/tator-core/tator-ui-components.module';
import { TatorImportsModule } from '../../tator-app/angular-app/src/app/tator-imports.module';
import { TatorDataComponentsModule } from '../../tator-app/angular-app/modules/tator-core/tator-data-components.module';
import { ManufacturerOverviewComponent } from './components/backend/manufacturer-overview/manufacturer-overview.component';

@NgModule({
    declarations: [
        ProductComponent,
        ProductOverviewComponent,
        ManufacturerOverviewComponent,
        ShopConfigurationComponent,
        ShopOverviewComponent,
        CartComponent,
        CashRegisterComponent,
        CalculatorComponent
    ],
    imports: [
        TatorImportsModule,
        TatorDataComponentsModule,
        TatorUiComponentsModule,
    ],
    providers: [],
    exports: [
        ProductComponent,
        ProductOverviewComponent,
        ManufacturerOverviewComponent,
        ShopConfigurationComponent,
        ShopOverviewComponent,
        CartComponent,
        CashRegisterComponent
    ]
})
export class TatorShopModule {
}
