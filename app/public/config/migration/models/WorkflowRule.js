
module.exports = {
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
}