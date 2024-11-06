type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
};

const todoList: TodoItem[] = [];
let idCounter = 0;

const addItemForm = document.querySelector<HTMLFormElement>('#addItemForm');
const todoInput = document.querySelector<HTMLInputElement>('#todoInput');
const todoContainer = document.querySelector<HTMLUListElement>('#todoContainer');

addItemForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (todoInput && todoInput.value.trim() !== '') {
      const newItem: TodoItem = {
          id: idCounter++,
          text: todoInput.value,
          completed: false,
      };
      todoList.push(newItem);
      todoInput.value = '';
      renderTodoList();
  }
});

function renderTodoList() {
  if (todoContainer) {
      todoContainer.innerHTML = '';
      todoList.forEach((item) => {
          const listItem = document.createElement('li');
          listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
          if (item.completed) {
              listItem.classList.add('list-group-item-success', 'text-decoration-line-through');
          }

          listItem.innerHTML = `
              <span class="todo-text">${item.text}</span>
              <div>
                  <button class="btn btn-sm ${item.completed ? 'btn-warning' : 'btn-success'} mark-complete">
                      ${item.completed ? 'Undo' : 'Complete'}
                  </button>
                  <button class="btn btn-sm btn-danger delete-item">Delete</button>
              </div>
          `;
          
          listItem.querySelector('.mark-complete')?.addEventListener('click', () => {
              item.completed = !item.completed;
              renderTodoList();
          });

          listItem.querySelector('.delete-item')?.addEventListener('click', () => {
              const index = todoList.findIndex((todo) => todo.id === item.id);
              if (index !== -1) {
                  todoList.splice(index, 1);
                  renderTodoList();
              }
          });

          todoContainer.appendChild(listItem);
      });
  }
}
