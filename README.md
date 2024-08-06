### Project

##ENDPOINTS

--------------------

#SIGNUP
- POST : localhost:3000/api/v1/signup
- REQUEST BODY
{ 
    "username":"abcde",
    "email":"abcde@gmail.com",
    "password":"abcde",
    "bio":"abcde here"
}
- RESPONSE
{
    "username": "abcde",
    "email": "abcde@gmail.com",
    "password": "$2b$10$ZbKdahkwMqOWA9KSZutSa.w15rWQ9AEZh37jmQ5YgK8Mc90sg8cre",
    "bio": "abcde here",
    "posts": [],
    "followers": [],
    "following": [],
    "_id": "66ae5c6ba2d8f771894bda0b",
    "createdAt": "2024-08-03T16:35:55.310Z",
    "updatedAt": "2024-08-03T16:35:55.310Z",
    "__v": 0
}
--------------------

#LOGIN
- POST : localhost:3000/api/v1/login
- REQUEST BODY
{ 
    "username":"abcde",
    "password":"abcde"
}

OR

{ 
    "email":"abcde@gmail.com",
    "password":"abcde"
}

- RESPONSE
{
    "message": "LOGIN SUCCESSFULL",
    "id": "66ae5c6ba2d8f771894bda0b"
}

--------------------

#LOGOUT
- GET : localhost:3000/api/v1/logout
- RESPONSE
{
    "User logged out"
}

--------------------

#GET USER PROFILE
- GET : localhost:3000/api/v1/getUserProfile/:userID (ANY USER ID)
- REQUEST BODY
{
    "username":"abcde"
}
- RESPONSE
{
    "username": "abcde",
    "bio": "abcde here",
    "follower_count": 1,
    "Latest_Tweets": {}
}

{
    
}

-------------------

#GET USER INFO
- GET : localhost:3000/api/v1/getUser/:id
- RESPONSE
{
    "_id": "66ae5c6ba2d8f771894bda0b",
    "username": "abcde",
    "email": "abcde@gmail.com",
    "bio": "abcde here",
    "posts": [],
    "followers": [],
    "following": [],
    "createdAt": "2024-08-03T16:35:55.310Z",
    "updatedAt": "2024-08-03T16:35:55.310Z",
    "__v": 0
}

-------------------

#UPDATE USER INFO
- PUT : localhost:3000/api/v1/updateUser/:id
- REQUEST BODY
{
    "password":"abcde",
    "bio":"Updated"
}
- RESPONSE
"Update successful"

--------------------

#FOLLOW
- POST : localhost:3000/api/v1/follow/:id (Follower's ID)
- REQUEST BODY
{
    "_id" : 66ae5c6ba2d8f771894bda0b
} 
- RESPONSE
"Following"


--------------------

#UNFOLLOW
- POST : localhost:3000/api/v1/unfollow/:userid (Follower's ID)
- REQUEST BODY
{
    "_id" : 66ae5c6ba2d8f771894bda0b
} 
- RESPONSE
"Unfollowed"


---------------------

#CREATE POST
- POST : localhost:3000/api/v1/createPost/:userId
- REQUEST BODY
{
    "postContent":"My Post",
    "password":"abcde"
}
- REQUEST FILE
image : <IMAGE_FILE>
- RESPONSE
{
}

--------------------

#GET ALL POSTS 
- GET : localhost:3000/api/v1/getAllPostsIds/:userId (Follower's id)
- REQUEST BODY
{
    "_id": 66ae5c6ba2d8f771894bda0b (User of Post)
}
- RESPONSE
{
}

--------------------

#PAGINATION ON POSTS
- GET : localhost:3000/api/v1/getSomePosts/:userId (Follower's id)
- REQUEST BODY
{
    "_id": 66ae5c6ba2d8f771894bda0b, (User of Post)
    "page":2,
    "page_size":3
}
- RESPONSE
{
}

--------------------

#GET A POST
- GET : localhost:3000/api/v1/getPost/:userId (Follower's id)
- REQUEST BODY
{
    "postId":
}
- RESPONSE
{
}

--------------------

#COMMENT POST
- POST : localhost:3000/api/v1/commentPost/:userId (Follower's id)
- REQUEST BODY
{
    "postId":
    "content":"Commented"
}
- RESPONSE
{
}

--------------------

#COMMENT ON COMMENT
- POST : localhost:3000/api/v1/commentOnComment/:userId (Id of one who is commenting)
- REQUEST BODY
{
    "commentId":
    "content":"Commented"
}
- RESPONSE
{
}

--------------------

#LIKE POST
- POST : localhost:3000/api/v1/likePost/:userId (Follower's id)
- REQUEST BODY
{
    "postId":
}
- RESPONSE
{
    "Liked the Post"
}

--------------------

#LIKE COMMENT
- POST : localhost:3000/api/v1/likePost/:userId (Id of one who liked the comment)
- REQUEST BODY
{
    "commentId":
}
- RESPONSE
{
}# ChirpIt
