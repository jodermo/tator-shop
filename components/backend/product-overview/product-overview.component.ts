import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../tator-core/services/app.service';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss']
})
export class ProductOverviewComponent implements OnInit {

  constructor(public app: AppService) {
  }

  ngOnInit(): void {
  }

}
