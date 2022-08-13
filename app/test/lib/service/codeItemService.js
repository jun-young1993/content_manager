// import CodeItemService from "../../../public/service/CodeItemService";

const {CodeItemService} = require("../../../public/service/CodeItemService");

new CodeItemService().findByParentCodeUsingArray('media_type')
.then((mediaTypes) => {
    console.log(mediaTypes);
})