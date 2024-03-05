import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getRelationships = (req, res) => {
  const q = "SELECT followerUserId FROM relationship WHERE followedUserId = ?";

  db.query(q, [req.query.followedUserId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res
      .status(200)
      .json(data.map((relationship) => relationship.followerUserId));
  });
};

export const addRelationships = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO relationship (`followerUserId`,`followedUserId`) VALUES (?)";

    const values = [userInfo.id, req.body.userId];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Following");
    });
  });
};

export const delRelationship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "DELETE FROM relationship WHERE `followerUserId` = ? AND  `followedUserId` = ?";

    db.query(q, [userInfo.id, req.query.userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("UnFollow");
    });
  });
};

//getFollowerLength

export const getFollowerLength = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = `SELECT r.*,u.id AS userId, name ,profilePic FROM relationship AS r JOIN users AS u ON (u.id = r.followerUserId AND r.followedUserId = ?)`

    db.query(q, [req.query.userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};




// const q = "SELECT * FROM relationship AS r1 JOIN relationship AS r2 ON (r1.followerUserId = r2.followedUserId AND r1.followedUserId = r2.followerUserId) WHERE r2.followedUserId IS NUll AND r1.followedUserId = ?"
