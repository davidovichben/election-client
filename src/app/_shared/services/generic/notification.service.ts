import { Injectable } from "@angular/core";
import Swal from 'sweetalert2';


@Injectable()
export class NotificationService {
  public success(title: string, text?: string, extraOptions?: object): void {

    let options = {
      position: 'center',
      type: 'success',
      title,
      text: text ? text : '',
      confirmButtonText: 'אישור',
      timer: 2500
    };

    if (extraOptions) {
      options = Object.assign(options, extraOptions);
    }

    // @ts-ignore
    Swal.fire(options);
  }

  public error(text?: string, title?: string, extraOptions?: object): void {
    let options = {
      type: 'error',
      title: title ? title : 'אירעה שגיאה',
      text,
      confirmButtonText: 'סגור'
    };

    if (extraOptions) {
      options = Object.assign(options, extraOptions);
    }

    Swal.fire(options);
  }

  public warning(title?: string, text?: string, extraOptions?: object): Promise<any> {
    let options = {
      title: title ? title : 'האם אתה בטוח?',
      text: text ? text : '',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'אישור',
      cancelButtonText: 'ביטול'
    };

    if (extraOptions) {
      options = Object.assign(options, extraOptions);
    }

    return Swal.fire(options);
  }

  public info(title: string, text?: string, extraOptions?: object): Promise<any> {
    let options = {
      title,
      text: text ? text : '',
      type: 'info',
      showCancelButton: true,
      confirmButtonText: 'אישור',
      cancelButtonText: 'ביטול'
    };

    if (extraOptions) {
      options = Object.assign(options, extraOptions);
    }

    return Swal.fire(options);
  }

  public serverError(): void {
    return this.error('שגיאת שרת, נסה שנית או צור קשר.');
  }
}
