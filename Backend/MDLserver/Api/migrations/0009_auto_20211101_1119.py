# Generated by Django 3.2.7 on 2021-11-01 10:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Api', '0008_auto_20211031_1944'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comment',
            old_name='comments',
            new_name='comment',
        ),
        migrations.AddField(
            model_name='comment',
            name='dislikes',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='comment',
            name='likes',
            field=models.TextField(null=True),
        ),
    ]
