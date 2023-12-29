import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SagInput } from './sag-input';

describe('SagInput', () => {
  let component: SagInput;
  let fixture: ComponentFixture<SagInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SagInput],
    }).compileComponents();

    fixture = TestBed.createComponent(SagInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
