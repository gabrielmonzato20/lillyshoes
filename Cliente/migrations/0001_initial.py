# Generated by Django 2.2.3 on 2019-10-20 15:47

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cliente',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=50)),
                ('cpf', models.CharField(max_length=18)),
                ('endereco', models.CharField(max_length=100)),
                ('telefone', models.CharField(max_length=22)),
                ('cidade', models.CharField(max_length=80)),
                ('estado', models.CharField(max_length=5)),
                ('cep', models.CharField(max_length=50)),
            ],
        ),
    ]
