import {
    request
} from "./request";

export const sendMessage = function (type,name,subject,content) {
    const formdata = new FormData();
    formdata.append('receiverType',type);
    formdata.append('receiverName',name);
    formdata.append('subject',subject);
    formdata.append('content',content);
    return request({
        method: 'post',
        url: "/notification/sendMessage",
        data:formdata
    })
}