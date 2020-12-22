<?php

function obtenerContactos(){
    include 'bd.php';
    try{
        $sql = "SELECT * FROM contactos";
        return $conn->query($sql);
    }catch(Exception $e){
        echo "error ". $e->getMessage();
        return false;
    }
}

function contactoById($id){
    include 'bd.php';
    try{
        $sql = "SELECT * FROM contactos WHERE id_contactos = $id";
        return $conn->query($sql);
    }catch(Exception $e){
        echo "Error" . e.getMessage();
        return false;
    }
}