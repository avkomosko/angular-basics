import { Injectable } from '@angular/core';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class AppCounterService {
  counter = 0;
  constructor(private logService: LogService) {

  }

  increase() {
    this.logService.log('increase');
    this.counter++;
  }

  decrease() {
    this.logService.log('decrease');
    this.counter--;
  }
}
