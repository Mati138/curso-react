// UseState: 
//Es un hook que te permite agregar y manejar el estado dentro de componentes funcionales en React. Define una variable de estado y su función para actualizarla.
//Situación o Escenario:
//Imagina que estás creando un contador simple. Cada vez que el usuario haga clic en un botón, el contador debe incrementarse en 1.

import React, { useState } from 'react';

function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <div>
      <p>Has hecho clic {contador} veces</p>
      <button onClick={() => setContador(contador + 1)}>
        Incrementar
      </button>
    </div>
  );
}

export default Contador;

//Notas adicionales:
//•	useState devuelve un array con dos elementos: la variable de estado y una función para actualizarla (setContador en este caso).
//•	El valor inicial del estado (en este caso 0) se pasa como argumento a useState.

// ¿Cuándo usarlo?
// useState se utiliza cuando necesitas manejar valores que pueden cambiar con el tiempo, como la entrada de un formulario, el      estado de un botón, o el contenido que se muestra en pantalla.

// Buena práctica:
// Es una buena práctica usar useState para cualquier dato que necesite provocar un re-render del componente cuando cambie. Si el estado de un valor afecta la interfaz, como la visibilidad de un modal o el valor de un input, debes usar useState.