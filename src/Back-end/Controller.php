<?php

require_once "Database.php";
class Controller extends Database{
    public function handleRequest($method,$REQ){
        if($method === "GET"){
            return $this -> GetAll();
        }
        if($method === "POST" && isset($REQ["IDs"])){
            return $this -> DeleteProducts($REQ["IDs"]);
        }
        if($method ==="POST" && isset($REQ["Product"])){
            return $this -> AddProduct($REQ["Product"]);
        }
    }
    private function AddProduct($Product){
        $Type = $Product["Type"] ;
        if($Type === "Book"){
            require_once './Book.php';
            $productObj = new Book($Product);
        }
        if($Type === "DVD"){
            require_once './DVD.php';
            $productObj = new DVD($Product);
        }
        if($Type === "Furniture"){
            require_once './Furniture.php';
            $productObj = new Furniture($Product);
        }
        if($productObj -> getError() !== 200){
            return $productObj -> getError();
        }
        $add = $this -> DBAddProduct(
            $productObj -> getSKU(),
            $productObj -> getName(),
            $productObj -> getPrice(),
            $productObj -> getType(),
            $productObj -> getAttribute()
        );
        return $add ;
    }
    private function DeleteProducts($IDarray){
        print_r($IDarray);
        return $this -> deleteProduct($IDarray);
    }
    private function GetAll(){
        $dataArray = $this -> getProducts();
        if($dataArray === "420"){
            return 420;
        }
        $data = array();
        while($row = mysqli_fetch_assoc($dataArray)){
            $data[] = $row;
        }
        return $data ;
    }
}
