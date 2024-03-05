import { db } from "../connect.js"
import jwt from "jsonwebtoken";

export const getVerse = (req, res) => {

    const verseId = req.query.verseID;
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        const q = `SELECT s.*,u.id AS userId,name,profilePic FROM  stories AS s JOIN users AS u ON (u.id = s.userId)  WHERE s.id = ?`;

        const values = [verseId];

        console.log(verseId);

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err)
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
