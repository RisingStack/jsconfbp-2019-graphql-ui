# JSCONF BP 2019 Graphql UI

## Intro

The following create-react-app application is UI for the previously built GQL API.

You should be able to do the following actions:
- Register and login a user
- Create a post as a user
- Comment on a post as a user
- List out posts with filters
- List out comments on a post

There are 4 task to finish this application. Keep an eye out for the TODO comments.
While finishing these 4 tasks you will learn some basic and some advanced practices on building an apollo-client based UI.

Used dependencies:
- State management: React features such as [hooks](https://reactjs.org/docs/hooks-intro.html) and [context](https://reactjs.org/docs/context.html).
- Routing: [React-Router](https://reacttraining.com/react-router/web/guides/quick-start)
- Components: [React-Bootstrap](https://react-bootstrap.github.io/)
- Styling: [Sass](https://sass-lang.com/)
- Linting: [ESLint](https://eslint.org/)
- Additional packages: [Luxon](https://moment.github.io/luxon/), [Lodash](https://lodash.com/), [Husky](https://github.com/typicode/husky#readme)

## Tasks

### TASK 1.
Migrate from apollo-boost, write an onError error handler and add a basic inmemory-cache to the apollo client. (TIP: [Migration](https://www.apollographql.com/docs/react/advanced/boost-migration/))
- Extra task: Implement a global loader apollo middleware - increment number at request, decrement at response. (This will require a global state manager like Mobx or Redux)

### TASK 2.
Implement the handleSignin function and the SIGNIN_QUERY for the singin (Signin.jsx) page. (TIP: Use the register (Register.jsx) page for an example)
- Extra task: create a User fragment and use it with every user query and mutation in the src/query/user.js and in the comment and post fragment. (TIP: Use the fragments.js for examples)

### TASK 3.
Using the Query component fetch down the post in the post (Posts.jsx) page.
(TIP: Use the hello (Hello.jsx) page for an example, use limit and filters variables)
- Extra task: when you are done, translate your Query component to a useQuery hook.

### TASK 4.
Using useQuery hook and fetchMore implement the querying behind the comments section and its pagination for the post (Post.jsx) page. (TIP: Use the posts (Posts.jsx) page for an example, use a reasonable fetchPolicy option so you will be able to see new comments)
- Extra task: implement the handleCreateComment function and CREATE_COMMENT_MUTATION mutatation for comment posting (TIP: use the refetch after posting the new comment from the useQuery hook in the original task)
