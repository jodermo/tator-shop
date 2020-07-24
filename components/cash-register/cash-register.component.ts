import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../shop.service';
import { AppService } from '../../../../tator-app/angular-app/modules/tator-core/services/app.service';


@Component({
  selector: 'app-cash-register',
  templateUrl: './cash-register.component.html',
  styleUrls: ['./cash-register.component.css']
})
export class CashRegisterComponent implements OnInit {


  constructor(public app: AppService, public shop: ShopService) {
  }

  ngOnInit() {
  }

}
