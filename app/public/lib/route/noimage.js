"use strict";
exports.__esModule = true;
var fs = require("fs");
// import * as fs from "fs";
// const fs = require("fs");
var stream = require("stream");
// const stream = require('stream');
var path = require("path");
// const path = require("path");
var router = require('express').Router();
var log = require('../Logger');
var MediaService = require('../../service/MediaService').MediaService;
var mediaSv = new MediaService();
router.get('/:filename/:extention', function (req, res) {
    var _a = req.params, extention = _a.extention, filename = _a.filename;
    var thumbnailPath = path.resolve(__dirname, "../logo192.".concat(extention));
    var read = fs.createReadStream(thumbnailPath);
    var pass = new stream.PassThrough();
    stream.pipeline(read, pass, function (err) {
        if (err) {
            console.log('thumbnail err', err);
            return res.sendStatus(400);
        }
    });
    pass.pipe(res);
});
module.exports = router;
