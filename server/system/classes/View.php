<?php

class View
{
//	public static function viewOutput ($template, $data)
//    {
//		extract($data);
//		include('view/templates/' . $template . '.php');
//	}
//
//	public static function viewGet ($template, $data) {
//		ob_start();
//		self::viewOutput($template, $data);
//
//		$out = ob_get_contents();
//		ob_end_clean();
//
//		return $out;
//	}

	private static function json ($result, $value, $log = '')
    {
        echo json_encode(array_merge(['result' => $result], $value, ['log' => $log]));
        die();
    }

    public static function error ($log)
    {
        self::json(false, [], $log);
    }

    public static function success ($value)
    {
        self::json(true, $value);
    }

    public static function file ($filePath, $fileName)
    {
        $file = new File($filePath, $fileName);

        if ($file->fileExist() && $file->isLoadable()) {
            header('Content-Type: ' . $file->mime());
            readfile($file->path());
            die();
        }

        http_response_code(404);
        die();
    }
}