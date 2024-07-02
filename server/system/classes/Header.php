<?php


class Header
{
    private ?string $authorization;
    private ?string $bearerToken;

    function __construct ()
    {
        $this->authorization = $this->getAuthorizationHeader();
        $this->bearerToken = $this->getBearerToken();
    }

    private function getAuthorizationHeader ()
    {
        $headers = null;

        if (isset($_SERVER['Authorization'])) {
            $headers = trim($_SERVER["Authorization"]);

        } else if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
            $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);

        } else if (function_exists('apache_request_headers')) {
            $requestHeaders = apache_request_headers();
            $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));

            if (isset($requestHeaders['Authorization'])) {
                $headers = trim($requestHeaders['Authorization']);
            }
        }

        return $headers;
    }

    private function getBearerToken ()
    {
        if (!empty($this->authorization)) {
            if (preg_match('/Bearer\s(\S+)/', $this->authorization, $matches)) {
                return $matches[1];
            }
        }

        return null;
    }

    public function token ()
    {
        return $this->bearerToken;
    }
}