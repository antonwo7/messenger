<?php


class GalleryModel extends Model
{
    public function addImage ($data)
    {
        $query = <<<SQL
            INSERT INTO 
                gallery (filename, user_id)
            VALUES
                ('{$data['filename']}', '{$data['user_id']}');
SQL;

        $result = pg_query($this->db, $query);
        return (bool)$result;
    }

    public function deleteImage ($data)
    {
        $query = <<<SQL
            SELECT filename FROM gallery
            WHERE id = $1 AND user_id = $2
SQL;

        $result = pg_query_params($this->db, $query, [$data['id'], $data['user_id']]);
        if (!$result) return false;

        $image = pg_fetch_object($result);
        if (!$image || empty($image->filename)) return false;

        $query = <<<SQL
            DELETE FROM gallery
            WHERE filename = $1
SQL;

        $result = pg_query_params($this->db, $query, [$image->filename]);
        if (!$result) return false;

        return $image->filename;
    }

    public function getGallery ($imageId)
    {
        $query = <<<SQL
            SELECT filename FROM gallery
            WHERE id = $1
            LIMIT 1
SQL;

        $result = pg_query_params($this->db, $query, [$imageId]);
        if (!$result) return null;

        $image = pg_fetch_object($result);

        return $image ? $image->filename : null;
    }

    public function getVideo ($videoId)
    {
        $query = <<<SQL
            SELECT filename FROM video_gallery
            WHERE id = $1
            LIMIT 1
SQL;

        $result = pg_query_params($this->db, $query, [$videoId]);
        if (!$result) return null;

        $image = pg_fetch_object($result);

        return $image ? $image->filename : null;
    }
}