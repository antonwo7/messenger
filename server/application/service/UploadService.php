<?php


class UploadService
{
    public static function uploadFile ($file, $path)
    {
        $fileName = self::uniqueFileName();
        if (!move_uploaded_file($file['tmp_name'], $path . $fileName)) {
            return false;
        }

        return $fileName;
    }

    public static function uniqueFileName ()
    {
        return time() . '-' . uniqid();
    }
}