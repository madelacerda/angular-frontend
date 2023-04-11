import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ConfigService } from '../../../services/config/config.service';

@Component({
  selector: 'app-product-list',
  templateUrl: 'product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private configService: ConfigService) {}

  ngOnInit() {
    this.configService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
