export class Checkout {

    id: number = null;

    type: string = 'default';

    date: any = Date.now();

    amount: number = 0;

    tip: number = 0;

    userId: number = null;

    customerId: number = null;

    paymentId: number = null;

    taxId: number;

    currencyId: number;

    discountIds: any = [];

    data: any = null;

}
