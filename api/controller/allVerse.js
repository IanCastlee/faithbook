import { db } from "../connect.js"
import jwt from "jsonwebtoken";

export const getAllVerse = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");


        const q = `SELECT DISTINCT s.*, u.id AS userId, name, profilePic FROM stories AS s JOIN users AS u ON (u.id = s.userId) LEFT JOIN relationship AS r ON (s.userId = r.followedUserId) WHERE r.followerUserId = ? OR s.userId = ? ORDER BY s.createdAt DESC`;

        const values = [userInfo.id, userInfo.id];

        db.query(q, values, (err, data) => {
            return res.status(200).json(data);
        });
    });
};
 
export const delVerse = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        const q = "DELETE FROM stories WHERE `id` = ? AND `userId` = ?";

        db.query(q, [req.params.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows > 0)
                return res.status(200).json("Post has been deleted.");
            return res.status(403).json("You can delete only your post");
        });
    });
};
