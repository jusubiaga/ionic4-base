import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse, HttpInterceptor } from "@angular/common/http";
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptorService {

    constructor(private injector: Injector, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request);
    }
}
