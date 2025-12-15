const connection = require("../data/db")
const postsList = require("../data/posts")

const index = (req, res) => {
    const query = `SELECT * FROM posts`

    connection.query(query, (err, resp) => {
        if (err) return res.status(500).json({ error: err, message: "database query failed" })

        res.json(resp)
    })
}


module.exports = {
    index
}