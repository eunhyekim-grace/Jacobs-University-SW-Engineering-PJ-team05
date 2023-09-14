from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User, Instructor, Player, Game, DemandPattern


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'username',
            'email'
            'role',
        )
    def create(self,validated_data):
        return User(**validated_data)
        
    def update(self,instance,validated_data):
        instance.email = validated_data.get('email',instance.email)
        instance.username = validated_data.get('username',instance.username)
        instance.role = validated_data.get('role',instance.role)
     
    


class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = (
            'games_managing',
            'my_players',
            'my_plots',
            'my_default_game'
        )
    def create(self,validated_data):
        return Instructor(**validated_data)
    



class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = (
            'allowed_games',
            'instructors',
            'current_game',
            'inventory',
            'backorder',
            'downstream_player',
            'upstream_player'
        )


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = (
            'uid',
            'session_length',
            'distributor_present',
            'wholesaler_present',
            'demand_pattern',
            'holding_cost',
            'backlog_cost',
            'active',
            'info_sharing',
            'info_delay',
            'rounds_completed',
            'is_default_game',
            'starting_inventory',
            'player_weeks',
            'instructor'
        )


class DemandPatternSerializer(serializers.ModelSerializer):
    class Meta:
        model = DemandPattern
        fields = (
            'uid',
            'instructor',
            'name',
            'weeks',
            'demand',
            'related_games'
        )


class UserSignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'username',
            'email',
            'password',
            'role',
        )

    def create(self, validated_data):
        # Create user using the data retrieved
        role = int(validated_data.get('role'))

        #currently no instructor page has been implemented so the default sign up role is student/player
        # role = 3

        user = dict()

        if role == 2:
            user = User.objects.create_instructor(**validated_data)
            Instructor.objects.create(
                user=user,
                games_managing='',
                my_players='',
                my_plots='',
                my_default_game=''
            )
        elif role == 3:
            user = User.objects.create_player(**validated_data)
            Player.objects.create(
                user=user,
                allowed_games='',
                instructors='',
                current_game='',
                inventory=0,
                backorder=0,
                downstream_player='',
                upstream_player=''
            )

        return user


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    # Set password as write_only to prevent return in plain text form
    password = serializers.CharField(max_length=128, write_only=True)
    access = serializers.CharField(read_only=True)
    refresh = serializers.CharField(read_only=True)
    role = serializers.CharField(read_only=True)

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass

    def validate(self, data):
        email = data.get('email', None)
        password = data.get('password', None)

        # Authenticate the user with the retrieved data
        user = authenticate(email=email, password=password)

        # Check if no user could be authenticated using the credentials
        if user is None:
            raise serializers.ValidationError('Invalid credentials used!')

        try:
            # Create temporary access and refresh tokens for the user
            refresh = RefreshToken.for_user(user)
            refresh_token = str(refresh)
            access_token = str(refresh.access_token)

            update_last_login(None, user)

            # Validation data object
            validation = {
                'access': access_token,
                'refresh': refresh_token,
                'email': user.email,
                'role': user.role,
            }
            return validation
        except User.DoesNotExist:
            raise serializers.ValidationError('Invalid credentials used!')
