<?php

class Controller
{
    public Request $request;

    function __construct ()
    {
        $this->request = new Request();
    }

    protected function GetAuthUserId ($token = null)
    {
        if (!$token) {
            $token = $this->request->header()->token();
        }

        $authUserId = TokenService::validateToken($token, TOKEN_SECRET);
        if (!$authUserId) {
            View::error('Token is invalid');
            return null;
        }

        return $authUserId;
    }
}