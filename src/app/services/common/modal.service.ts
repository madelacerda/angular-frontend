import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor() {}

  success(body = 'Operación realizada con éxito') {
    Swal.fire({
      icon: 'success',
      text: body,
    });
  }

  error(body = 'Error interno') {
    Swal.fire({
      icon: 'error',
      text: body,
    });
  }

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
