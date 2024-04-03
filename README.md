# Express GraphQL Server with User and Post Functionalities

This Project contains a Node.js application using Express and Apollo Server for GraphQL API implementation. It includes user registration and login functionality with MongoDB database integration.


## Deployed-Link
[link](https://idea-clan-2-nodejs.onrender.com/)


## Functionalities
### User Authentication
- **User Registration** : Users can register with a email, name, username, and password.

- **Login User** : Registered users can log in using their email and password.

### Post Management
- **Create Post (Authenticated)** : Authenticated users can create posts. Only logged-in users can create posts, and posts are associated with the user who created them.

- **Get User Posts (Authenticated)** : Authenticated users can retrieve their own posts. Only posts belonging to the logged-in user are returned.


## Project Structure
- src/
  - configs/
    - db.js: MongoDB connection configuration.
  - GraphQL/
    - user.typeDefs.js: GraphQL type definitions for user operations.
    - user.resolvers.js: Resolvers for user operations.
    - posts.typeDefs.js: GraphQL type definitions for post operations.
    - posts.resolvers.js: Resolvers for post operations.
  - models/
    - user.model.js: Mongoose model for User schema.
    - post.model.js: Mongoose model for Post schema.
  - index.js: Entry point for the server.


## Setup

1. **Clone the repository** 
```bash
  git clone https://github.com/Saiteja-Goli/Idea-Clan-2-Nodejs
```
2. **Install dependencies**
```bash
  cd server
  npm install
```

3. **Set up environment variables** 
Create a .env file with the following variables:
```bash
PORT = 9000

SECRET_KEY = your_secret_key

MONGODB_URL = your_mongodb_uri
```
4. **Start the server**
```bash
npm start

```

## GraphQL Endpoint
**Access the GraphQL endpoint in your browser or client application**

**GraphQL Endpoint** : http://localhost:9000/graphql

Use this endpoint to interact with the GraphQL server, execute queries, and perform mutations.


## Usage
### User Operations
 - **registerUser**
```bash
mutation {
  registerUser(name: "String!", email: "String!", username: "String!", password: "String!") {
    user {
      id
      name
      email
      username
    }
    message
  }
}
```

- **loginUser**
```bash
mutation {
  loginUser(email: "String!", password: "String!") {
    user {
      id
      email
    }
    message
    accessToken
  }
}

```
## Authorization Header for Posting and Retrieving Posts

After logging in and receiving the token, use the generated token for authorization by adding it to the headers as follows:

- **Key**: Authorization
- **Value**: Bearer ${Token}

This authorization header should be included when making requests to post new content or retrieve posts for authenticated users.

### Post Operations

- **createPost**
```bash
mutation {
  createPost(content: "String!") {
    id
    content
  }
}

```

- **getUserPosts**
```bash
query {
  getUserPosts {
    content
  }
}
```



## Technologies Used

- Express.js: Web application framework for Node.js.
- Apollo Server Express: GraphQL server for Express.js.
- Mongoose: MongoDB object modeling for Node.js.
- bcryptjs: Library for hashing passwords.
- jsonwebtoken: Implementation of JSON Web Tokens.

## Contributing
Contributions are welcome! Feel free to open issues and pull requests.
