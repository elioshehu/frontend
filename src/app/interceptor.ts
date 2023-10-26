import {Injectable} from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {catchError, Observable, pipe, switchMap, throwError} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // static accessToken = '';
  constructor(private http: HttpClient) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token: any = ''
    // @ts-ignore
    if (JSON.parse(localStorage.getItem("currentUser"))) {
      // @ts-ignore
      token = JSON.parse(localStorage.getItem("currentUser")).access
    }
    if (!token) {
      return next.handle(req);
    }

    const req1 = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    // @ts-ignore
    return next.handle(req1)
    //   .pipe(catchError((err: HttpErrorResponse) => {
    //   if (err.status === 401 || err.status === 403) {
    //     // @ts-ignore
    //     const refresh = JSON.parse(localStorage.getItem("currentUser")).refreshToken
    //     let data = {
    //       "refresh": refresh
    //     }
    //     this.http.post("https://localhost:8000/api/token/refresh/", data).subscribe((resultData: any) => {
    //       console.log(resultData)
    //       localStorage.setItem("currentUser", JSON.stringify(resultData))
    //     })
    //   }
    //   return throwError(() => err)
    // }))
  }
}

