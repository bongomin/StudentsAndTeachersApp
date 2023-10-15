# StudentsAndTeachersApp

This web application manages CRUD (Create, Read, Update, Delete) operations for students and teachers. It also demonstrates a many-to-many relationship where students are associated with teachers.

## Project Structure

The project is organized into two main parts: the backend and the frontend.

- Backend: Developed using Django REST framework, utilizing a PostgreSQL database for data storage.
- Frontend: Implemented using ReactJS and Context API to manage state changes.

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
```