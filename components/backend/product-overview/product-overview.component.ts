import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../tator-core/services/app.service';
import { ShopService } from '../../../shop.service';

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
