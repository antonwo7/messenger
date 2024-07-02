<?php


class TokenService
{
    public static function generateToken ($payload, $secret)
    {
        $headers_encoded = base64UrlEncode(json_encode([ 'alg' => 'HS256', 'typ' => 'JWT' ]));
        $payload_encoded = base64UrlEncode(json_encode($payload));
        $signature = hash_hmac('SHA256', "$headers_encoded.$payload_encoded", $secret, true);
        $signature_encoded = base64UrlEncode($signature);

        return "$headers_encoded.$payload_encoded.$signature_encoded";
    }

    public static function validateToken ($token, $secret)
    {
        $tokenParts = explode('.', $token);
        $header = base64_decode($tokenParts[0]);
        $payload = base64_decode($tokenParts[1]);
        $signature_provided = $tokenParts[2];
        $payloadDecoded = json_decode($payload);
        $tokenExpiration = $payloadDecoded->exp;
        $tokenUserId = $payloadDecoded->id;

        $isTokenExpired = ($tokenExpiration - time()) < 0;
        if ($isTokenExpired) return false;

        $base64_url_header = base64UrlEncode($header);
        $base64_url_payload = base64UrlEncode($payload);
        $signature = hash_hmac('SHA256', $base64_url_header . "." . $base64_url_payload, $secret, true);
        $base64_url_signature = base64UrlEncode($signature);

        return ($base64_url_signature === $signature_provided) ? $tokenUserId : false;
    }
}