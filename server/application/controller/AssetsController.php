<?php


class AssetsController extends Controller
{
    public function Avatar ($dirName, $fileName)
    {
        View::file("{$dirName}" . DS . 'avatars', $fileName);
    }
}