import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getStories = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");


    // const q = `SELECT DISTINCT s.*, u.id AS userId, name, profilePic FROM stories AS s JOIN users AS u ON (u.id = s.userId) LEFT JOIN relationship AS r ON (s.userId = r.followedUserId) WHERE r.followerUserId = ? OR s.userId = ? ORDER BY s.createdAt DESC`;


    const q = `
  SELECT DISTINCT s.*, u.id AS userId, name, profilePic
  FROM stories AS s
  JOIN users AS u ON (u.id = s.userId)
  JOIN relationship AS r1 ON (s.userId = r1.followedUserId AND r1.followerUserId = ?)
  JOIN relationship AS r2 ON (s.userId = r2.followerUserId AND r2.followedUserId = ?)
  
  UNION

  SELECT DISTINCT s.*, u.id AS userId, name, profilePic
  FROM stories AS s
  JOIN users AS u ON (u.id = s.userId)
  WHERE s.userId = ? ORDER BY createdAt DESC`;

    const values = [userInfo.id, userInfo.id, userInfo.id];

    db.query(q, values, (err, data) => {
      return res.status(200).json(data);
    });
  });
};


export const addStory = (req, res) =>{

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO stories (`verse`,`userId`,`createdAt`,`coverPic`) VALUES (?)";

    const values = [
      req.body.desc,
      userInfo.id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      req.body.img
    ];

    db.query(q, [values], (err, data)=>{
      if(err) return res.status(500).json(err);
      return res.status(200).json("Succesfully posted!");
    })

})}