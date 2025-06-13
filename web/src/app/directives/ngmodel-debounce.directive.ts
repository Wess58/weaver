import { Directive, EventEmitter, OnDestroy, OnInit, Output, Input } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, skip } from 'rxjs/operators';

@Directive({
  selector: '[ngModelDebounceChange]',
  standalone: false

})
export class NgmodelDebounceDirective implements OnDestroy, OnInit {
  /** Emit event when model has changed. */
  @Output() ngModelDebounceChange = new EventEmitter<any>();
  @Input() timeout: number = 1000;

  /** Subscriptions for cleanup. */
  private subscription!: Subscription;

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  constructor(private ngModel: NgModel) { }

  ngOnInit(): void {
    this.subscription = this.ngModel.control.valueChanges
      .pipe(skip(1), debounceTime(this.timeout), distinctUntilChanged())
      .subscribe(value => this.ngModelDebounceChange.emit(value));
  }
}

