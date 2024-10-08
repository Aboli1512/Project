### Project

##ENDPOINTS

--------------------

#SIGNUP
- POST : localhost:3000/api/v1/signup
- REQUEST BODY
{ 
    "username":"abc",
    "email":"abc@gmail.com",
    "password":"abc",
    "bio":"abc here"
}
- RESPONSE
{
    "username": "abc",
    "email": "abc@gmail.com",
    "password": "$2b$10$KwUZQSJL2zjzjenhZcB0yuiDkA4QDttdfIso2KL32f86PAGRBraEG",
    "bio": "abc here",
    "posts": [],
    "followers": [],
    "following": [],
    "_id": "66b0f95a07392e216f830907",
    "createdAt": "2024-08-05T16:10:02.564Z",
    "updatedAt": "2024-08-05T16:10:02.564Z",
    "__v": 0
}
--------------------

#LOGIN
- POST : localhost:3000/api/v1/login
- REQUEST BODY
{ 
    "username":"abc",
    "password":"abc"
}
- RESPONSE
{
    "message": "LOGIN SUCCESSFULL",
    "id": "66b0f95a07392e216f830907"
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
    "username":"abc"
}
- RESPONSE
{
    "username": "abc",
    "bio": "abc here",
    "follower_count": 1,
    "Latest_Tweets": [
        {
            "_id": "66b1021feeff7e5ed6a8e6ad",
            "post_user": "66b0f95a07392e216f830907",
            "postContent": "My Post",
            "image": "https://localhost:3000/uploads/imageUpload-1722876431297.png",
            "comments": [],
            "likes": [],
            "createdAt": "2024-08-05T16:47:27.540Z",
            "updatedAt": "2024-08-05T16:47:27.540Z",
            "__v": 0
        }
    ]
}

-------------------

#GET USER INFO
- GET : localhost:3000/api/v1/getUser/:id
- RESPONSE
{
    "_id": "66b0f95a07392e216f830907",
    "username": "abc",
    "email": "abc@gmail.com",
    "bio": "abc here",
    "posts": [
        "66b1021feeff7e5ed6a8e6ad"
    ],
    "followers": [
        "66b08d90954a44a6bc480fe2"
    ],
    "following": [],
    "createdAt": "2024-08-05T16:10:02.564Z",
    "updatedAt": "2024-08-05T16:47:27.774Z",
    "__v": 2
}

-------------------

#UPDATE USER INFO
- PUT : localhost:3000/api/v1/updateUser/:id
- REQUEST BODY
{
    "password":"abc",
    "bio":"Updated"
}
- RESPONSE
{
    "message": "Update successful",
    "data": {
        "_id": "66b08d90954a44a6bc480fe2",
        "username": "abcde",
        "email": "abcde@gmail.com",
        "password": "$2b$10$QsHpgmG49S5abAsiht8DIO5F6EZ4Ere5ty5yqgKnt3Py8mRw/L8na",
        "bio": "Updating bio",
        "posts": [],
        "followers": [
            "66b08aae4ffa8110c57f4c09"
        ],
        "following": [
            "66b0f95a07392e216f830907"
        ],
        "createdAt": "2024-08-05T08:30:08.279Z",
        "updatedAt": "2024-08-05T17:25:16.779Z",
        "__v": 2
    }
}

--------------------

#FOLLOW
- POST : localhost:3000/api/v1/follow/:id (Follower's ID)
- REQUEST BODY
{
    "_id" : "66b0f95a07392e216f830907"
} 
- RESPONSE
"Following"


--------------------

#UNFOLLOW
- POST : localhost:3000/api/v1/unfollow/:userid (Follower's ID)
- REQUEST BODY
{
    "_id" : "66ae5c6ba2d8f771894bda0b"
} 
- RESPONSE
"Unfollowed"


---------------------

#CREATE POST
- POST : localhost:3000/api/v1/createPost/:userId
- REQUEST BODY
{
    "postContent":"My Post",
    "password":"abc"
}
- REQUEST FILE
imageUpload : <IMAGE_FILE>
- RESPONSE
{
    "message": "Post created successfully",
    "post": {
        "post_user": "66b0f95a07392e216f830907",
        "postContent": "My Post",
        "image": "https://localhost:3000/uploads/imageUpload-1722876431297.png",
        "comments": [],
        "likes": [],
        "_id": "66b1021feeff7e5ed6a8e6ad",
        "createdAt": "2024-08-05T16:47:27.540Z",
        "updatedAt": "2024-08-05T16:47:27.540Z",
        "__v": 0
    }
}
-REQUEST BODY
{
    "postContent":"My Post",
    "password":"abc"
}
- RESPONSE
{
    "message": "Post created successfully",
    "post": {
        "post_user": "66b08d90954a44a6bc480fe2",
        "postContent": "Posted",
        "image": null,
        "comments": [],
        "likes": [],
        "_id": "66b10c59f2368cf1f57460a4",
        "createdAt": "2024-08-05T17:31:05.657Z",
        "updatedAt": "2024-08-05T17:31:05.657Z",
        "__v": 0
    }
}

--------------------

#GET ALL POSTS 
- GET : localhost:3000/api/v1/getAllPostsIds/:userId (Follower's id)
- REQUEST BODY
{
    "_id": "66b08d90954a44a6bc480fe2" (User of Post)
}
- RESPONSE
[
    "66b10b2a709b924f73e92108",
    "66b10c59f2368cf1f57460a4",
    "66b10c9df2368cf1f57460a8",
    "66b10ca5f2368cf1f57460ac"
]

--------------------

#PAGINATION ON POSTS
- GET : localhost:3000/api/v1/getSomePosts/:userId (Follower's id)
- REQUEST BODY
{
    "_id": "66b08d90954a44a6bc480fe2", (User of Post)
    "page":2,
    "page_size":2
}
- RESPONSE
[
    {
        "_id": "66b10c59f2368cf1f57460a4",
        "post_user": "66b08d90954a44a6bc480fe2",
        "postContent": "Posted",
        "image": null,
        "comments": [],
        "likes": [],
        "createdAt": "2024-08-05T17:31:05.657Z",
        "updatedAt": "2024-08-05T17:31:05.657Z",
        "__v": 0
    },
    {
        "_id": "66b10b2a709b924f73e92108",
        "post_user": "66b08d90954a44a6bc480fe2",
        "postContent": "Hello ",
        "image": "https://localhost:3000/uploads/imageUpload-1722878762549.png",
        "comments": [],
        "likes": [],
        "createdAt": "2024-08-05T17:26:02.858Z",
        "updatedAt": "2024-08-05T17:26:02.858Z",
        "__v": 0
    }
]

--------------------

#GET A POST
- GET : localhost:3000/api/v1/getPost/:userId (Follower's id)
- REQUEST BODY
{
    "postId":"66b10c59f2368cf1f57460a4"
}
- RESPONSE
{
    "_id": "66b10c59f2368cf1f57460a4",
    "post_user": "66b08d90954a44a6bc480fe2",
    "postContent": "Posted",
    "image": null,
    "comments": [],
    "likes": [],
    "createdAt": "2024-08-05T17:31:05.657Z",
    "updatedAt": "2024-08-05T17:31:05.657Z",
    "__v": 0
}

--------------------

#COMMENT POST
- POST : localhost:3000/api/v1/commentPost/:userId (Follower's id)
- REQUEST BODY
{
    "postId":"66b10c59f2368cf1f57460a4",
    "content":"Commented"
}
- RESPONSE
{
    "data": {
        "comment_user": "66b08aae4ffa8110c57f4c09",
        "postToComment": "66b10c59f2368cf1f57460a4",
        "content": "Commented",
        "commentOncomment": [],
        "likes": [],
        "_id": "66b1111c730985eefc1683c1",
        "createdAt": "2024-08-05T17:51:24.811Z",
        "updatedAt": "2024-08-05T17:51:24.811Z",
        "__v": 0
    },
    "message": "Commented Successfully"
}

--------------------

#COMMENT ON COMMENT
- POST : localhost:3000/api/v1/commentOnComment/:userId (Id of one who is commenting)
- REQUEST BODY
{
    "commentId":"66b1111c730985eefc1683c1",
    "content":"Commented"
}
- RESPONSE
{
    "comment_user": "66b08aae4ffa8110c57f4c09",
    "commentOnWhichCommented": "66b1111c730985eefc1683c1",
    "content": "Comment On Comment",
    "commentOncomment": [],
    "likes": [],
    "_id": "66b11167730985eefc1683c6",
    "createdAt": "2024-08-05T17:52:39.404Z",
    "updatedAt": "2024-08-05T17:52:39.404Z",
    "__v": 0
}

--------------------

#LIKE POST
- POST : localhost:3000/api/v1/likePost/:userId (Follower's id)
- REQUEST BODY
{
    "postId":"66b10c59f2368cf1f57460a4"
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
    "commentId":"66b1111c730985eefc1683c1"
}
- RESPONSE
"Liked the Comment"