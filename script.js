// Carrusel
const carrusel = document.querySelector(".carrusel"),
  items = () => document.querySelectorAll(".item"),
  paginacionBotones = document.querySelectorAll(".boton-paginacion");

let currentIndex = 0,
  isAnimating = false;

const updatePagination = () =>
  paginacionBotones.forEach((boton, i) =>
    boton.classList.toggle("activo", i === currentIndex)
  );

const moveCarouselToIndex = (index) => {
  if (isAnimating) return;
  isAnimating = true;

  const totalItems = items().length;
  const targetIndex = (index + totalItems) % totalItems;

  const direction = targetIndex > currentIndex ? "next" : "prev";
  const steps = Math.abs(targetIndex - currentIndex);

  for (let i = 0; i < steps; i++) {
    const insertAtEnd = direction === "next";
    const newItem = (
      insertAtEnd ? items()[0] : items()[totalItems - 1]
    ).cloneNode(true);

    carrusel[insertAtEnd ? "appendChild" : "insertBefore"](newItem, items()[0]);
    if (!insertAtEnd) carrusel.style.transform = "translateX(-100%)";

    setTimeout(() => {
      carrusel.style.transition = "transform 0.5s ease-in-out";
      carrusel.style.transform = `translateX(${insertAtEnd ? "-100%" : "0"})`;

      carrusel.addEventListener(
        "transitionend",
        () => {
          carrusel.style.transition = "none";
          insertAtEnd
            ? carrusel.removeChild(items()[0])
            : carrusel.removeChild(items()[totalItems - 1]);
          carrusel.style.transform = "translateX(0)";
          isAnimating = false;
          currentIndex = targetIndex;
          updatePagination();
        },
        { once: true }
      );
    }, 50);
  }
};

const showNextSlide = () => moveCarouselToIndex(currentIndex + 1);
const showPreviousSlide = () => moveCarouselToIndex(currentIndex - 1);

document.querySelector(".prev").addEventListener("click", showPreviousSlide);
document.querySelector(".next").addEventListener("click", showNextSlide);

// Desactivar navegación con botones de paginación
paginacionBotones.forEach((boton) =>
  boton.removeEventListener("click", () => moveCarouselToIndex(i))
);

// Características
const caracteristicas = document.querySelectorAll(".caracteristica"),
  imagenCaracteristica = document.querySelector(".imagen-caracteristica img"),
  tituloCaracteristica = document.getElementById("imagen-titulo"),
  descripcionCaracteristica = document.getElementById("imagen-descripcion");

const caracteristicaData = [
  {
    imagen: "img/caracteristica1.png",
    titulo: "Asistencia en la Creación de Planes de Contingencia",
    descripcion: "Eco Sentry ofrece una funcionalidad avanzada para ayudar a las comunidades, empresas y autoridades locales a desarrollar planes de contingencia efectivos y personalizados. Esta herramienta es esencial para la preparación y respuesta ante eventos ambientales extremos, asegurando que las acciones preventivas y de mitigación se ejecuten de manera oportuna y organizada.",
  },
  {
    imagen: "img/caracteristica2.png",
    titulo: "Información Ambiental Clara y Accesible",
    descripcion: "Eco Sentry se dedica a proporcionar información ambiental precisa y actualizada en tiempo real, accesible para todos los usuarios, independientemente de su nivel de conocimiento técnico. Nuestro objetivo es empoderar a las personas y las comunidades con datos ambientales claros y comprensibles para que puedan tomar decisiones informadas y protegerse ante posibles amenazas ambientales.",
  },
  {
    imagen: "img/caracteristica3.png",
    titulo: "Monitoreo Hidrometeorológico en Tiempo Real",
    descripcion: "El monitoreo hidrometeorológico en tiempo real se refiere a la observación y medición continua y actualizada de variables climáticas e hidrológicas como la lluvia, la temperatura, la humedad, el viento, los niveles de los ríos, y otros fenómenos relacionados. Esta información crucial se recopila mediante una red de estaciones de monitoreo que pueden incluir estaciones meteorológicas automáticas, radares meteorológicos, satélites y otros dispositivos de medición.",
  },
  {
    imagen: "img/caracteristica4.png",
    titulo: "Alertas Tempranas",
    descripcion: "Eco Sentry brinda información esencial para emitir alertas tempranas sobre eventos meteorológicos extremos como huracanes, tormentas, inundaciones y sequías. Así mismo, permite a las autoridades y a la población prepararse con anticipación y tomar medidas preventivas, reduciendo significativamente el riesgo de daños materiales y pérdidas de vidas humanas.",
  },
];

caracteristicas.forEach((car, i) => {
  car.addEventListener("click", () => {
    caracteristicas.forEach((c) => c.classList.remove("activa"));
    car.classList.add("activa");
    const { imagen, titulo, descripcion } = caracteristicaData[i];
    imagenCaracteristica.src = imagen;
    tituloCaracteristica.textContent = titulo;
    descripcionCaracteristica.innerHTML = descripcion;

    imagenCaracteristica.style.transition = 'none';
    tituloCaracteristica.style.transition = 'none';
  });
});

// Navegación
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    const offsetTop = targetId === "nosotros"
      ? targetElement.offsetTop - 60 + document.querySelector(".footer-seccion").offsetHeight
      : targetElement.offsetTop - 60;
    window.scrollTo({ top: offsetTop, behavior: "smooth" });
  });
});

// Iconos de Usuario y Barra de Búsqueda
[".icono-usuario", ".barra-busqueda-contenedor"].forEach((selector) => {
  document.querySelector(selector).addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
});

document.querySelector(".icono-busqueda").addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Cambio de Título en Blur/Focus
let tituloAnterior = document.title;

window.addEventListener("blur", () => (document.title = "¡No te vayas! ¡Vuelve! 😱"));
window.addEventListener("focus", () => (document.title = tituloAnterior));

// Efecto de Hover en Noticias y Características
document.querySelectorAll('.tarjeta-servicio').forEach((tarjeta) => {
  tarjeta.addEventListener('mouseover', () => {
    tarjeta.style.transform = 'scale(1.05)';
    tarjeta.querySelector('.contenido-emergencias').style.opacity = '1';
    tarjeta.querySelector('.contenido-emergencias').style.height = 'auto';
  });

  tarjeta.addEventListener('mouseout', () => {
    tarjeta.style.transform = 'scale(1)';
    tarjeta.querySelector('.contenido-emergencias').style.opacity = '0';
    tarjeta.querySelector('.contenido-emergencias').style.height = '0';
  });
});

document.querySelectorAll('.imagen-caracteristica').forEach((contenedor) => {
  contenedor.addEventListener('mouseover', () => {
    const descripcion = contenedor.querySelector('.imagen-descripcion');
    descripcion.style.opacity = '1';
    descripcion.style.transform = 'translateY(-50%) translateX(0)';
  });

  contenedor.addEventListener('mouseout', () => {
    const descripcion = contenedor.querySelector('.imagen-descripcion');
    descripcion.style.opacity = '0';
    descripcion.style.transform = 'translateY(-50%) translateX(100%)';
  });
});

// Efecto de Slider en Nosotros

var paginationItems = document.querySelectorAll('.pagination-item');

for (var i = 0; i < paginationItems.length; i++) {
  paginationItems[i].addEventListener('click', function() {
    var index = Array.prototype.indexOf.call(paginationItems, this);
    document.querySelector('.slide').style.transform = 'translate3d(' + (-100 * index) + '%, 0, 0)';
  });
}
