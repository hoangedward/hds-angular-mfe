import { MatInputModule } from '@angular/material/input';
import {FocusMonitor} from '@angular/cdk/a11y';
import {BooleanInput, coerceBooleanProperty} from '@angular/cdk/coercion';
import {
  Component,
  EventEmitter,
  Input,
  Optional,
  Output,
  Self,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  FormsModule,
  ReactiveFormsModule,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
} from '@angular/forms';
import {
  MatFormFieldModule,
} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { NgIf } from '@angular/common';

/** Custom `MatFormFieldControl` for telephone number input. */
@Component({
  selector: 'sag-input',
  templateUrl: 'sag-input.html',
  styleUrls: ['sag-input.scss'],
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule],
  encapsulation: ViewEncapsulation.None
})
export class SagInput implements ControlValueAccessor {
  @Input() minLength?: number;
  @Input() maxLength?: number;
  @Input() minLengthException?: number;
  @Input() maxLengthException?: number;
  @Input() exceptionChar?: string;
  @Input() placeHolder?: string;
  @Input() ariaLabel?: string;
  @Input() className?: string;
  @Input() typeInput: string | undefined;
  @Input() isRequired?: boolean;
  @Input() isNumber?: boolean;
  @Input() label?: string;
  @Input() template?: string;
  @Input() separateChar?: string;
  @Input() isAccountFormat?: boolean;
  @Input() isShowMaxLengthException?: boolean;
  @Input() formName?: string;
  @Input() columLabel?: string;
  @Input() columInput?: string;
  @Input() errorPrefix: string | undefined;
  @Input() iconInput: string | undefined;
  @Input() hideLabel: boolean | undefined;

  @Output() emitOnChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() emitIconclick: EventEmitter<any> = new EventEmitter<any>();
  countInSpecialCase = 1;

  constructor(
    @Optional()
    @Self() public ngControl: NgControl,
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  writeValue(value: any): void {
    // throw new Error("Method not implemented.");
  }
  registerOnChange(fn: any): void {
    // throw new Error("Method not implemented.");
  }
  registerOnTouched(fn: any): void {
    // throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error("Method not implemented.");
  }

  execChangeInput(event: any): void {
    this.emitOnChange.emit();
  }
  clickIconInput(event: any): void {
    this.emitIconclick.emit();
  }
}
