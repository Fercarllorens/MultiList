# Generated by Django 3.2.7 on 2021-11-04 17:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Api', '0011_merge_20211104_1834'),
    ]

    operations = [
        migrations.AddField(
            model_name='list',
            name='custom',
            field=models.BooleanField(default=False, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='premium',
            field=models.BooleanField(default=False, null=True),
        ),
    ]
