//useEffect: 
//Te permite ejecutar efectos secundarios en componentes funcionales. Puede ser usado para realizar tareas como llamadas a APIs, actualizaciones del DOM, o suscripciones a eventos.

// ¿Cuándo usarlo?
// useEffect se usa cuando necesitas realizar efectos secundarios dentro de un componente. Esto incluye acciones como obtener datos de una API, actualizar el título de la página, o suscribirse/desuscribirse a eventos externos.

// Buena práctica:

// 	•	Úsalo cuando quieras que algo ocurra después de que React haya actualizado el DOM.
// 	•	Si estás interactuando con APIs externas o si quieres ejecutar código basado en cambios de props o estado, useEffect es ideal.
// 	•	Asegúrate de incluir correctamente las dependencias en el array, para que el efecto solo se ejecute cuando sea necesario.

// Imagina esto:

// Imaginemos un escenario en el que además de mostrar el clima, también tienes un temporizador que actualiza automáticamente el clima cada cierto tiempo (por ejemplo, cada 10 segundos). En este caso, es importante asegurarte de que no haya múltiples intervalos activos si el usuario cambia la ciudad varias veces.

import React, { useState, useEffect } from 'react';

const WeatherApp = () => {
  const [city, setCity] = useState('Buenos Aires'); // Estado para la ciudad
  const [weather, setWeather] = useState(null); // Estado para el clima

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${city}`);
      const data = await response.json();
      setWeather(data); // Actualiza el estado con la nueva información del clima
    };

    fetchWeather(); // Llama a la función para obtener el clima

    const interval = setInterval(fetchWeather, 10000); // Actualiza el clima cada 10 segundos

    // Clean-up function
    return () => {
      clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta o antes de que se ejecute el efecto nuevamente
    };
  }, [city]); // La función se ejecutará cada vez que 'city' cambie

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)} // Cambia el estado de la ciudad
      />
      {weather && (
        <div>
          <h2>Clima en {weather.location.name}</h2>
          <p>Temperatura: {weather.current.temp_c} °C</p>
          <p>Condición: {weather.current.condition.text}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;


// Desglose del Ejemplo:

// 	1.	Estado Inicial: Al igual que antes, tienes dos estados: city y weather.
// 	2.	useEffect:
// 	•	Se activa cada vez que city cambia.
// 	•	Dentro del useEffect, tienes una función fetchWeather para obtener la información del clima, que se llama inmediatamente para mostrar el clima actual.
// 	3.	Intervalo:
// 	•	Se establece un intervalo con setInterval que llama a fetchWeather cada 10 segundos. Esto permite que la información del clima se actualice automáticamente sin que el usuario tenga que hacer nada.
// 	4.	Limpieza (Clean-Up):
// 	•	Aquí es donde entra el return. Este return es una función de limpieza que se ejecuta antes de que el componente se desmonte o cuando el efecto se vuelva a ejecutar (por ejemplo, si el usuario cambia la ciudad).
// 	•	clearInterval(interval) detiene el intervalo anterior, asegurando que no haya múltiples intervalos en ejecución. Esto es crucial para evitar que tu aplicación haga demasiadas solicitudes a la API o consuma recursos innecesarios.

// Conclusión

// El uso de la función de limpieza en useEffect es una buena práctica, especialmente en casos donde estableces suscripciones, temporizadores, o manejas eventos que podrían seguir activos después de que el componente se haya desmontado. Así, mantienes tu aplicación eficiente y libre de errores.