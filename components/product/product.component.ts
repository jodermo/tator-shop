import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from '../../api/product.entity';
import { AppService } from '../../../tator-core/services/app.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnChanges {
  @Input() product: Product;
  reload;
  longDescription = false;
  cart = true;
  edit = true;

  constructor(public app: AppService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.reload = true;
    setTimeout(() => {
      this.reload = false;
    }, 0)
  }

}