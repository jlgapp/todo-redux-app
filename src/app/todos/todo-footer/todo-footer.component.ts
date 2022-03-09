import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as actions from '../../filtro/filtro.actions';
import { AppState } from '../../app.reducer';
import { limpiarCompletados } from '../todo.actions';


@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  filtroActual: actions.filtrosValidos = 'todos';
  filtros: actions.filtrosValidos[] = ['todos', 'completados', 'pendientes'];

  pendientes: number = 0;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.store.select('filtro')
    //   .subscribe(filtro => this.filtroActual = filtro);
    this.store.subscribe(state => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter(todo => !todo.completado).length;
    });
  }

  cambiarFiltro(filtro: actions.filtrosValidos) {
    //console.log(filtro);
    //this.filtroActual = filtro; // no necesito esto ya que se subsribio en el oninit
    this.store.dispatch(actions.setFiltro({ filtro }));
  }

  limpiarCompletados(){
    this.store.dispatch(limpiarCompletados());
  }

}