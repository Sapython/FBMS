import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ComponentsModule } from 'src/app/components/components.module';
import { ManagementComponent } from './management/mangement.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { DialogModule } from '@angular/cdk/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio'; 
import {MatCheckboxModule} from '@angular/material/checkbox'; 

@NgModule({
  declarations: [MenuComponent, ManagementComponent, AddRecipeComponent],
  imports: [
    CommonModule,
    MenuRoutingModule,
    MatMenuModule,
    MatIconModule,
    MatTabsModule,
    ComponentsModule,
    DialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule
  ],
})
export class MenuModule {}
