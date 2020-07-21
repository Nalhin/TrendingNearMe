import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'trends-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.authService.logout();
  }
}
