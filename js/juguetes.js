fetch('/js/catalogos/juguetes.json')
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
          <p>${product.descripcion}</p>
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
