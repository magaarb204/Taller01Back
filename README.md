# Informe

## 1. ¿Cuál estrategia obtuvo mejor tiempo de ejecución?

La concurrente (con `Promise.all`). En el código, la estrategia secuencial consulta 
las páginas una por una, esperando a que cada petición termine antes de lanzar la 
siguiente. La concurrente en cambio agrupa las páginas en lotes y las pide todas al 
mismo tiempo dentro de cada lote, aprovechando el paralelismo en vez de hacer todo 
uno detrás de otro. Por eso el tiempo total resulta menor, y de hecho en `main.js` 
el resultado concurrente es el que se usa como definitivo, lo que confirma que fue 
la estrategia más eficiente.

## 2. ¿Qué ventajas ofrece `Promise.all()`?

- Lanza varias peticiones al mismo tiempo en vez de una por una.
- El tiempo total lo define la petición más lenta del grupo, no la suma de todas.
- Espera a que todas terminen y devuelve los resultados en orden.
- Simplifica el código: una sola línea en vez de manejar await uno por uno.

## 3. ¿Qué desventajas puede tener realizar demasiadas solicitudes concurrentes?

- Puede disparar errores 429 por exceder el límite de la API (por eso el código 
  tiene reintentos con backoff).
- Si una petición falla, `Promise.all` rechaza todo el grupo, aunque las demás sí 
  hayan funcionado.
- Puede saturar conexiones o recursos del servidor.
- Es más difícil de depurar cuando algo falla, porque todo pasa en paralelo.

## 4. ¿En qué situaciones usaría consultas secuenciales y en cuáles concurrentes?

**Secuenciales:**
- Cuando una petición depende del resultado de otra.
- Cuando la API es muy estricta con el límite de peticiones.
- Cuando el orden importa.

**Concurrentes:**
- Cuando las peticiones son independientes (como aquí, cada página no depende de otra).
- Cuando se prioriza la velocidad.
- Cuando conviene controlar la concurrencia en lotes (como se hace en este código) 
  para no saturar la API.
