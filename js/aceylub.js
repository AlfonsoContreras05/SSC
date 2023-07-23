fetch('/js/catalogos/aceylub.json')
  .then(response => response.json())
  .then(data => {
    const productsContainer = document.querySelector('.products-container');
    const previewContainer = document.querySelector('.products-preview');

    data.productos.forEach(product => {
      // Crear el contenido para mostrar en la vista previa
      const previewContent = `
        <div class="preview" data-target="${product.nombre}">
          <img src="${product.imagen}" alt="${product.nombre}">
          <h3>${product.nombre}</h3>
          <p>${product.descripcion}</p>
          <div class="category">Category: ${product.categoria}</div>
          <div class="price">${product.precio}</div>
          <i class="fas fa-times"></i>
        </div>
      `;
      // Agregar el contenido al contenedor de vista previa
      previewContainer.insertAdjacentHTML('beforeend', previewContent);

      
      // Crear el contenido del producto
      const productContent = `
        <div class="product" data-name="${product.nombre}">
          <img src="${product.imagen}" alt="${product.nombre}">
          <h3>${product.nombre}</h3>
          <p>${product.categoria}</p>
          <div class="price">${product.precio}</div>
        </div>
      `;
      // Agregar el contenido al contenedor de productos
      productsContainer.insertAdjacentHTML('beforeend', productContent);
    });

    const previewBox = previewContainer.querySelectorAll('.preview');

    document.querySelectorAll('.products-container .product').forEach(product => {
      product.onclick = () => {
        previewContainer.style.display = 'flex';
        previewBox.forEach(preview => {
          if (preview.dataset.target === product.getAttribute('data-name')) {
            preview.classList.add('active');
          }
        });
      };
    });

    previewBox.forEach(close => {
      close.querySelector('.fa-times').onclick = () => {
        close.classList.remove('active');
        previewContainer.style.display = 'none';
      };
    });
  })
  .catch(error => {
    console.error('Error al cargar los productos:', error);
  });

  document.getElementById("back-button").addEventListener("click", function() {
    window.history.back(); // Regresar a la vista anterior
 });


//filtro

// Definimos la variable productsContainer y filterInput a nivel global
const productsContainer = document.querySelector(".products-container");
const noResultsMessage = document.getElementById("no-results-message");
const filterInput = document.getElementById("filter-input");

// Función para filtrar los productos según el término de búsqueda
const filtrarProductos = (termino, productos) => {
   // Convertimos el término de búsqueda a minúsculas para hacer la búsqueda case-insensitive
   const terminoMin = termino.toLowerCase();

   // Filtramos los productos que coinciden con el término de búsqueda
   const productosFiltrados = productos.filter((producto) => {
      const nombreMin = producto.nombre.toLowerCase();
      return nombreMin.includes(terminoMin);
   });

   // Mostramos solo los productos filtrados o el mensaje de no coincidencias
   if (productosFiltrados.length > 0) {
      mostrarProductos(productosFiltrados);
      noResultsMessage.style.display = "none";
   } else {
      noResultsMessage.style.display = "block";
      productsContainer.innerHTML = "";
   }
};

// Función para mostrar los productos en el contenedor
const mostrarProductos = (productos) => {
   // Limpiamos el contenedor de productos
   productsContainer.innerHTML = "";

   // Generamos dinámicamente el contenido de los productos y lo agregamos al contenedor
   productos.forEach((producto) => {
      // Creamos elementos para mostrar los detalles de cada producto
      const productoDiv = document.createElement("div");
      productoDiv.classList.add("producto");
      productoDiv.innerHTML = `
         <h4>${producto.nombre}</h4>
         <p>Precio: ${producto.precio}</p>
         <p>Categoría: ${producto.categoria}</p>
         <img src="${producto.imagen}" alt="${producto.nombre}">
      `;
      productsContainer.appendChild(productoDiv);
   });
};

// Función para cargar los datos desde el archivo JSON
// Resto del código del archivo juguetes.js (mostrarProductos y cargarProductosDesdeJSON permanecen sin cambios)

// Función para cargar los productos desde el archivo JSON
const cargarProductosDesdeJSON = async () => {
  try {
    const response = await fetch('ruta-a-tu-archivo-json');
    const data = await response.json();

    const productos = data.productos;
    mostrarProductos(productos);

    // Agregar evento "input" para activar el filtrado en tiempo real
    const filterInput = document.getElementById('filter-input');
    filterInput.addEventListener('input', () => {
      const terminoBusqueda = filterInput.value;
      filtrarProductos(terminoBusqueda, productos);
    });

  } catch (error) {
    console.log('Error al cargar los datos desde el archivo JSON:', error);
  }
};

// Resto del código del archivo juguetes.js (mostrarProductos permanece sin cambios)


// Cargamos los productos desde el archivo JSON al cargar la página
cargarProductosDesdeJSON();
