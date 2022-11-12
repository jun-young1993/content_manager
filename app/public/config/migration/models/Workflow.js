const outIngestWorkflows = [

]
module.exports = {
    items : [{
        name : "입수-비디오(Sample)",
        type : "ingest",
        content_type:  "video",
        _id : "user_out_ingest"
    },{
        name : "입수-이미지(Sample)",
        type : "ingest",
        content_type:  "image",
        _id : "user_out_ingest_image"
    },{
        name : "입수-음원(Sample)",
        type : "ingest",
        content_type:  "music",
        _id : "user_out_ingest_music"
    },{
        name : "입수-기타(Sample)",
        type : "ingest",
        content_type:  "other",
        _id : "user_out_ingest_other"
    },{
        name : "원본 다운로드(Sample)",
        type : "download",
        content_type:  null,
        _id : "original_download"
    },{
        name : "입수 - 썸네일(음원)",
        type : "ingest",
        content_type:  "music",
        _id : "ingest_thumbnail_music"
    }]
}