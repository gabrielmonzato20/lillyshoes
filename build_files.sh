# build_files.sh
source Ope/myenv/bin/activate
pip install -r requirements.txt
python manage.py collectstatic --noinput