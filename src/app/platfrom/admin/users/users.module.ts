import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from 'src/app/platfrom/admin/users/users.component';
import { RouterModule, Routes } from '@angular/router';
import { DataTableModule } from 'src/app/_shared/services/data-table/data-table.module';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { StatisticsModule } from 'src/app/platfrom/admin/voters/statistics/statistics.module';
import { UserService } from 'src/app/_shared/services/http/user.service';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const routes: Routes = [
  { path: '', component: UsersComponent },
  {
    path: 'form',
    loadChildren: () => import('src/app/platfrom/admin/users/form/form.module').then(m => m.FormModule)
  },
];

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DataTableModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    StatisticsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [UserService]
})
export class UsersModule { }
