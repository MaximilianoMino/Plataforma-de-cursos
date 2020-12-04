const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];




function cargarEventListeners() {
    //AGREGANDO UN CURSO PRESIONANDO "AGREGAR AL CARRITO"
    listaCursos.addEventListener('click', agregarCurso);

    //ELIMINANDO CURSOS
    carrito.addEventListener('click', eliminarCurso)
}

//VACIAR CARRITO

vaciarCarritoBtn.addEventListener('click', () => {
    articulosCarrito = [];
    limpiarHTML();
})

const agregarCurso = (e) => {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

const eliminarCurso = (e) => {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => cursoId !== curso.id);

        carritoHtml();
    }
}

cargarEventListeners();

//Tomando el curso al cual le damos click
const leerDatosCurso = (curso) => {

    const infoCurso = {
            imagen: curso.querySelector('img').src,
            titulo: curso.querySelector('h4').textContent,
            precio: curso.querySelector('.precio span').textContent,
            id: curso.querySelector('a').getAttribute('data-id'),
            cantidad: 1
        }
        //REVISA SI UN ELEMENTO YA EXISTE EN EL CARRITO
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        //ACTUALIZAMOS CANTIDAD
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //RETORNA OBJETO ACTUALIZADO
            } else {
                return curso; //RETORNA OBJETOS QUE NO ESTAN DUPLICADOS
            }
        });
        articulosCarrito = [...cursos];
    } else {
        //Agregando elementos al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    console.log(articulosCarrito)
    carritoHtml();
}


const carritoHtml = () => {

    //LIMPIAR HTML
    limpiarHTML();
    //RECORRE EL CARRITO Y GENERA EL HTML

    articulosCarrito.forEach(curso => {
        //DESTRUCTURING
        const { imagen, precio, cantidad, titulo, id } = curso;

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        <img src="${imagen}" width="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
        <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;

        //AGREGA EL HTML DEL CARRITO EN EL TD BODY
        contenedorCarrito.appendChild(row);

    })
}

//ELIMINA LOS CURSOS QUE SE REPITEN

const limpiarHTML = () => {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}