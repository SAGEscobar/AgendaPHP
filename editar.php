<?php 
    include 'includes/funciones/funciones.php';
    $id = filter_var($_GET['id'], FILTER_VALIDATE_INT);

    if(!$id){
        die('No valido');
    }

    $resultado = contactoById($id);
    $contacto = $resultado->fetch_assoc();
?>

<?php include_once "includes/templates/header.php" ?>

    <div class="contenedor-barra">
        <div class="contenedor barra">
            <a href="index.php" class="btn volver">Volver</a>
            <h1>Editar Contacto</h1>
        </div>
    </div>

    <div class="bg-amarillo contenedor sombra">
        <form action="#" id="contacto">
            <legend>Edite el Contacto</legend>
            <?php include_once 'includes/templates/formulario.php' ?>
        </form>
    </div>
<?php include_once "includes/templates/footer.php" ?>