import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ShopService } from '../../../../shop.service';
import { AppService } from '../../../../../../tator-app/angular-app/src/app/services/app.service';
import { Checkout } from '../../../../api/checkout.entity';

@Component({
    selector: 'app-checkout-table',
    templateUrl: './checkout-table.component.html',
    styleUrls: ['./checkout-table.component.scss']
})
export class CheckoutTableComponent implements OnInit {
    @ViewChild('tableElement', {static: false}) tableRef: ElementRef;

    tableElement: HTMLTableElement;


    @Input() checkout: Checkout;
    @Input() data: Checkout[];
    @Input() exportFileName: string = 'checkout';

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
