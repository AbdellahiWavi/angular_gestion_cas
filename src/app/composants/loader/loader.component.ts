import { Component, OnInit } from '@angular/core';
import { LoaderService } from './service/loader.service';
import { Subscription } from 'rxjs';
import { LoaderState } from './loader';

@Component({
  selector: 'app-loader',
  standalone: false,
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent implements OnInit{

  show = false;
  subscription?: Subscription;

  constructor (private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.subscription = this.loaderService.loaderState
    .subscribe((state: LoaderState) => {
      this.show = state.show;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
