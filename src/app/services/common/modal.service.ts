import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor() {}

  confirm(body = '¿Estas seguro/a?') {
    return new Observable((observer) => {
      Swal.fire({
        title: 'Confirmar',
        icon: 'question',
        text: body,
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          observer.next(true);
        } else {
          observer.next(false);
        }
        observer.complete();
      });
    });
  }
}
