import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataTableComponent } from 'src/app/_shared/services/data-table/data-table.component';

import { VoterService } from 'src/app/_shared/services/http/voter.service';

import { StanceSelect, VotedSelect } from 'src/app/_shared/models/voter.model';

@Component({
  selector: 'app-users',
  templateUrl: './voters.component.html',
  styleUrls: ['./voters.component.css']
})
export class VotersComponent {
  // @ts-ignore
  @ViewChild(DataTableComponent, { static: true }) dataTable: DataTableComponent;

  readonly columns = [
    { label: 'מספר סידורי', name: 'serialNumber' , isSearchable: true },
    { label: 'מספר זהות', name: 'IDNumber', isSearchable: true },
    { label: 'שם משפחה', name: 'lastName' , isSearchable: true },
    { label: 'שם פרטי', name: 'firstName' , isSearchable: true },
    { label: 'שם אב', name: 'fatherName' , isSearchable: true },
    { label: 'מספר קלפי', name: 'ballotNumber' , isSearchable: true },
    { label: 'הצביע', name: 'isVoted' , isSearchable: true , searchOptions: VotedSelect },
    { label: 'עמדה', name: 'stance' , isSearchable: true , searchOptions: StanceSelect},
    { label: 'מפנה', name: 'referrer', isSearchable: true },
    { label: 'הערות', name: 'comments', isSearchable: true }
  ];

  stats: any;

  constructor(private route: ActivatedRoute,
              private userService: VoterService) {}

  ngOnInit(): void {
    // @ts-ignore
    this.stats = this.route.snapshot.data.stats;
  }

  // @ts-ignore
  updateVoter(fieldType: string, field: string, userId: string) {
    const fieldToUpdate = {};
    // @ts-ignore
    fieldToUpdate[fieldType] = field;

    this.userService.updateVoter(userId, fieldToUpdate).then(() => {
      this.fetchItems();
      this.setStats();
    })
  }

  getStanceClass(stance: string): string {
    switch (stance) {
      case 'supporter':
        return 'green';
      case 'opponent':
        return 'red';
      case 'undecided':
        return 'yellow';
      case 'abstainer':
        return 'grey';
      default:
        return '';
    }
  }

  setStats(): void {
    this.userService.getStats().then(response => {
      this.stats = response;
    })
  }

  fetchItems(): void {
    this.userService.getVoters(this.dataTable.criteria).then(response => {
      this.dataTable.setItems(response);
    })
  }

  protected readonly StanceSelect = StanceSelect;
  protected readonly VotedSelect = VotedSelect;
}
