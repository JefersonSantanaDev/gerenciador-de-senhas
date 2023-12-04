import { Component } from '@angular/core';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css'],
})
export class SiteListComponent {
  allSites!: Observable<Array<any>>;

  siteName!: string;
  siteURL!: string;
  siteImgURL!: string;
  siteId!: string;

  formState: string = 'Add Novo';

  isSuccess: boolean = false;
  successMessage!: string;

  constructor(private passwordManagerService: PasswordManagerService) {
    this.loadSites();
  }

  showAlert(message: string) {
    this.isSuccess = true;
    this.successMessage = message;
  }

  onSubmit(values: object) {
    if (this.formState == 'Add New') {
      this.passwordManagerService
        .addSite(values)
        .then(() => {
          this.showAlert('Data Saved Successfully');
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (this.formState == 'Edit') {
      this.passwordManagerService
        .updateSite(this.siteId, values)
        .then(() => {
          this.showAlert('Data Edited Successfully');
        })

        .catch((err) => {
          console.log(err);
        });
    }
  }

  loadSites() {
    this.allSites = this.passwordManagerService.loadSites();
  }

  editSite(siteName: string, siteURL: string, siteImgURL: string, id: string) {
    this.siteName = siteName;
    this.siteURL = siteURL;
    this.siteImgURL = siteImgURL;
    this.siteId = id;

    this.formState = 'Edit';
  }

  deleteSite(id: string) {
    this.passwordManagerService
      .deleteSite(id)
      .then(() => {
        this.showAlert('Data Deleted Successfullly');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
