



app.post("/chat", req, res, next) => {
    const username = req.body.userName
    sql = `INSERT INTO users (username) VALUES (?)`
    db.run(sql, [username], (err, result){
        if (err) {
            res.status(400)
        }
        res.status(201).json({
            "username": username
        })
    }

    )

}