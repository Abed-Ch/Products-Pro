<?php
require_once 'Database.php';
abstract class Products extends Database {
    private $SKU ;
    private $Name ;
    private $Price ;
    private $Type ;
    protected $Attribute ;
    private $errorArr = array() ;
    private $error ;
    public function BuildProduct($ProductArray){
        $SKU_Res = $this -> ValidateSKU($ProductArray["SKU"]);
        if($SKU_Res !== 200){
            $this -> errorArr[] = $SKU_Res ;
        };
        $this -> SKU = $ProductArray["SKU"];
        $this -> Name = $ProductArray["Name"];
        $Price_Res = $this -> ValidatePrice($ProductArray["Price"]);
        if($Price_Res !== 200){
            $this -> errorArr[] = $Price_Res ;
        };
        $this -> Price = $ProductArray["Price"];
        $this -> Type = $ProductArray["Type"];
        $Attribute_Res = $this -> ValidateAttribute($ProductArray["Attribute"]);
        if($Attribute_Res !== 200){
            is_array($Attribute_Res) ? 
            $this -> errorArr = array_merge($this -> errorArr, $Attribute_Res) :$this -> errorArr[] = $Attribute_Res;
        };
        if(count($this -> errorArr) === 0 ){
            $this -> error = 200 ;
        }else{
            $this -> error = $this -> errorArr ;
        }
    }
    public function getError(){
        return $this -> error ;
    }
    private function ValidateSKU($SKU){
        if(!isset($SKU) || strlen($SKU) !== 8 ){
            return 402 ;
        }
        try{
            $this -> VerifySKU($SKU);
        }catch(Exception $e){
            return 401 ;
        }
        return 200 ;
    }
    private function ValidatePrice($Price){
        if(!is_numeric($Price)){
            return 405 ;
        }
        return 200 ;
    }
    protected abstract function ValidateAttribute($Attribute);
    public function getSKU(){
        return $this -> SKU ;
    }
    public function getName(){
        return $this ->Name ;
    }
    public function getPrice(){
        return $this -> Price ;
    }
    public function getType(){
        return $this -> Type ;
    }
    public function getAttribute(){
        return $this -> Attribute ;
    }
}
