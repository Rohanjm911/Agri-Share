from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit or delete it.
    Read permissions are allowed to any request.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request (GET, HEAD, OPTIONS)
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the equipment
        return obj.owner == request.user

class IsRegisteredOwner(permissions.BasePermission):
    """
    Custom permission to only allow registered equipment owners to list equipment.
    """
    message = "Only registered equipment owners are allowed to list new equipment."

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated and getattr(request.user, "role", None) == "OWNER")

class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Custom permission to allow read-only for public, and write for staff/admins.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff
