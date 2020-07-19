# TATOR&trade; - Shop Module 
Product Manager • Cash registry • Online Shop • Accounting

#### *a* TATOR&trade; *software product*
<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License</a>.
###### *© 2019 - Moritz Petzka - [petzka.com](https://petzka.com/)*

<br>

### Documentation
#### [Installation](https://github.com/jodermo/tator/tree/master/documentation/installation.md)
#### [Deployment](https://github.com/jodermo/tator/tree/master/documentation/deployment.md)
#### [Tator Module](https://github.com/jodermo/tator/tree/master/documentation/tator-module.md)
#### [App Classes](https://github.com/jodermo/tator/tree/master/documentation/app-classes.md)

<br>
<br>

#### Install module

#### 1. add repository as submodule

```bash
git submodule add https://github.com/jodermo/tator-shop.git angular-app/modules/tator-shop --name tator-shop
```

#### 2. add angular module

Edit file: `angular-app/import.module.ts`

```typescript
import { TatorShopModule } from '../../modules/tator-shop/tator-shop.module';
```

```typescript
@NgModule({
    imports: [
        TatorShopModule,
    ],
    exports: [
        TatorShopModule,
    ],
})
```

<br>

#### 3. add nest.js modules

Edit file: `nest-app/import.module.ts`

```typescript
import { CurrencyModule } from '../angular-app/plugins/tator-shop/nest/currency/currency.module';
import { DiscountModule } from '../angular-app/plugins/tator-shop/nest/discount/discount.module';
import { ManufacturerModule } from '../angular-app/plugins/tator-shop/nest/manufacturer/manufacturer.module';
import { OrderModule } from '../angular-app/plugins/tator-shop/nest/order/order.module';
import { PaymentModule } from '../angular-app/plugins/tator-shop/nest/payment/payment.module';
import { ProductCategoryModule } from '../angular-app/plugins/tator-shop/nest/product-category/product-category.module';
import { ProductGroupModule } from '../angular-app/plugins/tator-shop/nest/product-group/product-group.module';
import { ProductModule } from '../angular-app/plugins/tator-shop/nest/product/product.module';
import { ShippingModule } from '../angular-app/plugins/tator-shop/nest/shipping/shipping.module';
import { TaxModule } from '../angular-app/plugins/tator-shop/nest/tax/tax.module';
```
```typescript
@Module({
    imports: [
        CurrencyModule,
        DiscountModule
        ManufacturerModule,
        OrderModule,
        PaymentModule,
        ProductCategoryModule,
        ProductGroupModule,
        ProductModule,
        ShippingModule,
        TaxModule,
    ],
    exports: [
        CurrencyModule,
        DiscountModule
        ManufacturerModule,
        OrderModule,
        PaymentModule,
        ProductCategoryModule,
        ProductGroupModule,
        ProductModule,
        ShippingModule,
        TaxModule,
    ],
})
```
