import uuid
import random

from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils import timezone
from django.core.validators import MaxValueValidator, MinValueValidator

from .managers import CustomUserManager


class User(AbstractBaseUser, PermissionsMixin):
    # Roles on the application
    ADMIN = 1
    INSTRUCTOR = 2
    PLAYER = 3

    ROLE_CHOICES = (
        (ADMIN, 'Admin'),
        (INSTRUCTOR, 'Instructor'),
        (PLAYER, 'Player')
    )

    # Core fields
    uid = models.UUIDField(unique=True, editable=False,
                           default=uuid.uuid4, verbose_name='public_id')
    username = models.CharField(max_length=64, unique=True, blank=True)
    email = models.EmailField(unique=True)

    # Set role by default to Player
    role = models.PositiveSmallIntegerField(
        choices=ROLE_CHOICES, blank=True, null=True, default=3)

    # Extra fields
    is_active = models.BooleanField(default=True)
    created_date = models.DateTimeField(default=timezone.now)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = 'user'
        verbose_name = 'users'


class Player(models.Model):
    uid = models.UUIDField(default=uuid.uuid4,
                           editable=False, verbose_name='public_id')
    # Relationships
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='player')

    allowed_games = models.CharField(max_length=1024, blank=True)
    instructors = models.CharField(max_length=1024, blank=True)

    current_game = models.CharField(max_length=64, blank=True)
    inventory = models.IntegerField(default=0)
    backorder = models.IntegerField(default=0)
    downstream_player = models.CharField(max_length=64, blank=True)
    upstream_player = models.CharField(max_length=64, blank=True)

    class Meta:
        verbose_name = 'player'
        verbose_name_plural = 'players'


class Instructor(models.Model):
    uid = models.UUIDField(default=uuid.uuid4,
                           editable=False, verbose_name='public_id')
    # Relationships
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='instructor')
    players = models.ManyToManyField(
        Player, related_name='instructors_players')

    games_managing = models.CharField(max_length=1024, blank=True)
    my_players = models.CharField(max_length=4096, blank=True)
    my_plots = models.CharField(max_length=4096, blank=True)

    my_default_game = models.CharField(max_length=2048, blank=True)

    class Meta:
        verbose_name = 'instructor'
        verbose_name_plural = 'instructors'


class DemandPattern(models.Model):
    uid = models.UUIDField(primary_key=True, default=uuid.uuid4,
                           editable=False, verbose_name='public_id')

    # Relationships
    instructor = models.ForeignKey(
        Instructor, on_delete=models.CASCADE, related_name='instructors_demand_pattern')

    name = models.CharField(max_length=64, blank=False)
    weeks = models.IntegerField(
        blank=False,
        validators=[
            MaxValueValidator(52),
            MinValueValidator(8)
        ]
    )

    # Array of integers stored as plain text encoded JSON
    demand = models.CharField(max_length=256, blank=True)
    # Array of string stored as plain text encoded JSON
    related_games = models.CharField(max_length=1024, blank=True)

    class Meta:
        verbose_name = 'demand_pattern'
        verbose_name_plural = 'demand_patterns'


class Game(models.Model):
    # Session ID
    uid = models.UUIDField(primary_key=True, default=uuid.uuid4,
                           editable=False, verbose_name='public_id')

    # Relationships
    player = models.ManyToManyField(
        Player, related_name='players_game')
    instructor = models.ForeignKey(
        Instructor, on_delete=models.CASCADE, related_name='instructors_game')
    demand_pattern = models.OneToOneField(
        DemandPattern, on_delete=models.PROTECT, related_name='games_demand_pattern')

    session_length = models.IntegerField(default=0)
    distributor_present = models.BooleanField(default=False)
    wholesaler_present = models.BooleanField(default=False)
    holding_cost = models.FloatField(default=0.0)
    backlog_cost = models.FloatField(default=0.0)
    active = models.BooleanField(default=False)
    info_sharing = models.BooleanField(default=False)
    info_delay = models.IntegerField(default=2)
    rounds_completed = models.IntegerField(default=0)
    is_default_game = models.BooleanField(default=False)
    starting_inventory = models.IntegerField(default=12)
    player_weeks = models.CharField(max_length=4, blank=False)

    class Meta:
        verbose_name = 'game'
        verbose_name_plural = 'games'
