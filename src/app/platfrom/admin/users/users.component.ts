import { Component, ViewChild } from '@angular/core';
import { DataTableComponent } from 'src/app/_shared/services/data-table/data-table.component';
import { UserService } from 'src/app/_shared/services/http/user.service';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from 'src/app/_shared/services/generic/notification.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  // @ts-ignore
  @ViewChild(DataTableComponent, { static: true }) dataTable: DataTableComponent;

  readonly columns = [
    { label: 'שם משתמש', name: 'username' , isSearchable: true },
    { label: 'מספר קלפי', name: 'ballotNumber', isSearchable: true },
  ];

  faTrash = faTrash;
  protected readonly faEdit = faEdit;

  constructor(private userService: UserService, private notification: NotificationService) {}

  fetchItems(): void {
    this.userService.getUsers(this.dataTable.criteria).then(response => {
      this.dataTable.setItems(response);
    })
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).then(() => {
      this.notification.success('משתמש נמחק בהצלחה')
      this.fetchItems();
    })
  }
}
