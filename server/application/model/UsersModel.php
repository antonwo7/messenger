<?php

class UsersModel extends Model
{
//    public function getUsers ()
//    {
//        $result = pg_query($this->db, "SELECT id, login, name, surname, email, phone, created_on, avatar, background FROM users WHERE 1=1");
//        if (!$result) return [];
//
//        $users = pg_fetch_all($result);
//        return $users ? $users : [];
//    }

    public function getUserBackground ($authUserId, $userId = null)
    {
        if (!$userId) {
            $userId = $authUserId;
        }

        $query = <<<SQL
            SELECT u.background
                FROM users u
            WHERE 
                u.id = $1 AND 
                (
                    (SELECT COUNT(id) FROM owner_user WHERE owner_id = $2 AND user_id = $1) > 0 OR
                    $2 = $1
                )
            LIMIT 1
SQL;

        $result = pg_query_params($this->db, $query, [$userId, $authUserId]);
        if (!$result) return null;

        $user = pg_fetch_object($result);

        return $user ? $user->background : null;
    }

    public function getUsers ($ownerId, $searchQuery, $areOwn = false)
    {
        if (empty($searchQuery)) {
            $searchQuery = '%';
        }

        $sign = $areOwn ? '>' : '=';

        $query = <<<SQL
                SELECT u.id, u.name, u.surname, u.phone, u.email, u.avatar, u.background, u.login,
                    ouo.mute, 
                    ouo.blocked
                FROM users u
                LEFT JOIN owner_user_options ouo 
                    ON ouo.owner_user_id = (SELECT id FROM owner_user WHERE owner_id = 3 AND user_id = u.id LIMIT 1)
                WHERE 
                    u.login LIKE $2 AND
                    u.id != $1 AND
                    (SELECT COUNT(user_id) FROM owner_user WHERE owner_id = $1 AND user_id = u.id) {$sign} 0
SQL;

//
//        $query = <<<SQL
//            SELECT u.id, u.name, u.surname, u.phone, u.email, u.avatar, u.background, u.login
//            FROM owner_user ou
//            LEFT JOIN users u
//                ON u.id = ou.user_id
//            WHERE
//                ou.owner_id = $1 AND
//                u.login LIKE $2
//SQL;

        $result = pg_query_params($this->db, $query, [$ownerId, "%{$searchQuery}%"]);
        if (!$result) return [];

        $users = pg_fetch_all($result);
        return $users ? $users : [];
    }

    public function getUserLanguages ($userId)
    {
        $query = <<<SQL
            SELECT 
                ul.id, l.name, l.icon, l.id as lang_id, l.code
            FROM user_lang ul
            LEFT JOIN langs l ON l.id = ul.lang_id
            WHERE 
                ul.user_id = $1
SQL;

        $result = pg_query_params($this->db, $query, [$userId]);
        if (!$result) return null;

        $nets = pg_fetch_all($result);

        return $nets ? (array)$nets : [];
    }

    public function getMutualUsers ($authUserId, $userId)
    {
        $query = <<<SQL
            SELECT u.id, u.name, u.surname, u.login, u.avatar,
	            FROM public.owner_user ou
	            LEFT JOIN users u
		            ON u.id = ou.user_id
	        WHERE 
	            ou.owner_id = $1 AND
	            ou.user_id IN (
	                SELECT user_id FROM owner_user WHERE owner_id = $2
	            )
SQL;

        $result = pg_query_params($this->db, $query, [$authUserId, $userId]);
        if (!$result) return null;

        $users = pg_fetch_all($result);

        return $users ? (array)$users : [];
    }

    public function getUserNets ($userId)
    {
        $query = <<<SQL
            SELECT 
                un.id, n.id as net_id, un.url
            FROM user_net un
            LEFT JOIN nets n ON n.id = un.net_id
            WHERE 
                un.user_id = $1
SQL;

        $result = pg_query_params($this->db, $query, [$userId]);
        if (!$result) return null;

        $nets = pg_fetch_all($result);

        return $nets ? (array)$nets : [];
    }

    public function checkUser ($data)
    {
        $query = <<<SQL
            SELECT * FROM users u
            WHERE u.login LIKE $1 OR u.email LIKE $2
SQL;

        $result = pg_query_params($this->db, $query, [
            isset($data['login']) ? $data['login'] : '%',
            isset($data['email']) ? $data['email'] : '%'
        ]);

        $users = pg_fetch_all($result);

        return (bool)$users;
    }

    public function getShortUser ($authUserId, $userId)
    {
        $query = <<<SQL
            SELECT 
                u.id, u.login, u.name, u.surname, u.seen
            FROM users u
            WHERE 
                u.id = $1 AND
                (SELECT COUNT(id) FROM owner_user WHERE owner_id = $2 AND user_id = $1) > 0
SQL;

        $result = pg_query_params($this->db, $query, [$userId, $authUserId]);
        if (!$result) return null;

        $user = pg_fetch_object($result);

        return $user ? (array)$user : null;
    }

    public function getUser ($authUserId, $userId)
    {
        $query = <<<SQL
            SELECT 
                u.id, u.login, u.name, u.surname, u.phone, u.email, u.avatar, u.description, u.sex, u.birthday, u.city, u.seen
            FROM users u
            WHERE 
                u.id = $1 AND
                (($2 = $1) OR (SELECT COUNT(id) FROM owner_user WHERE owner_id = $2 AND user_id = $1) > 0)
SQL;

        $result = pg_query_params($this->db, $query, [$userId, $authUserId]);
        if (!$result) return null;

        $user = pg_fetch_object($result);

        return $user ? (array)$user : null;
    }

    public function getAuthUser ($authUserId)
    {
        $query = <<<SQL
            SELECT 
                u.id, u.login, u.name, u.surname, u.interface_mode
            FROM users u
            WHERE 
                u.id = $1
SQL;

        $result = pg_query_params($this->db, $query, [$authUserId]);
        if (!$result) return null;

        $user = pg_fetch_object($result);

        return $user ? $user : null;
    }

    public function editUser ($userId, $userData)
    {
        $fieldList = ['password', 'name', 'surname', 'phone', 'email', 'avatar', 'background', 'status', 'interface_mode', 'sex', 'city', 'description', 'birthday', 'seen'];
        $setList = [];

        foreach ($fieldList as $field) {
            if (isset($userData[$field])) {
                $value = Database::sanitize($userData[$field]);
                $setList[] = "{$field} = '{$value}'";
            }
        }

        $setListString = implode(', ', $setList);

        $query = <<<SQL
            UPDATE users
            SET {$setListString}
            WHERE id = {$userId};
SQL;

        if (!pg_query($this->db, $query)) {
            return false;
        }

        return $this->getAuthUser($userId);
    }

    public function getUserDirectory ($authUserId, $userId = null)
    {
        if (!$userId) $userId = $authUserId;

        $query = <<<SQL
            SELECT 
                directory
            FROM users
            WHERE id = $1 AND
                (SELECT COUNT(id) FROM owner_user WHERE (owner_id = $2 AND user_id = $1) OR ($2 = $1)) > 0
SQL;

        $result = pg_query_params($this->db, $query, [$userId, $authUserId]);
        if (!$result) return null;

        $user = pg_fetch_object($result);
        if (!$user || !$user->directory) return null;

        return $user->directory;
    }

//    public function changeUserStatus (int $userId, int $status)
//    {
//        $query = <<<SQL
//            UPDATE users
//            SET status = $1
//            WHERE id = $2
//SQL;
//
//        return (bool) pg_query_params($this->db, $query, [$status, $userId]);
//    }

    public function searchUsers ($searchQuery, $authUserId = '%')
    {
        $query = <<<SQL
            SELECT 
                u.id, u.login, u.name, u.surname
            FROM users u
            WHERE 
                LOWER(u.login) LIKE LOWER($1) AND
                u.id IN (
                    SELECT ou.user_id 
                    FROM owner_user ou 
                    WHERE CAST(ou.owner_id AS VARCHAR) LIKE $2
                )
SQL;

        $result = pg_query_params($this->db, $query, ["%{$searchQuery}%", "{$authUserId}"]);
        if (!$result) return null;

        $users = pg_fetch_all($result);
        return $users ? (array)$users : [];
    }

    public function addOwnerUser ($ownerId, $userId)
    {
        $result = pg_query_params($this->db,
            "INSERT INTO owner_user(owner_id, user_id) VALUES ($1, $2)",
            [$ownerId, $userId]
        );
        if (!$result) return false;

        $result = pg_query($this->db, "SELECT MAX(id) as id FROM owner_user LIMIT 1;");
        if (!$result) return false;

        $ownerUser = pg_fetch_object($result);
        if (empty($ownerUser->id)) return false;

        $result = pg_query_params($this->db,
            "INSERT INTO owner_user_options(owner_user_id, mute, blocked) VALUES ($1, 0, 0);",
            [$ownerUser->id]);
        if (!$result) return false;

        return true;
    }

    public function deleteOwnerUser ($ownerId, $userId)
    {
        $query = <<<SQL
            DELETE FROM owner_user_options
            WHERE owner_user_id = (SELECT id FROM owner_user WHERE owner_id = $1 AND user_id = $2 LIMIT 1);
SQL;

        $result = pg_query_params($this->db, $query, [$ownerId, $userId]);

        $query = <<<SQL
            DELETE FROM owner_user
            WHERE owner_id = $1 AND user_id = $2;
SQL;

        $result = pg_query_params($this->db, $query, [$ownerId, $userId]);
        if (!$result) return false;

        return (bool)$result;
    }

    public function getUserAvatar ($userId)
    {
        $result = pg_query_params($this->db, "SELECT avatar FROM users WHERE id=$1 LIMIT 1", [$userId]);
        if (!$result) return [];

        $user = pg_fetch_object($result);
        return $user ? $user->avatar : null;
    }

    public function changeUserOption ($authUserId, $userId, $data)
    {
        $query = <<<SQL
            UPDATE owner_user_options
            SET {$data['option']} = $1
            WHERE (
                SELECT COUNT(id) 
                FROM owner_user ou
                WHERE 
                    ou.id = owner_user_id AND
                    ou.owner_id = $2 AND
                    ou.user_id = $3
            ) > 0
SQL;

        $result = pg_query_params(
            $this->db,
            $query,
            [$data['value'], $authUserId, $userId]
        );

        return (bool)$result;
    }

    public function getUserOptions ($authUserId, $userId)
    {
        $query = <<<SQL
            SELECT 
                o.mute, o.blocked
            FROM owner_user_options o
            LEFT JOIN owner_user ou
                ON ou.id = o.owner_user_id
            WHERE 
                ou.owner_id = $1 AND
                ou.user_id = $2
            LIMIT 1
SQL;

        $result = pg_query_params($this->db, $query, [$authUserId, $userId]);
        if (!$result) return null;

        $options = pg_fetch_object($result);

        return $options ? (array)$options : [];
    }

    public function getUserImages ($authUserId, $userId)
    {
        if ($authUserId === $userId) {
            $query = <<<SQL
                SELECT 
                    i.id
                FROM gallery i
                WHERE 
                    i.user_id = $1 AND $2=$2
SQL;
        } else {
            $query = <<<SQL
                SELECT 
                    i.id
                FROM gallery i
                LEFT JOIN owner_user ou
                    ON i.user_id = ou.user_id
                WHERE 
                    (ou.owner_id = $1 AND ou.user_id = $2)
SQL;
        }

        $result = pg_query_params($this->db, $query, [$authUserId, $userId]);
        if (!$result) return null;

        $images = pg_fetch_all($result);

        return $images ? $images : [];
    }

    public function getUserVideo ($authUserId, $userId)
    {
        if ($authUserId === $userId) {
            $query = <<<SQL
                SELECT 
                    i.id
                FROM video_gallery i
                WHERE 
                    i.user_id = $1 AND $2=$2
SQL;
        } else {
            $query = <<<SQL
                SELECT 
                    i.id
                FROM video_gallery i
                LEFT JOIN owner_user ou
                    ON i.user_id = ou.user_id
                WHERE 
                    (ou.owner_id = $1 AND ou.user_id = $2)
SQL;
        }

        $result = pg_query_params($this->db, $query, [$authUserId, $userId]);
        if (!$result) return null;

        $video = pg_fetch_all($result);

        return $video ? $video : [];
    }

    public function changeUserNet ($userId, $data)
    {
        $fields = ['url'];

        $setArray = [];
        foreach ($data as $field => $value) {
            if (!in_array($field, $fields)) continue;

            $setArray[] = "{$field} = '{$value}'";
        }

        $set = implode(', ', $setArray);

        $query = <<<SQL
            UPDATE user_net 
            SET {$set}
            WHERE id = $2 AND user_id = $1
SQL;

        $result = pg_query_params($this->db, $query, [$userId, $data['id']]);
        if (!$result) return null;

        $video = pg_fetch_all($result);

        return $video ? $video : [];
    }

    public function addUserNet ($userId, $data)
    {
        $query = <<<SQL
            INSERT INTO user_net(user_id, net_id, url) 
            VALUES ($1, $2, $3);
SQL;

        $result = pg_query_params($this->db, $query, [$userId, $data['net_id'], $data['url']]);
        return (bool)$result;
    }

    public function deleteUserNet ($userNetId)
    {
        $query = <<<SQL
            DELETE FROM user_net
            WHERE id = $1
SQL;

        $result = pg_query_params($this->db, $query, [$userNetId]);
        return (bool)$result;
    }

    public function addUserLanguage ($userId, $languageId)
    {
        $query = <<<SQL
            INSERT INTO user_lang(user_id, lang_id) 
            VALUES ($1, $2);
SQL;

        $result = pg_query_params($this->db, $query, [$userId, $languageId]);
        return (bool)$result;
    }

    public function deleteUserLanguage ($userLangId)
    {
        $query = <<<SQL
            DELETE FROM user_lang
            WHERE id = $1
SQL;

        $result = pg_query_params($this->db, $query, [$userLangId]);
        return (bool)$result;
    }

    public function deleteUserImage ($imageId)
    {
        $query = <<<SQL
            DELETE FROM gallery
            WHERE id = $1
SQL;

        $result = pg_query_params($this->db, $query, [$imageId]);
        return (bool)$result;
    }

    public function addUserImage ($userId, $fileName)
    {
        $query = <<<SQL
            INSERT INTO gallery(user_id, filename)
            VALUES ($1, $2)
SQL;

        $result = pg_query_params($this->db, $query, [$userId, $fileName]);
        return (bool)$result;
    }

    public function deleteUserVideo ($videoId)
    {
        $query = <<<SQL
            DELETE FROM video_gallery
            WHERE id = $1
SQL;

        $result = pg_query_params($this->db, $query, [$videoId]);
        return (bool)$result;
    }

    public function addUserVideo ($userId, $fileName)
    {
        $query = <<<SQL
            INSERT INTO video_gallery(user_id, filename)
            VALUES ($1, $2)
SQL;

        $result = pg_query_params($this->db, $query, [$userId, $fileName]);
        return (bool)$result;
    }
}