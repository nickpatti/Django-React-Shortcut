from django.db import models


class HomePage(models.Model):
    title = models.CharField(max_length=100, blank=True, null=True)
    content = models.TextField(max_length=100, blank=True, null=True)
