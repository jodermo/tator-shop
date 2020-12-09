import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../../shop.service';
import { AppService } from '../../../../../tator-app/angular-app/src/app/services/app.service';

@Component({
  selector: 'app-shop-configuration',
  templateUrl: './shop-configuration.component.html',
  styleUrls: ['./shop-configuration.component.scss']
})
export class ShopConfigurationComponent implements OnInit {

  constructor(public app: AppService, public shop: ShopService) { }

  ngOnInit(): void {
  }

}
