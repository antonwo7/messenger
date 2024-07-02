<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');

function f($value, $type = 'w'){
    fwrite(fopen('./test.txt', $type), json_encode($value));
}

require_once('config.php');
require_once('system/helper.php');
require_once('system/start.php');

