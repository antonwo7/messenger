<?php


class Method
{
    private string $requestMethod;

    function __construct ()
    {
        $this->requestMethod = $_SERVER['REQUEST_METHOD'];
    }

    public function isPost ()
    {
        return $this->requestMethod === 'POST';
    }

    public function isGet ()
    {
        return $this->requestMethod === 'GET';
    }
}