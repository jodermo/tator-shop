import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ShopService } from '../../../shop.service';
import { AppService } from '../../../../../tator-app/angular-app/src/app/services/app.service';
import { Product } from '../../../api/product.entity';

@Component({
    selector: 'app-product-overview',
    templateUrl: './product-overview.component.html',
    styleUrls: ['./product-overview.component.scss']
})
export class ProductOverviewComponent implements AfterViewInit, OnChanges {
    selectedType: any = null;
    selectedGroup: any = null;
    selectedCategory: any = null;
    productLayout = 'list';

    products: Product[];

    constructor(public app: AppService, public shop: ShopService) {
        this.products = this.app.data.table('product');
    }

    ngAfterViewInit(): void {
        this.filterProducts();
        if (!this.products || !this.products.length) {
            setTimeout(() => {
                this.filterProducts();
            }, 500);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.filterProducts();
    }

    showProd(product, e: any = null) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        this.app.currentElement = product;
        this.shop.register.individualProduct = null;
        this.shop.register.sendDisplayData();
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
