export class DataTableCriteria {
	sort: { column?: string, direction?: 'asc' | 'desc' };
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
		this.sort = {};
		this.checkedItems = [];
	}
}
