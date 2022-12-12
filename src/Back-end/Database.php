<?php
require_once 'Connection.php';

class Database  extends Connection{
    private $conn ;
    private $query ;

    protected function getProducts(){
        $this -> conn = $this -> Connect(); 
        if($this -> conn === "420"){
            return "420" ;
            exit;
        }
        $this -> query = "SELECT * FROM `products` ORDER BY `ID` ASC";
        $data = mysqli_query($this -> conn,$this -> query);
        $this -> disconnect($this -> conn );
        return $data ? $data : "420"; 
    }

    protected function deleteProduct($idArray){
        $this -> conn = $this -> Connect();
        if($this -> conn === "420"){
            return "420" ;
        }
        $intArr = array() ;
        foreach ($idArray as $value) {
            array_push($intArr , (int)$value);
        }
        if(count($idArray) > 1){
            $this -> query = "DELETE FROM `products` WHERE ID IN (". join(",",($intArr)). ");";
        }else{
            $this -> query = "DELETE FROM `products` WHERE ID = $intArr[0] ";
        }
        mysqli_query($this -> conn,$this -> query);
        $err = mysqli_affected_rows($this -> conn) > 0 ;
        $this -> disconnect($this -> conn);
        return $err ? true : "420" ;
        
    }
    public function VerifySKU($SKU){
        $this -> conn = $this -> Connect();
        if($this -> conn === "420"){
            return "420" ;
        }
        $this -> query = "SELECT * FROM `products` WHERE SKU = \"$SKU\"";
        $data = mysqli_query($this -> conn, $this -> query);
        $this -> disconnect($this -> conn);
        if(mysqli_fetch_assoc($data) !== null){
            throw new Exception("Duplicate SKU");
        };
    }
    protected function DBAddProduct($SKU,$Name,$Price,$Type,$Attribute){
        $this -> conn = $this -> Connect();
        if($this -> conn === "420"){
            return "420" ;
        }
        $this -> query = "INSERT INTO `products` (SKU,Name,Price,Type,Attribute) VALUES (\"$SKU\",\"$Name\",\"$Price\",\"$Type\",\"$Attribute\")";
        mysqli_query($this -> conn , $this -> query);
        $err = mysqli_affected_rows($this -> conn) > 0 ? true : "420";
        $this -> disconnect($this -> conn);
        return $err  ;
    }
}
