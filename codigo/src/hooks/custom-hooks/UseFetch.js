// useFetch:
// 1.	Objetivo: Este hook te ayuda a obtener datos de una URL y a almacenarlos en una “memoria” (caché) para no tener que volver a pedirlos si ya los tienes.
// 2.	Estado Inicial: Comienza creando un estado donde guardará:
    // •	Los datos que obtuviste.
    // •	Si todavía estás esperando los datos.
    // •	Si ocurrió un error.
// 3.	Efecto: Cada vez que la URL cambia, el hook intenta obtener datos de esa URL.
// 4.	Caché: Primero, verifica si ya tienes los datos guardados. Si están, los utiliza sin hacer otra petición.
// 5.	Fetch: Si no están en la caché, realiza una solicitud para obtenerlos. Si la solicitud es exitosa, guarda los datos en la caché para usarlos la próxima vez.
// 6.	Retorno: Al final, el hook te devuelve los datos, si está cargando y si hubo un error, para que puedas usar esta información en tu componente.

// Uso Práctico:

// Puedes usar este hook en cualquier proyecto donde necesites obtener información de una API. Solo importa useFetch, pasa la URL que necesitas, y tendrás los datos listos para mostrar sin complicarte con la gestión de errores o estados de carga.

import { useEffect, useState } from 'react'; // Importa los hooks useEffect y useState de React

const localCache = {}; // Crea un objeto vacío para almacenar datos en caché

export const useFetch = (url) => { // Declara el hook que recibe una URL como argumento
  
  // Inicializa el estado con datos, estado de carga y errores
  const [state, setState] = useState({
    data: null, // Al principio no hay datos
    isLoading: true, // Inicia en estado de carga
    hasError: false, // No hay errores al principio
    error: null, // No hay error
  });

  // useEffect ejecuta getFetch cada vez que cambia la URL
  useEffect(() => {
    getFetch(); // Llama a la función para obtener datos
  }, [url]); // Dependencia: solo se ejecuta si la URL cambia

  const setLoadingState = () => { // Función para reiniciar el estado de carga
    setState({
      data: null, // Reinicia datos a null
      isLoading: true, // Marca como cargando
      hasError: false, // Reinicia errores
      error: null, // Reinicia error
    });
  };

  const getFetch = async () => { // Función para obtener datos de la URL

    if (localCache[url]) { // Verifica si ya hay datos en caché para esta URL
      console.log('Usando caché'); // Mensaje en consola para confirmar uso de caché
      setState({ // Actualiza el estado con datos de caché
        data: localCache[url], // Usa los datos en caché
        isLoading: false, // Ya no está cargando
        hasError: false, // No hay error
        error: null, // No hay error
      });
      return; // Sale de la función
    }

    setLoadingState(); // Reinicia el estado de carga antes de hacer la petición

    const resp = await fetch(url); // Realiza la solicitud a la URL

    // Simula un retraso de 1.5 segundos (puedes eliminar esta parte en producción)
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (!resp.ok) { // Verifica si la respuesta no es exitosa
      setState({ // Actualiza el estado con el error
        data: null, // No hay datos
        isLoading: false, // Ya no está cargando
        hasError: true, // Marca como que hubo un error
        error: {
          code: resp.status, // Código de error
          message: resp.statusText, // Mensaje de error
        }
      });
      return; // Sale de la función
    }

    const data = await resp.json(); // Convierte la respuesta a JSON
    setState({ // Actualiza el estado con los datos obtenidos
      data: data, // Guarda los datos
      isLoading: false, // Ya no está cargando
      hasError: false, // No hay error
      error: null, // No hay error
    });

    // Manejo del caché
    localCache[url] = data; // Almacena los datos en caché para futuras peticiones
  };

  // Devuelve los datos, el estado de carga y si hubo un error
  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  };
};