<?php

include_once './config.php';
include_once './classes/WebSocketServer.php';
include_once './classes/Database.php';
include_once './classes/Model.php';

$wsServer = new WebSocketServer(WS_URL, WS_PORT);
$wsServer->settings(WS_LIMIT, true);

$wsServer->handler = function($connect, $data) {
    if (empty($data)) return;

    ob_start();

    $userId = $data;

    $database = new Database(DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD);
    $db = $database->getDB();
    $model = new Model($db);
    $messages = $model->getMessages($userId);

    $page = ob_get_contents();
    ob_clean();

    $out = json_encode(['conversations' => $messages]);

    WebSocketServer::response($connect, $out);
};

$wsServer->startServer();