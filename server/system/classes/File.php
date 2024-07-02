<?php


class File
{
    private $filePath;
    private $fileName;
    private $extension;
    private $mime;
    private static $mimes = [
        'img' => 'image/*',
        'gif' => 'image/gif',
        'jpeg' => 'image/jpeg',
        'jpg' => 'image/jpeg',
        'jpe' => 'image/jpeg',
        'png' => 'image/png',
        'tiff' =>'image/tiff',
        'tif' => 'image/tiff'
    ];

    function __construct($fileDir, $fileName)
    {
        $this->fileName = $fileName;
        $this->filePath = $fileFullPath = FILES_DIR . $fileDir . DS . $fileName;
        $this->extension = pathinfo($fileName, PATHINFO_EXTENSION);
        $this->mime = isset(self::$mimes[$this->extension]) ? self::$mimes[$this->extension] : self::$mimes['img'];
    }

    public function fileExist ()
    {
        return file_exists($this->filePath);
    }

    public function isLoadable ()
    {
        return (bool)$this->mime;
    }

    public function mime ()
    {
        return $this->mime;
    }

    public function path ()
    {
        return $this->filePath;
    }
}