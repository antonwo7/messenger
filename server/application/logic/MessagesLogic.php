<?php


class MessagesLogic
{
    public function convertMessagesToConvesations (array $conversations)
    {
        return array_reduce($conversations, function ($convertedConversations, $conversation) {
            $convertedConversations[] = [
                'id' => $conversation['id'],
                'text' => $conversation['text'],
                'from_user_id' => $conversation['from_user_id'],
                'to_user_id' => $conversation['to_user_id'],
                'created_on' => $conversation['created_on'],
                'attachment_id' => $conversation['attachment_id'],
                'user' => [
                    'id' => $conversation['user_id'],
                    'name' => $conversation['name'],
                    'surname' => $conversation['surname'],
                    'login' => $conversation['login']
                ]
            ];
            return $convertedConversations;
        }, []);
    }
}