import mongoose from "mongoose";

import PostMessage from "../models/postMessage.js";

/**
 * This function retrieves all post messages and sends them as a JSON response, or sends an error
 * message if there is an error.
 * @param req - req stands for "request" and it is an object that represents the HTTP request made by
 * the client to the server. It contains information such as the URL, headers, query parameters, and
 * body of the request.
 * @param res - The "res" parameter is the response object that is used to send a response back to the
 * client making the request. It contains methods such as "status" to set the HTTP status code of the
 * response and "json" to send a JSON response.
 */
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    console.log(postMessages);
    console.log("FETCH");
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
/**
 * This function creates a new post by saving the request body as a new PostMessage and returns the new
 * post or an error message.
 * @param req - req stands for "request" and is an object that contains information about the HTTP
 * request that was made, such as the request headers, request parameters, and request body. In this
 * specific code snippet, the request body is being used to create a new post.
 * @param res - `res` is the response object that is sent back to the client after the server has
 * processed the request. It contains information such as the status code, headers, and the response
 * body. In this specific code snippet, `res` is used to send a response back to the client with either
 * a
 */
export const createPost = async (req, res) => {
  const post = req.body;
  console.log("CREATE");
  const newPost = new PostMessage(post);

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};
/**
 * This function updates a post with a given ID and returns the updated post.
 * @param req - The request object represents the HTTP request that was sent by the client to the
 * server. It contains information about the request, such as the URL, headers, and body.
 * @param res - `res` is the response object that is used to send a response back to the client. It
 * contains methods like `send`, `json`, `status`, etc. that are used to send different types of
 * responses.
 * @returns a JSON response with the updated post data.
 */
export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("no post with that id ");
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  );

  console.log("UPDATE");
  res.json(updatedPost);
};

/**
 * This function deletes a post with a given ID and returns a success message.
 * @param req - The request object represents the HTTP request that was sent by the client to the
 * server. It contains information about the request such as the URL, headers, and any data that was
 * sent in the request body.
 * @param res - `res` is the response object that is sent back to the client after the server has
 * processed the request. It contains information such as the status code, headers, and the response
 * body. In this specific function, `res` is used to send a JSON response indicating that the post has
 * been deleted
 * @returns This function is not returning anything explicitly. It is deleting a post with the given ID
 * and sending a JSON response with a success message.
 */
export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with that id ");
  await PostMessage.findByIdAndRemove(id);
  res.json({ message: "post deleted sucessfully" });
  console.log("DELETE");
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with that id ");
  const post = await PostMessage.findById(id);
  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  );
  res.json(updatedPost);
  console.log(`like ${updatedPost.likeCount}`);
};
