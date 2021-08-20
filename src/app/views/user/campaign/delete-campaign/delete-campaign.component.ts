import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Campaign } from 'src/app/models/campaign.model';

@Component({
  selector: 'app-delete-campaign',
  templateUrl: './delete-campaign.component.html',
  styleUrls: ['./delete-campaign.component.css']
})
export class DeleteCampaignComponent implements OnInit {

  @Output() close = new EventEmitter<boolean>();
  @Output() deleteCampaign = new EventEmitter<String>();
  @Input() campaign!: Campaign;
  @Input() selectedLanguage!: string;

  constructor() { }

  ngOnInit(): void {
  }

  goToDelete() {
    this.deleteCampaign.emit(this.campaign._id);
  }

  /**
   * Method for close a modal
   */
  closeModal() {
    this.close.emit(true);
  }

}
