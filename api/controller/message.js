import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getConversations = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "SELECT c.*,u.id AS userId,name,profilePic FROM conversations AS c JOIN users AS u ON (u.id = c.user_1) WHERE u.id=?";

        db.query(q, [userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data)
        })
    });

}


export const sendMessage = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "SELECT conversation_id FROM conversations WHERE (user_1 = ? AND user_2 = ?) OR (user_1 = ? AND user_2 = ?)";
        const valuesConversation = [userInfo.id, req.body.recieverId, req.body.recieverId, userInfo.id];

        db.query(q, valuesConversation, (err, data) => {
            if (err) return res.status(500).json(err);

            if (data.length > 0) {
                const conversation_id = data[0].conversation_id;

                const sendMessageQ =
                    "INSERT INTO messages (`convo_id`,`sender_id`,`reciever_id`,`message`,`sentImage`,`sendAt`) VALUE ?";
                const valuesMessage = [
                    [conversation_id, userInfo.id, req.body.recieverId, req.body.message, req.body.img, moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")]
                ];
                db.query(sendMessageQ, [valuesMessage], (err, data) => {
                    if (err) return res.status(500).json(err);
                    return res.status(200).json("Message sent");
                });
            } else {
                const addConvoQ = "INSERT INTO conversations (`user_1`,`user_2`,`createdAt`) VALUE ?";
                const valuesConversation = [
                    [userInfo.id, req.body.recieverId, moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")]
                ];

                db.query(addConvoQ, [valuesConversation], (err, data) => {
                    if (err) return res.status(500).json(err);

                    const newConversationId = data.insertId;

                    const sendMessageQ = "INSERT INTO messages (`convo_id`,`sender_id`,`reciever_id`,`message`,`sentImage`,`sendAt`) VALUE ?";

                
                    const valuesMessage = [
                        [newConversationId, userInfo.id, req.body.recieverId, req.body.message, req.body.img, moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")]
                    ];
                    db.query(sendMessageQ, [valuesMessage], (err, data) => {
                        if (err) return res.status(500).json(err);
                        return res.status(200).json("Message sent");
                    });
                });
            }
        });
    });
};


//getMessages

export const getMessages = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");



        const q = `SELECT m.*, u.id AS userId, u.name AS senderName, u.profilePic AS senderProfilePic
FROM messages AS m
JOIN users AS u ON u.id = m.sender_id
JOIN conversations AS c ON m.convo_id = c.conversation_id
WHERE (c.user_1 = ? AND c.user_2 = ?) OR (c.user_1 = ? AND c.user_2 = ?)
ORDER BY m.sendAt ASC;
`
        const values = [userInfo.id, req.query.recieverId, req.query.recieverId, userInfo.id]
        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json(data)

        })

    })
}