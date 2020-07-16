import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../../tator-core/services/app.service';

@Component({
  selector: 'app-shop-configuration',
  templateUrl: './shop-configuration.component.html',
  styleUrls: ['./shop-configuration.component.scss']
})
export class ShopConfigurationComponent implements OnInit {

  constructor(public app: AppService) { }

  ngOnInit(): void {
  }

}
