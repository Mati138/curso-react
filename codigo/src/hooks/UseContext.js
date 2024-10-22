// El useContext es un hook en React que permite compartir y acceder a datos entre componentes sin tener que pasar “props” manualmente a través de múltiples niveles de componentes.
// Se utiliza cuando varios componentes necesitan acceder a la misma información, como un tema de color, el idioma de la aplicación, o el estado de autenticación de un usuario.
// Su estructura básica consiste en:

import { Children } from "react";

// 	    1.	   Creación del contexto con React.createContext.
// 	    2.	   Provisión del contexto envolviendo componentes con <Provider>.
// 	    3.	   Consumo del contexto usando useContext para acceder al valor.

// Este hook es útil para evitar la “prop drilling”, que es el paso repetitivo de props innecesarios entre componentes intermedios.


//Cuándo usar useContext:

// 	1.	Mejor usarlo cuando tienes información que varios componentes necesitan, como:
// 	•	Autenticación del usuario (si el usuario está logueado o no).
// 	•	Temas o configuraciones globales (modo oscuro, idiomas).
// 	•	Datos que son constantes o se actualizan raramente, pero necesitan estar accesibles desde varias partes.
// 	2.	No usarlo cuando:
// 	•	Propagación local de datos: Si los datos solo necesitan pasar entre un padre y un hijo, es mejor pasar props directamente.
// 	•	Estados que cambian con frecuencia: Usar useContext para manejar datos que cambian constantemente puede causar demasiados renderizados innecesarios, ya que cualquier cambio en el contexto forzará el re-render de todos los componentes que lo consumen.

// Buenas prácticas:

// 	•	Mantenlo pequeño y específico: Usa contextos específicos para datos diferentes, no uno global gigante.
// 	•	Optimiza con memorization: Combina con useMemo para evitar renderizados innecesarios cuando el contexto no ha cambiado.
// 	•	Encapsula lógica de consumo: Crea custom hooks que manejen la lógica de consumo del contexto para mantener el código más limpio.

// Malas prácticas:

// 	•	Overuse: No uses useContext para todo. Si solo se trata de datos locales o pasados por un par de niveles, mejor usa props.
// 	•	Renderizados innecesarios: Si los datos

// Partes del useContext:

// 1.	createContext:
//      •	Es una función que se utiliza para crear un contexto en React.
//      •	Un contexto permite compartir datos entre componentes sin tener que pasar props manualmente a través de cada nivel de la jerarquía de componentes.
//      •	Cuando llamas a createContext, obtienes un objeto con dos propiedades: Provider y Consumer.
import { createContext } from "react";
export const MyContext = createContext(); // El export lo usamos en caso de que trabajemos en archivos distintos para exportarle el contexto al componente que se va a encargar de proveerlo (2)


// 2.	ContextProvider:
//      •	Es el componente que se genera al usar createContext.
//      •	Se utiliza para envolver a los componentes que necesitan acceder a los datos del contexto.
//      •	Este componente recibe una prop llamada value, que es el valor que deseas compartir con los componentes hijos.


// import { MyContext } from 'ruta del archivo'  Importamos en caso de que estemos trabajando el createContext y el Provider en archivos diferentes, en caso de que lo manejemos en un mismo archivo no es necesario hacer uso de las importaciones.
<MyContext.Provider value={ valor = 'valor'}>
  {/* Componentes hijos */}
</MyContext.Provider>


// 3.	Uso en Componentes:
//      •	En los componentes que necesitan acceder a los datos del contexto, usas el hook useContext para obtener el valor.
import { useContext } from "react";
import { MyContext } from 'ruta del archivo'  // En este caso siempre es necesario importarlo porque se lo usa en los componentes que necesitan del contexto (Siempre son archivos diferentes)
const value = useContext(MyContext);



// Ejemplo Sencillo

// Supongamos que tienes un contexto que almacena un tema (claro u oscuro) para tu aplicación:

// Crear el contexto
const ThemeContext = createContext();

// Crear un componente que usa el Provider
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Componente que consume el contexto
import { useContext } from "react";
const ThemedComponent = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
      <p>El tema actual es: {theme}</p>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Cambiar Tema
      </button>
    </div>
  );
};

// Uso del Provider en la aplicación
const App = () => (
  <ThemeProvider>
    <ThemedComponent />
  </ThemeProvider>
);

// Resumen

// 	•	createContext se utiliza para crear un contexto que puede almacenar datos.
// 	•	ContextProvider envuelve los componentes que necesitan acceder a esos datos y proporciona el valor.
// 	•	useContext se utiliza en componentes hijos para acceder a esos datos.
