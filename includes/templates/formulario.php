<div class="campos">
    <div class="campo">
        <label for="nombre">Nombre: </label>
        <input type="text" 
                id="nombre" 
                placeholder="Nombre Contacto"
                value="<?php echo ($contacto["nombre"]) ? $contacto["nombre"] : ''; ?>"
        >
    </div>
    <div class="campo">
        <label for="empresa">Empresa: </label>
        <input type="text" 
                id="empresa" 
                placeholder="Empresa Contacto"
                value="<?php echo ($contacto["empresa"]) ? $contacto["empresa"] : ''; ?>"        
        >
    </div>
    <div class="campo">
        <label for="telefono">Telefono: </label>
        <input type="tel" 
                id="telefono" 
                placeholder="Telefono Contacto"
                value="<?php echo ($contacto["telefono"]) ? $contacto["telefono"] : ''; ?>"
        >
    </div>
</div>
<div class="campo enviar">
    <?php if(isset($contacto['id_contactos'])) {?>
        <input type="hidden" value="<?php echo $contacto['id_contactos']; ?>" id="id">
    <?php } ?>

    <input type="hidden" value="<?php echo ($contacto["nombre"]) ? 'actualizar' : 'crear'; ?>" id="accion">
    <input type="submit" value="<?php echo ($contacto["nombre"]) ? 'Actualizar' : 'Añadir'; ?>">
</div>