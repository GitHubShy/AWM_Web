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

export const resetPassWord = function (account_name,type) {
    const formdata = new FormData();
    formdata.append('account_name',account_name);
    formdata.append('type',type);
    return request({
        method: 'post',
        url: "/notification/resetPassword",
        data:formdata
    })
}