# Generated by Django 3.2.7 on 2021-11-16 17:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Api', '0011_merge_20211116_1829'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='following',
            field=models.TextField(null=True),
        ),
    ]
