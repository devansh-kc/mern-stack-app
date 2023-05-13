import  jwt  from "jsonwebtoken";
const auth = async (res, req, next) => {
  try {
    console.log(res.headers)
    const token = res.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test");
      /* `req.userId=decodedData?.id;` is assigning the decoded user ID from the JWT token to the `userId`
property of the `req` object. The `?.` is the optional chaining operator, which means that if
`decodedData` is null or undefined, the assignment will not be executed and `req.userId` will remain
undefined. */
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    /* `next()` is a function that is used to pass control to the next middleware function in the
    stack. In this code, it is called at the end of the `auth` function to pass control to the next
    middleware function in the stack. */
    next();
  } catch (error) {
    console.log(error);
  }
};


export default auth