<?php


class CommonController extends Controller
{
    private CommonModel $commonModel;
    private AuthModel $authModel;

    function __construct ()
    {
        parent::__construct();

        $this->commonModel = new CommonModel();
//        $this->authModel = new AuthModel();
    }

    public function GetCommon ()
    {
        $languages = $this->commonModel->getLanguages();
        $nets = $this->commonModel->getNets();

        View::success(['languages' => $languages, 'nets' => $nets]);
    }
}