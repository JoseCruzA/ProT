import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Campaign } from 'src/app/models/campaign.model';
import { TrafficService } from 'src/app/services/traffic.service';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css']
})
export class CreateCampaignComponent implements OnInit {

  @Output() close = new EventEmitter<boolean>();
  @Input() token!: string;
  @Input() selectedLanguage!: string;
  campaign!: FormGroup;
  newCampaign: Campaign = new Campaign();
  errors: string[] = [];

  constructor(private formGroup: FormBuilder, private trafficService: TrafficService) {
    this.campaign = this.formGroup.group({
      name: new FormControl("", [
        Validators.required,
      ])
    });
  }

  ngOnInit(): void {

  }

  /**
   * Method that get the form controls
   *
   * @return {*} the controls of the form
   */
  get f(): { [key: string]: AbstractControl } {
    return this.campaign.controls;
  }

  /**
   * Method for send the boolean for close the login modal
   */
  closeModal() {
    this.close.emit(true);
  }

  /**
   * Method for send the form data to login user
   */
  onSubmit() {
    this.errors = [];
    this.newCampaign.name = this.campaign.get('name')?.value;

    this.trafficService.newCampaign(this.token, this.newCampaign).subscribe((response) => {
      this.campaign.reset();
      this.closeModal();
    }, (error) => {
      if (error.error.code && error.error.code == 11000) {
        if (!this.errors.includes('errors.exist-campaign')) {
          this.errors.push('errors.exist-campaign');
        }
      } else if (error.error.errors) {
        for (let err of Object.keys(error.error.errors)) {
          if (!this.errors.includes('errors.campaign-required')) {
            this.errors.push('errors.campaign-required');
          }
        }
      }
    });
  }

}
