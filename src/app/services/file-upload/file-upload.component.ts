import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import {NgForm} from "@angular/forms";
import {ClientFileService} from "../../http/services/client-file.service";

// import { NotificationService } from 'src/app/shared/_services/generic/notification.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

  @Input() validExtensions = ['text', 'jpg', 'jpeg', 'png', 'xlsx', 'xls', 'doc', 'docx', 'csv', 'pdf'];

  success: boolean = false;
  isDialog = false;

  @Output() upload = new EventEmitter<File>();
  @Output() cancelled = new EventEmitter<boolean>();

  // @ts-ignore
  file: File;

  constructor(private clientFileService: ClientFileService) {}

  fileDropped(files: NgxFileDropEntry[]): void {
    this.success = false;

    const droppedFile = files[0];

    const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
    fileEntry.file((file: File) =>  {
      if (this.validateFileType(file)) {
        // this.notification.error('קובץ לא חוקי');
      } else {
        this.file = file;
      }
    });
  }

  validateFileType(file: File): boolean {
    const fileExtension = file.name.split('.').pop();
    return this.validExtensions.indexOf(<string>fileExtension) === -1;
  }

  submit(file: File, form: NgForm): void {
    this.success = false;
    if (form.valid && file) {
      this.clientFileService.uploadClientFile(file, form.value).then(response => {
        this.success = true;

        if (response) {
          console.log(response)
         this.success = true;
        }
      });
    }
  }
}
