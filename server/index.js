import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import Express from "express";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js"
import dotenv from "dotenv";
const app = Express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
/* These lines of code are setting up routes for the application. `app.use("/posts", postRoutes)` sets
up a route for handling requests to the `/posts` endpoint, and `app.use("/user", userRoutes)` sets
up a route for handling requests to the `/user` endpoint. The `postRoutes` and `userRoutes` are
imported from separate files that contain the logic for handling requests to these endpoints. */
app.use("/posts", postRoutes);
app.use("/user", userRoutes);
// const CONNECTION_URL =
//   "mongodb+srv://devanshkc69:devansh_kc12@cluster0.dcetj9i.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`port sucessfully connected to ${PORT}`)
    )
  )
  .catch((error) => console.log(error.message));
