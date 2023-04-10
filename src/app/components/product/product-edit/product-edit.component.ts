import { Component } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ConfigService } from '../../../services/config/config.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../../../services/common/modal.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent {
  product: Product = {
    id: 0,
    name: '',
    price: 0,
    sku: '',
  };

  productForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    precio: new FormControl(),
    sku: new FormControl(),
  });

  constructor(
    private productService: ConfigService,
    private dialogRef: MatDialog,
    private fb: FormBuilder,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.productForm = this.fb.group({
      id: this.product.id,
      name: this.product.name,
      precio: this.product.price,
      sku: this.product.sku,
    });
  }

  ngOnChanges() {
    this.productForm.reset({
      id: 0,
      name: '',
      precio: 0,
      sku: '',
    });
  }

  onSubmit() {
    const body = 'Quieres agregar este producto';
    this.modalService.confirm(body).subscribe((confirm) => {
      if (confirm) {
        this.product = this.prepareSaveProduct();
        console.log(this.prepareSaveProduct());
        this.productService
          .editProduct(this.product.id, this.product)
          .subscribe();
        this.dialogRef.closeAll();
      }
    });
  }

  prepareSaveProduct(): Product {
    const formModel = this.productForm.value;
    return {
      id: formModel.id as number,
      name: formModel.name as string,
      price: formModel.precio,
      sku: formModel.sku,
    };
  }

  revert() {
    this.ngOnChanges();
  }
}
