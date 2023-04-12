import { Component, OnInit } from '@angular/core';
import { CustomerModel } from '../../../models/customer.model';
import { CustomerService } from '../../../services/customer/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  customers: CustomerModel[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.customerService
      .getCustomers()
      .subscribe((customers: CustomerModel[]) => {
        this.customers = customers;
      });
  }
}
