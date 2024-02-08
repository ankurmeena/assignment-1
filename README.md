you can directly run your api request from backened side in terminal from server.js folder

//all api request

=> Here are some example API calls that can be made to this server:

GET /api/posts: Returns a list of all posts.

GET /api/posts/123: Returns the post with ID 123.

POST /api/posts: Creates a new post. The request body should contain the post data.

PUT /api/posts/123: Updates the post with ID 123. The request body should contain the updated post data.

DELETE /api/posts/123: Deletes the post with ID 123.

GET /api/authors: Returns a list of all authors.

GET /api/authors/456: Returns the author with ID 456.

POST /api/authors: Creates a new author. The request body should contain the author data.

PUT /api/authors/456: Updates the author with ID 456. The request body should contain the updated author data.

DELETE /api/authors/456: Deletes the author with ID 456.

The server also includes error handling for invalid requests, such as missing required fields or attempting to modify the ID field of a resource.

//request test in terminal

=> In TERMINAL you can request api using curl for eg: GET /posts : curl -X GET 'http://localhost:8000/api/posts' -H 'Content-Type: application/json'

GET /posts/{id} : curl -X GET 'http://localhost:8000/api/posts/1' -H 'Content-Type: application/json'

GET /authors : curl -X GET 'http://localhost:8000/api/authors' -H 'Content-Type: application/json'

GET /authors/{id} : curl -X GET 'http://localhost:8000/api/authors/1' -H 'Content-Type: application/json'

DELETE /posts : curl -X DELETE 'http://localhost:8000/api/posts/1' -H 'Content-Type: application/json'

DELETE /authors : curl -X DELETE 'http://localhost:8000/api/authors/1' -H 'Content-Type: application/json'

PUT /posts/{id} : curl -X PUT -H "Content-Type: application/json" -d '{"id":3,"title": "Updated Post", "author": {"firstName": "Jane", "lastName": "Doe"}, "views": 10, "reviews": 5}'

PUT /authors/{id} : curl -X PUT -H "Content-Type: application/json" -d '{"id": 0, "firstName": "John", "lastName": "Doe", "posts": 50}' http://localhost:8000/api/authors/0

POST /posts : curl -X POST -H "Content-Type: application/json" -d '{"id":1,"title": "New Post", "author": {"firstName": "First Name", "lastName": "Last Name"}, "views": 10, "reviews": 5}' http://localhost:8000/api/posts

POST /authors : curl -X POST -H "Content-Type: application/json" -d '{"id": 1, "firstName": "Jane", "lastName": "Doe", "post": 25}' http://localhost:8000/api/authors

and all the information will be updated in store.json
