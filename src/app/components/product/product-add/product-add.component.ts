import { Component } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ConfigService } from '../../../services/config/config.service';
import { ModalService } from '../../../services/common/modal.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent {
  product: Product = {
    name: '',
    price: 0,
    sku: '',
  };

  productForm = new FormGroup({
    name: new FormControl(),
    precio: new FormControl(),
    sku: new FormControl(),
  });

  constructor(
    private productService: ConfigService,
    private fb: FormBuilder,
    private modalService: ModalService
  ) {
    this.createForm();
  }

  createForm() {
    this.productForm = this.fb.group({
      name: '',
      precio: 0,
      sku: '',
    });
  }

  ngOnChanges() {
    this.productForm.reset({
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
        this.productService.addProduct(this.product).subscribe();
        this.ngOnChanges();
        this.revert();
      }
    });
  }

  prepareSaveProduct(): Product {
    const formModel = this.productForm.value;
    return {
      name: formModel.name as string,
      price: formModel.precio,
      sku: formModel.sku,
    };
  }

  revert() {
    this.ngOnChanges();
  }
}
