My Professional site.

A Django web application containerized with Docker for development and production environments. and its Production-ready with Gunicorn + WhiteNoise.

---


## Features
   
- Send Email using Sendgrid web API
- Responsive design  
- Static files served via WhiteNoise in production  
- Supports environment-based settings


## Requirements

- Docker 28.5.1 


## installation
1. Clone the repo

2. Create .env and .env.prod file same as .env.example with fill the variables data /
   but for .env.prod write DEBUG = False

3. Spin up the development container

```docker compose up --build
```
Yeahu, you are good to go.


 ## To run the production grade container
 ```docker compose -f docker-compose-prod.yml up --build
 ```




