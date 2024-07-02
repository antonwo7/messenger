<?php

function get_current_url ()
{
	return SITE_URL . $_SERVER['REQUEST_URI'];
}

//function getRouterPath () {
//	$pathWithGet = $_SERVER['REQUEST_URI'];
//	return preg_replace('/ \/ (.+\/?[a-z_]+) \??.* $ /xsi', '$1', $pathWithGet);
//}

function getRouterPath () {
    return preg_replace('/ ^\/? (.+) \/?$ /xsi', '$1', parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH));
}

function get_controller_method_url ($controller, $method = 'Index')
{
	$result .= '/' . $controller . '/' . $method . '/';
	return $result;
}

function e ($value)
{
	 return htmlspecialchars(stripslashes(trim($value)));
}
function en ($value)
{
	 return htmlspecialchars(trim($value));
}

function isLogged ()
{
	
	 if (isset($_SESSION["is_auth"])) { 
		return $_SESSION["is_auth"];
	}
	return false; 
}

function redirect ($url = SITE_URL)
{
	header('Location: ' . $url);
}

function md5_encode ($value)
{
	return md5($value . SALT);
}

function convertToCamel ($value)
{
    return str_replace('_', '', ucwords($value, '_'));
}

function base64UrlEncode ($data)
{
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function uniqueHash ()
{
    $s = strtoupper(md5(uniqid(rand(),true)));
    return
        substr($s,0,8) . '-' .
        substr($s,8,4) . '-' .
        substr($s,12,4). '-' .
        substr($s,16,4). '-' .
        substr($s,20);
}