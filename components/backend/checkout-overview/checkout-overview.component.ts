import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ShopService } from '../../../shop.service';
import { AppService } from '../../../../../tator-app/angular-app/src/app/services/app.service';
import { Checkout } from '../../../api/checkout.entity';
import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours,
} from 'date-fns';

@Component({
    selector: 'app-checkout-overview',
    templateUrl: './checkout-overview.component.html',
    styleUrls: ['./checkout-overview.component.scss']
})
export class CheckoutOverviewComponent implements OnInit {
    @ViewChild('tableElement', {static: false}) tableRef: ElementRef;

    tableElement: HTMLTableElement;

    todayStart = startOfDay(new Date());
    todayEnd = endOfDay(new Date());


    @Input() startDate: any = this.todayStart;
    @Input() endDate: any = this.todayEnd;
    @Input() userId = null;
    @Input() userSelection = true;


    sort = {
        key: 'date',
        reverse: true,
    };

    data: Checkout[];

    availableUserIds = [];

    totalAmount = 0;

    exportFileName = 'test_file';


    constructor(public app: AppService, public shop: ShopService) {

    }

    today() {
        this.startDate = this.todayStart;
        this.endDate = this.todayEnd;
        this.getResultData();
    }


    getCheckoutData() {
        this.data = this.app.data.table('checkout');
    }

    ngOnInit(): void {

        if (this.userId) {
            this.availableUserIds.push(this.userId);
            this.userSelection = false;
        }
        this.getResultData();

    }

    ngOnChanges(changes: SimpleChanges): void {
        this.getResultData();
    }

    setStartDate(date: any, setEndToSameDay = false) {

        this.startDate = startOfDay(new Date(date));
        if (setEndToSameDay) {
            this.setEndDate(date);
        } else {
            this.getResultData();
        }

    }

    setEndDate(date: any, setStartToSameDay = false) {

        this.endDate = endOfDay(new Date(date));
        if (setStartToSameDay) {
            this.setStartDate(date);
        } else {
            this.getResultData();
        }
    }

    getTableElement() {
        if (!this.tableElement && this.tableRef) {
            this.tableElement = this.tableRef.nativeElement;
        }
    }

    getResultData() {
        this.getCheckoutData();

        let startDate = null;
        let endDate = null;


        if (this.startDate) {
            startDate = Date.parse(this.startDate);
        }
        if (this.endDate) {
            endDate = Date.parse(this.endDate);
        }



        this.data = this.data.filter((checkout) => {
            let output = false;
            if (!startDate && !endDate) {
                output = true;
            } else if (startDate && endDate) {
                output = (
                    parseInt(checkout.endDate, 10) >= startDate &&
                    parseInt(checkout.endDate, 10) <= endDate
                );
            } else if (startDate) {
                output = parseInt(checkout.endDate, 10) >= startDate;
            } else if (endDate) {
                output = parseInt(checkout.endDate, 10) <= endDate;
            }
            if (output && this.userId) {
                output = checkout.userId === this.userId;
            }
            return output;
        });
        this.data.sort((a, b) => {
            return a[this.sort.key] - b[this.sort.key];
        });
        if (this.sort.reverse) {
            this.data.reverse();
        }
        this.getResultValues();
        this.getTableElement();
    }

    getResultValues() {
        this.totalAmount = 0;
        if (this.userSelection) {
            this.availableUserIds = [];
        }
        for (const checkout of this.data) {
            this.totalAmount += checkout.amount;
            if (this.userSelection && checkout.userId) {
                this.addUserId(checkout.userId);
            }
        }

    }

    addUserId(id) {
        let exist = false;
        for (const userId of this.availableUserIds) {
            if (userId === id) {
                exist = true;
            }
        }
        if (!exist) {
            this.availableUserIds.push(id);
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
