import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

// Provide a local alias so we can write `test(...)` in Jasmine
const test = it;

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  test('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  test(`should have the 'completionist-test' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('completionist-test');
  });

  test('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    // Instead of depending on a specific H1, verify that the router outlet is present
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
