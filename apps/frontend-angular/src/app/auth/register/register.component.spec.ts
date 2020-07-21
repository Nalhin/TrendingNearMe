import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  authUserResponseDtoBuilder,
  registerUserDtoBuilder,
} from '@trends/fixtures';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      providers: [FormBuilder],
      declarations: [RegisterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('registerForm', () => {
    it('should be invalid with empty values', () => {
      expect(component.registerForm.valid).toBeFalsy();
      expect(
        fixture.debugElement.query(By.css('button')).attributes.disabled,
      ).toBeTruthy();
    });

    it('should be valid after inserting the correct values', () => {
      const registerUserDto = registerUserDtoBuilder.buildOne();

      for (const [key, value] of Object.entries(registerUserDto)) {
        fixture.debugElement
          .query(By.css(`input[formcontrolname=${key}]`))
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
      expect(component.registerForm.valid).toBeTruthy();
      expect(component.registerForm.value).toEqual(registerUserDto);
    });
  });

  describe('onSubmit', () => {
    it('should navigate on register', () => {
      jest
        .spyOn(authService, 'register')
        .mockReturnValueOnce(of(authUserResponseDtoBuilder.buildOne()));
      jest.spyOn(router, 'navigate').mockResolvedValueOnce(true);

      component.registerForm.setValue(registerUserDtoBuilder.buildOne());
      component.onSubmit();

      expect(router.navigate).toHaveBeenCalledTimes(1);
    });
  });
});
