import axios from "axios";
/* `const url = "http://localhost:5000/posts";` is defining a constant variable `url` that holds the
URL of the server endpoint where the posts data is being fetched, created, updated, and deleted. In
this case, the URL is `http://localhost:5000/posts`, which means that the server is running on the
local machine at port 5000 and the endpoint for posts is `/posts`. */
const url = "http://localhost:5000/posts";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
