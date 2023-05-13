import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/user.js"
export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    /* This code is checking if a user with the provided email exists in the database. If there is no user
with the provided email, it sends a response with a 404 status code and a message "user doesn't
exist". */
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(404).json({ message: "user doesnt exist" });
    }
    /* This code is checking if the password provided by the user matches the hashed password stored in the
database for the user with the provided email. It uses the `bcrypt.compare()` method to compare the
two passwords. If the passwords do not match, it sends a response with a 400 status code and a
message "invalid credentials". */
    const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);
    if (!isPasswordCorrect) 
      return res.status(400).json({ message: "invalid credentials" });
  

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id },"test",{ expiresIn: "1h" });
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something Went Wrong" });
  }
};
export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "user Already exists" });
    }
    if (password !== confirmPassword) {
      res.status(400).json({ message: "password dont match" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    res.status(200).json({result,token})
  } catch (error) {
    res.status(500).json({ message: "something Went Wrong" });

  }
};
