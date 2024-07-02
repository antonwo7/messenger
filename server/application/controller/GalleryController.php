<?php


class GalleryController extends Controller
{
    private UsersModel $usersModel;
    private GalleryModel $galleryModel;
    private UserService $usersService;

    function __construct ()
    {
        parent::__construct();

        $this->usersModel = new UsersModel();
        $this->galleryModel = new GalleryModel();
        $this->usersService = new UserService($this->request);
    }

    public function AddImage ()
    {
        $files = $this->request->files();

        $authUserId = $this->GetAuthUserId();
        $authUserDir = $this->usersModel->getUserDirectory($authUserId);

        $imageFileName = UploadService::uploadFile($files['image'], FILES_DIR . $authUserDir . DS . USER_GALLERY_DIR);

        $imageId = $this->galleryModel->addImage(['filename' => $imageFileName, 'user_id' => $authUserId]);
        if (!$imageId) View::error('Image uploading error');

        View::success(['id' => $imageId]);
    }

    public function GetGallery ()
    {
        $authUserId = $this->GetAuthUserId();

        View::success(['images' => $this->galleryModel->getGallery($authUserId)]);
    }

    public function DeleteImage ($imageId)
    {
        $authUserId = $this->GetAuthUserId();
        $authUserDir = $this->usersModel->getUserDirectory($authUserId);

        $imageFileName = $this->galleryModel->deleteImage(['id' => $imageId, 'user_id' => $authUserId]);
        if (!$imageFileName) View::error('Image deleting error');

        $imageFilePath = FILES_DIR . $authUserDir . DS . $imageFileName;

        if (!unlink($imageFilePath)) View::error('Image not found on server');

        View::success([]);
    }

//    public function getImage ($fileName)
//    {
//        $authUserId = $this->GetAuthUserId();
//        $authUserDir = $this->usersModel->getUserDirectory($authUserId);
//
//        $filePath = USER_GALLERY_DIR . $fileName;
//
//        View::file($filePath);
//    }

    public function GetGalleryImage ($userId, $imageId)
    {
        $data = $this->request->get();
        if (empty($data['token'])) View::error('Token is invalid');

        if (empty($userId) || empty($imageId)) View::error('Data is invalid');

        $this->GetAuthUserId($data['token']);

        $userDirName = $this->usersModel->getUserDirectory($userId);
        $imageFileName = $this->galleryModel->getGallery($imageId);

        View::file($userDirName . DS . USER_GALLERY_DIR_NAME, $imageFileName);
    }

    public function GetGalleryVideo ($userId, $videoId)
    {
        $data = $this->request->get();
        if (empty($data['token'])) View::error('Token is invalid');

        if (empty($userId) || empty($videoId)) View::error('Data is invalid');

        $this->GetAuthUserId($data['token']);

        $userDirName = $this->usersModel->getUserDirectory($userId);
        $videoFileName = $this->galleryModel->getVideo($videoId);

        View::file($userDirName . DS . USER_VIDEO_DIR_NAME, $videoFileName);
    }
}