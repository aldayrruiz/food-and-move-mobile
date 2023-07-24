import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { eachDayOfInterval, lastDayOfWeek, startOfToday, startOfWeek } from 'date-fns';

@Component({
  selector: 'app-segment-days',
  templateUrl: './segment-days.component.html',
  styleUrls: ['./segment-days.component.scss'],
})
export class SegmentDaysComponent implements OnInit {
  @Output() daysInitEventEmitter: EventEmitter<Date[]> = new EventEmitter<Date[]>();
  @Output() selectedDayChangedEmitter: EventEmitter<string> = new EventEmitter<string>();
  days!: Date[];
  selectedDay!: string;

  constructor() {}

  ngOnInit() {
    this.initDays();
  }

  selectedDayChanged(event: any) {
    this.selectedDayChangedEmitter.emit(event.detail.value);
  }

  private initDays() {
    const today = startOfToday();
    const firstDay = startOfWeek(today, { weekStartsOn: 1 });
    const lastDay = lastDayOfWeek(today, { weekStartsOn: 1 });

    // Set today as selected day and inform parent component
    this.selectedDay = today.toJSON();
    this.selectedDayChangedEmitter.emit(this.selectedDay);

    // Set weeks days and inform parent component
    this.days = eachDayOfInterval({ start: firstDay, end: lastDay });
    this.daysInitEventEmitter.emit(this.days);
  }
}
