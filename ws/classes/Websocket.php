<?php

set_time_limit(0);
ob_implicit_flush();

class Websocket
{
    private $instance;
    private string $lastError;
    private int $limit;

    function __construct ($address, $port, $limit)
    {
        $this->address = $address;
        $this->port = $port;
        $this->limit = $limit;
    }

    public function init ()
    {
        $this->instance = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
        if (!$this->instance) {
            //$this->lastError = socket_strerror(socket_last_error());
            return false;
        }

        $bind = socket_bind($this->instance, $this->address, $this->port);
        if (!$bind) {
            $this->lastError = socket_strerror(socket_last_error());
            return false;
        }

        $option = socket_set_option($this->instance, SOL_SOCKET, SO_REUSEADDR, 1);
        if (!$option) {
            $this->lastError = socket_strerror(socket_last_error());
            return false;
        }

        $listen = socket_listen($this->instance);
        if (!$listen) {
            $this->lastError = socket_strerror(socket_last_error());
            return false;
        }

        return true;
    }

    public function connect ($callback)
    {
        $startTime = time();

        while (true) {
            $connect = socket_accept($this->instance);
            if ($connect !== false) {
                socket_write($connect, 'Hello, Client 4');
            } else {
                $this->lastError = socket_strerror(socket_last_error());
                return false;
            }

            if ($this->limit && (time() - $startTime > $this->limit)) {
                socket_close($this->instance);
                return;
            }
        }
    }

    public function lastError ()
    {
        return $this->lastError;
    }
}