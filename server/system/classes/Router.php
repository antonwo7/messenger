<?php

class Router
{
	
	public function __construct ()
    {
		$controllerName = 'UsersController';
		$actionName = 'Index';

		$routeParts = explode('/', getRouterPath());

		if (!empty($routeParts[0])) {
            $controllerName = convertToCamel($routeParts[0]) . 'Controller';
        }
		
		if (!empty($routeParts[1])) {
            $actionName = convertToCamel($routeParts[1]);
        }

		if (!class_exists($controllerName)) {
		    die('Class doesnt exist');
        }

		$controller = new $controllerName();

		$args = [];

		$i = 2;
		while (isset($routeParts[$i])) {
            $args[] = $routeParts[$i];
            $i++;
        }
		
		if (method_exists($controller, $actionName)) {
            $controller->$actionName(...$args);
		} else {
            die('Method doesnt exist');
		}
	}

}