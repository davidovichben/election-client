import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';

import { DataTableComponent } from 'src/app/_shared/services/data-table/data-table.component';
import { PaginationComponent } from 'src/app/_shared/services/data-table/pagination/pagination.component';
import { MatMenuModule } from '@angular/material/menu';
import {SideFiltersComponent} from "src/app/_shared/services/data-table/side-filters/side-filters.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatButtonModule,
    MatSlideToggleModule, MatMenuModule, MatIconModule, FontAwesomeModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule,
    MatTooltipModule, MatButtonModule, MatMenuModule, MatIconModule,
    PaginationComponent,
    DataTableComponent,
  ],
    declarations: [DataTableComponent, PaginationComponent, SideFiltersComponent],
})
export class DataTableModule {}
