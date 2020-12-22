const formularioContactos = document.querySelector("#contacto"),
        listadoContactos = document.querySelector('#listado-contactos tbody'),
        buscador = document.querySelector('#buscar');

window.addEventListener('load', eventListeners)

function eventListeners() {
    formularioContactos.addEventListener('submit', leerFormulario);
    listadoContactos.addEventListener('click', eliminarContacto);
    buscador.addEventListener('input', buscarContactos);
    numeroContactos();
}

function leerFormulario(e){
    e.preventDefault();

    const nombre = document.querySelector('#nombre').value,
            empresa = document.querySelector('#empresa').value,
            telefono = document.querySelector('#telefono').value,
            accion = document.querySelector('#accion').value;
    if(nombre === "" || empresa === "" || telefono === ""){
        mostrarNotificacion('Todos los campos son obligatorios', 'error');
    }else{
        //CREANDO LLamanda AJAX
        const infoContacto = new FormData();
        infoContacto.append('nombre', nombre);
        infoContacto.append('empresa', empresa);
        infoContacto.append('telefono', telefono);
        infoContacto.append('accion', accion);
        
        if(accion === "crear"){
            insertarBD(infoContacto);
        }
        if(accion === 'actualizar'){
            const id = parseInt(document.querySelector('#id').value)
            infoContacto.append('id', id);

            actualizarContacto(infoContacto);
        }
    }
}

function insertarBD(datos){
    //Llamado AJAX

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'includes/modelos/modelo-contactos.php', true);
    xhr.onload = function(){
        if(this.status === 200 && JSON.parse(this.responseText).respuesta=='correcto'){
            mostrarNotificacion('Contacto introducido correctamente', 'correcto');
            console.log(xhr.responseText);
            const datos = JSON.parse(this.responseText).datos;
            listadoContactos.innerHTML += createRow(datos);
            document.querySelector('form').reset();
            numeroContactos();
        }
    }
    xhr.send(datos);

}

function actualizarContacto(datos){
    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'includes/modelos/modelo-contactos.php', true);
    xhr.onload = function (){
        if(this.status==200){
            console.log(this.responseText);
            mostrarNotificacion('Contacto actualizado', 'correcto')
        }
        setTimeout(()=>{
            window.location.href = 'index.php';
        }, 3000);
    }

    xhr.send(datos);
}

function eliminarContacto(e){
    if(e.target.parentElement.classList.contains('btn-borrar')){
        const id = e.target.parentElement.getAttribute('data-id');
        const respuesta = confirm('¿Deseas Eliminar este contacto?')
        if(respuesta){
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `includes/modelos/modelo-contactos.php?id=${id}&accion=borrar`, true);
            xhr.onload= function(){
                if(this.status === 200){
                    const resultado = JSON.parse(this.responseText);

                    if(resultado.respuesta === 'correcto') {
                        e.target.parentElement.parentElement.parentElement.remove();
                        mostrarNotificacion("Contacto eliminado", 'correcto');
                        numeroContactos();
                    }else{
                        mostrarNotificacion("Ha ocurrido un error", 'error');
                    }
                }
            }
            xhr.send();
        }
    }
    // if(e.target.classList.contains('btn-borrar')){
    //     const id = e.target.getAttribute('data-id');
    //     const respuesta = confirm('¿Deseas Eliminar este contacto?')
    //     if(respuesta){
    //         const xhr = new XMLHttpRequest();
    //         xhr.open('GET', `includes/modelos/modelo-contactos.php?id=${id}&accion=borrar`, true);
    //         xhr.onload= function(){
    //             if(this.status === 200){
    //                 const resultado = JSON.parse(this.responseText);

    //                 if(resultado.respuesta === 'correcto') {
    //                     e.target.parentElement.parentElement.remove();
    //                     mostrarNotificacion("Contacto eliminado", 'correcto');
    //                 }else{
    //                     mostrarNotificacion("Ha ocurrido un error", 'error');
    //                 }
    //             }
    //         }
    //         xhr.send();
    //     }
    // }
}

function mostrarNotificacion(mensaje, clase){
    const notificacion = document.createElement('div');
    notificacion.classList.add('notificacion')
    notificacion.textContent = mensaje;

    //formulario
    formularioContactos.insertBefore(notificacion, document.querySelector("form legend"))

    //Ocultar notificacion

    setTimeout(()=>{
        notificacion.classList.add('visible', clase, 'sombra');

        setTimeout(()=>{
            notificacion.classList.remove('visible');
            
            setTimeout(() => {
                notificacion.remove();
            }, 500);
        }, 3000)
    }, 100);
}

function createRow(datos){
    const row = `<tr>
                    <td>${datos.nombre}</td>
                    <td>${datos.empresa}</td>
                    <td>${datos.telefono}</td>
                    <td>
                        <a class="btn btn-editar" href="editar.php?id=${datos.id}"><i class="fas fa-pen-square"></i></a>
                        <button data-id="${datos.id}" type="button" class="btn btn-borrar">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>`;

    return row;
}

function buscarContactos(e){
    const expresion = new RegExp(e.target.value, "i"),
            registros = document.querySelectorAll("tbody tr");

    registros.forEach(registro => {
        registro.style.display = 'none';
        
        if(registro.childNodes[1].textContent.replace(/\s/g, " ").search(expresion) != -1){
            registro.style.display = 'table-row';
        }
    });
    numeroContactos();
}

function numeroContactos(){
    const totalContactos = document.querySelectorAll("tbody tr"),
            contenedorNumero = document.querySelector(".total-contactos span");

    let total = 0;
    totalContactos.forEach(contacto => {
        if(contacto.style.display === '' || contacto.style.display === 'table-row'){
            total++;
        }

    });
    contenedorNumero.textContent = total;
}