import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataTableComponent } from 'src/app/services/data-table/data-table.component';

import { UserService } from 'src/app/http/services/user.service';

import { StanceSelect, VotedSelect } from 'src/app/models/user.model';
import { VoterFileService } from 'src/app/http/services/voter-file.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
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


  protected readonly StanceSelect = StanceSelect;
  protected readonly VotedSelect = VotedSelect;

  constructor(private route: ActivatedRoute, private voterFileService: VoterFileService,
              private userService: UserService) {}

  ngOnInit(): void {
    // @ts-ignore
    this.stats = this.route.snapshot.data.stats;
  }

  // @ts-ignore
  updateUser(fieldType: string, field: string, userId: string) {
    const fieldToUpdate = {};
    // @ts-ignore
    fieldToUpdate[fieldType] = field;

    this.userService.updateUser(userId, fieldToUpdate).then(() => {
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
    this.userService.getUsers(this.dataTable.criteria).then(response => {
      this.dataTable.setItems(response);
    })
  }

  exportVoters() {
    this.voterFileService.exportVotersExcel()
      .then((file: File | null) => {
        if (file) {
          const blobUrl = URL.createObjectURL(file);

          const a = document.createElement('a');
          a.href = blobUrl;
          a.download = 'voters.xlsx';
          a.click();
          URL.revokeObjectURL(blobUrl);
        } else {
          console.error('Export failed or returned null.');
        }
      })
      .catch((error) => {
        console.error('Export error:', error);
      });
  }
}
