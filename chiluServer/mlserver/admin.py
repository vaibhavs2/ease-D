from django.contrib import admin

from .models import Images, Property


class ImageAdminInline(admin.TabularInline):
    model = Images
    extra = 10


class PropertyAdmin(admin.ModelAdmin):
    inlines = [ImageAdminInline, ]


admin.site.register(Property, PropertyAdmin)
