// useMemo:
// se utiliza para memorizar (o “recordar”) resultados de cálculos costosos y evitar que se vuelvan a calcular innecesariamente en cada renderizado. Esto puede mejorar el rendimiento de tu aplicación, especialmente si estás trabajando con operaciones pesadas.


// ¿Cuándo usarlo?
// useMemo es útil cuando tienes cálculos costosos que no quieres recalcular en cada renderizado. Por ejemplo, si filtras o realizas cálculos con datos complejos, puedes usar useMemo para que React memorice el resultado hasta que cambien sus dependencias.

// Buena práctica:

// 	•	Úsalo para mejorar el rendimiento en componentes complejos o en situaciones donde realizar la misma operación una y otra vez pueda afectar la experiencia del usuario.
// 	•	Sin embargo, no abuses de useMemo. Solo úsalo si el cálculo es realmente costoso o si el re-renderizado innecesario está afectando el rendimiento.

// ¿Cuándo es una Función Costosa?

// Una función se considera costosa cuando su ejecución requiere una cantidad significativa de tiempo o recursos, lo que puede causar que la aplicación se sienta lenta o menos responsiva. Algunos ejemplos de funciones costosas incluyen:

// 	•	Cálculos complejos: Realizar operaciones matemáticas intensivas, como cálculos de estadísticas o álgebra lineal.
// 	•	Manipulación de datos: Procesar grandes conjuntos de datos, como filtrar o mapear listas extensas.
// 	•	Llamadas a la API: Consultas a bases de datos o servicios externos que tardan tiempo en completarse.

// Identificando Funciones Costosas

// Para identificar funciones que podrían ser costosas:

// 	1.	Tiempo de Ejecución: Usa herramientas como el panel de rendimiento en Chrome DevTools para medir cuánto tiempo tarda una función en ejecutarse.
// 	2.	Análisis de Uso: Observa si el rendimiento de la aplicación disminuye significativamente al ejecutar ciertas funciones. Si un componente se vuelve lento al cambiar el estado, puede ser una señal de que algunas funciones son costosas.
// 	3.	Experiencia del Usuario: Si los usuarios experimentan retrasos o bloqueos al interactuar con la aplicación, es posible que haya funciones que deban ser optimizadas.



// Ejemplo de useMemo: Filtrar una Lista de Nombres

// Imaginemos que tienes una lista de nombres y quieres filtrar los nombres que comienzan con una letra específica. Utilizaremos useMemo para evitar recalcular la lista filtrada cada vez que se renderiza el componente, a menos que cambie la lista original o la letra de filtro.


import React, { useState, useMemo } from 'react';

const NameList = () => {
  const [filter, setFilter] = useState(''); // Estado para el filtro
  const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank']; // Lista de nombres

  // Utiliza useMemo para memorizar el resultado de la filtración
  const filteredNames = useMemo(() => {
    console.log('Filtrando nombres...'); // Mensaje para mostrar que se está filtrando
    return names.filter(name => name.toLowerCase().startsWith(filter.toLowerCase()));
  }, [filter, names]); // Solo se recalcula si 'filter' o 'names' cambian

  return (
    <div>
      <input 
        type="text" 
        placeholder="Filtrar nombres" 
        value={filter} 
        onChange={(e) => setFilter(e.target.value)} 
      />
      <ul>
        {filteredNames.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default NameList;



// Desglose del Código:

// 	1.	Estado del Filtro:
const [filter, setFilter] = useState('');
// •	Aquí definimos un estado filter que almacenará la cadena de texto que se utilizará para filtrar los nombres. Comienza como una cadena vacía.
// 2.	Lista de Nombres:
const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank'];
// •	Esta es la lista original de nombres que queremos filtrar.
// 3.	Uso de useMemo:
const filteredNames = useMemo(() => {
    console.log('Filtrando nombres...');
    return names.filter(name => name.toLowerCase().startsWith(filter.toLowerCase()));
}, [filter, names]);

//   •	Aquí es donde entra useMemo.
//   •	La función pasada a useMemo se ejecutará solo si el filter o la lista de names cambian.
//   •	Esto significa que si el componente se vuelve a renderizar por otras razones (por ejemplo, un cambio de estado en otro lugar), filteredNames no se recalculará a menos que filter o names hayan cambiado.
//   •	Importante: El console.log dentro del useMemo te permite ver cuándo se ejecuta el filtrado.

// 4.	Renderizado:
// •	El input se usa para capturar el filtro que el usuario ingresa. Cuando el valor cambia, se actualiza el estado filter.
// •	La lista de nombres filtrados se muestra en un elemento <ul>.








