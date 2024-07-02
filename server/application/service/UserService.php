<?php


class UserService
{
    private Request $request;

    function __construct (Request $request)
    {
        $this->request = $request;
    }

    public function editUserPrepare ()
    {
        $userData = $this->request->post();
//        $userFiles = $this->request->files();

        if (isset($userData['password'])) {
            $userData['password'] = AuthService::hashPassword($userData['password']);
        }

//        if (!empty($userFiles['avatar'])) {
//            $userData['avatar'] = UploadService::uploadFile($userFiles['avatar'], AVATAR_DIR);
//        }
//
//        if (!empty($userFiles['background'])) {
//            $userData['background'] = UploadService::uploadFile($userFiles['background'], BACKGROUND_DIR);
//        }

        return $userData;
    }

    public function getUserAvatarDir ($userDirName)
    {
        return str_replace('%user_dir%', $userDirName, USER_AVATAR_DIR);
    }

    public function getUserAvatarDirUrl ($userDirName)
    {
        return str_replace('%user_dir%', $userDirName, USER_AVATAR_DIR_URL);
    }

    public function getUserGalleryDir ($userDirName)
    {
        return str_replace('%user_dir%', $userDirName, USER_GALLERY_DIR);
    }

    public function getUserGalleryDirUrl ($userDirName)
    {
        return str_replace('%user_dir%', $userDirName, USER_GALLERY_DIR_URL);
    }
}