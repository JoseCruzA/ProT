import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.css']
})
export class WhatsappComponent implements OnInit, OnChanges {

  @Input() user!: User;
  userT!: User;
  uri = "https://api.whatsapp.com/send?phone={phone}&text=Hola, me gustaría tener más información sobre Royal Green.";

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any) {
    if (changes.user?.currentValue != undefined) {
      this.userT = changes.user.currentValue;
      this.uri = this.uri.replace("{phone}", `${this.userT.contact.phone.code}${this.userT.contact.phone.number}`);
    }
  }

}
