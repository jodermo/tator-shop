import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../../shop.service';
import { AppService } from '../../../../../tator-app/angular-app/modules/tator-core/services/app.service';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss']
})
export class ProductOverviewComponent implements OnInit {

  constructor(public app: AppService, public shop: ShopService) {
  }

  ngOnInit(): void {
  }

}
