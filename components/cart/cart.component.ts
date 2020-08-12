import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../shop.service';
import { AppService } from '../../../../tator-app/angular-app/src/app/services/app.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(public app: AppService, public shop: ShopService) { }

  ngOnInit(): void {
  }

}
