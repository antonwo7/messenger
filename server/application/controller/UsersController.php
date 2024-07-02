<?php

class UsersController extends Controller
{
    private UsersModel $usersModel;
    private UserService $usersService;

    function __construct()
    {
        parent::__construct();

        $this->usersModel = new UsersModel();
        $this->usersService = new UserService($this->request);
    }

    public function GetMutualUsers ($userId)
    {
        $authUserId = $this->GetAuthUserId();

        if (!$userId) {
            View::error('User ID is empty');
        }

        View::success(['users' => $this->usersModel->getMutualUsers($authUserId, $userId)]);
    }

    public function GetBackground ($userId = null)
    {
        $get = $this->request->get();
        $token = !empty($get['token'])
            ? $token = $get['token']
            : null;

        $authUserId = $this->GetAuthUserId($token);
        $userDirName = $this->usersModel->getUserDirectory($userId);

        $background = $this->usersModel->getUserBackground($authUserId, $userId);
        if (!$background) {
            View::file(IMG_DIR, PROFILE_DEFAULT_BACKGROUND);
        }

        View::file($userDirName . DS . 'background', $background);
    }

    public function GetUser ()
    {
        $authUserId = $this->GetAuthUserId();
        $data = $this->request->post();

        $userId = $data['user_id'];

        if (!$userId) {
            $userId = $authUserId;
        }

        $userDirName = $this->usersModel->getUserDirectory($userId);
        $userDirUrl = $this->usersService->getUserGalleryDirUrl($userDirName);

        $user = $this->usersModel->getUser($authUserId, $userId);
        if (!$user) View::error('User is empty');

        $user['id'] = (int)$user['id'];

        $user['nets'] = $this->usersModel->getUserNets($userId);
        $user['nets'] = array_map(function ($net) {
            $net['id'] = (int)$net['id'];
            $net['icon'] = IMG_DIR_URL . $net['icon'];
            return $net;
        }, $user['nets']);

        $user['languages'] = $this->usersModel->getUserLanguages($userId);
        $user['languages'] = array_map(function ($lang) {
            $lang['id'] = (int)$lang['id'];
            $lang['icon'] = IMG_DIR_URL . $lang['icon'];
            return $lang;
        }, $user['languages']);

        if ($authUserId === $userId) {
            $user['contacts'] = $this->usersModel->getUsers($authUserId, '', true);
        }

        if ($authUserId !== $userId) {
            $options = $this->usersModel->getUserOptions($authUserId, $userId);
            $user['options'] = [];
            $user['options']['mute'] = isset($options->mute) ? (int)$options->mute : 0;
            $user['options']['blocked'] = isset($options->blocked) ? (int)$options->blocked : 0;
        }

        $user['images'] = $this->usersModel->getUserImages($authUserId, $userId);
        $user['images'] = array_map(function ($image) {
            $image['id'] = (int)$image['id'];
            return $image;
        }, $user['images']);

        $user['video'] = $this->usersModel->getUserVideo($authUserId, $userId);
        $user['video'] = array_map(function ($video) {
            $video['id'] = (int)$video['id'];
            return $video;
        }, $user['video']);


        View::success(['user' => $user]);
    }

    public function EditUser ()
    {
        $authUserId = $this->GetAuthUserId();

        $userData = $this->usersService->editUserPrepare();

        $result = $this->usersModel->editUser($authUserId, $userData);
        if (!$result) {
            View::error('User update error');
        }

        View::success([]);
    }

    public function GetUsers ()
    {
        $authUserId = $this->GetAuthUserId();

        $data = $this->request->post();
        $searchQuery = !empty($data['query']) ? $data['query'] : '';
        $areOwn = !empty($data['own']);

        $users = $this->usersModel->getUsers($authUserId, $searchQuery, $areOwn);

        $users = array_map(function ($user) {
            $user['id'] = intval($user['id']);
            $user['options'] = [];
            $user['options']['mute'] = (int)$user['mute'];
            $user['options']['blocked'] = (int)$user['blocked'];
            unset($user['mute']);
            unset($user['blocked']);
            return $user;
        }, $users);

        View::success(['users' => $users]);
    }

    public function SearchUsers ()
    {
        $data = $this->request->post();
        if (empty($data['query']) || strlen($data['query']) < 4) View::error('Search data is empty');

        $this->GetAuthUserId();

        $searchQuery = $data['query'];

        View::success(['users' => $this->usersModel->searchUsers($searchQuery)]);
    }

    public function AddOwnerUser ()
    {
        $authUserId = $this->GetAuthUserId();

        $data = $this->request->post();
        if (empty($data['user_id'])) View::error('User ID is empty');

        $userId = $data['user_id'];

        $result = $this->usersModel->addOwnerUser($authUserId, $userId);
        if (!$result) {
            View::error('New contact creation error');
        }

        View::success([]);
    }

    public function DeleteOwnerUser ()
    {
        $authUserId = $this->GetAuthUserId();

        $data = $this->request->post();
        if (empty($data['user_id'])) View::error('User ID is empty');

        $userId = $data['user_id'];

        $result = $this->usersModel->deleteOwnerUser($authUserId, $userId);
        if (!$result) {
            View::error('Contact deleting error');
        }

        View::success([]);
    }

    public function GetAvatar ($userId)
    {
        if (empty($userId)) View::error('User id is empty');

        $userDirName = $this->usersModel->getUserDirectory($userId);
        $userAvatarFilename = $this->usersModel->getUserAvatar($userId);

        View::file($userDirName . DS . 'avatars', $userAvatarFilename);
    }

    public function ChangeUserOption ()
    {
        $authUserId = $this->GetAuthUserId();

        $data = $this->request->post();
        if (empty($data['option']) || !isset($data['value']) || empty($data['user_id'])) View::error('Option data is empty');

        $userId = $data['user_id'];

        $result = $this->usersModel->changeUserOption($authUserId, $userId, $data);
        if (!$result) View::error('Option changing error');

        View::success([]);
    }

    public function ChangeUser ()
    {
        $authUserId = $this->GetAuthUserId();
        $data = $this->request->post();

        if (empty($data)) View::error('User data is empty');

        $user = $this->usersModel->editUser($authUserId, $data);
        if (!$user) View::error('User changing error');

        View::success([]);
    }

    public function LoadUserBackground ()
    {
        $authUserId = $this->GetAuthUserId();
        $userDirName = $this->usersModel->getUserDirectory($authUserId);
        $files = $this->request->files();
        if (empty($files)) View::error('Background is empty');
        $files = array_values($files);

        $fullBackgroundDirPath = str_replace('%user_dir%', $userDirName, USER_BACKGROUND_DIR);
        $backgroundFileName = UploadService::uploadFile($files[0], $fullBackgroundDirPath);
        if (empty($backgroundFileName)) View::error('Background error');

        $user = $this->usersModel->editUser($authUserId, ['background' => $backgroundFileName]);
        if (!$user) View::error('User changing error');

        View::success([]);
    }

    public function LoadUserAvatar ()
    {
        $authUserId = $this->GetAuthUserId();
        $userDirName = $this->usersModel->getUserDirectory($authUserId);
        $files = $this->request->files();
        if (empty($files)) View::error('Avatar is empty');
        $files = array_values($files);

        $fullAvatarDirPath = str_replace('%user_dir%', $userDirName, USER_AVATAR_DIR);
        $avatarFileName = UploadService::uploadFile($files[0], $fullAvatarDirPath);
        if (empty($avatarFileName)) View::error('Avatar error');

        $user = $this->usersModel->editUser($authUserId, ['avatar' => $avatarFileName]);
        if (!$user) View::error('User changing error');

        View::success([]);
    }

    public function ChangeUserNet ()
    {
        $authUserId = $this->GetAuthUserId();
        $data = $this->request->post();

        if (empty($data['id'])) View::error('Net id is empty');

        $response = $this->usersModel->changeUserNet($authUserId, $data);
        if (!$response) View::error('User net changing error');

        View::success([]);
    }

    public function AddUserNet ()
    {
        $authUserId = $this->GetAuthUserId();
        $data = $this->request->post();

        if (empty($data['net_id']) || empty($data['url'])) View::error('Net data is empty');

        $response = $this->usersModel->addUserNet($authUserId, $data);
        if (!$response) View::error('User net adding error');

        View::success([]);
    }

    public function DeleteUserNet ()
    {
        $authUserId = $this->GetAuthUserId();
        $data = $this->request->post();

        if (empty($data['user_net_id'])) View::error('Net data is empty');

        $response = $this->usersModel->deleteUserNet($data['user_net_id']);
        if (!$response) View::error('User net deleting error');

        View::success([]);
    }

    public function AddUserLanguage ()
    {
        $authUserId = $this->GetAuthUserId();
        $data = $this->request->post();

        if (empty($data['lang_id'])) View::error('Lang data is empty');

        $response = $this->usersModel->addUserLanguage($authUserId, $data['lang_id']);
        if (!$response) View::error('Lang adding error');

        View::success([]);
    }

    public function DeleteUserLanguage ()
    {
        $authUserId = $this->GetAuthUserId();
        $data = $this->request->post();

        if (empty($data['user_lang_id'])) View::error('Lang data is empty');

        $response = $this->usersModel->deleteUserLanguage($data['user_lang_id']);
        if (!$response) View::error('User net deleting error');

        View::success([]);
    }

    public function DeleteUserImage ()
    {
        $authUserId = $this->GetAuthUserId();
        $data = $this->request->post();

        if (empty($data['image_id'])) View::error('Image data is empty');

        $response = $this->usersModel->deleteUserImage($data['image_id']);
        if (!$response) View::error('Image deleting error');

        View::success([]);
    }

    public function AddUserImage ()
    {
        $authUserId = $this->GetAuthUserId();
        $files = $this->request->files();
        if (empty($files)) View::error('Files error');

        $userDirName = $this->usersModel->getUserDirectory($authUserId);
        $userGalleryDirPath = FILES_DIR . $userDirName . DS . USER_GALLERY_DIR_NAME . DS;

        if (!is_dir($userGalleryDirPath)) {
            if (!mkdir($userGalleryDirPath, 744)) {
                View::error('Directory access denied');
            }
        }

        foreach ($files as $file) {
            $uploadedFileName = UploadService::uploadFile($file, $userGalleryDirPath);
            if (!$uploadedFileName) {
                View::error('File was not uploaded');
            }

            $result = $this->usersModel->addUserImage($authUserId, $uploadedFileName);
        }

        View::success([]);
    }

    public function DeleteUserVideo ()
    {
        $authUserId = $this->GetAuthUserId();
        $data = $this->request->post();

        if (empty($data['video_id'])) View::error('Video data is empty');

        $response = $this->usersModel->deleteUserVideo($data['video_id']);
        if (!$response) View::error('Video deleting error');

        View::success([]);
    }

    public function AddUserVideo ()
    {
        $authUserId = $this->GetAuthUserId();
        $files = $this->request->files();
        if (empty($files)) View::error('Files error');

        $userDirName = $this->usersModel->getUserDirectory($authUserId);
        $userVideoDirPath = FILES_DIR . $userDirName . DS . USER_VIDEO_DIR_NAME . DS;

        if (!is_dir($userVideoDirPath)) {
            if (!mkdir($userVideoDirPath, 744)) {
                View::error('Directory access denied');
            }
        }

        foreach ($files as $file) {
            $uploadedFileName = UploadService::uploadFile($file, $userVideoDirPath);
            if (!$uploadedFileName) {
                View::error('File was not uploaded');
            }

            $result = $this->usersModel->addUserVideo($authUserId, $uploadedFileName);
        }

        View::success([]);
    }
}