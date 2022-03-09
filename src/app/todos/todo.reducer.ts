import { Action, createReducer, on } from '@ngrx/store';
import * as acciones from './todo.actions';
import { Todo } from './models/todo.model';


export const estadoInicial: Todo[] = [
  new Todo('Hola hello'),
  new Todo('Estudiar Ingles'),
  new Todo('Examen de Ingles'),
];

const _todoReducer = createReducer(
  estadoInicial,
  on(acciones.limpiarCompletados, (state) => state.filter(todo => !todo.completado)),
  on(acciones.crear, (state, { texto }) => [...state, new Todo(texto)]), // con el operados spread... retorno todo independiente y con el new envio un nuevo objeto previniendo lla mutacion del objeto ya  que JS trabaja por referencia
  on(acciones.borrar, (state, { id }) => state.filter(todo => todo.id !== id)),
  on(acciones.toggle, (state, { id }) => {
    return state.map(todoMap => {
      if (todoMap.id === id) {
        // siempre regresar un nuevo elemento el map hace eso es como un foreach
        return { ...todoMap, completado: !todoMap.completado } //con spread extrae todas las propiedades y cambia a completado, si cambio directo las propiedades del objeto esto lo muta y no lo trata como nuevo
      }
      else {
        return todoMap
      }
    })

  }),
  on(acciones.editar, (state, { id, texto }) => {
    return state.map(todoMap => {
      if (todoMap.id === id) {
        return { ...todoMap, texto: texto }
      }
      else {
        return todoMap
      }
    })

  }),
  on(acciones.toggleAll, (state, { completado }) => {
    return state.map(todoMap => {
      return { ...todoMap, completado } //con spread extrae todas las propiedades y cambia a completado, si cambio directo las propiedades del objeto esto lo muta y no lo trata como nuevo
    })
  }),
);

export function todoReducer(state: any, action: Action) {
  return _todoReducer(state, action);
}
