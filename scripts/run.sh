#!/bin/bash

source ./env/bin/activate
cd mysite
python3 manage.py migrate
python3 manage.py runserver