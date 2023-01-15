# Blogging Site Mini Project

## Backend Requirement

## Phase I

### Models
- Author Model
```
{ name: { mandatory}, phone: {mandatory}, email: {mandatory, valid email, unique}, password: {mandatory} }
```
- Blogs Model
```
{ title: {mandatory}, location: {mandatory}, authorId: {mandatory, refs to author model}, imgUrl: {string, mandatory}, description: {string}, deletedAt: {boolean, default: false} }
```

### Author APIs /authors
- Create a author/user document from request body.
  `Endpoint: BASE_URL/register`

### POST /create
- Create a blog document from request body. Get authorId in request body only.
- Make sure the authorId is a valid authorId by checking the author exist in the authors collection.
- Return HTTP status 201 on a succesful blog creation. Also return the blog document. The response should be a JSON object. 

- Return HTTP status 400 for an invalid request with a response body

### GET /allBlogs
- Returns all blogs in the collection that aren't deleted
- Return the HTTP status 200 if any documents are found.

### PUT /update/:blogId
- Updates a blog by changing the its title, subtitle, adding summary, adding a description.
- Check if the blogId exists (must have deletedAt false). If it doesn't, return an HTTP status 404 with a response body.
- Return an HTTP status 200 if updated successfully with a body.

### DELETE /delete/:blogId
- Check if the blogId exists( and is not deleted). If it does, mark it deleted and return an HTTP status 200 without any response body.
- If the blog document doesn't exist then return an HTTP status of 404 with a body.


## Phase II

- Add authentication and authroisation feature

### POST /login
- Allow an author to login with their email and password. On a successful login attempt you will redirect to the home page
- If the credentials are incorrect return a suitable error message with a valid HTTP status code


## Response

## Collections
### Blogs
```yaml
{
  "title": "title",
  "location": "location",
  "description": "description",
  "imgUrl": "imgUrl",
  "deletedAt": false,
  "createdAt": "2022-12-17T04:25:07.803Z",
  "updatedAt": "2022-12-17T04:25:07.803Z",
}
```
