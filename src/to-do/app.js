
import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos, pendingCounter } from './use-cases';


const ElementIDs = {
  ClearCompleted: '.clear-completed',
  PendingCounter: '#pending-count',
  TodoFilters: '.filter',
  TodoInput: '#new-todo-input',
  TodoList: '.todo-list',
}

/**
 * 
 * @param {String} elementId 
 */
export const App = ( elementId ) => {

  const displayTodos = () => {
    const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
    renderTodos( ElementIDs.TodoList, todos );
  }

  const pendingTodosCounter = () => {
    pendingCounter( ElementIDs.PendingCounter );
  }


  (() => {
    const app = document.createElement('div');
    app.innerHTML = html;
    document.querySelector(elementId).append(app);

    displayTodos();
    pendingTodosCounter();
  })()

  // HTML References
  const clearCompletedButton = document.querySelector( ElementIDs.ClearCompleted );
  const filtersLIs = document.querySelectorAll( ElementIDs.TodoFilters );
  const newDescriptionInput = document.querySelector( ElementIDs.TodoInput );
  const todoListUl = document.querySelector( ElementIDs.TodoList );

// Input detection
  newDescriptionInput.addEventListener('keyup', (event) => {
    
    if ( event.keyCode !== 13 ) return;
    if ( event.target.value.trim().length === 0 ) return;

    todoStore.addTodo( event.target.value );
    displayTodos();
    pendingTodosCounter();
    event.target.value = '';
  });

  // Toggle a to-do object
  todoListUl.addEventListener('click', ( event ) => {

    if ( event.target.className !== 'toggle' ) return;

    const element = event.target.closest('[data-id]');
    todoStore.toggleTodo( element.getAttribute('data-id') );
    displayTodos();
    pendingTodosCounter();
  });

  // Delete a to-do object
  todoListUl.addEventListener('click', ( event ) => {

    if ( event.target.className !== 'destroy' ) return;

    const element = event.target.closest('[data-id]');
    todoStore.deleteTodo( element.getAttribute('data-id') );
    displayTodos();
    pendingTodosCounter();
  });

  // Clear all completed to-do
  clearCompletedButton.addEventListener('click', () => {
    todoStore.deleteCompleted();
    displayTodos();
  });

  // Filters selection
  filtersLIs.forEach( element => {
    element.addEventListener('click', ( filter ) => {

      filtersLIs.forEach( li => li.classList.remove('selected') );
      filter.target.classList.add('selected');

      switch ( filter.target.text ) {
        case 'To-do':
          todoStore.setFilter( Filters.All );
          break;
        case 'Pending':
          todoStore.setFilter( Filters.Pending );
          break;
        case 'Completed':
          todoStore.setFilter( Filters.Completed );
          break;
      }

      displayTodos();
    });
  });

}

