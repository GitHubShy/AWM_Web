/**
 * Base file to encapsulat requests about employee
 *
 * @author Yao Shi
 * @version 1.0
 * @date 2020/09/30 11:47 pm
 */
import {
    request
} from "./request";

/**
 * Send a message email to a custoemr
 */
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
/**
 * Send a reset password email
 */
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