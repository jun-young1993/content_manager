// const {app} = require('electron');
const path = require('path');


module.exports = {
    // "directory" : path.resolve(app.getPath('downloads'),'db')
    "db" : [{
        model : 'Field',
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
        },{
            "type":"text",
            "code":"title",
            "name":"콘텐츠 명",
            "_id" : "field_content_title"
        }]
    },{
        model : 'Code',
        default : {
            "description":"migration data",
            "use_yn":"Y"
        },
        items : [{
            "code" : "media_type",
            "name" : "미디어 구분 코드",
            "_id" : "media_type"
        },{
            "code" : "task_module_type",
            "name" : "작업모듈 타입",
            "_id" : "task_module_type"
        }]
    },{
        model : 'CodeItem',
        default : {
            "description":"migration data",
            "use_yn":"Y"
        },
        items : [{
            parent_code : "media_type",
            code : "original",
            name : "원본",
            _id : "media_type_original"
        },{
            parent_code : "media_type",
            code : "proxy",
            name : "저해상도",
            _id : "media_type_proxy"
        },{
            parent_code : "media_type",
            code : "thumbnail",
            name : "썸네일",
            _id : "media_type_thumbnail"
        },{
            parent_code : "media_type",
            code : "out",
            name : "외부입수",
            _id : "media_type_out"
        },{
            parent_code : "task_module_type",
            code : "fs_copy",
            name : "파일시스템(복사)",
            _id : "task_module_type_fs_copy"
        },{
            parent_code : "task_module_type",
            code : "transcoder_thumbnail",
            name : "트랜스코딩(썸네일)",
            _id : "task_module_type_transcoder_thumbnail"
        },{
            parent_code : "task_module_type",
            code : "transcoder_proxy",
            name : "트랜스코딩(저해상도)",
            _id : "task_module_type_transcoder_proxy"
        }]
    }]
};