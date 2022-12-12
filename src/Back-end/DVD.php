<?php 
require 'Product.php';
class DVD extends Products {
    public function __construct($Product)
    {
        $this -> BuildProduct($Product);
    }
    protected function ValidateAttribute($Attribute)
    {
        if(!is_numeric($Attribute)){
            return 407;
        }
        $this -> Attribute = $Attribute ;
        return 200 ;
    }
}