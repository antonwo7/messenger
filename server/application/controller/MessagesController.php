<?php

class MessagesController extends Controller
{
    private MessagesModel $messagesModel;
    private UsersModel $usersModel;
    private MessagesLogic $messagesLogic;

    function __construct()
    {
        parent::__construct();

        $this->messagesModel = new MessagesModel();
        $this->usersModel = new UsersModel();
        $this->messagesLogic = new MessagesLogic();
    }

    public function GetChat ()
    {
        $authUserId = $this->GetAuthUserId();

        $data = $this->request->post();
        if (empty($data['user_id'])) View::error('Input data is empty');

        $withUserId = $data['user_id'];
        $searchQuery = !empty($data['query']) ? $data['query'] : '';

        $messages = $this->messagesModel->getMessages($authUserId, $withUserId, $searchQuery);
        $withUser = $this->usersModel->getShortUser($authUserId, $withUserId);
        $withUser['options'] = $this->usersModel->getUserOptions($authUserId, $withUserId);
        $withUser['options']['mute'] = isset($withUser['options']['mute']) ? (int)$withUser['options']['mute'] : 0;
        $withUser['options']['blocked'] = isset($withUser['options']['blocked']) ? (int)$withUser['options']['blocked'] : 0;

        View::success(['messages' => $messages, 'user' => $withUser]);
    }

//    public function GetMessages ()
//    {
//        $authUserId = $this->GetAuthUserId();
//
//        $data = $this->request->post();
//        if (empty($data['user_id'])) View::error('Input data is empty');
//
//        $messages = $this->messagesModel->GetMessages($authUserId, $data['user_id']);
//        $messages = $this->messagesLogic->convertMessagesToConvesations($messages);
//
//        View::success(['messages' => $messages]);
//    }

    public function GetConversations ()
    {
        $authUserId = $this->GetAuthUserId();
        $data = $this->request->post();

        $query = !empty($data['query']) ? $data['query'] : '';
        $conversations = $this->messagesModel->GetConversations($authUserId, $query);
        $conversations = $this->messagesLogic->convertMessagesToConvesations($conversations);

        View::success(['conversations' => $conversations]);
    }

    public function SearchMessages ()
    {
        $data = $this->request->post();
        if (empty($data['query'])) View::error('Search data is empty');

        $authUserId = $this->GetAuthUserId();

        $searchQuery = $data['query'];

        View::success(['messages' => $this->messagesModel->searchMessages($authUserId, $searchQuery)]);
    }

    public function GetAttachments ()
    {
        $authUserId = $this->GetAuthUserId();

        View::success(['attachments' => $this->messagesModel->getAttachments($authUserId)]);
    }

    public function AddMessage ()
    {
        $data = $this->request->post();
        $files = $this->request->files();

        if (empty($data['to_user_id']) || (empty($data['text']) && empty($files['attachment']))) View::error('Message data is empty');

        $authUserId = $this->GetAuthUserId();
        $userId = $data['to_user_id'];
        $text = $data['text'];

        $attachmentId = null;

        if (!empty($files['attachment'])) {
            $authUserDir = $this->usersModel->getUserDirectory($authUserId);

            $attachmentUserDirectory = FILES_DIR . $authUserDir . DS . USER_ATTACHMENTS_DIR;
            if (!is_dir($attachmentUserDirectory)) {
                mkdir($attachmentUserDirectory, 755);
            }

            $attachmentFileName = UploadService::uploadFile($files['attachment'], $attachmentUserDirectory);

            $attachmentId = $this->messagesModel->addAttachment([
                'filename' => $attachmentFileName,
                'type' => pathinfo($files['attachment']['name'], PATHINFO_EXTENSION)
            ]);
        }

        $message = $this->messagesModel->addMessage([
            'from_user_id' => $authUserId,
            'to_user_id' => $userId,
            'text' => $text,
            'attachment_id' => $attachmentId,
        ]);

        if (!$message) View::error('Message creation error');

        View::success(['message' => $message]);
    }

    public function DeleteMessage ()
    {
        $data = $this->request->post();

        if (empty($data['message_id'])) View::error('Message data is empty');

        $this->GetAuthUserId();

        $messageId = $data['message_id'];

        $result = $this->messagesModel->deleteMessage($messageId);
        if (!$result) View::error('Message deleting error');

        View::success([]);
    }

    public function ChangeMessage ()
    {
        $data = $this->request->post();

        if (empty($data['id']) || empty($data['text'])) View::error('Message data is empty');

        $this->GetAuthUserId();

        $messageId = $data['id'];
        $messageText = $data['text'];

        $result = $this->messagesModel->changeMessage($messageId, $messageText);
        if (!$result) View::error('Message changing error');

        View::success([]);
    }
}