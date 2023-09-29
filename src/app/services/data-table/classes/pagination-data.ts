export class PaginationData {
  // @ts-ignore
  totalPages: number;
  // @ts-ignore
  totalItems: number;
  limit?: number;
  currentPage: number;
  url?: string | false;

  constructor(limit?: number, currentPage?: number) {
    this.limit = limit ? limit : 30;
    this.currentPage = currentPage ? currentPage : 1;
  }
}
