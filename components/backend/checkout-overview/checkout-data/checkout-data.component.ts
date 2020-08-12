import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ShopService } from '../../../../shop.service';
import { AppService } from '../../../../../../tator-app/angular-app/src/app/services/app.service';
import { Checkout } from '../../../../api/checkout.entity';

@Component({
    selector: 'app-checkout-data',
    templateUrl: './checkout-data.component.html',
    styleUrls: ['./checkout-data.component.scss']
})
export class CheckoutDataComponent implements OnInit {
    @ViewChild('tableElement', {static: false}) tableRef: ElementRef;

    tableElement: HTMLTableElement;

    @Input() checkout: Checkout;
    @Input() exportFileName = 'checkout';
    @Input() print = false;

    constructor(public app: AppService, public shop: ShopService) {
    }

    ngOnInit(): void {

    }

    getTableElement() {
        if (!this.tableElement && this.tableRef) {
            this.tableElement = this.tableRef.nativeElement;
        }
    }

    exportTable() {
        this.getTableElement();
        if (this.tableElement) {
            this.app.helper.exportTableToExcel(this.tableElement, this.exportFileName);
        }
    }

    printTable() {
        this.getTableElement();
        if (this.tableElement) {
            this.app.helper.printElement(this.tableElement);
        }

    }


}
