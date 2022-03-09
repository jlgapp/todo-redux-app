import { Action, createReducer, on } from '@ngrx/store';
import { filtrosValidos, setFiltro } from './filtro.actions';


export const estadoInicial : filtrosValidos = 'todos';

const _filtroReducer = createReducer<filtrosValidos, Action>(
  estadoInicial,
  on(setFiltro, (state, { filtro }) => filtro),
);

export function filtroReducer(state: any, action: Action) {
  return _filtroReducer(state, action);
}
