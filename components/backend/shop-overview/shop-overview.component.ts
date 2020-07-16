import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../tator-core/services/app.service';

@Component({
  selector: 'app-shop-overview',
  templateUrl: './shop-overview.component.html',
  styleUrls: ['./shop-overview.component.scss']
})
export class ShopOverviewComponent implements OnInit {

  constructor(public app: AppService) { }

  ngOnInit(): void {
  }

}
