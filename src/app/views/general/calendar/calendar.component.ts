import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { CalendarDayViewBeforeRenderEvent, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarMonthViewBeforeRenderEvent, CalendarView, CalendarWeekViewBeforeRenderEvent } from 'angular-calendar';
import { differenceInMinutes, endOfDay, isSameDay, isSameMonth, startOfDay, startOfHour } from 'date-fns';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Event } from 'src/app/models/event.model';
import RRule from 'rrule';
import { ViewPeriod } from 'calendar-utils';
import * as moment from 'moment-timezone';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { RecurringEvent } from 'src/app/interfaces/recurring-event';

moment.tz.setDefault('Utc');

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() selectedLanguage!: string;
  @Input() showType!: boolean;
  @Input() showTitle!: boolean;
  @Input() calendarType!: string;
  @Input() showButton: boolean = false;
  @Input() token!: string;
  @Input() user!: User;
  @Input() canCreate!: boolean;
  @Input() canUpdate!: boolean;
  @Input() canDelete!: boolean;
  userT!: User;
  daysInWeek = 7;
  view!: CalendarView;
  CalendarView = CalendarView;
  viewDate = moment().toDate();
  viewPeriod!: ViewPeriod;
  create: boolean = false;
  update: boolean = false;
  delete: boolean = false;
  eventSelected!: Event;
  myEvents!: Event[];
  actions: CalendarEventAction[] = [];
  refresh: Subject<any> = new Subject();
  activeDayIsOpen: boolean = true;
  events: CalendarEvent[] = [];
  recurringEvents: RecurringEvent[] = []; /*[
    {
      title: 'Historias de éxito',
      color: colors.blue,
      start: "21:00:00",
      end: "22:00:00",
      rrule: {
        freq: RRule.WEEKLY,
        byweekday: [RRule.MO]
      },
      meta: {
        link: "https://bit.ly/zoomroyalgreen"
      }
    }
  ];*/

  constructor(private cdr: ChangeDetectorRef, private breakpointObserver: BreakpointObserver, private eventService: EventService, private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    switch (this.calendarType) {
      case 'day':
        this.view = CalendarView.Day;
        break;
      case 'week':
        this.view = CalendarView.Week;
        break;
      default:
        this.view = CalendarView.Month;
        break;
    }
    this.responsiveCalendar();
  }

  ngAfterViewInit(): void {
    this.scrollToCurrentView();
  }

  ngOnChanges(changes: any) {
    if (changes.user?.currentValue != undefined) {
      this.userT = changes.user.currentValue;
    }

    if (changes.canUpdate?.currentValue != undefined) {
      if (changes.canUpdate.currentValue) {
        this.actions.push({
          label: '<i class="fas fa-fw fa-pencil-alt has-text-white"></i>',
          a11yLabel: 'Edit',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            this.eventSelected = this.myEvents.filter(myEvent => myEvent._id == event.meta.id)[0];
            this.update = true;
          },
        });
      }
    }

    if (changes.canDelete?.currentValue != undefined) {
      if (changes.canDelete.currentValue) {
        this.actions.push({
          label: '<i class="fas fa-fw fa-trash-alt has-text-white"></i>',
          a11yLabel: 'Delete',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            this.eventSelected = this.myEvents.filter(myEvent => myEvent._id == event.meta.id)[0];
            this.delete = true;
          }
        });
      }
    }
  }

  /**
   * Method that make again the scroll and detect the changes
   * when the calendar type is changed
   */
  viewChanged() {
    this.cdr.detectChanges();
    this.scrollToCurrentView();
  }

  /**
   * Method that calculate the data to show according to
   * the page size
   */
  responsiveCalendar() {
    const CALENDAR_RESPONSIVE = {
      small: {
        breakpoint: '(max-width: 576px)',
        daysInWeek: 2,
      },
      medium: {
        breakpoint: '(max-width: 768px)',
        daysInWeek: 3,
      },
      large: {
        breakpoint: '(max-width: 960px)',
        daysInWeek: 5,
      },
    };

    this.breakpointObserver
      .observe(
        Object.values(CALENDAR_RESPONSIVE).map(({ breakpoint }) => breakpoint)
      )
      .pipe(takeUntil(this.refresh))
      .subscribe((state: BreakpointState) => {
        const foundBreakpoint = Object.values(CALENDAR_RESPONSIVE).find(
          ({ breakpoint }) => !!state.breakpoints[breakpoint]
        );
        if (foundBreakpoint) {
          this.daysInWeek = foundBreakpoint.daysInWeek;
        } else {
          this.daysInWeek = 7;
        }
        this.cdr.markForCheck();
      });
  }

  /**
   * Method that make scroll into the calendar for the current time
   */
  private scrollToCurrentView() {
    if (this.view === CalendarView.Week || this.view === CalendarView.Day) {
      const minutesSinceStartOfDay = differenceInMinutes(
        startOfHour(new Date()),
        new Date(new Date().setHours(8, 0, 0))
      );
      document.querySelector<HTMLElement>('.cal-time-events')!.scrollTop = minutesSinceStartOfDay;
    }
  }

  /**
   * Method for update all events in the calendar
   */
  updateCalendarEvents(
    viewRender:
      | CalendarMonthViewBeforeRenderEvent
      | CalendarWeekViewBeforeRenderEvent
      | CalendarDayViewBeforeRenderEvent
  ): void {
    this.eventService.getEvents().subscribe((events: Event[]) => {
      localStorage.setItem('allEvents', JSON.stringify(events));
      let allEvents: RecurringEvent[] = [];

      events.forEach(event => {
        allEvents.push({
          title: event.name,
          start: event.sarts_at,
          end: event.end_at,
          date: event.date,
          color: event.color,
          rrule: {
            freq: event.rrule?.freq,
            byweekday: event.rrule?.byweekday
          },
          meta: {
            id: event._id,
            link: event.link
          }
        });
      });

      localStorage.setItem('events', JSON.stringify(allEvents));
    });

    setTimeout(() => {
      this.recurringEvents = JSON.parse(localStorage.getItem('events')!);
      this.myEvents = JSON.parse(localStorage.getItem('allEvents')!);

      if (!this.viewPeriod || !moment(this.viewPeriod.start).isSame(viewRender.period.start)
        || !moment(this.viewPeriod.end).isSame(viewRender.period.end)) {

        this.viewPeriod = viewRender.period;
        this.events = [];

        this.recurringEvents.forEach((event) => {
          if (event.rrule?.freq != 4) {
            const rule: RRule = new RRule({
              ...event.rrule,
              dtstart: moment(viewRender.period.start).startOf('day').toDate(),
              until: moment(viewRender.period.end).endOf('day').toDate()
            });
            const { title, color, meta } = event;
            let start = new Date(new Date().getFullYear + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + event.start);
            let end = new Date(new Date().getFullYear + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + event.end);
            rule.all().forEach((date) => {
              this.events.push({
                title,
                color,
                start: new Date(moment(date).toDate().setHours(start.getHours())),
                end: new Date(moment(date).toDate().setHours(end.getHours())),
                meta,
                actions: this.actions
              });
            });
          } else {
            const { title, color, meta, date } = event;
            let start = new Date(new Date().getFullYear + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + event.start);
            let end = new Date(new Date().getFullYear + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + event.end);
            this.events.push({
              title,
              color,
              start: new Date(new Date(moment(date).toDate().setHours(start.getHours())).setDate(moment(date).toDate().getDate() + 1)),
              end: new Date(new Date(moment(date).toDate().setHours(end.getHours())).setDate(moment(date).toDate().getDate() + 1)),
              meta,
              actions: this.actions
            });
          }
        });

        this.cdr.detectChanges();
      }
    }, 1000);
  }

  /**
   * Method that get when a date is touched in the calendar
   *
   * @param {*} { date, events } the object with the info of the date selected and its events
   */
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  /**
   * Method that get when an event is dragged
   *
   * @param param0 the info of the event
   */
  eventTimesChanged({event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
  }

  /**
   * Method charged of select the action to make
   *
   * @param event the event
   * @returns {void}
   */
  eventClicked({ event }: { event: CalendarEvent }): void {
    window.open(event.meta.link, "_blank");
  }


  /**
   * Method charged to delete an event
   *
   * @param {String} event the event id
   */
  deleteEvent(event: String) {
    this.eventService.deleteEvent(this.token, event).subscribe((response: any) => {
      location.reload();
    }, (err: any) => {
      console.log(err);
    });

    this.delete = false;
    this.eventSelected = new Event();
  }

  /**
   * Method charged to create a new event
   *
   * @param {any} event the event to create
   */
  createEvent(event: Event) {
    this.eventService.newEvent(this.token, event).subscribe((response: any) => {
      location.reload();
    }, (err: any) => {
      console.log(err);
    })

    this.create = false;

  }

  /**
   * Method charged to update an event
   *
   * @param {any} event the event to update
   */
   updateEvent(event: Event) {
    this.eventService.updateEvent(this.token, event).subscribe((response: any) => {
      location.reload();
    }, (err: any) => {
      console.log(err);
    })

    this.update = false;
    this.eventSelected = new Event();
  }

  closeDelete(event: boolean) {
    this.delete = false;
    this.eventSelected = new Event();
  }

  /**
   * Method that stablish that the selected day is not the actual
   */
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  close(value: boolean) {
    if (this.create) {
      this.create = value;
    } else if (this.update) {
      this.update = value;
      this.eventSelected = new Event();
    }
  }

  ngOnDestroy() {
    this.refresh.next();
  }

}
