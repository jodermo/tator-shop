import { NgModule } from '@angular/core';
import { ProductComponent } from './components/product/product.component';
import { ProductOverviewComponent } from './components/backend/product-overview/product-overview.component';
import { CartComponent } from './components/cart/cart.component';
import { ShopOverviewComponent } from './components/backend/shop-overview/shop-overview.component';
import { ShopConfigurationComponent } from './components/backend/shop-configuration/shop-configuration.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CashRegisterComponent } from './components/cash-register/cash-register.component';
import { TatorCoreModule } from '../tator-core/tator-core.module';
import { CalculatorComponent } from './components/calculator/calculator.component';

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
    BrowserModule,
    FormsModule,
    TatorCoreModule,
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
