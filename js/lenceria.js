const catalogo = document.querySelector("#catalogo");

fetch("/js/catalogos/lenceria.json")
  .then(response => response.json())
  .then(data => exibeProductos(data.productos))
  .catch(error => console.error("Error al cargar el catálogo:", error));

function exibeProductos(productos) {
  productos.forEach(producto => {
    catalogo.innerHTML += `
      <div class='singleFilm card'>
        <div class="front">
          <img src="${producto.imagen}">
        </div>
        <div class="back">
          <span class='infoProducto'>
            ${producto.nombre}<hr>
            ${producto.descripcion}<hr>
            ${producto.precio}
          </span>
        </div>
      </div>
    `;
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
  