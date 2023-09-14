from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.http import JsonResponse


from .serializers import (
    UserSerializer,
    InstructorSerializer,
    PlayerSerializer,
    GameSerializer,
    DemandPatternSerializer,
    UserSignUpSerializer,
    UserLoginSerializer,
)

from .models import User, Instructor, Player, Game, DemandPattern



class UserSignUpView(APIView):
    serializer_class = UserSignUpSerializer
    # Allow everyone (authenticated or not) to access this view
    permission_classes = (AllowAny,)

    # POST request handler
    def post(self, request):
        # Serialize and validate data
        serializer = self.serializer_class(data=request.data)
        is_valid = serializer.is_valid(raise_exception=True)
        
        if is_valid:
            # Save serializer state
            serializer.save()
            # Set the code to successful creation procedure
            status_code = status.HTTP_201_CREATED

            # Object accepted by the Response() call
            response = {
                'success': True,
                'statusCode': status_code,
                'message': 'Successful sign up!',
            }

            # Instantiate response object and send it back with code 201
            return Response(response, status=status_code)

        else:

            status_code = status.HTTP_400_BAD_REQUEST

            response = {
                'success': False,
                'statusCode': status_code,
                'message': 'Username already exists',
            }   
            return Response(response, status=status_code)
        

class UserLoginView(APIView):
    serializer_class = UserLoginSerializer
    # Allow everyone (authenticated or not) to access this view
    permission_classes = (AllowAny,)

    # POST request handler
    def post(self, request):
        # Serialize and validate data
        serializer = self.serializer_class(data=request.data)
        is_valid = serializer.is_valid(raise_exception=True)

        if is_valid:
            # Set the code to success on return
            status_code = status.HTTP_200_OK

            # Object accepted by the Response() call
            response = {
                'success': True,
                'statusCode': status_code,
                'message': 'Successful login!',
                'access': serializer.data['access'],
                'refresh': serializer.data['refresh'],
                'authenticatedUser': {
                    'email': serializer.data['email'],
                    'role': serializer.data['role']
                }
            }

            # Instantiate response object and send it back with code 200
            return Response(response, status=status_code)


class AuthUserProfileView(APIView):
    # serializer_class =
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        response = dict()
        status_code = HTTP_200_OK

        try:
            if request.user.role == 2:
                # Perform authentication to verify the user
                #
                instructor = Instructor.objects.get(user=request.user)
                status_code = status.HTTP_200_OK
                response = {
                    'success': True,
                    'statusCode': status_code,
                    'message': 'Instructor profile fetched successfully!',
                    'profile': {
                        # 'username': # Retrieve username from user
                        # 'email': # Retrieve email from user
                        # 'games_managing': instructor.games_managing
                        # 'my_players': instructor.my_players,
                        # 'my_plots': instructor.my_plots,
                        # 'my_default_game': instructor.my_default_game
                    }
                }
            elif request.user.role == 3:
                # Perform authentication to verify the user
                #

                player = Player.objects.get(user=request.user)
                status_code = status.HTTP_200_OK

                response = {
                    'success': True,
                    'statusCode': status_code,
                    'message': 'Player profile fetched successfully!',
                    'profile': {
                        # 'username': # Retrieve username from user
                        # 'email': # Retrieve email from user
                        # 'allowed_games': player.allowed_games,
                        # 'instructors': player.instructors,
                        # 'current_game': player.current_game,
                        # 'inventory': player.inventory,
                        # 'backorder': player.backorder,
                        # 'downstream_player': player.downstream_player,
                        # 'upstream_player': player.upstream_player
                    }
                }

        except Exception as err:
            status_code = status.HTTP_400_BAD_REQUEST

            response = {
                'success': False,
                'statusCode': status_code,
                'message': 'User does not exist!',
                'error': str(err)
            }

        return Response(response, status=status_code)


class AuthGameListView(APIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    permission_classes = (IsAuthenticated,)

    # GET request handler
    def get(self, request,format=None):
        # Temporary data needed

        user = request.user
        status_code = status.HTTP_200_OK
        message = ''

        if user.role == 1:
            # Retrieve all games on the platform
            serializer = 1

            message = 'Successfully fetched the games!'
            status_code = status.HTTP_200_OK

            # Set games to custom serializer
        if user.role == 2:
            # Retrieve all games that the instructor is owner of
            serializer = 2
            message = 'Successfully fetched instructor\'s games!'
            status_code = status.HTTP_200_OK

            # Set games to custom serializer
        else:
            # Retrieve all games that the player is part of
            serializer = 3

            message = 'Successfully fetched player\'s games!'
            status_code = status.HTTP_200_OK

            # Set games to custom serializer

        response = {
            'success': True,
            'statusCode': status_code,
            'message': message
            # 'games': serializer.data
        }

        return Response(response, status=status_code)

    ##Creating a Game
    def post(self,request):
        user = request.user
        status_code = status.HTTP_200_OK
        message = ''    
        if user.role == 2 or user.role == 1:
            serializer = self.serializer_class(data=request.data)
            is_valid = serializer.is_valid(raise_exception=True)

            if is_valid:
                # Save serializer state
                serializer.save()
                # Set the code to successful creation procedure
                status_code = status.HTTP_201_CREATED

                # Object accepted by the Response() call
                response = {
                    'success': True,
                    'statusCode': status_code,
                    'message': 'Game Created Successfully!',
                }
                user.games_managing.append(f'{serializer.data.uid} ')
                # Instantiate response object and send it back with code 201
                return Response(response, status=status_code)
        else:
            status_code = status.HTTP_401_UNAUTHORIZED
            response = {
                    'success': False,
                    'statusCode': status_code,
                    'message': 'Only Instrutctors can create games',
                }
            return Response(response,status=status_code)

class JoinGameView(APIView):
    ## Modifying game
    serializer_class = GameSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        gameobj = self.get_object(pk)
        user = request.user
        status_code = status.HTTP_200_OK
        message = '' 

        if user.role == 3:
            serializer = self.serializer_class(data=request.data)            
            is_valid = serializer.is_valid(raise_exception=True)

            if is_valid:
                # Save serializer state
                Players = serializer.data.get('player')
                uid = serializer.data.get('uid')
                status_code = status.HTTP_201_CREATED
                Player.append(f'{user.uid} ')
                # Object accepted by the Response() call
                response = {
                    'success': True,
                    'statusCode': status_code,
                    'message': f'{user.username} added to the game {uid}',
                }

                # Instantiate response object and send it back with code 201
                return Response(response, status=status_code)
        else:
            status_code = status.HTTP_401_UNAUTHORIZED
            response = {
                    'success': False,
                    'statusCode': status_code,
                    'message': 'Only players can play games',
                }
            return Response(response,status=status_code)

class AuthDemandPatternView(APIView):
    serializer_class = DemandPatternSerializer
    permission_class = (IsAuthenticated,)

    # GET request handler
    def get(self, request):
        user = request.user
        status_code = status.HTTP_200_OK
        message=''
        ##only admin and intructor can check demand patterns
        if user.role==1 or user.role==2:
            patterns = DemandPattern.objects
            response = {
                'success': True,
                'statusCode': status_code,
                'message': 'demand patterns fetched succesfully!',
                'profile': {
                    # 'uid',
                    # 'instructor_id'
                    # 'name',
                    # 'weeks',
                    # 'demand',
                    # 'related_games'
                }
            }
            return Response(response,status=status_code)
        else:
            status_code = status.HTTP_401_UNAUTHORIZED
            response = {
                    'success': False,
                    'statusCode': status_code,
                    'message': 'Only Instrutctors can check demmand patterns',
                }
            return Response(response,status=status_code)


    # POST request handler
    def post(self, request):
        user = request.user
        status_code = status.HTTP_200_OK
        message=''
        ##only admin and intructor can check demand patterns

        if user.role==1 or user.role==2:
            serializer = self.serializer_class(data=request.data)
            is_valid = serializer.is_valid(raise_exception=True)

            if is_valid:
                # Save serializer state
                serializer.save()
                # Set the code to successful creation procedure
                status_code = status.HTTP_201_CREATED

                # Object accepted by the Response() call
                response = {
                    'success': True,
                    'statusCode': status_code,
                    'message': 'Demmand Pattern Created Successfully!',
                }

                # Instantiate response object and send it back with code 201
                return Response(response, status=status_code)
        else:
            status_code = status.HTTP_401_UNAUTHORIZED
            response = {
                    'success': False,
                    'statusCode': status_code,
                    'message': 'Only Instructors can create demmand patterns',
                }
            return Response(response,status=status_code)
