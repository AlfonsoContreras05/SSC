// script.js

fetch('/js/catalogos/juguetes.json')
  .then(response => response.json())
  .then(data => {
    const productsContainer = document.querySelector('.products-container');
    const previewContainer = document.querySelector('.products-preview');

    data.productos.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');
      productDiv.setAttribute('data-name', product.nombre);

      const productImage = document.createElement('img');
      productImage.src = product.imagen;
      productImage.alt = product.nombre;

      const productName = document.createElement('h3');
      productName.textContent = product.nombre;

      const productRating = document.createElement('div');
      productRating.classList.add('stars');
      const rating = Math.floor(Math.random() * 5) + 1;
      for (let i = 0; i < 5; i++) {
        const starIcon = document.createElement('i');
        if (i < rating) {
          starIcon.classList.add('fas', 'fa-star');
        } else if (i === rating) {
          starIcon.classList.add('fas', 'fa-star-half-alt');
        } else {
          starIcon.classList.add('far', 'fa-star');
        }
        productRating.appendChild(starIcon);
      }
      const ratingCount = document.createElement('span');
      ratingCount.textContent = `( ${Math.floor(Math.random() * 500)} )`;
      productRating.appendChild(ratingCount);

      const productDescription = document.createElement('p');
      productDescription.textContent = product.descripcion;

      const productPrice = document.createElement('div');
      productPrice.classList.add('price');
      productPrice.textContent = product.precio;

      const buttonsDiv = document.createElement('div');
      buttonsDiv.classList.add('buttons');

      const buyButton = document.createElement('a');
      buyButton.classList.add('buy');
      buyButton.href = '#';
      buyButton.textContent = 'buy now';

      const cartButton = document.createElement('a');
      cartButton.classList.add('cart');
      cartButton.href = '#';
      cartButton.textContent = 'add to cart';

      buttonsDiv.appendChild(buyButton);
      buttonsDiv.appendChild(cartButton);

      productDiv.appendChild(productImage);
      productDiv.appendChild(productName);
      productDiv.appendChild(productRating);
      productDiv.appendChild(productDescription);
      productDiv.appendChild(productPrice);
      productDiv.appendChild(buttonsDiv);

      productsContainer.appendChild(productDiv);

      productDiv.onclick = () => {
        previewContainer.style.display = 'flex';
        previewBox.forEach(preview => {
          if (preview.dataset.target === product.nombre) {
            preview.classList.add('active');
          }
        });
      };
    });

    const previewBox = previewContainer.querySelectorAll('.preview');

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
