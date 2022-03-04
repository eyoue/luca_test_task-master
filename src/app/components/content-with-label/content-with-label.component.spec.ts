import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ContentWithLabelComponent} from './content-with-label.component';

describe('ContentWithLabelComponent', () => {
  let component: ContentWithLabelComponent;
  let fixture: ComponentFixture<ContentWithLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentWithLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentWithLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
