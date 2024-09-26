import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResenaComponent } from './resena.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ResenaComponent }
	])],
	exports: [RouterModule]
})
export class ResenaRoutingModule { }
