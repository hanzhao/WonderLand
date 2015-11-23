# Dream

## POST /dream/new
+ text: String

## POST /dream/publish
+ dreamId: ObjectId


# User

## POST /user/signup
+ name: String
+ password: String
+ email: String

## POST /user/signin
+ name: String
+ password: String

## GET /user/signout
