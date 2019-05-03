import {Component, OnInit, ViewContainerRef} from "@angular/core";
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
  public preSelectedDateTime: Date;
  public datePicker: DatePicker;
  public timePicker: TimePicker;

  public constructor(private modalParams: ModalDialogParams, private page: Page) {}


  public ngOnInit(): void {
  }

}
