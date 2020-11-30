# Generated by Django 3.1.1 on 2020-11-18 20:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mlserver', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Property',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('img_class', models.CharField(max_length=30)),
            ],
        ),
        migrations.AlterField(
            model_name='images',
            name='img_class',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mlserver.property'),
        ),
    ]
