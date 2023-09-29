import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {UserService} from "../../http/services/user.service";


const routes: Routes = [
  {
    path: '',
    component: FormComponent,
  }
]

@NgModule({
  declarations: [
    FormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  providers: [UserService]
})
export class FormModule { }
