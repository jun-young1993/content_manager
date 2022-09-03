
export interface  contentsViewerInterface {
    _id : string
    title : string
}

export interface ViewerInterface {
    contents : contentsViewerInterface[] | []
}