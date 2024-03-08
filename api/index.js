import Express from "express";

const app = Express();

import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import authRoutes from "./routes/auth.js";
import storiesRoutes from "./routes/stories.js";
import userPostsRoutes from "./routes/userPosts.js"; 
import relationshipRoutes from "./routes/relationships.js";
import authUserVerseRoutes from "./routes/userVerse.js"; 
import authAllVerseRoutes from "./routes/allVerses.js"; 
import authAFrRoutes from "./routes/friends.js";
import authMessages from "./routes/messages.js";

import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";

//HEYYYYYYYYYY EYHAN... P R I O R I T I Z E       M I D D L E W A R E !!!!!!!!!!!!!

//middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(Express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());

//n
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/stories", storiesRoutes);
app.use("/api/userPosts", userPostsRoutes);
app.use("/api/relationships", relationshipRoutes);
app.use("/api/userVerse", authUserVerseRoutes);
app.use("/api/allVerse", authAllVerseRoutes);
app.use("/api/friendReqs", authAFrRoutes);
app.use("/api/messages", authMessages);



app.listen(8800, () => {
  console.log("API working");
});
