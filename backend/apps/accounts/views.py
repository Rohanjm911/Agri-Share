from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from drf_spectacular.utils import extend_schema, OpenApiResponse

from .models import User
from .serializers import (
    UserSerializer,
    RegisterSerializer,
    CustomTokenObtainPairSerializer,
    ChangePasswordSerializer,
)

@extend_schema(
    tags=["Authentication"],
    summary="Register a new user account",
    description="Registers a new user (farmer or equipment owner) and returns user profile data.",
    responses={201: UserSerializer, 400: OpenApiResponse(description="Validation error")},
)
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Generate tokens immediately upon registration
        refresh = RefreshToken.for_user(user)
        user_data = UserSerializer(user, context={"request": request}).data

        return Response(
            {
                "user": user_data,
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "message": "Registration successful.",
            },
            status=status.HTTP_201_CREATED,
        )

@extend_schema(
    tags=["Authentication"],
    summary="Login with email and password",
    description="Authenticates user credentials and returns JWT access and refresh tokens.",
)
class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = CustomTokenObtainPairSerializer

@extend_schema(
    tags=["Authentication"],
    summary="Get and update current user profile",
    description="Retrieves or updates the authenticated user's profile details.",
    responses={200: UserSerializer},
)
class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        return self.request.user

@extend_schema(
    tags=["Authentication"],
    summary="Change user password",
    description="Allows authenticated users to change their account password after validating old password.",
)
class ChangePasswordView(generics.GenericAPIView):
    serializer_class = ChangePasswordSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = request.user
        if not user.check_password(serializer.validated_data["old_password"]):
            return Response(
                {"old_password": ["Current password is incorrect."]},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.set_password(serializer.validated_data["new_password"])
        user.save()
        return Response(
            {"message": "Password changed successfully."},
            status=status.HTTP_200_OK,
        )

@extend_schema(
    tags=["Authentication"],
    summary="Logout user",
    description="Logs out the user. Tokens are discarded on the client.",
)
class LogoutView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        return Response(
            {"message": "Successfully logged out."},
            status=status.HTTP_200_OK,
        )
