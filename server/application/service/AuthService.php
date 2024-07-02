<?php


class AuthService
{
    public static function hashPassword ($password)
    {
        return md5($password);
    }

    public static function createUserDir ()
    {
        $userDirName = uniqueHash();
        $userDirPath = FILES_DIR . $userDirName;
        if (!mkdir($userDirPath, 755)) return false;

        return $userDirName;
    }

//    public static function verifyHashedPassword ($hashedPassword, $password)
//    {
//        return password_verify($password, $hashedPassword);
//    }
}