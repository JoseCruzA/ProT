import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { link } from 'fs';
import RRule from 'rrule';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit, OnChanges {

  @Output() close = new EventEmitter<boolean>();
  @Input() create!: boolean;
  @Input() update!: boolean;
  @Input() eventSelected!: Event;
  @Output() createEvent = new EventEmitter<any>();
  @Output() updateEvent = new EventEmitter<any>();
  event!: FormGroup;
  eventSelectedT!: Event;
  rrule = RRule;

  constructor(private formGroup: FormBuilder) {
    this.event = this.formGroup.group({
      title: new FormControl("", [
        Validators.required
      ]),
      start: new FormControl("", [
        Validators.required
      ]),
      end: new FormControl("", [
        Validators.required
      ]),
      date: new FormControl(new Date()),
      frequency: new FormControl("", [
        Validators.required
      ]),
      frequencyMonth: new FormControl([]),
      frequencyWeekDay: new FormControl([]),
      frequencyDay: new FormControl(0),
      primaryColor: new FormControl("#000000", [
        Validators.required
      ]),
      secondaryColor: new FormControl("#000000", [
        Validators.required
      ]),
      link: new FormControl("")
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: any) {
    if (changes.eventSelected?.currentValue != undefined && changes.eventSelected?.currentValue._id != null) {
      this.eventSelectedT = changes.eventSelected.currentValue;
      for (let i = 0; i < this.eventSelectedT.rrule?.bymonth.length; i++) {
        this.eventSelectedT.rrule!.bymonth[i] = `${this.eventSelectedT.rrule!.bymonth[i]}`;
      }

      for (let i = 0; i < this.eventSelectedT.rrule?.byweekday.length; i++) {
        this.eventSelectedT.rrule!.byweekday[i] = `${this.eventSelectedT.rrule!.byweekday[i]}`;
      }

      for (let i = 0; i < this.eventSelectedT.rrule?.bymonthday.length; i++) {
        this.eventSelectedT.rrule!.bymonthday[i] = `${this.eventSelectedT.rrule!.bymonthday[i]}`;
      }

      this.event.patchValue({
        title: this.eventSelectedT.name,
        start: this.eventSelectedT.sarts_at,
        end: this.eventSelectedT.end_at,
        date: this.eventSelectedT.date ? this.eventSelectedT.date : new Date(),
        frequency: this.eventSelectedT.rrule?.freq,
        frequencyMonth: this.eventSelectedT.rrule?.bymonth,
        frequencyWeekDay: this.eventSelectedT.rrule?.byweekday,
        frequencyDay: this.eventSelectedT.rrule?.bymonthday,
        primaryColor: this.eventSelectedT.color?.primary,
        secondaryColor: this.eventSelectedT.color?.secondary,
        link: this.eventSelectedT.link
      });
    }
  }

  /**
   * Method that get the form controls
   *
   * @return {*} the controls of the form
   */
  get f(): { [key: string]: AbstractControl } {
    return this.event.controls;
  }

  /**
   * Close the notitication
   */
  closeNotification() {
    if (!document.querySelector('.notification')!.classList.contains('d-none')) {
      document.querySelector('.notification')!.classList.add('d-none');
    }
  }

  /**
   * Method for send the boolean for close the login modal
   */
  closeModal() {
    this.event.reset();
    this.close.emit(false);
  }

  /**
   * Method for send the form data to create an event
   */
  onSubmit() {
    let newEvent = new Event();
    if (this.update) {
      newEvent._id = this.eventSelectedT._id;
    }
    newEvent.name = this.event.get('title')?.value;
    newEvent.sarts_at = this.event.get('start')?.value;
    newEvent.end_at = this.event.get('end')?.value;
    newEvent.date = this.event.get('date')?.value;
    newEvent.link = this.event.get('link')?.value;
    newEvent.color = {
      primary: this.event.get('primaryColor')?.value,
      secondary: this.event.get('secondaryColor')?.value,
    };
    newEvent.rrule = {
      freq: this.event.get('frequency')?.value,
      bymonth: this.event.get('frequencyMonth')?.value,
      bymonthday: this.event.get('frequencyDay')?.value,
      byweekday: this.event.get('frequencyWeekDay')?.value
    };

    for (let i = 0; i < newEvent.rrule.bymonthday.length; i++) {
      newEvent.rrule.bymonthday[i] = parseInt(newEvent.rrule.bymonthday[i]);
    }

    for (let i = 0; i < newEvent.rrule.bymonth.length; i++) {
      newEvent.rrule.bymonth[i] = parseInt(newEvent.rrule.bymonth[i]);
    }

    for (let i = 0; i < newEvent.rrule.byweekday.length; i++) {
      newEvent.rrule.byweekday[i] = parseInt(newEvent.rrule.byweekday[i]);
    }

    if (this.create) {
      this.createEvent.emit(newEvent);
    } else if (this.update) {
      this.updateEvent.emit(newEvent);
    }
  }

}
