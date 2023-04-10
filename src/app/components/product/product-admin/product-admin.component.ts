import { Component } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ConfigService } from '../../../services/config/config.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css'],
})
export class ProductAdminComponent {
  productDetails: Product[] = [];
  displayedColumns: string[] = [
    'Id',
    'Nombre',
    'Precio',
    'Sku',
    'Editar',
    'Eliminar',
  ];

  constructor(private configService: ConfigService) {}

  ngOnInit() {
    this.getProducts();
  }

  public getProducts() {
    this.configService.getProducts().subscribe(
      (resp: Product[]) => {
        //  console.log(resp);
        this.productDetails = resp;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
