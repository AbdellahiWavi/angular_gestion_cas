import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messageSubject = new BehaviorSubject<string>('');
  currentMessage = this.messageSubject.asObservable();

  setMessage(message: string) {
    this.messageSubject.next(message);
  }

  // clearMessage() {
  //   this.messageSubject.next(null);
  // }

}
