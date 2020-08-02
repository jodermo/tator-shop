import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../shop.service';
import { AppService } from '../../../../tator-app/angular-app/modules/tator-core/services/app.service';
import { Product } from '../../api/product.entity';


@Component({
    selector: 'app-cash-register',
    templateUrl: './cash-register.component.html',
    styleUrls: ['./cash-register.component.css']
})
export class CashRegisterComponent implements OnInit {
    selectedCategory = null;
    selectedGroup = null;
    products: Product[];

    constructor(public app: AppService, public shop: ShopService) {
    }

    ngOnInit() {
        this.filterProducts();
    }

    addProduct(product: Product) {

    }

    removeProduct(product: Product) {

    }

    filterProducts() {
        this.products = this.app.data.table('product');
        if (this.selectedCategory) {
            console.log('filterProducts category', this.selectedCategory);
            this.products = this.products.filter(product => {
                return product.categoryId === this.selectedCategory.id;
            });
        }
        if (this.selectedGroup) {
            console.log('filterProducts group', this.selectedGroup);
            this.products = this.products.filter(product => {
                return product.groupId === this.selectedGroup.id;
            });
        }

        console.log('filterProducts', this.products);
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

}
