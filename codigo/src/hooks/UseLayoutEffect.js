// useLayoutEffect 
// Es similar a useEffect, pero se ejecuta sincrónicamente después de que todas las modificaciones del DOM están listas. Se usa cuando necesitas medir el DOM antes de que el navegador pinte la pantalla.

// ¿Cuándo usarlo?
// useLayoutEffect se usa cuando necesitas realizar una tarea sincrónica justo después de que el DOM se ha actualizado pero antes de que el navegador haya pintado los cambios en pantalla. Es común en casos donde necesitas medir el DOM (por ejemplo, obtener el tamaño o posición de un elemento) y ajustar algo inmediatamente después.

// Buena práctica:

// 	•	Úsalo con cuidado. Generalmente, la mayoría de los efectos deberían manejarse con useEffect, pero si el orden y la sincronización son importantes (por ejemplo, calcular el tamaño de un div antes de pintar), entonces useLayoutEffect es el correcto.
// 	•	Solo recurre a él cuando realmente necesites esa precisión para modificar algo visual de inmediato, como ajustar animaciones o calcular tamaños.

// Situación o Escenario:
// Imaginemos que tenemos un componente que muestra un cuadro y queremos medir su ancho después de que se haya renderizado. Esto puede ser útil, por ejemplo, para ajustar el diseño o el estilo de otros elementos en función del tamaño del cuadro.

import React, { useState, useLayoutEffect, useRef } from 'react';

const ResizableBox = () => {
  // Estado para almacenar el tamaño del cuadro (ancho y alto)
  const [boxSize, setBoxSize] = useState({ width: 0, height: 0 });
  const boxRef = useRef(null); // Referencia para el elemento del cuadro

  // useLayoutEffect se ejecuta después de que el DOM ha sido actualizado
  useLayoutEffect(() => {
    // Función para medir el tamaño del cuadro
    const updateSize = () => {
      if (boxRef.current) { // Verifica si la referencia está disponible
        const { width, height } = boxRef.current.getBoundingClientRect(); // Obtiene el ancho y alto del cuadro
        setBoxSize({ width, height }); // Actualiza el estado con las dimensiones
      }
    };

    updateSize(); // Llama a la función para medir el tamaño al montar el componente

    // Agrega un listener para el redimensionado de la ventana
    window.addEventListener('resize', updateSize);

    // Limpia el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []); // Dependencias vacías para que se ejecute solo al montar

  return (
    <div>
      <div
        ref={boxRef} // Asigna la referencia al cuadro
        style={{
          width: '200px', // Ancho fijo
          height: '200px', // Alto fijo
          backgroundColor: 'lightblue', // Color de fondo
          border: '1px solid blue', // Borde azul
          display: 'flex', // Usamos flexbox para centrar el contenido
          justifyContent: 'center', // Centra horizontalmente
          alignItems: 'center', // Centra verticalmente
          margin: '20px', // Margen alrededor del cuadro
        }}
      >
        Cuadro
      </div>
      <p>
        Tamaño del cuadro: {boxSize.width}px x {boxSize.height}px
      </p> {/* Muestra el tamaño del cuadro */}
    </div>
  );
};

export default ResizableBox;


// Explicación del Código:
// 	•	Estado y Referencia: Se usa useState para manejar el tamaño del cuadro y useRef para referenciar el cuadro en el DOM.
// 	•	useLayoutEffect: Se utiliza para medir el tamaño del cuadro después de que se haya renderizado. Esto asegura que los cálculos de tamaño se realicen antes de que el navegador dibuje la pantalla.
// 	•	updateSize: Esta función mide el ancho y la altura del cuadro y actualiza el estado. Se llama inmediatamente al montar el componente y también se establece un listener para redimensionar la ventana.
// 	•	Limpieza: Se asegura de limpiar el listener cuando el componente se desmonta para evitar fugas de memoria.

