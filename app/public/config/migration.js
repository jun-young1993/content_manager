// const {app} = require('electron');
const path = require('path');

const {app} = require("electron");

module.exports = {
    // "directory" : path.resolve(app.getPath('downloads'),'db')
    "db" : [{
        model : 'Field',
        default : {
            "description":"migration data",
            "is_use":true,
            "is_search" : true,
        },
        items : [
        //     {
        //     "type":"code",
        //     "code":"content_type",
        //     "name":"콘텐츠 유형 테스트",
        //     "_id" : "field_content_type"
        // },
        {
            "content_type" : "video",
            "type":"text",
            "code":"title",
            "name":"비디오 명",
            "_id" : "field_video_title",
            "order" : 1
        },{
            "content_type" : "image",
            "type":"text",
            "code":"title",
            "name":"이미지 명",
            "_id" : "field_image_title",
            "order" : 1
        },{
            "content_type" : "music",
            "type":"text",
            "code":"title",
            "name":"음원 명",
            "_id" : "field_music_title",
            "order" : 1
        },{
            "content_type" : "music",
            "type":"text",
            "code":"singer",
            "name":"가수명",
            "_id" : "field_music_singer",
            "order" : 2
        },{
            "content_type" : "music",
            "type":"text",
            "code":"album",
            "name":"앨범명",
            "_id" : "field_music_album",
            "order" : 3
        }]
    },{
        model : 'Storage',
        default : {
            "description":"migration data",
            "use_yn":"Y"
        },
        items:[{
            "type": "local",
            "code": "download",
            "name": " 온라인 스토리지",
            "path": path.resolve(app.getPath('downloads'), 'storage/downloads'),
            "_id": "download"
        },{
            "type": "local",
            "code": "online",
            "name": " 온라인 스토리지",
            "path": path.resolve(app.getPath('downloads'), 'storage/online'),
            "_id": "online"
        },{
            "type": "local",
            "code": "proxy",
            "name": "저해상도 스토리지",
            "path": path.resolve(app.getPath('downloads'), 'storage/proxy'),
            "_id": "proxy"
        },{
            "type": "local",
            "code": "out",
            "name": "사용자 로컬 스토리지",
            "path": "",
            "_id": "out"
        },{
            "type": "local",
            "code": "no",
            "name": "없음",
            "path": "",
            "_id": "no"
        }]

    },{
        model : 'Code',
        default : {
            "description":"migration data",
            "use_yn":"Y",
            "order" : 1
        },
        items : [{
            "code" : "media_type",
            "name" : "미디어 구분 코드",
            "order" : 1,
            "_id" : "media_type"
        },{
            "code" : "task_module_type",
            "name" : "작업모듈 타입",
            "order" : 2,
            "_id" : "task_module_type"
        },{
            "code" : "content_type",
            "name" : "콘텐츠 유형",
            "order" : 3,
            "_id" : "content_type"
        },{
            "code" : "video_allow_extention",
            "name" : "비디오 허용확장자",
            "order" : 4,
            "_id" : "video_allow_extention"
        },{
            "code" : "image_allow_extention",
            "name" : "이미지 허용확장자",
            "order" : 5,
            "_id" : "image_allow_extention"
        },{
            "code" : "music_allow_extention",
            "name" : "음원 허용확장자",
            "order" : 6,
            "_id" : "music_allow_extention"
        },{
            "code" : "grid_row_count",
            "name" : "그리드 열 개수",
            "order" : 7,
            "_id" : "grid_row_count"
        }]
    },{
        model : 'CodeItem',
        default : {
            "description":"migration data",
            "use_yn":"Y",
            "order" : 1,
        },
        items : [{
            parent_code : "grid_row_count",
            code : "10",
            name : "10",
            order : 1,
            _id : "grid_row_count_10"
        },{
            parent_code : "grid_row_count",
            code : "25",
            name : "25",
            order : 2,
            _id : "grid_row_count_25"
        },{
            parent_code : "grid_row_count",
            code : "50",
            name : "50",
            order : 3,
            _id : "grid_row_count_50"
        },{
            parent_code : "grid_row_count",
            code : "100",
            name : "100",
            order : 4,
            _id : "grid_row_count_100"
        },{
            parent_code : "video_allow_extention",
            code : "mxf",
            name : "mxf",
            _id : "video_allow_extention_mxf"
        },{
            parent_code : "video_allow_extention",
            code : "mov",
            name : "mov",
            _id : "video_allow_extention_mov"
        },{
            parent_code : "video_allow_extention",
            code : "mp4",
            name : "mp4",
            _id : "video_allow_extention_mp4"
        },{
            parent_code : "image_allow_extention",
            code : "jpg",
            name : "jpg",
            _id : "image_allow_extention_jpg"
        },{
            parent_code : "image_allow_extention",
            code : "png",
            name : "png",
            _id : "image_allow_extention_png"
        },{
            parent_code : "image_allow_extention",
            code : "png",
            name : "png",
            _id : "image_allow_extention_png"
        },{
            parent_code : "music_allow_extention",
            code : "mp3",
            name : "mp3",
            _id : "music_allow_extention_png"
        },{
            parent_code : "content_type",
            code : "video",
            name : "비디오",
            _id : "content_type_video"
        },{
            parent_code : "content_type",
            code : "image",
            name : "이미지",
            _id : "content_type_image"
        },{
            parent_code : "content_type",
            code : "music",
            name : "음원",
            _id : "content_type_music"
        },{
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
            parent_code : "media_type",
            code : "no",
            name : "없음",
            _id : "media_type_no"
        },{
            parent_code : "task_module_type",
            code : "fs_copy",
            name : "파일시스템(복사)",
            _id : "task_module_type_fs_copy"
        },{
            parent_code : "task_module_type",
            code : "fs_delete",
            name : "파일시스템(삭제)",
            _id : "task_module_type_fs_delete"
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
        },{
            parent_code : "task_module_type",
            code : "mediainfo_video",
            name : "미디어정보 추출(비디오)",
            _id : "task_module_type_mediainfo_video"
        }]
    },{
        model : 'Module',
        default : {
            description : "migration data"
        },
        items : [{
            task_type : "fs_copy",
            name : "원본 다운로드(온라인->로컬)",
            source_media : "original",
            target_media : "no",
            target_storage : "download",
            source_storage : "online",
            _id:"original_download"
        },{
            task_type : "fs_copy",
            name : "원본 입수(로컬->온라인)",
            source_media : "out",
            target_media : "original",
            target_storage : "online",
            source_storage : "out",
            _id:"fs_copy_local_to_online"
        },{
            task_type : "transcoder_thumbnail",
            name : "썸네일 생성(온라인->썸네일)",
            source_media : "original",
            target_media : "thumbnail",
            source_storage : "online",
            target_storage : "proxy",
            _id:"transcoder_thumbnail_online_to_proxy"
        },{
            task_type : "transcoder_proxy",
            name : "저해상도 생성(온라인->프록시)",
            source_media : "original",
            target_media : "proxy",
            source_storage : "online",
            target_storage : "proxy",
            _id:"transcoder_proxy_online_to_proxy"
        },{
            task_type : "mediainfo_video",
            name : "미디어정보 추출(원본)",
            source_media : "original",
            target_media : "no",
            source_storage : "online",
            target_storage : "no",
            _id:"mediainfo_video_online"
        }]
    },{
        model : "Workflow",
        default : {
            description : "migration data"
        },
        items : [{
            name : "인제스트-비디오(Sample)",
            _id : "user_out_ingest"
        },{
            name : "인제스트-이미지(Sample)",
            _id : "user_out_ingest_image"
        },{
            name : "인제스트-음원(Sample)",
            _id : "user_out_ingest_music"
        },{
            name : "원본 다운로드(Sample)",
            _id : "original_download"
        }]
    },{
        model : "WorkflowRule",
        default : {

        },
        items : [{
            workflow_id : "original_download",
            module_id : null,
            module_name : "start workflow",
            parent_id : null,
            _id : "original_download_start_workflow",
        },{
            workflow_id : "original_download",
            module_id : "original_download",
            module_name : "원본 다운로드(온라인->로컬)",
            parent_id : "original_download_start_workflow",
            _id : "fs_copy_original_download",
        },{
            workflow_id : "user_out_ingest_image",
            module_id : null,
            module_name : "start workflow",
            parent_id : null,
            _id : "user_out_ingest_start_workflow_image",
        },{
            workflow_id : "user_out_ingest_image",
            module_id : "fs_copy_local_to_online",
            module_name : "원본 입수(로컬->온라인)",
            parent_id : "user_out_ingest_start_workflow_image",
            _id : "user_out_ingest_fs_copy_local_to_online_image",
        },{
            workflow_id : "user_out_ingest_music",
            module_id : null,
            module_name : "start workflow",
            parent_id : null,
            _id : "user_out_ingest_start_workflow_music",
        },{
            workflow_id : "user_out_ingest_music",
            module_id : "fs_copy_local_to_online",
            module_name : "원본 입수(로컬->온라인)",
            parent_id : "user_out_ingest_start_workflow_music",
            _id : "user_out_ingest_fs_copy_local_to_online_music",
        },{
            workflow_id : "user_out_ingest_music",
            module_id : "mediainfo_video_online",
            module_name : "미디어정보추출(원본)",
            parent_id : "user_out_ingest_fs_copy_local_to_online_music",
            _id : "user_out_ingest_mediainfo_music_online",
        },{
            workflow_id : "user_out_ingest",
            module_id : null,
            module_name : "start workflow",
            parent_id : null,
            _id : "user_out_ingest_start_workflow",
        },{
            workflow_id : "user_out_ingest",
            module_id : "fs_copy_local_to_online",
            module_name : "원본 입수(로컬->온라인)",
            parent_id : "user_out_ingest_start_workflow",
            _id : "user_out_ingest_fs_copy_local_to_online",
        },{
            workflow_id : "user_out_ingest",
            module_id : "transcoder_thumbnail_online_to_proxy",
            module_name : "썸네일 생성(온라인->썸네일)",
            parent_id : "user_out_ingest_fs_copy_local_to_online",
            _id : "user_out_transcoder_thumbnail_online_to_proxy",
        },{
            workflow_id : "user_out_ingest",
            module_id : "transcoder_proxy_online_to_proxy",
            module_name : "저해상도 생성(온라인->프록시)",
            parent_id : "user_out_transcoder_thumbnail_online_to_proxy",
            _id : "user_out_transcoder_proxy_online_to_proxy",
        },{
            workflow_id : "user_out_ingest",
            module_id : "mediainfo_video_online",
            module_name : "미디어정보추출(원본)",
            parent_id : "user_out_transcoder_proxy_online_to_proxy",
            _id : "user_out_mediainfo_video_online",
        }]

    },{
        model : "Category",
        items : [{
            name : "sample_1",
            parent_id : "folder",
            _id : "sample_1"
        },{
            name : "sample_2",
            parent_id : "folder",
            _id : "sample_2"
        }]
    }],
    "config" : [{
        "type" : "default_values",
        "items" : [{
            "key" : "tag",
            "value" : null
        },{
            "key" : "content_type",
            "value" : null
        },{
            "key" : "rows_page_size_content",
            "value" : 10
        },{
            "key" : "rows_page_size_task_monitor",
            "value" : 10
        },{
            "key" : "task_monitor_status",
            "value" : ['queue']
        },{
            "key" : "ingest_workflow_video",
            "value" : "user_out_ingest"
        },{
            "key" : "ingest_workflow_image",
            "value" : "user_out_ingest_image"
        },{
            "key" : "ingest_workflow_music",
            "value" : "user_out_ingest_music"
        }]
    },{
        "type" : "content",
        "items" : [{
            "key" : "panel_width",
            "value" : 80
        }]
    },{
        "type" : "content_detail_music",
        "items" : [{
            "key" : "preview_caption",
            "value" : "singer"
        },{
            "key" : "preview_title",
            "value" : "title"
        },{
            "key" : "preview_sub_title",
            "value" : "album"
        }]
    }]
};
