<?php


class MessagesModel extends Model
{
    public function getMessages ($authUserId, $withUserId, $searchQuery)
    {
        $query = <<<SQL
            SELECT 
                m.id,
                m.text,
                m.created_on,
                m.from_user_id,
                m.to_user_id
            FROM 
                messages m
            WHERE
                ((m.from_user_id = $1 AND m.to_user_id = $2) OR
                (m.from_user_id = $2 AND m.to_user_id = $1)) AND
                m.id >= CASE WHEN '{$searchQuery}' != '' THEN (
                    SELECT 
                        m.id
                    FROM 
                        messages m
                    WHERE
                        ((m.from_user_id = $1 AND m.to_user_id = $2) OR
                        (m.from_user_id = $2 AND m.to_user_id = $1)) AND
                         m.text LIKE '%{$searchQuery}%'
                    ORDER BY m.created_on ASC
                    LIMIT 1
                ) ELSE 0 END
            ORDER BY m.created_on DESC
SQL;

        $result = pg_query_params($this->db, $query, [$authUserId, $withUserId]);
        if (!$result) return [];

        $messages = pg_fetch_all($result);
        return $messages ? $messages : [];
    }

    public function GetConversations ($userId, $searchQuery)
    {
        $query = <<<SQL
            SELECT * FROM (
                SELECT MAX(m.id) id,
                (CASE 
                    WHEN m.from_user_id > m.to_user_id THEN CONCAT(m.to_user_id, '_', m.from_user_id) 
                    ELSE CONCAT(m.from_user_id, '_', m.to_user_id)
                END) as ft
                FROM messages m
                WHERE (m.from_user_id = 3 OR m.to_user_id = 3) AND m.text LIKE '%%%'
                GROUP BY ft
            ) AS m
            LEFT JOIN (
                SELECT
                    m.id,
                    m.text,
                    m.created_on,
                    m.from_user_id,
                    m.to_user_id,
                    u.name,
                    u.surname,
                    u.login,
                    u.avatar,
                    u.id as user_id,
                    (CASE 
                        WHEN m.from_user_id > m.to_user_id THEN CONCAT(m.to_user_id, '_', m.from_user_id) 
                        ELSE CONCAT(m.from_user_id, '_', m.to_user_id)
                    END) as ft
                FROM messages m
                LEFT JOIN users u 
                    ON u.id = m.from_user_id OR u.id = m.to_user_id
                WHERE (m.from_user_id = 3 OR m.to_user_id = $1) AND (u.id <> $1) AND m.text LIKE $2
                ORDER BY m.id DESC
            ) t ON m.id = t.id
            ORDER BY m.id DESC
SQL;

        $result = pg_query_params($this->db, $query, [$userId, "%{$searchQuery}%"]);
        if (!$result) return [];

        $conversations = pg_fetch_all($result);
        return $conversations ? $conversations : [];
    }

    public function searchMessages ($userId, $searchQuery)
    {
        $query = <<<SQL
            SELECT DISTINCT ON (m.id)
                m.id as message_id,
                m.text as message_text,
                m.created_on as message_created_on,
                m.from_user_id as message_from_user_id,
                m.to_user_id as message_to_user_id,
                u.id as user_id,
                u.name as user_name,
                u.surname as user_surname,
                u.login as user_login,
                u.avatar as user_avatar
            FROM messages m
            LEFT JOIN users u 
                ON u.id = m.from_user_id OR u.id = m.to_user_id
            WHERE 
                (m.from_user_id = $1 OR m.to_user_id = $1) AND
                LOWER(m.text) LIKE LOWER($2)
            
            ORDER BY m.id DESC
SQL;

        $result = pg_query_params($this->db, $query, [$userId, "%{$searchQuery}%"]);
        if (!$result) return [];

        $messages = pg_fetch_all($result);
        return $messages ? $messages : [];
    }

    public function getAttachments ($userId)
    {
        $query = <<<SQL
            SELECT a.filename
            FROM messages m
            LEFT JOIN attachments a ON a.id = m.attachment_id
            WHERE
                (m.from_user_id = $1) AND
                a.filename IS NOT NULL
SQL;

        $result = pg_query_params($this->db, $query, [$userId]);
        if (!$result) return [];

        $attachments = pg_fetch_all($result);
        return $attachments ? $attachments : [];
    }

    public function addAttachment ($data)
    {
        $query = <<<SQL
            INSERT 
                INTO attachments(filename, type) 
            VALUES
                ($1, $2)
            RETURNING id;
SQL;

        $result = pg_query_params($this->db, $query, [$data['filename'], $data['type']]);
        if (!$result) return [];

        $attachment = pg_fetch_object($result);
        return !empty($attachment->id) ? $attachment->id : null;
    }

    public function addMessage ($data)
    {
        $query = <<<SQL
            INSERT 
                INTO messages(from_user_id, to_user_id, text, attachment_id, created_on) 
            VALUES
                ($1, $2, $3, $4, now())
            RETURNING *;
SQL;

        $result = pg_query_params($this->db, $query, [$data['from_user_id'], $data['to_user_id'], $data['text'], $data['attachment_id']]);
        if (!$result) return [];

        $message = pg_fetch_object($result);
        return !empty($message) ? (array)$message : null;
    }

    public function deleteMessage ($messageId)
    {
        $query = <<<SQL
            DELETE
                FROM messages
                WHERE id = $1;
SQL;

        return (bool) pg_query_params($this->db, $query, [$messageId]);
    }

    public function changeMessage ($messageId, $messageText)
    {
        $query = <<<SQL
            UPDATE messages
                SET text = $2
                WHERE id = $1;
SQL;

        return (bool) pg_query_params($this->db, $query, [$messageId, $messageText]);
    }
}