
import { createTodoHTML } from './';
import { Todo } from '../models/todo.model';

let element;

/**
 * 
 * @param {String} elementId 
 * @param {Todo} todos 
 */
export const renderTodos = ( elementId, todos = [] ) => {

  if ( !element )
    element = document.querySelector( elementId );

  if ( !elementId ) throw new Error(`Element ${elementId} not found`);

  element.innerHTML = '';

  todos.forEach( todo => {
    element.append( createTodoHTML( todo ) );
  });

}
