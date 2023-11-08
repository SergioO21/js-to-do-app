
import { Todo } from '../to-do/models/todo.model';

const Filters = {
  All: 'All',
  Completed: 'Completed',
  Pending: 'Pending'
}

const state = {
  todos: [],
  filter: Filters.All
}

const initStore = () => {
  console.log(state);
  console.log('Init Store');
}


// TODO: Not implemented
const loadStore = () => {
  throw new Error('Not implemented');
}

/**
 * 
 * @param {Filters} filter 
 * @returns Array<Todo>
 */
const getTodos = ( filter = Filters.All ) => {

  switch ( filter ) {

    case Filters.All:
      return [...state.todos];

    case Filters.Completed:
      return state.todos.filter( todo => todo.done );

    case Filters.Pending:
      return state.todos.filter( todo => !todo.done );

    default:
      throw new Error(`Option ${filter} is not valid`);
  }
}


/**
 * 
 * @param {String} description 
 */
const addTodo = ( description ) => {
  
  if ( !description ) throw new Error('Description is required');

  state.todos.push( new Todo( description ) );
}


/**
 * 
 * @param {String} todoId 
 */
const toggleTodo = ( todoId ) => {

  state.todos.map( todo => {
    if ( todo.id === todoId ) {
      todo.done = !todo.done;
    }
    return todo;
  });
}


/**
 * 
 * @param {String} todoId 
 */
const deleteTodo = ( todoId ) => {
  
  if ( !todoId ) throw new Error('todoId is required');

  state.todos = state.todos.filter( todo => todo.id !== todoId );
}


const deleteCompleted = () => {
  state.todos = state.todos.filter( todo => todo.done );
}


/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = ( newFilter = Filters.All ) => {
  
  if ( !Object.keys(Filters).includes( newFilter ) )
      throw new Error(` The filter ${newFilter} is not valid `);

}


const getCurrentFilter = () => {
  return state.filter;
}


export default {
  addTodo,
  deleteCompleted,
  deleteTodo,
  getCurrentFilter,
  getTodos,
  initStore,
  loadStore,
  setFilter,
  toggleTodo,
}
