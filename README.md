# StudentsAndTeachersApp

This web application manages CRUD (Create, Read, Update, Delete) operations for students and teachers. It also demonstrates a many-to-many relationship where students are associated with teachers.

## Screenshots

### API Insomnia | Postman Test

<img width="1440" alt="insonmia api test" src="https://github.com/bongomin/StudentsAndTeachersApp/assets/39218838/a8c2314b-d511-4b08-a785-96ab4d8e2b04">
<img width="1440" alt="students list" src="https://github.com/bongomin/StudentsAndTeachersApp/assets/39218838/53dcdfbe-ff66-4847-8656-e00792e12f08">
<img width="1438" alt="teachersList" src="https://github.com/bongomin/StudentsAndTeachersApp/assets/39218838/2528758d-7e34-4991-8639-80bde284b9a5">

### Application Home Page
<img width="1440" alt="Home Page" src="https://github.com/bongomin/StudentsAndTeachersApp/assets/39218838/0a0d6637-d8b0-464c-9851-02ff06b160bd">


### Frontend - Students List
<img width="1438" alt="Stunets List" src="https://github.com/bongomin/StudentsAndTeachersApp/assets/39218838/0116b898-1887-4206-ae3a-fc77e01b1417">

## Create Student Form
<img width="1436" alt="Create Students" src="https://github.com/bongomin/StudentsAndTeachersApp/assets/39218838/b29b36e2-3b32-43bd-a026-065412c6615e">

### Frontend - Teachers List
<img width="1440" alt="Teachers" src="https://github.com/bongomin/StudentsAndTeachersApp/assets/39218838/35b594c1-e4af-44f0-a11b-5d19fab4ef21">

## Create - Teachers Form
<img width="1436" alt="Create Teacher" src="https://github.com/bongomin/StudentsAndTeachersApp/assets/39218838/109860dd-a1ac-47df-92f2-0fadb0a596d6">


## Project Structure

The project is organized into two main parts: the backend and the frontend.

- Backend: Developed using Django REST framework with a PostgreSQL database for data storage. The backend includes unit tests for models, serializers, and viewsets.
- Frontend: Implemented using ReactJS and Redux to manage state changes (State Manager).

## Setting up PostgreSQL Database

1. **Install PostgreSQL:**

   Follow the [official PostgreSQL installation guide](https://www.postgresql.org/download/) to install PostgreSQL for your operating system.

2. **Create a Database and User:**

   Create a PostgreSQL database and user with appropriate privileges. Replace `<db_name>`, `<db_user>`, and `<db_password>` with your preferred values.

   ```sql
   CREATE DATABASE <db_name>;
   CREATE USER <db_user> WITH PASSWORD '<db_password>';
   GRANT ALL PRIVILEGES ON DATABASE <db_name> TO <db_user>;
   ```

3. **Configure Django Settings:**

   Update the Django `DATABASES` settings in your Django project's settings file (`settings.py`), replacing `<db_name>`, `<db_user>`, and `<db_password>` with the values you used in step 2.

   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql_psycopg2',
           'USER': '<db_user>',
           'PASSWORD': '<db_password>',
           'NAME': '<db_name>',
           'HOST': 'localhost',
           'PORT': '', # Add port if needed
       }
   }
   ```

## Cloning the Project

To clone the project repository, use the following command:

```bash
git clone git@github.com:bongomin/StudentsAndTeachersApp.git
```

## Accessing Backend

To access the backend, navigate to the 'backend' directory:

```bash
cd StudentsAndTeachersApp/backend
```

## Accessing Frontend

To access the frontend, navigate to the 'frontend' directory:

```bash
cd StudentsAndTeachersApp/frontend
```

## Running the Application

Start the backend server:

### Navigate to the backend directory

```bash
cd backend
```

### Install dependencies

```bash
pip install -r requirements.txt
```

### Run the Django server

```bash
python manage.py runserver
```

Start the frontend server:

### Navigate to the frontend directory

```bash
cd frontend
```

### Install dependencies

```bash
npm install
```

### Run the React app

```bash
npm start
```
