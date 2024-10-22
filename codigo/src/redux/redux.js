// ¿Qué es Redux y para qué sirve?

// Redux es una biblioteca de gestión de estado para aplicaciones JavaScript, especialmente útil en entornos como React. Su propósito principal es ayudar a mantener el estado de una aplicación de manera predecible y centralizada, facilitando así la creación de aplicaciones complejas.

// ¿Por qué usar Redux?

// 	    1.	Un solo estado global: En lugar de tener el estado distribuido en múltiples componentes, Redux centraliza el estado en un único “store”. Esto significa que toda la información relevante de la aplicación se encuentra en un solo lugar, lo que facilita su acceso y manipulación.
// 	    2.	Inmutabilidad: Redux promueve el principio de inmutabilidad, lo que significa que, en lugar de modificar directamente el estado existente, se crea una copia del estado con las modificaciones necesarias. Esto permite un mejor seguimiento de los cambios y una mayor facilidad para depurar.
// 	    3.	Acciones y Reducers: El flujo de datos en Redux es unidireccional. Para modificar el estado, se utilizan “acciones”, que son objetos que describen qué cambios se desean realizar. Estas acciones son procesadas por “reducers”, que son funciones que toman el estado actual y la acción, y devuelven un nuevo estado. Este enfoque modular hace que el código sea más organizado y mantenible.
// 	    4.	Middleware para lógica asíncrona: Redux permite el uso de middleware, lo que facilita la implementación de lógica asíncrona, como llamadas a APIs. Esto permite manejar acciones que requieren un tiempo de respuesta, como la obtención de datos desde un servidor, sin complicar el flujo principal de la aplicación.
// 	    5.	Facilidad de pruebas: Al separar la lógica de gestión del estado en acciones y reducers, Redux hace que sea más fácil probar cada parte de la aplicación de forma aislada. Esto contribuye a una mayor confiabilidad y robustez en el desarrollo.


// Elementos que lo conforman:

//      1.	Store:
// 	•	Es el objeto que contiene el estado de la aplicación.
// 	•	Solo hay una única fuente de verdad, lo que significa que toda la información de la aplicación está centralizada en un único estado.

// 	    2.	Actions:
// 	•	Son objetos que describen un cambio que quieres realizar en el estado.
// 	•	Cada acción debe tener al menos una propiedad type que indica el tipo de acción que se está realizando. Puede tener otras propiedades para pasar información adicional (payload).

const incrementAction = {
    type: 'INCREMENT',
    payload: 1
};

//      3.	Dispatcher:
// 	•	Es una función que se encarga de enviar las acciones al store.
// 	•	Cuando llamas a dispatch, el store recibe la acción y la pasa al reducer correspondiente para actualizar el estado.
// 	•	En Redux, dispatch es un método del store que se utiliza para enviar acciones.

//      4.	Reducers:
// •	Son funciones puras que toman el estado actual y una acción, y devuelven un nuevo estado.
// •	No deben mutar el estado original, sino que deben crear un nuevo objeto de estado.

const counterReducer = (state = 0, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return state + action.payload;
      case 'DECREMENT':
        return state - action.payload;
      default:
        return state;
    }
};

//      4.	Middleware:
// 	•	Permiten extender Redux con funcionalidades adicionales, como manejar acciones asíncronas.
// 	•	Ejemplos populares de middleware son redux-thunk y redux-saga.


// Proceso Sincrónico:

// El flujo de trabajo básico para acciones sincrónicas es el siguiente:

// 	1.	Crear una Acción:
// 	•	Se define una acción que describe un cambio que se quiere realizar.
const addTodo = (todo) => ({
    type: 'ADD_TODO',
    payload: todo
});

// 2.	Disparar la Acción (Dispatch):
// •	Se usa dispatch para enviar la acción al store.
store.dispatch(addTodo('Aprender Redux'));

// 3.	Reducer Procesa la Acción:
// •	El reducer recibe la acción y el estado actual, y devuelve un nuevo estado.

// 4.	Actualizar el Estado:
// •	El store actualiza el estado y notifica a los componentes que están escuchando para que se re-rendericen con el nuevo estado.


// Proceso Asincrónico:

// El flujo de trabajo para acciones asincrónicas es un poco más complejo, y aquí es donde entra el middleware:

// 1.	Crear una Acción Asincrónica:
// •	Utilizando redux-thunk, por ejemplo, se crea una función que retorna otra función. Esta función puede contener lógica asíncrona (como una llamada a una API).
const fetchTodos = () => {
    return (dispatch) => {
      fetch('/api/todos')
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: 'SET_TODOS',
            payload: data
          });
        });
    };
};

// 2.	Disparar la Acción Asincrónica:
// •	Al igual que en el flujo sincrónico, se utiliza dispatch, pero ahora se envía la función en lugar de un objeto.
store.dispatch(fetchTodos());

// 3.	Middleware Maneja la Acción:
// 	•	El middleware (como redux-thunk) intercepta la acción y permite ejecutar la lógica asincrónica. Una vez completada, se puede despachar otra acción con el resultado de la operación.

// 	4.	Reducer Procesa la Nueva Acción:
// 	•	Al completarse la operación asincrónica, se despacha una acción con el nuevo estado, que el reducer procesa para actualizar el estado.

// 	5.	Actualizar el Estado:
// 	•	Al igual que en el flujo sincrónico, el store actualiza el estado y los componentes que lo consumen se re-renderizan.


// Resumen de Flujos
// 	•	Sincrónico: Crear acción → Dispatch → Reducer → Actualizar estado.
// 	•	Asincrónico: Crear acción asincrónica → Dispatch → Middleware maneja → Reducer con nueva acción → Actualizar estado.


// Conclusión

// Redux es una herramienta poderosa que proporciona una forma estructurada y eficiente de gestionar el estado en aplicaciones JavaScript. Su enfoque en la inmutabilidad, la centralización del estado y la organización del código lo convierten en una opción popular para desarrolladores que buscan construir aplicaciones escalables y mantenibles. Al usar Redux, se simplifica la gestión de datos complejos, lo que permite a los desarrolladores centrarse en la creación de una experiencia de usuario fluida y coherente.




