import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatListModule,
  MatIconModule,
];

const MODULES = [CommonModule, ReactiveFormsModule, ...MATERIAL_MODULES];

@NgModule({
  declarations: [],
  imports: [...MODULES],
  exports: [...MODULES],
})
export class SharedModule {}
