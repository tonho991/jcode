const express = require("express");
const { search } = require("/home/runner/jcode/libs/gradle")
const router = express.Router();

router.post("/", async (req, res) => {
        const {
                groupId,
                artifactId,
                version
        } = req.body;



        if (!groupId || !artifactId || !version) {
                return res.status(200).send({
                        status: "error",
                        message: "invalid post params",
                        data: {}
                });


        }

        const response = await search({ groupId, artifactId, version }, true)

        res.status(200).send({
                status: 'ok',
                data: response

        })
});

module.exports = {
        app: router,
        route: "/api/search-lib"
}