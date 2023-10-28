export class DataTableCriteria {
	sort: any[];
	filters: object;
	page: number;
	// @ts-ignore
  keyword: string;
	// @ts-ignore
  isCheckAll: boolean;
	checkedItems: any[];

	constructor() {
		this.filters = {};
		this.page = 1;
		this.sort = [];
		this.checkedItems = [];
	}
}
