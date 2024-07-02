<?php


class Model
{
    protected $db;

    function __construct ($db)
    {
        $this->db = $db;
    }

    public function getMessages ($userId)
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
                WHERE (m.from_user_id = 3 OR m.to_user_id = $1) AND (u.id <> $1)
                ORDER BY m.id DESC
            ) t ON m.id = t.id
            ORDER BY m.id DESC
SQL;

        $result = pg_query_params($this->db, $query, [$userId]);
        if (!$result) return [];

        $conversations = pg_fetch_all($result);
        return $conversations ? $conversations : [];
    }
}