import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LwxComponent } from './lwx.component';

describe('LwxComponent', () => {
  let component: LwxComponent;
  let fixture: ComponentFixture<LwxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LwxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LwxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
