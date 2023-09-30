import { Component, Input, Renderer2 } from '@angular/core';

import { PaginationData } from '../classes/pagination-data';

@Component({
	selector: 'app-pagination',
	templateUrl: './pagination.component.html',
	styleUrls: [ './pagination.component.css']
})
export class PaginationComponent {

  constructor(private renderer: Renderer2) {}

	// @ts-ignore
  @Input() data: PaginationData;

	getCurrentItems(): number {
		// @ts-ignore
    const current = ((this.data.currentPage - 1) * this.data.limit) + 1;
		if (current === 1) {
			return 1;
		}

		return current;
	}

	getMaxShownItems(): number {
    if (!this.data) {
      return 0;
    }

		// @ts-ignore
    const max = this.data.currentPage * this.data.limit;

		if (this.data.totalItems < max) {
			return this.data.totalItems;
		}

	 	return max;
	}

  scrollToTop() {
    this.renderer.setProperty(document.documentElement, 'scrollTop', 0);
  }
}
