# Generated by Django 2.2.1 on 2019-11-18 16:25

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Pedido', '0003_auto_20191113_1259'),
    ]

    operations = [
        migrations.AddField(
            model_name='pedido',
            name='created',
            field=models.DateField(default=datetime.date.today),
        ),
        migrations.AddField(
            model_name='pedido',
            name='updated',
            field=models.DateField(default=datetime.date.today),
        ),
    ]