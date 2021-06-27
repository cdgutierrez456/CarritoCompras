// Variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    // Cuando se agrega un curso presionando btn "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);
}


// Funciones
function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

// Lee el contedido del html ya capturado

function leerDatosCurso(curso) {
    // Creando un nuevo objeto a partir de la info capturada
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Agregando objetos al arreglo
    articulosCarrito = [...articulosCarrito, infoCurso];
    console.log(articulosCarrito);
    carritoHTML();
}

// Mostrando carrito de compras en el html
function carritoHTML() {
    // Limpiando html de la tabla
    limpiarHTML();


    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>

                ${curso.titulo}

            </td>
        `;

        // Agregando html del carrito en la etiqueta tbody de la tabla
        contenedorCarrito.appendChild(row);

    })
}

// Eliminar cursos del tbody
function limpiarHTML() {
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}



