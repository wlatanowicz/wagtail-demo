# Wagtail CMS Backend + RN Frontend Demo

## Start backend

```
cd backend
pip install -r requirements.txt
./manage.py runserver
```

Go to `http://localhost:8000/admin` and login as `admin` with password `admin` 

## Start frontend

```
cd rn-app/DemoApp
yarn install
yarn start
```

App will connect to `http://localhost:8000/admin`
