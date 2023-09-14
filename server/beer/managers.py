from django.contrib.auth.base_user import BaseUserManager


class CustomUserManager(BaseUserManager):
    """
    Custom user model where the email address is the unique identifier
    """

    def create_user(self, email, password, **extra_fields):
        # Check if basic fields are missing
        if not email:
            raise ValueError('The email is required')
        if not password:
            raise ValueError('The password is required')

        # AbstractUser normalize_email() to make the domain lowercase
        email = self.normalize_email(email)

        # Set the user to the new model
        user = self.model(email=email, **extra_fields)
        # Set the password using Django's password hashing
        user.set_password(password)
        # Save database state
        user.save()

        return user

    def create_superuser(self, email, password, **extra_fields):
        # Create user with all permission and rights
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('role', 1)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if password is None:
            raise TypeError('Superuser must have a password!')

        # Check incorrect role setting on superuser creation
        if extra_fields.get('role') != 1:
            raise ValueError('Superuser should have role of Admin!')

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')

        # Create user with the data received
        return self.create_user(email, password, **extra_fields)

    def create_instructor(self, email, password, **extra_fields):
        user = self.create_user(email, password, **extra_fields)
        user.role = 2
        user.save()

        return user

    def create_player(self, email, password, **extra_fields):
        user = self.create_user(email, password, **extra_fields)
        user.role = 3
        user.save()

        return user
