from pathlib import Path
from os.path import abspath, basename, dirname, join, normpath
from datetime import timedelta
import sys
import os

# Path configuration
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Fetch the name of project parent-directory
DJANGO_ROOT = dirname(abspath(__file__))

# Fetch the project_root
PROJECT_ROOT = dirname(DJANGO_ROOT)

# Name of the site
SITE_NAME = basename(DJANGO_ROOT)

# Gather static files here
STATIC_ROOT = join(PROJECT_ROOT, 'run', 'static')

# Gather media files here
MEDIA_ROOT = join(PROJECT_ROOT, 'run', 'media')

# Static files
STATICFILES_DIRS = [
    join(PROJECT_ROOT, 'static'),
]

# Template files
PROJECT_TEMPLATES = [
    join(PROJECT_ROOT, 'templates'),
]

# Security configuration
SECRET_FILE = normpath(join(PROJECT_ROOT, 'run', 'SECRET.key'))

# Grab the secret key
try:
    SECRET_KEY = open(SECRET_FILE).read().strip()
except IOError:
    try:
        from django.utils.crypto import get_random_string
        chars = 'abcdefghijklmnopqrstuvwxyz0123456789!$%&()=+-_'
        SECRET_KEY = get_random_string(50, chars)
        with open(SECRET_FILE, 'w') as f:
            f.write(SECRET_KEY)
    except IOError:
        raise Exception('Could not open %s for writing!' % SECRET_FILE)

# Debug configuration
DEBUG = True

ALLOWED_HOSTS = []

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    # Core authentication framework and its default models
    'django.contrib.auth',
    # Django content type system (allows permissions to be associated with models)
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Django Documentation
    'drf_yasg',
    'rest_framework',
    'corsheaders',
    # API app
    'beer',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    # Manage sessions across requests
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    # Associate users with requests using sessions
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Django REST Framework
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
}

# Configure JSON Web Token settings
# More details: https://django-rest-framework-simplejwt.readthedocs.io/en/latest/settings.html
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': False,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUTH_HEADER_TYPES': ('Bearer'),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
}

ROOT_URLCONF = '%s.urls' % SITE_NAME

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': PROJECT_TEMPLATES,
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django.template.context_processors.debug',
                'django.template.context_processors.i18n',
                'django.template.context_processors.media',
                'django.template.context_processors.request',
                'django.template.context_processors.static',
                'django.template.context_processors.tz',
            ],
        },
    },
]

WSGI_APPLICATION = '%s.wsgi.application' % SITE_NAME

ASGI_APPLICATION = '%s.asgi.application' % SITE_NAME

# Set auth user to the redefined user
AUTH_USER_MODEL = 'beer.user'

# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

# If your database is in your local machine
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'seteam05',
        'USER': 'root',
        'PASSWORD': 'qlenfrlsms99',
        'HOST': '127.0.0.1',
        'PORT': '3306',
    }
}

# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Look for translations in these locations
LOCALE_PATHS = (
    join(PROJECT_ROOT, 'locale'),
)

# Inject the localization middleware into the right position
MIDDLEWARE = [y for i, x in enumerate(MIDDLEWARE) for y in (
    ('django.middleware.locale.LocaleMiddleware', x) if MIDDLEWARE[i - 1] ==
    'django.contrib.sessions.middleware.SessionMiddleware' else (x, ))]

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'

MEDIA_URL = '/media/'

# CORS configuration for frotnend
CORS_ORIGIN_WHITELIST = [
    'http://localhost:3000'
]

# Change on production to False
CORS_ORIGIN_ALLOW_ALL = True
