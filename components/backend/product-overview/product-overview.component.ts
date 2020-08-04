import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../../shop.service';
import { AppService } from '../../../../../tator-app/angular-app/modules/tator-core/services/app.service';
import { ProductGroup } from '../../../api/product-group.entity';
import { Product } from '../../../api/product.entity';

@Component({
    selector: 'app-product-overview',
    templateUrl: './product-overview.component.html',
    styleUrls: ['./product-overview.component.scss']
})
export class ProductOverviewComponent implements OnInit {
    selectedType: any = null;
    selectedGroup: any = null;
    selectedCategory: any = null;
    productLayout = 'list';
    showProduct: Product = null;

    products: Product[];

    constructor(public app: AppService, public shop: ShopService) {
    }

    ngOnInit(): void {
        this.filterProducts();
    }

    showProd(product, e: any = null) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        this.showProduct = product;
    }

    getProducts() {
        this.products = this.app.data.table('product');
    }

    filterProducts() {
        this.getProducts();

        if (this.selectedType) {
            this.products = this.products.filter(product => {
                return product.typeId === this.selectedType.id;
            });
        }
        if (this.selectedCategory) {
            this.products = this.products.filter(product => {
                return product.categoryId === this.selectedCategory.id;
            });
        }
        if (this.selectedGroup) {
            this.products = this.products.filter(product => {
                if (product.groupIds) {
                    for (const id of product.groupIds) {
                        if (id === this.selectedGroup.id) {
                            return true;
                        }
                    }
                }
                return false;
            });
        }
    }

    addNewData(data) {
        if (data && data.name && data.name === 'product_category') {
            this.shop.newProductCategory();
        } else if (data && data.name && data.name === 'product_group') {
            this.shop.newProductGroup();
        } else if (data && data.name && data.name === 'currency') {
            this.shop.newCurrency();
        } else if (data && data.name && data.name === 'payment') {
            this.shop.newPayment();
        } else if (data && data.name && data.name === 'manufacturer') {
            this.shop.newManufacturer();
        } else if (data && data.name && data.name === 'tax') {
            this.shop.newTax();
        } else if (data && data.name && data.name === 'discount') {
            this.shop.newDiscount();
        } else if (data && data.name && data.name === 'shipping') {
            this.shop.newShipping();
        }


    }

    selectCategory(category: any = null) {

        if (category) {
            this.selectedCategory = category;
        } else {
            if (this.selectedCategory === 'new') {
                this.shop.newProductCategory();
            }
        }
        this.filterProducts();
    }

    selectGroup(group: any = null) {
        if (group) {
            this.selectedGroup = group;
        } else {
            if (this.selectedGroup === 'new') {
                this.shop.newProductGroup();
            }
        }
        this.filterProducts();
    }

    selectType(type: any = null) {
        if (type) {
            this.selectedType = type;
        } else {
            if (this.selectedType === 'new') {
                this.shop.newProductType();
            }
        }
        this.filterProducts();
    }


}
