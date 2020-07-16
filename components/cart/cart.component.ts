import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../tator-core/services/app.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(public app: AppService) { }

  ngOnInit(): void {
  }

}
