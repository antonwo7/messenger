<?php


class AuthModel extends Model
{
    public function registration ($data)
    {
        $query = <<<SQL
            INSERT INTO 
                users (name, surname, login, password, email, phone, created_on, directory)
            VALUES
                ('{$data['login']}', '', '{$data['login']}', '{$data['password']}', '{$data['email']}', '{$data['phone']}', now(), '{$data['directory']}');
SQL;

        $result = pg_query($this->db, $query);
        return (bool)$result;
    }

    public function login ($data)
    {
        $query = <<<SQL
            SELECT 
                u.id, u.login, u.name, u.surname, u.seen
            FROM 
                users u
            WHERE
                u.login = '{$data['login']}' AND u.password = '{$data['password']}'
SQL;

        $result = pg_query($this->db, $query);
        if (!$result) return false;

        $user = pg_fetch_object($result);
        return $user ? $user : false;
    }
}