import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from 'src/app/platfrom/admin/voters/statistics/statistics.component';



@NgModule({
  declarations: [
    StatisticsComponent
  ],
  exports: [
    StatisticsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class StatisticsModule { }
