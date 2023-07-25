document.addEventListener("DOMContentLoaded", function () {
    let productsData = []; // Variable global para almacenar los productos de los tres catálogos
  
    // Función para generar la tabla de productos
    function generateProductTable(products) {
      const tableBody = document.querySelector('#product-table tbody');
  
      // Limpia la tabla antes de generar los nuevos datos
      tableBody.innerHTML = '';
  
      // Genera las filas de la tabla con los datos de cada producto
      products.forEach(product => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td>${product.nombre}</td>
          <td>${product.precio}</td>
          <td>${product.categoria}</td>
          <td class="button-cell">
          <button class="edit-button button" data-name="${product.nombre}">Editar</button>
          <button class="delete-button button" data-name="${product.nombre}">Eliminar</button>
        </td>
                  </td>
        `;
  
        tableBody.appendChild(newRow);
      });
    }
  
    // Event listener para mostrar el formulario de agregar producto (popup) al hacer clic en el botón
    document.getElementById('add-product-button').addEventListener('click', function() {
      const addProductPopup = document.getElementById('add-product-popup');
      addProductPopup.style.display = 'block';
    });
  
    // Event listener para agregar un producto al hacer clic en el botón "Agregar"
    document.getElementById('submit-button').addEventListener('click', function() {
      // Obtener los valores de los campos del formulario
      const productName = document.getElementById('product-name').value;
      const productDescription = document.getElementById('product-description').value;
      const productPrice = document.getElementById('product-price').value;
      const productImage = document.getElementById('product-image').value;
      
      // Obtener el valor seleccionado del menú desplegable (el catálogo)
      const productCategory = document.getElementById('product-category').value;
    
      // Verificar si el catálogo seleccionado ya existe en productsData
      if (!productsData[productCategory]) {
        // Si no existe, crea un nuevo array para ese catálogo
        productsData[productCategory] = [];
      }
    
      // Crear un objeto con la información del nuevo producto
      const newProduct = {
        nombre: productName,
        descripcion: productDescription,
        precio: productPrice,
        imagen: productImage,
        categoria: productCategory
      };
    
      // Agregar el nuevo producto al catálogo correspondiente en productsData
      productsData[productCategory].push(newProduct);
    
      // Actualizar la tabla con los nuevos datos
      generateProductTable(productsData[productCategory]);
    
      // Ocultar el popup del formulario
      const addProductPopup = document.getElementById('add-product-popup');
      addProductPopup.style.display = 'none';
    
      // Mostrar mensaje de éxito o error
      const resultMessage = document.getElementById('result-message');
      resultMessage.textContent = 'Producto agregado exitosamente.';
      resultMessage.classList.add('success');
      resultMessage.style.display = 'block';
    });
  
    // Event listener para cancelar el formulario de agregar producto al hacer clic en el botón "Cancelar"
    document.getElementById('cancel-button').addEventListener('click', function() {
      // Ocultar el popup del formulario
      const addProductPopup = document.getElementById('add-product-popup');
      addProductPopup.style.display = 'none';
    });
  
    // Función para cargar los productos de un catálogo específico
    async function loadProducts(catalogo) {
      try {
        const response = await fetch(`/js/catalogos/${catalogo}.json`);
        const data = await response.json();
        return data.productos;
      } catch (error) {
        console.error(`Error al cargar los productos del catálogo ${catalogo}:`, error);
        return [];
      }
    }
  
    // Función para cargar y mostrar los productos de los tres catálogos
    async function loadAndShowProducts() {
      const catalogos = ["lenceria", "juguetes", "aceylub"];
  
      // Cargar los productos de los tres catálogos
      const allProducts = [];
      for (const catalogo of catalogos) {
        const products = await loadProducts(catalogo);
        allProducts.push(...products);
      }
  
      // Almacenar los productos en la variable global productsData
      productsData = allProducts;
  
      // Generar y mostrar la tabla con los productos cargados
      generateProductTable(productsData);
  
      // Llenar las opciones del selector de categorías
      fillCategorySelector();
    }
  
    // Llamada a la función para cargar y mostrar los productos al cargar la página
    loadAndShowProducts();
  
    // Función para llenar las opciones del selector de categorías
    function fillCategorySelector() {
      const categoryFilter = document.getElementById('category-filter');
      const uniqueCategories = [...new Set(productsData.map(product => product.categoria))];
  
      uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.textContent = category;
        option.value = category.toLowerCase();
        categoryFilter.appendChild(option);
      });
    }
    
    // Event listener para el selector de categorías
    document.getElementById('category-filter').addEventListener('change', function() {
      const filterValue = this.value.toLowerCase();
    
      // Filtrar los productos basados en la categoría seleccionada
      const filteredProducts = filterValue
        ? productsData.filter(product => product.categoria.toLowerCase() === filterValue)
        : productsData;
    
      // Luego, renderizar los productos filtrados en la tabla
      generateProductTable(filteredProducts);
    });
  });
  