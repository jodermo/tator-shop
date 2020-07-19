import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../tator-core/services/app.service';
import { ShopService } from '../../shop.service';


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
