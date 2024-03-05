import { db } from "../connect.js"
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
    //OTOD
    const userId = req.params.userId;

    const q = "SELECT *  FROM users WHERE id =?"
    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err)
        const { password, ...info } = data[0];
        return res.json(info)
    })
}

export const updateCover = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");


        const q = "UPDATE users SET `coverPic` = ? WHERE id = ?";

        db.query(q, [req.body.coverPic, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows > 0) return res.json("Updated!");
            return res.status(403).json("You can update only your post!");
        })


    })

}

export const updateProfile = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");


        const q = "UPDATE users SET `profilePic` = ? WHERE id = ?";

        db.query(q, [req.body.profilePic, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows > 0) return res.json("Updated!");
            return res.status(403).json("You can update only your post!");
        })


    })

}

//userInfoUpdate
export const userInfoUpdate = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q =
            "UPDATE users SET `name`=?,`city`=?,`church`=?,`sbday`=?,`bday`=?,`studiedAt`=?,`bio_title`=?,`bio`=? WHERE id=? ";

        db.query(
            q,
            [
                req.body.name,
                req.body.lives,
                req.body.church,
                req.body.sbd,
                req.body.bd,
                req.body.study,
                req.body.verse_title,
                req.body.verse,
                userInfo.id,
            ],
            (err, data) => {
                if (err) res.status(500).json(err);
                if (data.affectedRows > 0) return res.json("Updated!");
                return res.status(403).json("You can update only your post!");
            }
        );
    });
};
