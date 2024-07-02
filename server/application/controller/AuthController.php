<?php


class AuthController extends Controller
{
    private UsersModel $usersModel;
    private AuthModel $authModel;

    function __construct ()
    {
        parent::__construct();

        $this->usersModel = new UsersModel();
        $this->authModel = new AuthModel();
    }

    public function Registration ()
    {
        $registrationData = $this->request->post();

        if (empty($registrationData['login']) || empty($registrationData['password']) || empty($registrationData['email']) || empty($registrationData['email'])) {
            View::error('Registration data is empty');
        }

        if ($this->usersModel->checkUser($registrationData)) {
            View::error('User already exist');
        }

        $registrationData['password'] = AuthService::hashPassword($registrationData['password']);

        $userDir = AuthService::createUserDir();
        if (!$userDir) {
            View::error('User dir creation error');
        }

        $registrationData['directory'] = $userDir;

        if (!$this->authModel->registration($registrationData)) {
            View::error('Registration error');
        }

        View::success([]);
    }

    public function Login ()
    {
        $loginData = $this->request->post();

        if (empty($loginData['login']) || empty($loginData['password'])) {
            View::error('Login data is empty');
        }

        $loginData['password'] = AuthService::hashPassword($loginData['password']);

        $user = $this->authModel->login($loginData);

        if (!$user) {
            View::error('Login error');
        }

        $user->interface_mode = (int)$user->interface_mode;

        $token = TokenService::generateToken(['id' => $user->id, 'exp' => (time() + TOKEN_EXPIRED_TIME)], TOKEN_SECRET);

        View::success(['token' => $token, 'user' => $user]);
    }

    public function Validate ()
    {
        $loginData = $this->request->post();

        if (empty($loginData['token'])) {
            View::error('Token is empty');
        }

        $token = $loginData['token'];

        $userId = $this->GetAuthUserId($token);
        $user = $this->usersModel->getAuthUser($userId);

        $user->interface_mode = (int)$user->interface_mode;

        View::success(['user' => $user]);
    }

    public function ChangeUser ()
    {
        $authUserId = $this->GetAuthUserId();
        $data = $this->request->post();

        if (empty($data)) View::error('User data is empty');

        $user = $this->usersModel->editUser($authUserId, $data);
        if (!$user) View::error('User changing error');

        $user->id = (int)$user->id;
        $user->interface_mode = (int)$user->interface_mode;

        View::success(['user' => $user]);
    }
}