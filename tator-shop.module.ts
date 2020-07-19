import { NgModule } from '@angular/core';
import { ProductComponent } from './components/product/product.component';
import { ProductOverviewComponent } from './components/backend/product-overview/product-overview.component';
import { CartComponent } from './components/cart/cart.component';
import { ShopOverviewComponent } from './components/backend/shop-overview/shop-overview.component';
import { ShopConfigurationComponent } from './components/backend/shop-configuration/shop-configuration.component';
import { CashRegisterComponent } from './components/cash-register/cash-register.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { TatorImportsModule } from '../../src/app/tator-imports.module';
import { TatorDataComponentsModule } from '../tator-core/tator-data-components.module';
import { TatorUiComponentsModule } from '../tator-core/tator-ui-components.module';

@NgModule({
  declarations: [
    ProductComponent,
    ProductOverviewComponent,
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
  providers: [

  ],
  exports: [
    ProductComponent,
    ProductOverviewComponent,
    ShopConfigurationComponent,
    ShopOverviewComponent,
    CartComponent,
    CashRegisterComponent
  ]
})
export class TatorShopModule {
}
