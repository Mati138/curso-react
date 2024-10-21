// useCallback:
// Se utiliza para memorizar funciones, evitando que se vuelvan a crear en cada renderizado del componente. Esto es especialmente útil cuando pasas funciones a componentes hijos, ya que ayuda a prevenir renderizaciones innecesarias de esos hijos si las funciones no han cambiado.

// ¿Cuándo usarlo?
// useCallback se utiliza cuando tienes funciones que se pasan como props a componentes hijos y quieres evitar que esas funciones se vuelvan a crear en cada renderizado, lo que podría disparar renders innecesarios en los componentes hijos.

// Buena práctica:

// 	•	Es ideal para funciones que dependan de algún estado o prop, pero que no necesiten cambiar en cada render. Por ejemplo, callbacks de botones o eventos.
// 	•	Similar a useMemo, no es necesario usar useCallback en todas las funciones. Prioriza su uso en funciones que pueden generar un costo de renderizado adicional.



// Ejemplo Real de useCallback: Manejo de Eventos en una Lista de Elementos

// Imaginemos que tienes un componente que muestra una lista de tareas y permite marcar tareas como completadas. Usaremos useCallback para memorizar la función que maneja el evento de marcado.

import React, { useState, useCallback } from 'react';

// Componente de Tarea
const Task = React.memo(({ task, onToggle }) => {
  // Este componente recibe una tarea y una función para alternar su estado (completada/no completada)
  console.log(`Renderizando tarea: ${task.text}`);

  return (
    <li onClick={() => onToggle(task.id)} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
      {task.text}
    </li>
  );
});

// Componente de Lista de Tareas
const TaskList = () => {
  // useState para almacenar las tareas, que es un array de objetos
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Aprender React', completed: false },
    { id: 2, text: 'Hacer ejercicio', completed: false },
    { id: 3, text: 'Leer un libro', completed: false },
  ]);

  // useCallback para memorizar la función que alterna el estado de completado de una tarea
  const toggleTaskCompletion = useCallback((id) => {
    setTasks((prevTasks) => 
      prevTasks.map((task) => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []); // Esta función no depende de ningún valor externo

  return (
    <ul>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onToggle={toggleTaskCompletion} />
      ))}
    </ul>
  );
};

export default TaskList;





// Desglose del Código:

// 1.	Importaciones:
import React, { useState, useCallback } from 'react';
// •	Aquí importamos React y dos hooks: useState para manejar el estado y useCallback para memorizar funciones.

// 2.	Componente Task:
const Task = React.memo(({ task, onToggle }) => {
    console.log(`Renderizando tarea: ${task.text}`);
  
    return (
      <li onClick={() => onToggle(task.id)} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.text}
      </li>
    );
});
// •	React.memo: Este método se utiliza para memorizar el componente, evitando que se renderice nuevamente si sus props no han cambiado.
// •	Props: task es el objeto que contiene la información de la tarea y onToggle es la función que se llamará al hacer clic en la tarea.
// •	Evento onClick: Cuando se hace clic en el elemento <li>, se llama a onToggle con el id de la tarea. Esto permitirá alternar su estado de completado.
// •	Estilo: El estilo del texto se cambia a “tachado” (line-through) si la tarea está completada.

// 3.	Componente TaskList:

// const TaskList = () => {
//     const [tasks, setTasks] = useState([...]);

// •	Aquí creamos el componente que gestiona la lista de tareas. Utilizamos useState para almacenar un array de tareas. Cada tarea tiene un id, text y un estado completed.

// 4.	Función toggleTaskCompletion:

const toggleTaskCompletion = useCallback((id) => {
    setTasks((prevTasks) => 
      prevTasks.map((task) => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
}, []);

// •	useCallback: Esta función se memoriza para que no se vuelva a crear en cada renderizado del componente. No tiene dependencias ([]), por lo que siempre se mantendrá la misma referencia.
// •	Lógica: Dentro de la función, usamos setTasks para actualizar el estado. prevTasks es el estado anterior. Utilizamos map para crear un nuevo array de tareas. Si el id de la tarea coincide con el que se pasó, alternamos su estado completed.

// 5.	Renderizado de Tareas:
return (
    <ul>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onToggle={toggleTaskCompletion} />
      ))}
    </ul>
  );
//   •	Aquí renderizamos una lista de tareas usando el método map sobre el array tasks. Por cada tarea, creamos un componente Task, pasándole las props necesarias (task y onToggle).

// Beneficios del Uso de useCallback en Este Ejemplo:

// 	•	Eficiencia: Al usar useCallback, evitamos que la función toggleTaskCompletion se recree en cada renderizado del componente. Esto es especialmente útil si tu componente de tareas crece en complejidad o número de elementos.
// 	•	Optimización de Renderizado: Gracias a React.memo en el componente Task, solo se re-renderiza cuando las props cambian, lo que mejora el rendimiento.

// Conclusión

// Este ejemplo de una lista de tareas ilustra cómo useCallback ayuda a gestionar las funciones en React de manera eficiente. Al evitar la recreación innecesaria de funciones, se mejora el rendimiento del componente.
