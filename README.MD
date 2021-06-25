# Video Rental

simple backend application that exposes signup, login, get all registered users, create a place, get a place by ID, get a place by user ID, update a place and delete a place API  using Express and MongoDB.
This collection contains sample requests from this [API](http://localhost:5000/api/v1/)

It contains the following endpoints/routes

• Signup a user (POST) [/users/signup](http://localhost:5000/api/v1/users/signup)

• Login a user with given credentials (POST) [/users/login](http://localhost:5000/api/v1/users/login)

• Get all registered user (GET) [/users](http://localhost:5000/api/v1/users/)

• Get a user (GET) [/users/:id](http://localhost:5000/api/v1/users/:id)

• Update a user (PATCH) [/users/:id](http://localhost:5000/api/v1/users/:id)

• Delete a user (DELETE) [/users/:id](http://localhost:5000/api/v1/users/:id)

• Create a video (POST) [/videos](http://localhost:5000/api/v1/videos)

• Get all videos (GET) [/videos/videolist](http://localhost:5000/api/v1/videos/videolist)

• Get a video (GET) [/videos/:id](http://localhost:5000/api/v1/videos/:id)

• Update a video (UPDATE) [/videos/:id](http://localhost:5000/api/v1/videos/:id)

• Delete a video (DELETE) [/videos/:id](http://localhost:5000/api/v1/videos/:id)

• Create price (POST) [/videos/price](http://localhost:5000/api/v1/videos/price)

# signup route

• EndPoint "/users/signup"

• Request type: POST

• payload: name, email, password, confirmPassword

```
•e.g {
	"name" : "ama benedict",
	"email" : "ben@gmail.com",
	"password" : "ben123456",
	"confirmPassword" : "ben123456"
}

```
• A successful signup will result in a HTTP 201 Status Code and a response object 
```
•{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDYwMDk2M2NkODRlMDM3OWM0Yjg1MyIsIm5hbWUiOiJhbWEgYmVuZWRpY3QiLCJpYXQiOjE2MjQ2Mzc1OTUsImV4cCI6MTYyNTUwMTU5NX0.pp0F3lIQKcjJeWaq6JQ-xtcQQ3Sj5YFbMUhjGptdbRA",
  "data": {
    "user": {
      "_id": "60d600963cd84e0379c4b853",
      "name": "ama benedict",
      "email": "ben@gmail.com",
      "__v": 0,
      "id": "60d600963cd84e0379c4b853"
    }
  }
}

```
# login route

• EndPoint "/users/login"

• Request type: POST

• payload :  email, password
e.g 
```
{
    "email" : "merian@gmail.com",
	"password" : "ben123456"
}

```
• A successful login will result in a HTTP 200 Status Code and a response object 
```
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDQ4ZDUxNThjYWUzMDZhNTdiYTI1YiIsIm5hbWUiOiJhbWEgbWVyaWFuIiwiaWF0IjoxNjI0NjM3Njg4LCJleHAiOjE2MjU1MDE2ODh9.t5pthgntWHy_cE-7fGwN7QSuj5jNGudynLyIpnQ-LPg",
  "data": {
    "user": {
      "_id": "60d48d5158cae306a57ba25b",
      "name": "ama merian",
      "email": "merian@gmail.com",
      "__v": 0,
      "id": "60d48d5158cae306a57ba25b"
    }
  }
}

```

# get all users route

• EndPoint "/users"

• Request type: GET

• A successful API request will return a HTTP 200 Status Code and a response object of 
```
{
  "status": "success",
  "requestedAt": "2021-06-25T16:16:29.715Z",
  "results": 2,
  "data": {
    "data": [
      {
        "_id": "60d48d5158cae306a57ba25b",
        "name": "ama merian",
        "email": "merian@gmail.com",
        "__v": 0,
        "id": "60d48d5158cae306a57ba25b"
      },
      {
        "_id": "60d600963cd84e0379c4b853",
        "name": "ama benedict",
        "email": "ben@gmail.com",
        "__v": 0,
        "id": "60d600963cd84e0379c4b853"
      }
    ]
  }
}

```
# get a user route

• EndPoint "/users/:id"

• Request type: GET

• A successful API request will return a HTTP 200 Status Code and a response object of 
```
{
  "status": "success",
  "data": {
    "data": {
      "_id": "60d48d5158cae306a57ba25b",
      "name": "ama merian",
      "email": "merian@gmail.com",
      "__v": 0,
      "id": "60d48d5158cae306a57ba25b"
    }
  }
}

```

# update a user route

• EndPoint "/users/:id"

• Request type: PATCH

• payload: name, email (any of this or both)

e.g {
    "name" : "AMA MERIAN CHIBUZOR"
}

• A successful update will result in a HTTP 200 Status Code and a response object 
```
{
  "status": "success",
  "data": {
    "data": {
      "_id": "60d48d5158cae306a57ba25b",
      "name": "AMA MERIAN CHIBUZOR",
      "email": "merian@gmail.com",
      "__v": 0,
      "id": "60d48d5158cae306a57ba25b"
    }
  }
}

```
# delete a user route

• EndPoint "/users/:id"

• Request type: DELETE

> A successful update will result in a HTTP 200 Status Code and no response object

# create a video

• EndPoint "/video"

• payload: 
    videoTitle, 
    videoGenre (can be either ['action', 'drama', 'romance', 'comedy', 'horror'] but default is comedy if not indicated), 
    videoType (can be either ['regular', 'children-movie', 'new-release'] but default is regular if not indicated),
    maximumAge: Number (required if videoType is children-movie),
    yearReleased: String (required if videoType is new-release)

e.g 
```
{
    "videoTitle" : "The xtra ordinary",
    "videoGenre": "comedy",
    "videoType": "regular"
}

```
• Request type: POST

• A successful API request will return a HTTP 200 Status Code and a response object of 
```
{
  "status": "success",
  "data": {
    "data": {
      "videoType": "regular",
      "videoGenre": "comedy",
      "_id": "60d602e13cd84e0379c4b85a",
      "videoTitle": "the xtra ordinary",
      "creator": "60d600963cd84e0379c4b853",
      "__v": 0,
      "id": "60d602e13cd84e0379c4b85a"
    }
  }
}

```

# get all videos route

• EndPoint "/videos/videolist"

• Request type: GET

• A successful API request will return a HTTP 200 Status Code and a response object of 
```
{
  "status": "success",
  "requestedAt": "2021-06-25T16:23:57.851Z",
  "results": 5,
  "data": {
    "videos": [
      {
        "videoType": "children-movie",
        "videoGenre": "comedy",
        "_id": "60d48d7358cae306a57ba25d",
        "videoTitle": "Coming to America",
        "id": "60d48d7358cae306a57ba25d"
      },
      {
        "videoType": "children-movie",
        "videoGenre": "comedy",
        "_id": "60d498c3f11640113faca3df",
        "videoTitle": "Hello to America",
        "id": "60d498c3f11640113faca3df"
      },
      {
        "videoType": "children-movie",
        "videoGenre": "comedy",
        "_id": "60d4991929e09d11a9246dc7",
        "videoTitle": "micheal to America",
        "id": "60d4991929e09d11a9246dc7"
      },
      {
        "videoType": "children-movie",
        "videoGenre": "comedy",
        "_id": "60d499d8875dc7129bfe7f71",
        "videoTitle": "Dectory to America",
        "id": "60d499d8875dc7129bfe7f71"
      },
      {
        "videoType": "children-movie",
        "videoGenre": "comedy",
        "_id": "60d49a1a62604d12cba516ad",
        "videoTitle": "fight of the america",
        "id": "60d49a1a62604d12cba516ad"
      }
    ]
  }
}

```
# get a video route

• EndPoint "/videos/:id"

• Request type: GET

• A successful API request will return a HTTP 200 Status Code and a response object of 
```
{
  "status": "success",
  "data": {
    "price": "This movie cost: 8 Birr/Day"
  }
}

```

# update a video

• EndPoint "/videos/:id"

• Request type: PATCH

• payload: any member of the video needed to be updated
```
{
    "videoTitle" : "the extra ordinary",
    "videoGenre": "comedy",
    "videoType": "regular"
}

```
• A successful API request will return a HTTP 200 Status Code and a response object of 
```
{
  "status": "success",
  "data": {
    "data": {
      "videoType": "regular",
      "videoGenre": "comedy",
      "_id": "60d602e13cd84e0379c4b85a",
      "videoTitle": "the extra ordinary",
      "creator": {
        "_id": "60d600963cd84e0379c4b853",
        "name": "ama benedict",
        "email": "ben@gmail.com",
        "id": "60d600963cd84e0379c4b853"
      },
      "__v": 0,
      "id": "60d602e13cd84e0379c4b85a"
    }
  }
}

```

# delete a video

• EndPoint "/videos/:id"

• Request type: DELETE

> A successful API request will return a HTTP 200 Status Code and no response object 

# create price

• EndPoint "/videos/price"

• payload: 
```
{
    "title": "the extra ordinary",
    "numDays": 2
}

```
• Request type: POST

• A successful API request will return a HTTP 200 Status Code and no response object
```
{
  "status": "success",
  "data": {
    "data": {
      "_id": "60d6047b3cd84e0379c4b867",
      "name": "ama benedict",
      "title": "the extra ordinary",
      "numDays": 2,
      "rentalCost": "20 Birr",
      "__v": 0,
      "id": "60d6047b3cd84e0379c4b867"
    }
  }
} 

```
[Link to the API documentation with sample requests](https://documenter.getpostman.com/view/9775449/Tzedh4XR)