import { Component, Input, Output, OnDestroy, OnInit, EventEmitter, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgModel } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { PaginationData } from './classes/pagination-data';
import { DataTableCriteria } from './classes/data-table-criteria';
import { DataTableResponse } from './classes/data-table-response';
import { DataTableColumn } from './classes/data-table-column';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  animations: [
    trigger('fade', [
      state('inactive', style({
        display: 'none',
        opacity: '0',
      })),
      state('active', style({
        display: '*',
        opacity: '1',
      })),
      transition('active => inactive', animate('200ms')),
      transition('inactive => active', animate('200ms'))
    ]),
    trigger('slideToggle', [
      state('inactive', style({
        pointerEvents: 'none',
        height: '0',
        opacity: '0'
      })),
      state('active', style({
        pointerEvents: 'all',
        height: '*',
        opacity: '1'
      })),
      transition('active => inactive', animate('400ms ease-in')),
      transition('inactive => active', animate('400ms ease-in'))
    ])
  ]
})
export class DataTableComponent implements OnInit, OnDestroy {

  @HostBinding('class') class = 'data-table';

  // @ts-ignore
  @Input() tableUrl: string;
  @Input() columns: DataTableColumn[] = [];
  // @ts-ignore
  @Input() formUrl: string;
  // @ts-ignore
  @Input() activeSwitch: string;
  @Input() hasCheckColumn = true;
  @Input() disableCheckAll = false;
  @Input() hasActionsHeader = true;
  @Input() hasExtendedSearch = true;
  @Input() limit = 30;
  @Input() isSelectable = false;

  @Output() fetchItems = new EventEmitter<boolean>();
  @Output() openMultipleEdit = new EventEmitter<boolean>();

  items: any[] = [];
  sub = new Subscription();
  criteria = new DataTableCriteria();
  paginationData = new PaginationData(this.limit);
  // @ts-ignore
  isLoading: boolean;
  isActive = true;
  // @ts-ignore
  savedItem: string;
  columnLength = 0;

  constructor(protected router: Router, protected route: ActivatedRoute,
              protected dialog: MatDialog) {}

  ngOnInit() {
    this.handleSavedSearch();

    this.columnLength = this.columns.length + +this.hasCheckColumn + +this.hasActionsHeader;

    this.sub.add(this.route.queryParams.subscribe(() => this.init()));
  }

  private init(): void {
    // @ts-ignore
    this.criteria.page = (this.route.snapshot.queryParams.page) ? +this.route.snapshot.queryParams.page : 1;
    this.paginationData.currentPage = this.criteria.page;
    this.loadItems();
  }

  private handleSavedSearch() {
    // const isRoutedFromForm = this.appState.previousUrl.includes(this.tableUrl + '/form');
    // if (!isRoutedFromForm) {
    //   sessionStorage.removeItem(this.tableUrl + '_criteria');
    // }
    //
    // if (isRoutedFromForm && sessionStorage.getItem(this.tableUrl + '_criteria')) {
    //   this.criteria = JSON.parse(sessionStorage.getItem(this.tableUrl + '_criteria'));
    // }
  }

  loadItems(): void {
    // this.appState.setPageSpinner(true);
    this.isLoading = true;
    this.fetchItems.emit(this.isActive);
  }

  setItems(response: DataTableResponse): void {
    // this.appState.setPageSpinner(false);
    this.isLoading = false;

    this.paginationData.totalItems = response && response.total ? response.total : 0;
    this.paginationData.totalPages = response && response.lastPage ? response.lastPage : 0;
    this.items = response && response.items ? response.items : [];

    // this.items.map((item: { id: number, checked: boolean }) => {
    //   item.checked = this.criteria.isCheckAll;
    //   this.criteria.checkedItems.forEach(checkedItem => {
    //     if (checkedItem.id === item.id) {
    //       item.checked = !this.criteria.isCheckAll;
    //     }
    //   });
    // });
  }

  // @ts-ignore
  searchFilters(event) {
    Object.entries(event).forEach(([key, value]) => {
      // @ts-ignore
      this.criteria.filters[key] = value;
      console.log(key)
      console.log(value)

    });
    // @ts-ignore
    this.search();
  }

  search(keyword?: string, event?: KeyboardEvent): void {
    if (((event && (event.code === 'Enter' || event.code === 'NumpadEnter')) || !event) && !this.isLoading) {
      this.columns.forEach((col, value) => {
        if (col.isSearchable) {
          // @ts-ignore
          this.criteria[col] = 'sdf';
          console.log(col)
        }
      })

      this.criteria.keyword = keyword ?? '';
      this.loadItems();


      console.log(this.criteria)
      sessionStorage.setItem(this.tableUrl + '_criteria', JSON.stringify(this.criteria));
    }
  }

  resetSearch(searchInput: NgModel): void {
    searchInput.reset();
    if (this.criteria.keyword) {
      this.criteria.keyword = '';
      this.loadItems();
    }

    sessionStorage.setItem(this.tableUrl + '_criteria', JSON.stringify(this.criteria));
  }

  resetSearchFilters(): void {
    this.criteria.filters = {};
    this.search()
  }

  criteriaChange() {
    sessionStorage.setItem(this.tableUrl + '_criteria', JSON.stringify(this.criteria));

    this.loadItems();
  }

  sort(column: DataTableColumn , dir: 'asc' | 'desc'): void {
    this.criteria.sort.column = column.name;
    this.criteria.sort.direction = dir;

    sessionStorage.setItem(this.tableUrl + '_criteria', JSON.stringify(this.criteria));

    this.loadItems();
  }

  checkAll(isChecked: boolean): void {
    this.criteria.isCheckAll = isChecked;

    this.criteria.checkedItems = [];

    this.items.forEach((item: any) => {
      item.checked = isChecked;
      if (isChecked) {
        this.criteria.checkedItems.push(item);
      }
    });

    sessionStorage.setItem(this.tableUrl + '_criteria', JSON.stringify(this.criteria));
  }

  checkItem(item: any, isChecked: boolean): void {
    item.checked = isChecked;
    if (item.checked) {
      this.criteria.checkedItems.push(item);
    } else {
      this.criteria.isCheckAll = false;
      this.removeFromCheckedItemsList(item);
    }

    sessionStorage.setItem(this.tableUrl + '_criteria', JSON.stringify(this.criteria));
  }

  private removeFromCheckedItemsList(item: any): void {
    this.criteria.checkedItems.some((checkedItem, index) => {
      if (checkedItem.id === item.id) {
        this.criteria.checkedItems.splice(+index, 1);
        return true;
      }

      return false;
    });
  }

  toggleActiveStatus(isActive: boolean): void {
    this.isActive = isActive;
    this.criteria.checkedItems = [];
    this.criteria.isCheckAll = false;
    this.loadItems();
  }

  get hasItems(): boolean {
    return this.items.length > 0;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
