//useRef: 
//Es una herramienta versátil que te permite acceder y manipular el DOM directamente, almacenar valores mutables sin causar re-renderizaciones, y manejar temporizadores o referencias a elementos de forma efectiva.


// ¿Cuándo usarlo?
// useRef se usa en dos situaciones principales:

// 	1.	Acceso directo al DOM: Por ejemplo, para manipular directamente un input o div.
// 	2.	Almacenar valores persistentes: Se puede usar para mantener datos entre renderizados sin forzar un re-render (como un contador de intervalos o un valor mutable).

// Buena práctica:

// 	•	Utiliza useRef cuando necesitas un valor que no debe disparar un re-render. Por ejemplo, si quieres almacenar un temporizador o hacer referencia a un elemento del DOM.
// 	•	Evita usarlo para gestionar estados que influyen directamente en la UI; para eso, usa useState.



import React, { useRef, useEffect } from 'react';

const NameForm = () => {
  const inputRef = useRef(null); // Creamos una referencia para el input

  useEffect(() => {
    // Al montar el componente, hacemos foco en el input
    inputRef.current.focus(); 
  }, []); // Este efecto se ejecuta una vez cuando se monta el componente

  return (
    <div>
      <h1>Ingrese su Nombre</h1>
      <input 
        type="text" 
        ref={inputRef} // Asignamos la referencia al input
        placeholder="Escribe tu nombre aquí" 
      />
    </div>
  );
};

export default NameForm;


// Desglose del Ejemplo:

// 	1.	useRef:
// 	•	Usamos useRef para crear una referencia llamada inputRef. Esta referencia no causa una nueva renderización cuando cambia, lo que la hace ideal para almacenar elementos del DOM.
// 	2.	useEffect:
// 	•	Al montar el componente, useEffect se ejecuta (gracias al arreglo vacío []).
// 	•	Dentro de useEffect, accedemos a la referencia inputRef.current y llamamos a su método focus(), que pone el foco en el campo de entrada.
// 	3.	Asignación de la Referencia:
// 	•	En el input, utilizamos ref={inputRef} para asociar nuestra referencia al campo de entrada.

// Conclusión

// Este ejemplo muestra cómo useRef puede ser útil para interactuar directamente con el DOM. Aquí, le estamos diciendo al navegador que posicione el cursor en el campo de entrada tan pronto como se cargue el componente, mejorando así la experiencia del usuario.