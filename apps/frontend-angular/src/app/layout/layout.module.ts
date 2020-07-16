import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NavigationComponent],
  imports: [SharedModule, RouterModule, MatToolbarModule, MatSidenavModule],
  exports: [NavigationComponent],
})
export class LayoutModule {
}
