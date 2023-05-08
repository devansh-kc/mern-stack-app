import { Jwt } from "jsonwebtoken";
const auth = async (res, req, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test");
      /* `req.userId=decodedData?.id;` is assigning the decoded user ID from the JWT token to the `userId`
property of the `req` object. The `?.` is the optional chaining operator, which means that if
`decodedData` is null or undefined, the assignment will not 