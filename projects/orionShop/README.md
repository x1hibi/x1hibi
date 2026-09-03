# OrionShop

OrionShop es una SPA desarrollada con webcomponents que simula una tienda virtual.

## Requisitos 
Crear dos Web Components independientes que trabajen en conjunto:
- <product-list> administrar y mostrar los productos disponibles.
- <shopping-cart> administrar los productos agregados al carrito y calcular el total.
## Especificaciones
### Web Component 1 — product-list
Debe:
* Mantener una lista de productos.
* Mostrar nombre y precio de cada producto.
* Tener un botón Agregar al carrito para cada producto.
* Permitir agregar productos al <shopping-cart>.
* Utilizar propiedades para manejar la información de los productos.
* Utilizar connectedCallback() y render().
* Utilizar métodos propios del componente.
### Web Component 2 — shopping-cart
Debe:
* Mantener los productos agregados.
* Mostrar los productos dentro del carrito.
* Mostrar nombre, precio y cantidad.
* Permitir eliminar productos.
* Calcular y mostrar el total.
* Utilizar propiedades para manejar su información.
* Utilizar connectedCallback() y render().
* Utilizar métodos propios del componente.
### Condiciones
* Ambos componentes deben estar implementados mediante class.
* Utilizar extends HTMLElement.
* Inicializar propiedades desde constructor().
* Utilizar super().
* Separar la generación del HTML mediante render().
* Utilizar métodos y propiedades del componente.
* Investigar cómo comunicar información entre ambos Web Components.