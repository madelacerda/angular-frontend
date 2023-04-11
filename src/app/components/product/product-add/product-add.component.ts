import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../services/config/config.service';
import { ModalService } from '../../../services/common/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private productService: ConfigService,
    private fb: FormBuilder,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  onSubmit() {
    const body = 'Quieres agregar este producto';
    this.modalService.confirm(body).subscribe((confirm) => {
      if (confirm) {
        this.productService.addProduct(this.productForm.value).subscribe(
          () => {
            this.modalService.success('El producto se guardo correctamente');
            this.revert();
          },
          (error) => {
            this.modalService.error();
          }
        );
      }
    });
  }

  revert() {
    this.productForm.reset();
  }

  private createForm() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      precio: [0, [Validators.required, Validators.min(1)]],
      sku: ['', [Validators.required]],
    });
  }
}
