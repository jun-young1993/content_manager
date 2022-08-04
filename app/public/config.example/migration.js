// const {app} = require('electron');
const path = require('path');

const {Field} = require('../../public/models/Field');
module.exports = {
    // "directory" : path.resolve(app.getPath('downloads'),'db')
    "db" : [{
        model : Field,
        default : {
            "description":"migration data",
            "use_yn":"Y",
            "search_yn" : "Y",
        },
        items : [{
            "type":"code",
            "code":"content_type",
            "name":"콘텐츠 유형 테스트",
            "_id" : "field_content_type"
        }]
    }]
};