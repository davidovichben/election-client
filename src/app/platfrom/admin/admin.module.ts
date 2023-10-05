import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from 'src/app/platfrom/admin/admin.component';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AdminGuard } from 'src/app/_shared/guards/admin.guard';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const routes: Routes = [
  { path: '', component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/platfrom/admin/voters/voters.module').then(m => m.VotersModule)
      },
      {
        path: 'users',
        loadChildren: () => import('src/app/platfrom/admin/users/users.module').then(m => m.UsersModule)
      },
    ]
  },
];

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    MatButtonModule,
    MatToolbarModule,
    RouterModule.forChild(routes),
    FontAwesomeModule
  ]
})
export class AdminModule { }
