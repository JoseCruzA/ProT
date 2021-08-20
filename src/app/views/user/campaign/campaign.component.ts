import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { TrafficService } from 'src/app/services/traffic.service';
import { Campaign } from 'src/app/models/campaign.model';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {

  @Input() user!: User;
  @Input() token!: string;
  @Output() refresh = new EventEmitter<void>();
  userT!: User;
  tokenT!: string;
  campaign!: Campaign;
  selectedLanguage!: string;
  create: boolean = false;
  delete: boolean = false;
  options: DataTables.Settings = {};

  constructor(private trafficService: TrafficService) {}

  ngOnInit(): void {
    let lang = window.navigator.language || navigator.language;
    this.selectedLanguage = lang.split("-")[0];

    if (this.selectedLanguage == 'es') {
      this.options = {
        pagingType: 'full_numbers',
        language: {
          url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
        }
      }
    } else {
      this.options = {
        pagingType: 'full_numbers'
      }
    }
  }

  ngOnChanges(changes: any) {
    // Get the changesof each variable for can store it out of the subscribe
    if (changes.token?.currentValue != undefined) {
      this.tokenT = changes.token.currentValue;
    }

    if (changes.user?.currentValue != undefined) {
      this.userT = changes.user.currentValue;
    }
  }

  /**
   * Method for select a user to delete o edit
   *
   * @param {User} user the user selected
   * @param {string} type the type of the selection
   */
  selectCampaign(campaign: Campaign) {
    this.campaign = campaign;
    this.delete = true;
  }

  /**
   * Method for delete a existent user
   *
   * @param {String} user the user id
   */
  deleteCampaign(campaign: String) {
    this.trafficService.deleteCampaign(this.tokenT, campaign).subscribe((response: any) => {
      this.refreshUser(true);
    });
    this.delete = false;
  }

  /**
   * Close the create or update modal
   */
  close(value: boolean) {
    if (this.create) {
      this.create = false;
    } else if (this.delete) {
      this.delete = false;
    }
    this.refreshUser(true);
  }

  /**
   * Refresh the users view
   */
  refreshUser(value: boolean) {
    this.refresh.emit();
  }

}
