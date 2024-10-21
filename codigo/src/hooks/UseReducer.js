// El concepto de useReducer proviene de la idea de un “reductor” que se usa comúnmente en programación funcional. Un reducer es una función que recibe el estado actual y una “acción”, y con base en esa acción, devuelve un nuevo estado. Es como un controlador centralizado para manejar los cambios en el estado.

// ¿Cómo funciona?

// 	1.	El estado: useReducer maneja el estado de un componente. A diferencia de useState, que maneja el estado de manera más simple, useReducer es ideal para estados más complejos o para manejar múltiples acciones que pueden modificar ese estado.
// 	2.	El reductor (reducer): Es una función que define cómo debe actualizarse el estado cuando ocurre una acción. El reducer recibe dos parámetros:
// 	•	El estado actual.
// 	•	Una acción que describe el tipo de cambio que debe realizarse (normalmente, una acción tiene un tipo y, opcionalmente, un valor de carga).
// 	3.	La acción: Es un objeto que describe qué debería pasar en el estado. Suele tener la forma { type: 'nombre_de_la_accion', payload: valor }. El type define el tipo de acción que se va a realizar, y el payload contiene cualquier dato necesario para actualizar el estado.
// 	4.	Despacho de acciones: useReducer devuelve un par: el estado actual y una función para “despachar” o ejecutar una acción. Cuando llamas a esta función, disparas el proceso de actualización del estado a través del reductor.


// El reducer debe ser una función pura por varias razones clave:

// 	1.	No tareas asíncronas: No maneja promesas ni async/await, ya que debe devolver el nuevo estado de inmediato.
// 	2.	Nuevo estado siempre: Debe retornar un nuevo objeto de estado sin modificar el anterior, para mantener la integridad del flujo de datos.
// 	3.	No usar APIs del navegador: No interactúa directamente con APIs como localStorage o sessionStorage, ya que estas implican efectos secundarios.
// 	4.	Una acción con argumento: El reducer recibe una acción clara y opcionalmente, datos (payload) para procesarla.

// Esto asegura que el flujo de datos sea predecible y fácil de depurar.


// Cuándo usar useReducer:

// 	•	Estados complejos: Es ideal cuando el estado tiene múltiples valores o hay muchas formas de modificarlo.
// 	•	Múltiples acciones: Si tienes varias acciones diferentes que afectan el estado de maneras distintas, usar un reducer organiza mejor la lógica que si usaras muchos useState.
// 	•	Patrones previsibles: El uso de useReducer es útil cuando quieres seguir un patrón predecible y estructurado para manejar las actualizaciones de estado, lo que es ideal para manejar lógica compleja.


// ¿Cuándo no usar useReducer?

// 	•	Estados simples: Si solo necesitas manejar un estado sencillo (como un booleano o un número), useState es más adecuado y más fácil de implementar.
// 	•	Evitar complejidad innecesaria: Si el uso de useReducer no simplifica o mejora tu código, usar useState podría ser más eficiente y legible.

// Resumen:

// 	•	useReducer es perfecto para manejar estados complejos o múltiples acciones.
// 	•	Ayuda a organizar mejor la lógica de actualización de estado.
// 	•	Puede ser innecesario para estados simples y triviales.



// 1.	Dispatch: Es la función que dispara una acción cuando ocurre algo en la aplicación.
// 2.	Action: Es un objeto que contiene dos partes:
// •	type: Indica el tipo de acción que se ejecutará (ej. INCREMENT).
// •	payload: Datos adicionales que acompañan la acción (opcional).
// 3.	Reducer: Es la función que recibe el estado actual y la acción para calcular y devolver un nuevo estado.


// Ejemplo:

// 	•	Dispatch: Es la función que se ejecuta, por ejemplo, al apretar un botón. Esto dispara una acción.
// 	•	Acción: Esta tiene un type (qué tipo de cambio hacer) y un payload (datos necesarios para ese cambio).
// 	•	Reducer: Toma el estado actual y la acción, y con esa información actualiza el estado según el type y el payload.

// Buenas prácticas:

// 	1.	Mantener la función pura: El reducer no debe tener efectos secundarios. Solo debe tomar el estado y la acción, y devolver un nuevo estado.
// 	2.	Evitar mutaciones: No mutar el estado directamente. Utiliza operadores como ... (spread) para crear un nuevo estado.
// 	3.	Acciones descriptivas: Define types de acción claros y significativos para que el código sea más fácil de entender.
// 	4.	Manejo centralizado de la lógica: El reducer debe contener toda la lógica del estado, evitando colocarla en el componente.

// Malas prácticas:

// 	1.	Lógica compleja en el reducer: Evita poner lógica complicada que haga al reducer difícil de entender. Divide la lógica en funciones auxiliares si es necesario.
// 	2.	Olvidar el valor inicial del estado: Siempre debes definir un estado inicial claro y completo.
// 	3.	Repetir lógica en los componentes: Si haces algo similar en múltiples componentes, considera mover esa lógica al reducer.
// 	4.	Acciones genéricas: Evita acciones ambiguas como "UPDATE_STATE", que no explican qué está haciendo el reducer.


import React, { useReducer } from 'react'; // Importamos React y el hook useReducer

// Definimos el estado inicial del carrito
const initialState = {
  cart: [] // Iniciamos el carrito vacío
};

// Función reducer que maneja las acciones para modificar el estado
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': // Caso para agregar un producto al carrito
      return {
        ...state, // Mantenemos el resto del estado
        cart: [...state.cart, action.payload] // Agregamos el producto del payload al carrito
      };
    case 'REMOVE_FROM_CART': // Caso para eliminar un producto del carrito
      return {
        ...state, // Mantenemos el resto del estado
        cart: state.cart.filter(item => item.id !== action.payload.id) // Eliminamos el producto por su id
      };
    default:
      return state; // En caso de una acción desconocida, retornamos el estado sin cambios
  }
};

// Componente principal del carrito
const ShoppingCart = () => {
  // useReducer devuelve el estado actual y la función dispatch
  const [state, dispatch] = useReducer(cartReducer, initialState); 

  // Función para manejar la acción de agregar un producto
  const handleAddToCart = (product) => {
    dispatch({
      type: 'ADD_TO_CART', // Especificamos la acción que queremos disparar
      payload: product // Pasamos el producto como información a la acción
    });
  };

  // Función para manejar la acción de eliminar un producto
  const handleRemoveFromCart = (product) => {
    dispatch({
      type: 'REMOVE_FROM_CART', // Especificamos la acción para eliminar
      payload: product // Pasamos el producto que queremos eliminar
    });
  };

  return (
    <div>
      <h2>Carrito de compras</h2>
      <ul>
        {/* Recorremos los productos en el estado del carrito y los mostramos */}
        {state.cart.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price} {/* Mostramos nombre y precio del producto */}
            <button onClick={() => handleRemoveFromCart(item)}>
              Eliminar {/* Botón para eliminar el producto */}
            </button>
          </li>
        ))}
      </ul>

      {/* Botón para agregar un producto al carrito */}
      <button onClick={() => handleAddToCart({ id: 1, name: 'Producto A', price: 10 })}>
        Agregar Producto A
      </button>
    </div>
  );
};

export default ShoppingCart;

// Explicación línea por línea:

// 	1.	Importación y estado inicial:
// 	•	Importamos useReducer para manejar el estado del carrito.
// 	•	initialState contiene el carrito vacío.
// 	2.	Reducer:
// 	•	La función cartReducer maneja las acciones con switch.
// 	•	Si la acción es ADD_TO_CART, agregamos el producto al estado.
// 	•	Si la acción es REMOVE_FROM_CART, filtramos y eliminamos el producto por su id.
// 	3.	Componente ShoppingCart:
// 	•	useReducer inicializa el estado del carrito y nos proporciona dispatch para enviar acciones.
// 	•	handleAddToCart dispara la acción ADD_TO_CART para agregar un producto.
// 	•	handleRemoveFromCart dispara la acción REMOVE_FROM_CART para eliminar un producto.
// 	4.	Renderizado:
// 	•	Mostramos los productos del carrito y un botón para eliminarlos.
// 	•	Un botón adicional permite agregar un producto con el handleAddToCart.
