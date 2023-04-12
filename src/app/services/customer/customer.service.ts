import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CustomerModel } from '../../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  customerURL = 'http://localhost:8080/customer/';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<CustomerModel[]> {
    return this.http.get<CustomerModel[]>(this.customerURL).pipe(
      map((customers) => customers as CustomerModel[]),
      catchError((err) => {
        console.error(err);
        return of([]);
      })
    );
  }

  public addCustomer(customer: CustomerModel) {
    return this.http.post<CustomerModel>(`${this.customerURL}`, customer);
  }
}
