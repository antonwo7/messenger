<?php


class CommonModel extends Model
{
    public function getLanguages ()
    {
        $query = <<<SQL
            SELECT *
            FROM langs
            ORDER BY id DESC    
SQL;

        $result = pg_query($this->db, $query);
        if (!$result) return [];
        $langs = pg_fetch_all($result);
        return $langs ? $langs : [];
    }

    public function getNets ()
    {
        $query = <<<SQL
            SELECT *
            FROM nets
            ORDER BY id DESC    
SQL;

        $result = pg_query($this->db, $query);
        if (!$result) return [];
        $nets = pg_fetch_all($result);
        return $nets ? $nets : [];
    }
}