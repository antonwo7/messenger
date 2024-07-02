<?php

include SYSTEM_CLASSES . 'Autoloader.php';
Autoloader::register();

$database = new Database(DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD);
$db = $database->getDB();

$router = new Router();