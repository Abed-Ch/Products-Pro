<?php
class Connection
{

    private $hostname;
    private $database;
    private $username;
    private $password;
    private $conn;
    public function Connect()
    {   

        $this->hostname = "localhost";
        $this->database = "scandiwebtest";
        $this->username = "root";
        $this->password = "";
        try{
            $this -> conn = new mysqli($this -> hostname , $this -> username , $this -> password , $this -> database);
        }catch(Throwable $e){
            return "420";
        };
        return $this->conn;
    }


    protected function disconnect($conn)
    {
        mysqli_close($conn);
    }
}
