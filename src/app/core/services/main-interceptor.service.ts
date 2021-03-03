import { Injectable , Injector} from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse }   from '@angular/common/http';
import { EMPTY, Observable, of } from "rxjs";
import { AuthService } from './auth.service'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs/operators';
@Injectable()

export class TokenInterceptorService  implements HttpInterceptor {

  constructor(private injector: Injector, private toastr: ToastrService, private _router: Router) { }
  intercept(req:any, next:any) {
    let authService = this.injector.get(AuthService)
      let tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authService.getToken()}`
        }
      })
      return next.handle(tokenizedReq).pipe(catchError((error: any) => {
        if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 400)) {
          this.toastr.error('session timed out.', 'Login error');
          authService.clearSessionStorage()
          this._router.navigate(['']);
          return EMPTY;
        } else {
          return EMPTY;
        }
      }))
    // }

  }
}
