<?php


class Request
{
    private array $get;
    private array $post;
    private array $files;
    private string $method;

    private Header $header;

    function __construct ()
    {
        $this->get = $_GET;
        $this->post = $_POST;
        $this->files = $_FILES;
        $this->header = new Header();
    }

    public function get ()
    {
        return $this->get;
    }

    public function post ()
    {
        return $this->post;
    }

    public function files ()
    {
        return $this->files;
    }

    public function header ()
    {
        return $this->header;
    }


}