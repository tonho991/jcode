const express = require("express");
const { searchSubs } = require("/home/runner/jcode/libs/gradle")
const app = express.Router();

app.post("/", async (req, res) => {
        var dataSubs;
        try {
                dataSubs = JSON.parse(req.body.dependencies);
        } catch (e) {
                dataSubs = req.body.dependencies
        }

        if (!dataSubs) {
                return res.status(200).send({
                        status: "error",
                        message: "invalid post params",
                        data: []
                })
        }

        const subs = await searchSubs(dataSubs, true);
        res.status(200).send({
                status: "ok",
                data: subs
        })
});

module.exports = {
        app: app,
        route: "/api/search-subs"
}