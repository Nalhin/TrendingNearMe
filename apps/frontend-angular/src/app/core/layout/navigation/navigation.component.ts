import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'trends-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit, OnDestroy {

  isAuthenticated: boolean;
  subscription: Subscription;

  constructor(private readonly authService: AuthService) {
  }

  ngOnInit(): void {
    this.subscription = this.authService.isAuthenticated().subscribe((val) => {
      this.isAuthenticated = val;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
