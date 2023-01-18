//obtener el elemento formulario y agregar el evento submit/enviar 
//y agregar la funcion de saveTask, que es para guardar la tarea.
document.getElementById('formTask').addEventListener('submit', saveTask);

/*funcion para guardar la tarea
obtenemos los elementos de titulo y descripcion. 
creamos el objeto task.
luego si no hay objetos en el LS. lo creamos y pusheamos el objeto creado.
Lo seteamos, y transformamos a JSON. DE caso contrario, traemos lo almacenado en LS
y pusheamos la tarea nuevamente. y la seteamos de nuevo en LS
*/

function saveTask(e) {
  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;
  console.log(description)

  let task = {
    title,
    description
  };

  if(localStorage.getItem('tasks') === null) {
    let tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  getTasks();
  document.getElementById('formTask').reset();
  e.preventDefault();
}


/*Funcion para eliminar la tarea

pasamos como argumento el titulo.
Traemos la tarea del local storage
luego la recorremos y la que coincida con el titulo hacemos un splice para sacarla
Seguido de eso volvemos a setear las tareas que quedaron

*/
function deleteTask(title) {
  console.log(title)
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  for(let i = 0; i < tasks.length; i++) {
    if(tasks[i].title == title) {
      tasks.splice(i, 1);
    }
  }
  
  localStorage.setItem('tasks', JSON.stringify(tasks));
  getTasks();
}

/* Funcion para obtener las tareas
Traemos las tareas de LS. y creamos la vista de las tareas.
Recorremos todo el arreglo de tareas para luego renderizar y monstrar
 */

function getTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let tasksView = document.getElementById('tasks');
  tasksView.innerHTML = '';
  for(let i = 0; i < tasks.length; i++) {
    let title = tasks[i].title;
    let description = tasks[i].description;

    tasksView.innerHTML += `<div class="card mb-3">
        <div class="card-body">
          <p class ="fw-bold">${title} </p><hr>
          <p> ${description}</p>
          <a href="#" onclick="deleteTask('${title}')" class="btn btn-danger ml-5">Delete</a>
          </p>
        </div>
      </div>`;
  }
}

getTasks();
