import { TestBed } from '@angular/core/testing';

import { AuthService } from '../auth/auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserService } from './user.service';
import {
  authUserResponseDtoBuilder,
  userResponseDtoBuilder,
} from '@trends/fixtures';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('me', () => {
    const response = userResponseDtoBuilder.buildOne();

    it('should return current user', () => {
      service.me().subscribe((res) => {
        expect(res).toBe(response);
      });

      const req = httpTestingController.expectOne('/users/me');
      req.flush(response);
    });
  });
});
