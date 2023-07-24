// Primero, obtén la referencia al campo de entrada de búsqueda
const filterInput = document.getElementById('filter-input');

// Asegúrate de que tus productos están disponibles en un scope más amplio
let productsData;

fetch('/js/catalogos/juguetes.json')
  .then(response => response.json())
  .then(data => {
    productsData = data.productos; // Almacena tus productos en la variable productsData
    renderProducts(productsData);
  })
  .catch(error => {
    console.error('Error al cargar los productos:', error);
  });

// La función de renderizado ahora se ocupa de un conjunto de productos que se pasan como argumento
function renderProducts(products) {
  const productsContainer = document.querySelector('.products-container');
  const previewContainer = document.querySelector('.products-preview');

  // Asegúrate de que los contenedores están vacíos antes de llenarlos
  productsContainer.innerHTML = '';
  previewContainer.innerHTML = '';

  products.forEach(product => {
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
}

// Agrega un event listener para la entrada del filtro
filterInput.addEventListener('input', function() {
  const filterValue = this.value.toLowerCase();

  // Filtra los productos basado en el nombre
  const filteredProducts = productsData.filter(product => product.nombre.toLowerCase().includes(filterValue));

  // Luego, renderiza los productos filtrados
  renderProducts(filteredProducts);

  // Si no se encontraron productos, muestra un mensaje de error
  if (filteredProducts.length === 0) {
    document.getElementById('no-results-message').style.display = 'block';
  } else {
    document.getElementById('no-results-message').style.display = 'none';
  }
});

// Event listener para el botón de regreso
document.getElementById("back-button").addEventListener("click", function() {
  window.location.href = "../index.html";
});


