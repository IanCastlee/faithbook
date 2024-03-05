import moment from "moment";
import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, currentUserData) => {
    if (err) return res.status(403).json("Token is not valid!");

  const q = `
  SELECT DISTINCT p.*, u.id AS userId, name, profilePic
  FROM posts AS p
  JOIN users AS u ON (u.id = p.userId)
  JOIN relationship AS r1 ON (p.userId = r1.followedUserId AND r1.followerUserId = ?)
  JOIN relationship AS r2 ON (p.userId = r2.followerUserId AND r2.followedUserId = ?)
  
  UNION

  SELECT DISTINCT p.*, u.id AS userId, name, profilePic
  FROM posts AS p
  JOIN users AS u ON (u.id = p.userId)
  WHERE p.userId = ? ORDER BY createdAt DESC`;

    const values = [currentUserData.id, currentUserData.id, currentUserData.id];
    
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });

  });
};

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO posts (`descr`,`img`,`createdAt`,`userId`) VALUES (?)";

    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Posted succesfully!");
    });
  });
};

export const delPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM posts WHERE `id`=? AND `userId` = ?";

    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0)
        return res.status(200).json("Post has been deleted.");
      return res.status(403).json("You can delete only your post");
    });
  });
};
// const q = `SELECT DISTINCT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) LEFT JOIN relationship AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC`;