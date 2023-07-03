# build_files.sh
pip install -r requirements.txt -y

# make migrations
python3.9 manage.py migrate -y
python3.9 manage.py collectstatic -y
