<?php
header("Access-Control-Allow-Origin:http://localhost:3000");
header("Access-Control-Allow-Methods: PUT, GET, POST,DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-type: text/plain; charset=utf-8');
require_once 'Controller.php';
$method = $_SERVER['REQUEST_METHOD'];
$Controller = new Controller();
$response = "";
$data = json_decode(file_get_contents('php://input'), true);
if($method === "POST"){
    $response  = $Controller -> handleRequest("POST",$data);
    if(is_array($response) || $response === 420){
        http_response_code(420);
        if(is_array($response)){
            echo json_encode($response);
        }else{
            echo $response ;
        }
        return ;
    }
}
if($method === "GET"){
    $response = $Controller -> handleRequest("GET","");
}
if($response === "420"){
    http_response_code(420);
    echo "ERROR Connecting To SQL" ;

}else{
    http_response_code(200);
    echo json_encode($response);
}
