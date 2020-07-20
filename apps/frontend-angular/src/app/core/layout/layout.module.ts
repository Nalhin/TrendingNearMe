import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { LayoutComponent } from './layout.component';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [LayoutComponent, NavigationComponent],
  imports: [SharedModule, RouterModule],
  exports: [LayoutComponent],
})
export class LayoutModule {}
