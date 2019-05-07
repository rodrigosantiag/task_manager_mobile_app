import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from "@angular/core";
import {ModalDialogParams} from "nativescript-angular";
import {Page} from "tns-core-modules/ui/page";
import{DatePicker} from "tns-core-modules/ui/date-picker";
import {TimePicker} from "tns-core-modules/ui/time-picker";

@Component({
  selector: 'app-datetime-picker-modal',
  moduleId: module.id,
  templateUrl: './datetime-picker-modal.component.html'
})

export class DatetimePickerModalComponent implements OnInit{
  @ViewChild('datePicker') dp: ElementRef;
  @ViewChild('timePicker') tp: ElementRef;
  public preSelectedDateTime: Date;
  public datePicker: DatePicker;
  public timePicker: TimePicker;

  public constructor(private modalParams: ModalDialogParams, private page: Page) {
    if(this.modalParams.context && this.modalParams.context.preSelectedDateTime){
      this.preSelectedDateTime = this.modalParams.context.preSelectedDateTime;
    }else{
      this.preSelectedDateTime = new Date();
    }
  }


  public ngOnInit(): void {
    this.setDatePicker();
    this.setTimePicker();
  }

  public setDatePicker() {
    this.datePicker = <DatePicker> this.dp.nativeElement;

    this.datePicker.year = this.preSelectedDateTime.getFullYear();
    this.datePicker.month = this.preSelectedDateTime.getMonth() + 1;
    this.datePicker.day = this.preSelectedDateTime.getDate();
  }

  public setTimePicker() {
    this.timePicker = <TimePicker> this.tp.nativeElement;

    this.timePicker.hour = this.preSelectedDateTime.getHours();
    this.timePicker.minute = this.preSelectedDateTime.getMinutes();
    this.timePicker.minMinute = 0;
  }

  public sendNewDateTime() {
    let newDateTime: Date = new Date(
      this.datePicker.year,
      this.datePicker.month - 1,
      this.datePicker.day,
      this.timePicker.hour,
      this.timePicker.minute,

    );

    this.modalParams.closeCallback(newDateTime);
  }

}
