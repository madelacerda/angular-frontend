import { Component } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ConfigService } from '../../../services/config/config.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalService } from '../../../services/common/modal.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductEditComponent } from '../product-edit/product-edit.component';

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

  constructor(
    private configService: ConfigService,
    private modalService: ModalService,
    private dialogRef: MatDialog
  ) {}

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

  public deleteProduct(productId: any) {
    this.modalService.confirm().subscribe((confirm) => {
      if (confirm) {
        this.configService.deleteProduct(productId).subscribe(
          (resp: any) => {
            this.getProducts();
          },
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        );
      }
    });
  }

  public editProductDetails(data: any) {
    console.log(data);
    const modal = this.dialogRef.open(ProductEditComponent);
    modal.componentInstance.product = data;
  }

  openDialog() {
    this.dialogRef.closeAll();
    this.dialogRef.open(ProductEditComponent);
  }
}
