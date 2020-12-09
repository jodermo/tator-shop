import { Column } from 'typeorm';

export class Checkout {

    id: number = null;

    type: string = 'default';

    startDate: any = Date.now();

    endDate: any;

    canceled = false;

    amount: number = 0;

    given: number = 0;

    tip: number = 0;

    userId: number = null;

    customerId: number = null;

    paymentId: number = null;

    taxId: number;

    currencyId: number;

    discountIds: any = [];

    history: any = [];

    data: any = null;
}
