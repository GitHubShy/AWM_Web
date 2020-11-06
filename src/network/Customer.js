/**
 * Base file to encapsulat  requests about customer
 *
 * @author Yao Shi
 * @version 1.0
 * @date 2020/09/30 11:47 pm
 */
import {
    request
} from "./request";


//account_name:required
//password:required
//email:required
//company_name:required
//phone:
//first_name:
//surname:
//portrait_url:
//
//if aircraftId = 0, return all;otherwise return the aircraft with the specific id
//Get aircraft
//if aircraftId = 0, return all;otherwise return the aircraft with the specific id
//Get aircraft
//if aircraftId = 0, return all;otherwise return the aircraft with the specific id
/**
 * register customer
 */
export const registerCustomer= function (data) {
    return request({
        method: 'post',
        url: "/customer/register",
        data
    })
}
/**
 * Login
 */
export const login = function (name,password) {
    const formdata = new FormData();
    formdata.append('account_name',name);
    formdata.append('password',password);
    return request({
        method: 'post',
        url: "/customer/login",
        data:formdata
    })
}
/**
 * Login
 */
export function customerLogin (parmas) {
    let { account_name, password } = parmas;
    const formdata = new FormData();
    formdata.append('account_name',account_name);
    formdata.append('password',password);
    return request({
        method: 'post',
        url: "/customer/login",
        data:formdata
    })
}
/**
 * Get all customer
 */
export const getAllCustomer = function () {
    return request({
        method: 'post',
        url: "/customer/getAllCustomers"
    })
}
/**
 * Get customer by id
 */
export const getCustomer = function (customerId) {
    const formdata = new FormData();
    formdata.append('id',customerId);
    return request({
        method: 'post',
        url: "/customer/getCustomer",
        data:formdata
    })
}

//Get customer receipts
export const getReceipts = function () {
    return request({
        method: 'post',
        url: "/customer/getReceipts"
    })
}