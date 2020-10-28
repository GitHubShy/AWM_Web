import {
    request
} from "./request";

export const upload = function (myfile) {
    const formdata = new FormData();
    formdata.append('file',myfile);
    return request({
        method: 'post',
        url: "/file/upload",
        // headers: {
        //     'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()
        //     } ,
        data:formdata
    })
}
