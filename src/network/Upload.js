/**
 * Base file to encapsulat requests about upload
 *
 * @author Yao Shi
 * @version 1.0
 * @date 2020/10/05 12:00 pm
 */
import {
    request
} from "./request";
/**
 * update a file to server
 */
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
