#!/bin/bash

echo "creating virutal env"

virtualenv ./env

source ./env/bin/activate

pip3 install wagtail
wagtail start mysite
cd mysite
pip3 install -r requirements.txt
python3 manage.py migrate
python3 manage.py loaddata ../config/superuser.json


