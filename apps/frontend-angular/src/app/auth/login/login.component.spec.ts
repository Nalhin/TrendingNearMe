import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

import { LoginComponent } from './login.component';
import {
  authUserResponseDtoBuilder,
  loginUserDtoBuilder,
} from '@trends/fixtures';
import { SharedModule } from '../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookiesService } from '../../core/services/cookies.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        SharedModule,
        CookiesService
      ],
      providers: [FormBuilder],
      declarations: [LoginComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('loginForm', () => {
    it('should be invalid with empty values', () => {
      expect(component.loginForm.valid).toBeFalsy();
      expect(
        fixture.debugElement.query(By.css('button')).attributes.disabled,
      ).toBeTruthy();
    });

    it('should be valid after inserting the correct values', () => {
      const loginUserDto = loginUserDtoBuilder.buildOne();

      for (const [key, value] of Object.entries(loginUserDto)) {
        fixture.debugElement
          .query(By.css(`#${key}`))
          .triggerEventHandler('input', {
            target: {
              value,
            },
          });
      }
      fixture.detectChanges();

      expect(
        fixture.debugElement.query(By.css('button')).attributes.disabled,
      ).toBeFalsy();
      expect(component.loginForm.valid).toBeTruthy();
      expect(component.loginForm.value).toEqual(loginUserDto);
    });
  });

  describe('onSubmit', () => {
    it('should navigate on login', () => {
      jest
        .spyOn(authService, 'login')
        .mockReturnValueOnce(of(authUserResponseDtoBuilder.buildOne()));
      jest.spyOn(router, 'navigate').mockResolvedValueOnce(true);

      component.loginForm.setValue(loginUserDtoBuilder.buildOne());
      component.onSubmit();

      expect(router.navigate).toHaveBeenCalledTimes(1);
    });
  });
});
