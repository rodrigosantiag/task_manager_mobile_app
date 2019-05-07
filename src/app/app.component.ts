import {Component} from "@angular/core";

import {TokenService} from "~/shared/token.service";

@Component({
  selector: "ns-app",
  moduleId: module.id,
  templateUrl: "./app.component.html"
})
export class AppComponent {
  public constructor(private tokenService: TokenService) {
    this.tokenService.init({
      apiBase: 'https://taskmanager-santive.herokuapp.com',
      globalOptions: {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.taskmanager.v2'
        }
      }
    });
  }
}
