import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getFr = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token expired! ");

        const q = `
            SELECT u.*,r1.id AS rId, r1.followerUserId, r1.followedUserId 
            FROM relationship AS r1 
            JOIN users AS u ON (u.id = r1.followerUserId AND r1.followedUserId = ?) 
            WHERE r1.followerUserId NOT IN (SELECT followedUserId FROM relationship WHERE followerUserId = ?)`;

        db.query(q, [userInfo.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
};

export const acceptFr = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token expired! ");

        const q =
            "INSERT INTO relationship (`followerUserId`,`followedUserId`) VALUES (?)";

        const values = [userInfo.id, req.body.frID];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Accepted succesfully!");
        });
    });
};

export const deleteFr = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q =
            "DELETE FROM relationship WHERE `followerUserId` = ? AND  `followedUserId` = ?";

        db.query(q, [req.query.delFriend, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("UnFollow");
        });
    });
};

////getAllFriends

export const getAllFriends = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token expired! ");

        const q = `SELECT r1.*,u.id AS userId, u.name, u.profilePic FROM users AS u
        JOIN relationship AS r1 ON (u.id = r1.followerUserId AND r1.followedUserId=?)
        JOIN relationship AS r2 ON (u.id = r2.followedUserId AND r2.followerUserId=?)`;

        db.query(q, [userInfo.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
};

// getSuggestions

export const getSuggestion = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token expired! ");

        const q = `SELECT u.*,
            r1.id AS relationshipId1, r1.followerUserId AS followerUserId1, r1.followedUserId AS followedUserId1,
                r2.id AS relationshipId2, r2.followerUserId AS followerUserId2, r2.followedUserId AS followedUserId2
FROM users AS u
LEFT JOIN relationship AS r1 ON(u.id = r1.followerUserId AND r1.followedUserId =?)
LEFT JOIN relationship AS r2 ON(u.id = r2.followedUserId AND r2.followerUserId =?)
        WHERE(r1.id IS NULL AND r2.id IS NULL) AND u.id != ?`;

        db.query(q, [userInfo.id, userInfo.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
};

// deleteFrMain
export const deleteFrMain = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q =
            "DELETE FROM relationship WHERE `followedUserId` = ? AND  `followerUserId` = ?";

        db.query(q, [req.query.delFriendMain, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("UnFollow");
        });
    });
};
