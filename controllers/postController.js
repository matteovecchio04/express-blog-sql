const connection = require("../data/db")
const postsList = require("../data/posts")

const index = (req, res) => {
    const query = `SELECT * FROM posts`

    connection.query(query, (err, resp) => {
        if (err) return res.status(500).json({ error: err, message: "database query failed" })

        res.json(resp)
    })
}

const show = (req, res) => {
    // prevent admin rights
    const id = Number(req.params.id)
    const query = `SELECT * FROM posts WHERE id = ?`
    const queryTags = `SELECT tags.id, tags.label FROM tags JOIN post_tag ON post_tag.tag_id = tags.id WHERE post_tag.post_id = ?`

    connection.query(query, [id], (err, response) => {
        if (err) return res.status(500).json({ error: err, message: err.message })

        if (response.length === 0)
            return res.status(404).json({ error: 404, message: "Post not found" })

        connection.query(queryTags, [id], (errTags, resTags) => {
            if (errTags)
                return res
                    .status(500)
                    .json({ error: errTags, message: errTags.message })

            res.json({ ...response[0], tags: resTags })
        })
    })
}

const destroy = (req, res) => {
    const id = Number(req.params.id);
    const query = `DELETE FROM posts WHERE id = ?`

    connection.query(query, [id], (err) => {
        if (err) return res.status(500).json({ error: err, message: err.message });

        res.sendStatus(204);
    });
}

module.exports = {
    index,
    show,
    destroy
}