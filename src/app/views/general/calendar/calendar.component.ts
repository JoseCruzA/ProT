import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Input } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { differenceInMinutes, endOfDay, isSameDay, isSameMonth, startOfDay, startOfHour } from 'date-fns';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, AfterViewInit {
  @Input() selectedLanguage!: string;
  @Input() showType!: boolean;
  @Input() showTitle!: boolean;
  @Input() calendarType!: string;

  daysInWeek = 7;
  view!: CalendarView;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [
    /*{
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    }*/
  ];
  activeDayIsOpen: boolean = true;

  constructor(private cdr: ChangeDetectorRef, private breakpointObserver: BreakpointObserver) { }

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
    this.handleEvent('Dropped or resized', event);
  }

  /**
   * Method charged of select the action to make
   *
   * @param action the action
   * @param event the event
   * @returns {void}
   */
  handleEvent(action: string, event: CalendarEvent): void {
    return;
  }

  /**
   * Method charged for create a new event
   */
  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  /**
   * Method charged to delete an event
   *
   * @param eventToDelete the event
   */
  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
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

  ngOnDestroy() {
    this.refresh.next();
  }

}
