
export interface  contentsViewerInterface {
    _id : string
    title : string
    category_color : string
    category_name : string
}

export interface ViewerInterface {
    contents : contentsViewerInterface[] | []
}