from django.db import models

# Create your models here.


class Property(models.Model):
    img_class = models.CharField(max_length=30)

    def __str__(self):
        return self.img_class


class Images(models.Model):
    img_class = models.ForeignKey(
        Property, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/')
