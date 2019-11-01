[![Build Status](https://travis-ci.org/nraufu/my-diary.svg?branch=develop)](https://travis-ci.org/nraufu/my-diary)
[![Coverage Status](https://coveralls.io/repos/github/nraufu/my-diary/badge.svg?branch=develop)](https://coveralls.io/github/nraufu/my-diary?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/602f0efa0ea32d017ac8/maintainability)](https://codeclimate.com/github/nraufu/my-diary/maintainability)

# MyDiary
MyDiary is an online journal where users can pen down their thoughts and feelings.

# Features

- Users can create an account.
- User can sign in.
- Users can view all entries to their diary.
- Users can view the contents of a diary entry.
- Users can add entry.
- Users can modify an entry.
- Users can delete an entry.
  
# UI Template

Template is hosted [Here](https://nraufu.github.io/my-diary/UI/index.html)

### API Deployment

API Endpoint is hosted [Here](https://my-diary01.herokuapp.com/api/v1)

## Technologies

* [NodeJS](https://nodejs.org/) - JavaScript Runtime Environment
* [ExpressJs](https://expressjs.com/) - A Minimal  Web Application Framework
* [Mocha](https://mochajs.org/) - JavaScript test framework
* [Chai](http://www.chaijs.com/) - A BDD / TDD assertion library 
* [npm](https://www.npmjs.com/) - package manager for javascript

## Getting Started

 ### Prerequisites

 Ensure you have NodeJS installed on your computer by entering  `node -v ` on your terminal. If you don't have NodeJS installed go to the [NodeJS Website](https://nodejs.org/en/download/), and follow the download instructions
 
### Installation

Clone the app
* ``` git clone https://github.com/nraufu/my-diary```

Install all the packages
* ``` npm install ```

Run the server
*  ``` npm start ```

Server listens on port 5000
* Navigate to your browser and input the url [localhost:5000](http://localhost:5000/)

## Testing
Run Test case
* ```npm run test```

Test Api 
* [Postman](https://getpostman.com/)



## Working Routes
|	Endpoint	             | Functionality         |
|------------------------|:---------------------:|
|GET /entries            | Fetch all entries     |   
|GET /entries/:id        | Fetch a single entry  |
|POST /entries           | Create an entry       |
|PATCH /​entries​/:id      ​| Modify an entry       |
|POST /auth/signup       | Regitser a user       |
|POST /auth/login        | Login a user          |
|DELETE /entries/:Id     | Delete a user Entry   |
