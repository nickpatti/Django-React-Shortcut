from rest_framework import routers
from .api import HomePageViewSet

router = routers.DefaultRouter()
router.register('api/homepage/', HomePageViewSet, 'homepage')

urlpatterns = router.urls
