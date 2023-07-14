const catalogo = document.querySelector("#catalogo");

fetch("/js/catalogos/aceylub.json")
  .then(response => response.json())
  .then(data => exibeProductos(data.productos))
  .catch(error => console.error("Error al cargar el catálogo:", error));

function exibeProductos(productos) {
  productos.forEach(producto => {
    const card = document.createElement('div');
    card.classList.add('flip-card');

    const cardInner = document.createElement('div');
    cardInner.classList.add('flip-card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('flip-card-front');

    const cardBack = document.createElement('div');
    cardBack.classList.add('flip-card-back');

    const productImage = document.createElement('img');
    productImage.classList.add('product-image');
    productImage.src = producto.imagen;

    const productName = document.createElement('p');
    productName.classList.add('title');
    productName.textContent = producto.nombre;

    const productDescription = document.createElement('p');
    productDescription.classList.add('description');
    productDescription.textContent = producto.descripcion;

    const productPrice = document.createElement('p');
    productPrice.classList.add('price');
    productPrice.textContent = producto.precio;

    cardFront.appendChild(productImage);
    cardBack.appendChild(productName);
    cardBack.appendChild(productDescription);
    cardBack.appendChild(productPrice);

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);

    card.appendChild(cardInner);

    catalogo.appendChild(card);
  });
}

// Agrega esta función para habilitar el desplazamiento suave
function scrollToSection(event) {
    event.preventDefault();
    const target = event.target.getAttribute('href');
    document.querySelector(target).scrollIntoView({
      behavior: 'smooth'
    });
  }
  
  // Selecciona los enlaces de navegación y agrega el evento de clic
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', scrollToSection);
  });
  
// Agrega la clase "show" a los enlaces de navegación después de 1 segundo
window.addEventListener('load', () => {
    setTimeout(() => {
      navLinks.forEach(link => {
        link.classList.add('show');
      });
    }, 1000);
  });
  