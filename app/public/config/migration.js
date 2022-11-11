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
        },{
            "content_type" : "other",
            "type":"text",
            "code":"title",
            "name":"기타자료 명",
            "_id" : "field_other_title",
            "order" : 1
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
        items : require("../config/migration/models/Code").items
    },{
        model : 'CodeItem',
        default : {
            "description":"migration data",
            "use_yn":"Y",
            "order" : 1,
        },
        items : require("../config/migration/models/CodeItem").items
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
            task_type : "fs_copy",
            name : "음원 썸네일 입수(로컬 -> 온라인)",
            source_media : "out",
            target_media : "thumbnail",
            target_storage : "online",
            source_storage : "out",
            _id:"fs_copy_local_to_online_music_thumbnail"
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
        },{
            task_type : "mediainfo_video",
            name : "미디어정보 추출(원본)",
            source_media : "original",
            target_media : "no",
            source_storage : "online",
            target_storage : "no",
            _id:"mediainfo_image_online"
        }]
    },{
        model : "Workflow",
        default : {
            description : "migration data"
        },
        items : [{
            name : "입수-비디오(Sample)",
            content_type:  "video",
            _id : "user_out_ingest"
        },{
            name : "입수-이미지(Sample)",
            content_type:  "image",
            _id : "user_out_ingest_image"
        },{
            name : "입수-음원(Sample)",
            content_type:  "music",
            _id : "user_out_ingest_music"
        },{
            name : "입수-기타(Sample)",
            content_type:  "other",
            _id : "user_out_ingest_other"
        },{
            name : "원본 다운로드(Sample)",
            content_type:  null,
            _id : "original_download"
        },{
            name : "입수 - 썸네일(음원)",
            content_type:  "music",
            _id : "ingest_thumbnail_music"
        }]
    },{
        model : "WorkflowRule",
        default : {
            // fs_copy_local_to_online_music_thumbnail
        },
        items : [{
            workflow_id : "ingest_thumbnail_music",
            module_id : null,
            module_name : "start_workflow",
            parent_id : null,
            _id : "ingest_thumbnail_music_start_workflow"
        },{
            workflow_id : "ingest_thumbnail_music",
            module_id : "fs_copy_local_to_online_music_thumbnail",
            module_name : "입수 - 썸네일(음원)",
            parent_id : "ingest_thumbnail_music_start_workflow",
            _id : "ingest_thumbnail_music_local_to_online"
        },{
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
            workflow_id : "user_out_ingest_image",
            module_id : "mediainfo_image_online",
            module_name : "미디어정보추출(이미지)",
            parent_id : "user_out_ingest_fs_copy_local_to_online_image",
            _id : "user_out_ingest_mediainfo_image",
        },{
            workflow_id : "user_out_ingest_other",
            module_id : null,
            module_name : "start workflow",
            parent_id : null,
            _id : "user_out_ingest_start_workflow_other",
        },{
            workflow_id : "user_out_ingest_other",
            module_id : "fs_copy_local_to_online",
            module_name : "원본 입수(로컬->온라인)",
            parent_id : "user_out_ingest_start_workflow_other",
            _id : "user_out_ingest_fs_copy_local_to_online_other",
        },{
            workflow_id : "user_out_ingest_other",
            module_id : "mediainfo_image_online",
            module_name : "미디어정보추출(기타)",
            parent_id : "user_out_ingest_fs_copy_local_to_online_other",
            _id : "user_out_ingest_mediainfo_other",
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
            color:"#ed0f0f",
            _id : "sample_1"
        },{
            name : "sample_2",
            parent_id : "folder",
            color:"#f8e71c",
            _id : "sample_2",
        }]
    }],
    "config" : [{
        "type" : "url",
        "items" : [{
            "key" : "no_thumb",
            "value" : "https://user-images.githubusercontent.com/102360897/194304792-d41d2e46-2d96-4075-9eaf-15daa52b87af.png?w=248&fit=crop&auto=format"
        }]
    },{
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
        },{
            "key" : "ingest_workflow_other",
            "value" : "user_out_ingest_other"
        }]
    },{
        "type" : "content",
        "items" : [{
            "key" : "panel_width",
            "value" : 50
        },{
            "key" : "panel_height",
            "value" : 50
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
    },{
        "type" : "app",
        "items" : [{
            "key" : "network_port",
            "value" : 11101
        },{
            "key" : "share_port",
            "value" : 11103
        }]
    },{
        "type" : "exception",
        "items" : [{
            "key" : "alert_show",
            "value" : false
        }]
    }]
};
