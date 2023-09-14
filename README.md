# Jacobs-University-SW-Engineering-PJ-team05
THIS IS PART OF JACOBS UNIVERSITY SOFTWARE ENGINEERING COURSE PROJECT. IT IS NOT ALLOWED TO COPY THE CODE BUT IT IS WELLCOME TO GET SOME IDEA FOR YOUR PROJECT FROM THIS REPOSITORY :) I WORKED IN SPRINT 3 WITH Haileyesus Solomon Belete.

# Beer Game

---

## Table of Contents
<!-- TOC -->

- [Beer Game](#beer-game)
    - [Table of Contents](#table-of-contents)
    - [Introduction](#introduction)
    - [Software requirements](#software-requirements)
    - [Architecture](#architecture)
    - [Setup and Deployment](#setup-and-deployment)
        - [Setup backend](#setup-backend)
        - [Setup frontend](#setup-frontend)
    - [Tests](#tests)
        - [Run frontend tests](#run-frontend-tests)
        - [Run backend tests](#run-backend-tests)
    - [Documentation](#documentation)
        - [Generate frontend documentation](#generate-frontend-documentation)
        - [Generate backend documentation](#generate-backend-documentation)
    - [Individual contributions](#individual-contributions)
        - [Sprint 1 - 9/3/2021](#sprint-1---09032021)
        - [Sprint 2](#sprint-2)
        - [Sprint 3](#sprint-3)
        - [Sprint 4](#sprint-4)

<!-- /TOC -->

---

## Introduction

The **Beer Game** is a web-based game which simulates a supply chain model in the real world. It reflects a role-play simulation where several participants play with each-other. The game represents a supply chain with a non-coordinated process where problems arise due to lack of information sharing. This web application is an implementation of the game using web technologies such as React.js, Node.js and Django.

---

## Software requirements

Project is created with:

- npm (version 7)
- python3
- mysql

---

## Architecture

| Component      | Implementation        |
|----------------|-----------------------|
| Database       | MySQL                 |
| Backend        | Python with Django    |
| Frontend       | React.js              |
| Communication  | REST API architecture |
| Authentication | JSON Web Tokens (JWT) |

---

## Setup and Deployment

First, go to the folder where you would want to put the project. Download the project by:

```bash
git clone git@github.com:lorenzorota/se-03-team-05.git
```

### Setup backend

- Create a virtual environment using `venv` module. Activate the virtual environment and install the requirements for the backend.

```bash
python3 -m venv ./.venvs/beer-game
source ./.venvs/beer-game/bin/activate
pip install wheel                           # Compatibility issues might arise
pip install -r requirements.txt
```

- Update database credentials inside of `server/server/settings.py`. The current credentials are of CLAMV.

- Change into the `server` directory. Make migrations and migrate changes to the database. Run the backend.

```bash
cd server
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver
```

### Setup frontend

- Change into the `client` directory. Install the required packages.

```bash
cd client
npm install --legacy-peer-deps --include=dev # This requires npm7 
```

- Run the frontend.

```bash
npm run start
```

Examples from the UI of Beer Game can be found at `img`.

![Beer Game Homepage](/img/BeerGameHomepage.png "Beer Game Homepage")

---

## Tests

### Run frontend tests

Change into the `client` directory. Run the testing script.

```bash
cd client
npm run test
```
- If the tests don't run, just intialize the project as a git repository by `git init` and the test should work.
- If it is still not working, installing Jest(which is the tool we used to build the testcases) by `yarn add --dev jest` if you are using `Yarn` or `npm install --save-dev jest` if you are using `npm` will fix the problem. Install `Jest` using the previous commands after changing directory to client using `cd client` or the respective path to arrive to the client directory or folder.
- After all this, the Frontend Tests will work!

### Run backend tests

Change into the `server` directory. Run the testing script.

```bash
cd server
python manage.py test beer
```

---

## Documentation

### Generate frontend documentation

Change into the `client` directory. Run the documentation script.

```bash
cd client
npm run doc
```

Documentation can then be found at `client/docs/index.html`.

### Generate backend documentation

Change into the `server` directory. Run the backend.

```bash
cd server
python3 manage.py runserver
```

The backend API documentation is served at endpoint `api/swagger/`.

---

## Individual contributions

### Sprint 1 - 9/3/2021

- Frontend:
	- Setup Homepage (/, /home)
	- Setup Login page (/login)
	- Setup Sign Ip page (/signup)
	- Setup About page (/about)
	- Setup dummy Instructor View Sample Page for monitoring games (/instructor-sample)
	- Implemented authentication and state updating logic for authorized users
	- Implemented Login, Sign Up, Games List, Profile and 404 Not Found components
    - Setup test suites for UI components (Home, About, Not Found)
- Backend:
	- Created Models for each class described in the UML Class Diagram (Player, Instructor, Game, Demand Pattern)
	- Implemented relationships between models described in the UML Class Diagram (Player-Instructor, Instructor-Game, Game-Player, Demand Pattern-Game, Demand Pattern-Instructor)
	- Implemented custom user manager to authenticate user with email address
	- Created serializers for all models, user sign up and log in
	- Implemented unauthenticated views (User Sign Up, User Log In) and structured authenticated views (User Profile, Game List, Demand Pattern)
	- Setup test suites for Users, Instructors, Players, Games, Demand Patterns APIs (will be implemented in the future)
	- Created REST API endpoint for retrieving data (api/)
	- Created REST API endpoints for registration and authentication (api/signup/, api/login/)
	- Implemented logic to authenticate users with JSON Web Tokens (access and refresh tokens)
	- Created REST API endpoints for obtaining and refreshing JWTs (api/token/obtain/, api/token/refresh/)
    - Implemented basic API documentation using drf-yasg (api/swagger/)

Due to time limit, we have only developed basic testing with few test cases for the components mentioned above. UI test cases and routing test cases are complex and can not be correctly tested without prior unification of both backend and frontend communication.

---

## Individual Contributions 

### Sprint 2 - 23/03/2021

- Frontend: 
	- Setup log in page for instructor (LoginInstructor)
	- Setup log in page for student (LoginStudent) 
	- Setup game setting page for instructor (GameSettings)
	- Setup Game Page using styled-components (GamePage)
	- Setup testing for GameSetting (GameSettings.test)
	- Fixed incorrect reference to currentUser object's attribute on Profile.js
	- Sign Up and Log In are now fully functional

The pages can be found in the components folder and the testing can be found in the test folder. 
	
- Backend:
	- Fixed CORS error which blocked React to perform POST and GET operations on Django REST API
	- Added is_staff and is_superuser attribute to the superuser which lets a superuser access Django Admin
	- Fixed minor bugs
	- Added Clamv credentials to settings.py
	- Implemented test cases for fully functioning REST APIs
	
---

## Individual Contributions

### Sprint 3 - 13/04/2021

- Frontend:
	- Fix error when deploying: put the missing package (style-components) in /client/package.json
	- FIx the login page for instructor 
	- Modify the signup page so that it allows user to sign up choosing a role

- Backend
	- Fix Errors with serializers
	- Post and Get request of AuthGameListView, AuthDemandPatternView
	- Started the creation of JoinGameView for players.
	- Change the REST API for registration to allow to indicate the role
	- Modify a test case to test the above change 

## Individual contributions

### Sprint 4 - 27/04/2021

- Frontend
	- Added a page where you choose roles or what to play as for example Factory, Wholesaler, Distributor, Retailer
	- Connected Login Instructor and Game Settings pages so now after clicking Login on Login Instructor page the user is redirected to the Game Settings page so that they can create the game and set backlog cost, time delay and more
	- Fixed the error that appears when clicking the Signup button in the SignUp page. So now the user can signup properly as can be seen in the Django server or API(one can enter some values in the form on the server and can verify that the Signup works as is shown there using the link `http://127.0.0.1:8000/api/signup` after setting up the server that is). And also implemented connections between the pages so after logging in the user is redirected to the Roles page to choose what to play as.
	- Fixed the error that appears on the Login Instructor and Login Student pages that prevents a user from logging in. Now user can login from both pages and this can be verifed by checking the Django server or API found at `http://127.0.0.1:8000/api/login` by entering login details and seeing that the Login works from the feedback from the console. Also implemented connections between the pages so after logging in, the Instructor is redirected to the Game Settings page and the student to the Roles page.
	- Added connections andn some integrations. Now after the user chooses a Role, he/she is redirected to the Game Page
	- Built a testcase for GamePage named GamePage.test.js. The testcase passes and works.
	- Frontend testcases didn't run before. Fixed that error and now all tescases including the ones written in previous sprints run and all of the tescases also pass. The fix for the error can be found in the section of how to run the frontend testcases and it is intializing the project as a git repository by `git init` and installing Jest(which is the tool we used to build the testcases) by `yarn add --dev jest` if you are using `Yarn` or `npm install --save-dev jest` if you are using `npm` after changing directory to client using `cd client` or the respective path to arrive to the client directory or folder.
	- Run the test with npm run test and fix the errors
	- Make the game page for the four different roles

- Backend
	- Fixed Compatibility issue with PyJWT and changed version in requirements.txt from 2.0.1 to 1.7.0 as required meaning we changed it to a compatible working version
	- Fixed Registration system so now user can Register or Sign up and this can be verified by entering inputs and seeing the results from the API console at the Django server or API at `http://127.0.0.1:8000/api/signup`
	- Fixed Authentication for both Instructor and Student Logins so now user can login into the system or beer game. This can be verified by entering Login credentials and seeing the results from the Django server or API at `http://127.0.0.1:8000/api/login`. The results will show that the Login system has been fixed and works.
	- Fixed some warnings and errors in the Backend code
	- Started implementing Game Logic in the file `GamePage.js`
	- Fixed some errors in settings.py
	- Made some changes in serializers.py to fix the error
