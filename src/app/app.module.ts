// angular imports
import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";

// nativescript imports
import {NativeScriptHttpModule} from "nativescript-angular";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

// app core imports
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";

// components imports
import {HomeComponent} from "~/pages/home/home.component";
import {DatetimePickerModalComponent} from "~/pages/datetime-picker-modal/datetime-picker-modal.component";
import {SignInComponent} from "~/pages/sign-in/sign-in.component";
import {SignUpComponent} from "~/pages/sign-up/sign-up.component";
import {TaskDetailComponent} from "~/pages/tasks/task-detail/task-detail.component";
import {TasksComponent} from "~/pages/tasks/tasks.component";

//  service imports
import {AuthGuard} from "~/guards/auth.guard";
import {AuthService} from "~/shared/auth.service";
import {ModalDialogService} from "nativescript-angular";
import {TaskService} from "~/pages/tasks/shared/task.service";
import {TokenService} from "~/shared/token.service";

// rjxs operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

// rxjs modules
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

@NgModule({
  bootstrap: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    DatetimePickerModalComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    TaskDetailComponent,
    TasksComponent
  ],
  providers: [
    AuthGuard,
    AuthService,
    ModalDialogService,
    TaskService,
    TokenService
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  entryComponents: [
    DatetimePickerModalComponent
  ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {
}
