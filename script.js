
           const todoList = []; 

           function saveTodoList(){
            localStorage.setItem('todoList', JSON.stringify(todoList));
           }
           const storedTodos = localStorage.getItem('todoList');
           if (storedTodos) {
            todoList.push(...JSON.parse(storedTodos));
           }
           

            renderTodoList();

            function renderTodoList () {
             const todoListContainer = document.querySelector('.js-todo-list');
             todoListContainer.innerHTML = '';

             if(todoList.length === 0){
              const emptyMessage = document.createElement('div');
                    emptyMessage.classList.add('empty-msg');
                    emptyMessage.textContent = "No tasks yet!";

                    todoListContainer.appendChild(emptyMessage);
                    return;
             }
                 
             for ( let i = 0;         
             i < todoList.length;   
              i++ ) {                    
                                  
             const todoObject = todoList[i];
            
             const {text, dueDate}  = todoObject;  // destructuring (shorthand property)

               const todoItemDiv = document.createElement('div');
               todoItemDiv.classList.add('todo-item-grid');

              
              const textSpan = document.createElement('span');
               textSpan.textContent = text;

               const dateSpan = document.createElement('span');
               dateSpan.textContent = dueDate;

             const checkbox = document.createElement('input');
               checkbox.type = 'checkbox';
               checkbox.checked = todoObject.completed;

              checkbox.addEventListener('change', () => {
                todoObject.completed = checkbox.checked;
                textSpan.classList.toggle('completed', checkbox.checked);
                dateSpan.classList.toggle('completed', checkbox.checked);
                saveTodoList();
              });

                if(todoObject.completed){
                textSpan.classList.add('completed');
                dateSpan.classList.add('completed');
              }


                 const deleteBtn = document.createElement('button');
                deleteBtn.textContent = '❌';
                deleteBtn.classList.add('delete-btn');
                deleteBtn.addEventListener('click', () => {
                   todoList.splice(i, 1);
                renderTodoList();
                saveTodoList();// re-render the list //
                  });
                todoItemDiv.append(checkbox,textSpan, dateSpan, deleteBtn);  
                 todoListContainer.appendChild(todoItemDiv);                 
              }
                  
                  saveTodoList();
                 console.log(todoList);
             
             }
           
  
          
           function addTodo() {
          const inputElement = document.querySelector
                   ('.js-text-input');

           const text = inputElement.value.trim(); 

           const dateInputElement = document.querySelector
                    ('.js-dueDate-input');

           const dueDate = dateInputElement.value;

          

           if(!text ||!dueDate){
            alert('Please fill both fields');
            return;
           }
            

            todoList.push({
              //text: text,   (if property and variable name are same)
              
             text,          // then we can type it out just once
             dueDate,      // shorthand property
             completed: false 
             }); 
         
            inputElement.value = '';
             dateInputElement.value = '';  
            renderTodoList(); 
            saveTodoList();
        }
        
        const placeholders= [
           "Type something...",
           "Add a reminder",
           "Plan your next big move...",
           "Add a quick task or idea...",
           "Got an idea?"

        ];

         let i = 0;
          const input = document.querySelector('.js-text-input');

          setInterval(() => {
         input.placeholder = placeholders[i];
         i = ( i + 1) % placeholders.length;
          }, 2000);

           const form = document.getElementById('todoForm');
        
          form.addEventListener('submit', function(e) {
           e.preventDefault();
            addTodo();
          });

        