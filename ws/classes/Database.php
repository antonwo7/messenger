<?php

class Database
{
	public $db;
	
	function __construct ($host, $port, $database, $username, $password)
    {
        $this->db = pg_connect("host={$host} port={$port} dbname={$database} user={$username} password={$password}");
	}

	public static function sanitize ($value)
    {
        return pg_escape_string(htmlspecialchars(trim(strip_tags($value))));
    }

	public function getDB ()
    {
        return $this->db;
    }
	
	public function __destruct ()
    {
		
	}
}