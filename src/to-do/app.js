
import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos } from './use-cases';


const ElementIDs = {
  ClearCompletedButton: '.clear-completed',
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

  (() => {
    const app = document.createElement('div');
    app.innerHTML = html;
    document.querySelector(elementId).append(app);

    displayTodos();
  })()

  // HTML References
  const clearCompletedButton = document.querySelector( ElementIDs.ClearCompletedButton );
  const filtersLIs = document.querySelectorAll( ElementIDs.TodoFilters );
  const newDescriptionInput = document.querySelector( ElementIDs.TodoInput );
  const todoListUl = document.querySelector( ElementIDs.TodoList );

// Listeners
  newDescriptionInput.addEventListener('keyup', (event) => {
    
    if ( event.keyCode !== 13 ) return;
    if ( event.target.value.trim().length === 0 ) return;

    todoStore.addTodo( event.target.value );
    displayTodos();
    event.target.value = '';
  });

  
  // Toggle a to-do object
  todoListUl.addEventListener('click', ( event ) => {

    if ( event.target.className !== 'toggle' ) return;

    const element = event.target.closest('[data-id]');
    todoStore.toggleTodo( element.getAttribute('data-id') );
    displayTodos();
  });


  // Delete a to-do object
  todoListUl.addEventListener('click', ( event ) => {

    if ( event.target.className !== 'destroy' ) return;

    const element = event.target.closest('[data-id]');
    todoStore.deleteTodo( element.getAttribute('data-id') );
    displayTodos();
  });


  clearCompletedButton.addEventListener('click', () => {
    todoStore.deleteCompleted();
    displayTodos();
  });

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

