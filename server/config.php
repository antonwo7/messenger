<?php

define('SITE_URL', 'http://messenger.loc/');

define('DS', DIRECTORY_SEPARATOR);
define('ROOT_DIR', __DIR__ . DS);
define('SYSTEM_DIR', ROOT_DIR . 'system' . DS);
define('SYSTEM_CLASSES', SYSTEM_DIR . 'classes' . DS);

define('AUTOLOAD_DIRECTORIES', ['application/controller/', 'application/model/', 'application/logic/', 'application/service/', 'system/classes/']);

define('FILES_DIR', ROOT_DIR . 'files' . DS);
define('AVATAR_DIR', ROOT_DIR . 'files' . DS . 'avatars' . DS);
define('BACKGROUND_DIR', ROOT_DIR . 'files' . DS . 'backgrounds' . DS);

define('IMG_DIR', ROOT_DIR . 'assets' . DS . 'img' . DS);
define('IMG_DIR_URL', SITE_URL . 'assets' . DS . 'img' . DS);

define('USER_BACKGROUND_DIR_NAME', 'background');
define('USER_GALLERY_DIR_NAME', 'gallery');
define('USER_VIDEO_DIR_NAME', 'video');

define('USER_GALLERY_DIR', FILES_DIR . '%user_dir%' . DS . 'gallery');
define('USER_ATTACHMENTS_DIR', 'attachments' . DS);
define('USER_AVATAR_DIR', FILES_DIR . '%user_dir%' . DS . 'avatars' . DS);
define('USER_BACKGROUND_DIR', FILES_DIR . '%user_dir%' . DS . 'background' . DS);
define('USER_AVATAR_DIR_URL', SITE_URL . '%user_dir%/avatars/');
define('USER_GALLERY_DIR_URL', SITE_URL . '%user_dir%/gallery/');

define('DB_HOST', 'localhost');
define('DB_PORT', '5555');
define('DB_DATABASE', 'messenger');
define('DB_USERNAME', 'anton');
define('DB_PASSWORD', 'anton');

define('TOKEN_SECRET', 'secret');
define('TOKEN_EXPIRED_TIME', 3600);

define('HASHED_PASSWORD_COST', 12);

define('SALT', 'Hello');

define('PROFILE_DEFAULT_BACKGROUND', 'profile-background.jpeg');
define('PROFILE_DEFAULT_AVATAR', 'avatar-men.jpg');