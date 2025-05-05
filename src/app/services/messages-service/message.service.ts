import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messageSubject = new BehaviorSubject<string | string[]>('');
  private messages: string[] = [];
  private timeoutId: any;

  // Expose as observable to prevent external next() calls
  readonly currentMessage: Observable<string | string[]> = this.messageSubject.asObservable();
  readonly currentMessageDashboard: Observable<string | string[]> = this.messageSubject.asObservable();


  /**
   * Set a single message that auto-clears after delay
   * @param message the message to display
   * @param delay time before auto-clearing (default: 3000ms)
   */
  setMessage(message: string, delayMs: number = 3000): void {
    this.clearTimeout();
    this.messageSubject.next(message);
    this.setAutoClearTimeout(delayMs);
  }

  /**
   * Add a message to the stack and display all messages
   * @param message the message to display
   * @param delayMs time before auto-clearing (default: 5000ms)
   */
  addMessage(message: string, delayMs: number = 5000): void {
    this.clearTimeout();
    this.messages.push(message);
    this.messageSubject.next([...this.messages]);
    this.setAutoClearTimeout(delayMs);
  }

  /**
   * Clear all messages immediately
   */
  clearMessages(): void {
    this.clearTimeout();
    this.messages = [];
    this.messageSubject.next('');
  }

  private setAutoClearTimeout(delayMs: number): void {
    this.timeoutId = setTimeout(() => {
      this.clearMessages();
    }, delayMs);
  }

  private clearTimeout(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

}
