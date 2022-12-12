<?php 
require 'Product.php';
class Furniture extends Products {
    public function __construct($Product)
    {
        $this -> BuildProduct($Product);
    }
    protected function ValidateAttribute($Attribute)
    {
        $error = [] ;
        if(!is_numeric($Attribute[0])){
            $error[] = 408 ;
        }
        if(!is_numeric($Attribute[1])){
            $error[] = 409 ;
        }
        if(!is_numeric($Attribute[2])){
            $error[] = 410 ;
        }
        if(count($error) > 0){
            return $error ;
        }
        $this -> Attribute = $Attribute[0] ."x". $Attribute[1] . "x" . $Attribute[2] ;
        return 200 ;
    }
}