require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Blog Schema
const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  category: String,
  image: String,
  date: { type: Date, default: Date.now },
});

const Blog = mongoose.model("Blog", BlogSchema);

// Routes
app.get("/api/blogs", async (req, res) => {
  const blogs = await Blog.find().sort({ date: -1 });
  res.json(blogs);
});

app.post("/api/blogs", async (req, res) => {
  const newBlog = new Blog(req.body);
  await newBlog.save();
  res.json({ message: "Blog Created", blog: newBlog });
});

app.put("/api/blogs/:id", async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ message: "Blog Updated", blog: updatedBlog });
});

app.delete("/api/blogs/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog Deleted" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

