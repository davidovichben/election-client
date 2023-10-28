import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { DataTableColumn } from 'src/app/_shared/services/data-table/classes/data-table-column';

@Component({
  selector: 'app-side-filters',
  templateUrl: './side-filters.component.html',
  styleUrls: ['./side-filters.component.css']
})
export class SideFiltersComponent implements OnInit {

  // @ts-ignore
  @ViewChild('form', { static: false }) form: NgForm;

  // @ts-ignore
  @Input() columns: DataTableColumn[];

  @Output() searchSubmitted = new EventEmitter<object>();
  @Output() resetValues = new EventEmitter<object>();

  ngOnInit() {
    this.columns = this.columns.filter(column => column.isSearchable);
  }

  search(): void {
    const values = {};

    for (const i in this.form.value) {
      if (this.form.value[i] || this.form.value[i] == '') {
        // @ts-ignore
        values[i] = this.form.value[i];
      }
    }

    this.searchSubmitted.emit(values);
  }

  reset(): void {
    this.form.reset();
    this.search();

    this.searchSubmitted.emit([]);
    this.resetValues.emit();
  }
}
