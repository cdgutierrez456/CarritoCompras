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

    // Eliminar curso (Objeto) del carrito
    carrito.addEventListener('click', eliminarCurso);
}


// Funciones
function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

// Eliminar curso del carrito
function eliminarCurso(e) {
    // console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        // Iterando sobre el nuevo arreglo para actualizar html
        carritoHTML();

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

    // Verificando si existe ya el objeto en el arreglo
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe) {
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // Aqui se retorna el objeto actualizado
            } else {
                return curso; // Retorna los objetos que no son duplicados
            }
        });
        articulosCarrito = [...cursos];
    } else {
        // Agregamos el curso al carro de compras
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    console.log(articulosCarrito);
    carritoHTML();
}

// Mostrando carrito de compras en el html
function carritoHTML() {
    // Limpiando html de la tabla
    limpiarHTML();


    articulosCarrito.forEach(curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class='borrar-curso' data-id='${id}'> X </a>
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



