let estado = {
    items: {},
}

// Añadir un item.
$('#itemForm').on('submit', function (e) {
    // No permitimos que se envie el formulario
    e.preventDefault();
    // Obtenemos el valor del input
    let value = $('#itemInput').val();

    // Controlamos si lo que nos envia el usuario es vacio.
    if (value.trim() == "") {
        $('#itemInput').val('');
        return;
    }

    // Borramos el input
    $('#itemInput').val('');
    newRow(value);
});

/* EVENTOS */
// Accion de completar la tarea
$(document).on("click", ".complete-item", function () {
    console.log('Se ha completado la tarea.');

    let padre = $(this).parent().parent().find('h5');
    let termino = $(this).parent().parent().find('h5').text();

    if (padre.hasClass('completed')) {
        estado.items[termino].completed = false;        
        padre.removeClass('completed');
    } else {
        padre.addClass('completed');
        estado.items[termino].completed = true;
    }

});

// Accion editar el contenido
$(document).on("click", ".edit-item", function () {
    console.log('Editar la tarea.');

    // Tomamos la referencia del padre y del texto.
    let padre = $(this).parent().parent();
    let termino = $(this).parent().parent().find('h5').text();

    // Llevamos el nombre de la tarjeta al input para "editarlo"
    $('#itemInput').val(termino);

    // borramos el item en nuestra variable global.
    delete estado.items[termino];

    // Eliminamos el elemento.
    padre.remove();
});

// Accion de borrar el item.
$(document).on("click", ".delete-item", function () {
    console.log('Se ha borrado la tarea.');

    // Tomamos la referencia del padre y del texto.
    let padre = $(this).parent().parent();
    let termino = $(this).parent().parent().find('h5').text();

    // Eliminamos la propiedad del objeto para no tener la fila guardada en estado.    
    delete estado.items[termino];

    // Eliminamos al hijo.
    padre.remove();
});

$('#clear-list').click(function () {
    // Vaciamos todos los items.
    estado.items = {};
    $(".item-container").html('');
})

function newRow(itemName) {

    let template = `
    <div class="item my-3">
        <h5 class="item-name text-capitalize">${itemName}</h5>
        <div class="item-icons">
            <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
            <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
            <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
        </div>
    </div>`

    estado.items[itemName] = { name: itemName, html: template, completed: false };

    $(".item-container").append(template);
}