import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RefactorComponent } from './auth/refactor/refactor.component';
import { MoveComponent } from './auth/move/move.component';

const routes: Routes = [ {
    path: '',
    redirectTo: 'rule',
    pathMatch: 'full'
  },
  {
    path: 'rule',
    component: RefactorComponent,
    data: { title: 'Gestión de reglas de sustitución' }
  },
{
    path: 'userpath',
    component: MoveComponent,
    data: { title: 'Gestión de orígenes de datos de usuario' }
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
