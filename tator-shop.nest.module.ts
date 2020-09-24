/**
 *    TATOR - Nest Module Import
 *    © 2020
 *    Author: Moritz Petzka
 *    Website: https://petzka.com
 *    Email: info@petzka.com
 */

import { Module } from '@nestjs/common';
import { ProductModule } from './nest/product/product.module';
import { PurchaseModule } from './nest/purchase/purchase.module';
import { CurrencyModule } from './nest/currency/currency.module';
import { DiscountModule } from './nest/discount/discount.module';
import { ProductGroupModule } from './nest/product-group/product-group.module';
import { ProductCategoryModule } from './nest/product-category/product-category.module';
import { OrderModule } from './nest/order/order.module';
import { PaymentProcessModule } from './nest/payment-process/payment-process.module';
import { CheckoutModule } from './nest/checkout/checkout.module';
import { ShippingModule } from './nest/shipping/shipping.module';
import { PaymentModule } from './nest/payment/payment.module';
import { ProductTypeModule } from './nest/product-type/product-type.module';
import { TaxModule } from './nest/tax/tax.module';
import { ManufacturerModule } from './nest/manufacturer/manufacturer.module';

@Module({
    imports: [
        ProductModule,
        ProductTypeModule,
        ProductGroupModule,
        ProductCategoryModule,
        OrderModule,
        ShippingModule,
        PaymentModule,
        CurrencyModule,
        DiscountModule,
        ManufacturerModule,
        CheckoutModule,
        TaxModule,
        PurchaseModule,
        PaymentProcessModule,
    ],
    exports: [
        ProductModule,
        ProductTypeModule,
        ProductGroupModule,
        ProductCategoryModule,
        OrderModule,
        ShippingModule,
        PaymentModule,
        CurrencyModule,
        DiscountModule,
        ManufacturerModule,
        CheckoutModule,
        TaxModule,
        PurchaseModule,
        PaymentProcessModule,
    ],
})
export class TatorShopNestModule {
}
