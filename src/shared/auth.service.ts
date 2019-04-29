import {Injectable} from "@angular/core";
import {Response} from "@angular/http";

import {Observable} from "rxjs";
import {SignInData} from "~/shared/ns-angular2-token/ns-angular2-token.model";
import {TokenService} from './token.service';

import {User} from './user.model';

@Injectable()

export class AuthService {
  public constructor(private tokenService: TokenService) {
  }

  public signUp(user: User): Observable<Response> {
    return this.tokenService.registerAccount(user as any)
      .catch(this.handleErrors);
  }

  public signIn(uid: string, password: string): Observable<Response> {
    const signInData: SignInData = {
      email: uid,
      password: password
    };

    return this.tokenService.signIn(signInData)
      .catch(this.handleErrors);
  }

  public signOut(): Observable<Response> {
    return this.tokenService.signOut()
      .catch(this.handleErrors);
  }

  public userSignedIn(): boolean {
    return this.tokenService.userSignedIn();
  }

  private handleErrors(error: Response) {
    console.log('Salvando erro no arquivo de LOG - Detalhes do erro => ', error);
    return Observable.throw(error);
  }
}
