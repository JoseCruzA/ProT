import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.css']
})
export class DeleteEventComponent implements OnInit {

  @Output() close = new EventEmitter<boolean>();
  @Output() deleteEvent = new EventEmitter<String>();
  @Input() event!: Event;
  @Input() selectedLanguage!: string;

  constructor() { }

  ngOnInit(): void {
  }

  goToDelete() {
    this.deleteEvent.emit(this.event._id);
  }

  /**
   * Method for close a modal
   */
  closeModal() {
    this.close.emit(true);
  }

}
