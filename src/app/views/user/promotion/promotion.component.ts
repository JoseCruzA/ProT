import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit, OnChanges {

  @Input() user!: User;
  @Input() token!: String;
  tokenT!: string;
  userT!: User;
  defaultLink!: string;
  createLink!: FormGroup;
  newLink!: string;

  constructor(private formGroup: FormBuilder) {
    this.createLink = this.formGroup.group({
      campaign: new FormControl(""),
      link: new FormControl("", [
        Validators.required
      ])
    });
  }

  ngOnInit(): void {
    this.defaultLink = window.location.protocol + '//' + window.location.hostname + '/landing/ref/';
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

  onSubmit() {
    let campaign = this.createLink.get('campaign')?.value;
    this.newLink = this.createLink.get('link')?.value + '/ref/' + this.userT.username + (campaign != '' ? '/camp/' + campaign : '');
  }

}
