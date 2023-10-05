import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from 'src/app/platfrom/admin/users/form/form.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/app/_shared/services/http/user.service';

const routes: Routes = [
  {
    path: '',
    component: FormComponent,
  }
]

@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
  ],
  providers: [UserService]
})
export class FormModule {}
