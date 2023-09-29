import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { NgxFileDropModule } from 'ngx-file-drop';
import {FileUploadComponent} from "./file-upload.component";
import {RouterModule, Routes} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {ClientFileService} from "../../http/services/client-file.service";

const routes: Routes = [
  {
    path: '',
    component: FileUploadComponent,
  }
]

@NgModule({
  declarations: [FileUploadComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    NgxFileDropModule,
    RouterModule.forChild(routes),
    MatInputModule,
    FormsModule,
  ],
  exports: [FileUploadComponent],
  providers: [ClientFileService]
})
export class FileUploadModule {}
