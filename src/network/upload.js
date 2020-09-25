import {
    request
} from "./request";

export const upload = function (myfile) {
    console.log(myfile);
    request({
        method: 'post',
        url: "/file/upload",
        // headers: {
        //     'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()
        //     } ,
        data: {
            file: myfile
        }
    })
}
