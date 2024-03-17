# Express GraphQL Server with User and Post Functionalities

This Project contains a Node.js application using Express and Apollo Server for GraphQL API implementation. It includes user registration and login functionality with MongoDB database integration.


## Functionalities
### User Authentication
- **User Registration** : Users can register with a email, name, username, and password.

- **Login User** : Registered users can log in using their email and password.

### Post Management
- **Create Post (Authenticated)** : Authenticated users can create posts. Only logged-in users can create posts, and posts are associated with the user who created them.

-**Get User Posts (Authenticated)** : Authenticated users can retrieve their own posts. Only posts belonging to the logged-in user are returned.


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
PORT = 8090

SECRET_KEY = your_secret_key

MONGODB_URL = your_mongodb_uri
```
4. **Start the server**
```bash
npm start

Access the server at :- http://localhost:8090/
```

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

### Post Operations

- **createPost**
```bash
mutation {
  createPost(content: "Post 4 by User Sai1 ") {
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