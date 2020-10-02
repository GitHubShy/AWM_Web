import {
    request
} from "./request";

//Get aircraft
//if aircraftId = 0, return all;otherwise return the aircraft with the specific id
export const registerCustomer= function (customer) {
    return request({
        method: 'post',
        url: "/customer/register",
        data:{
            account_name:customer.account_name,
            password:customer.password,
            email:customer.email,
            first_name:customer.first_name,
            surname:customer.surname,
            portrait_url:customer.portrait_url,
            phone:customer.phone,
            company_name:customer.company_name,
        }
    })
}

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
export const getAllCustomer = function () {
    return request({
        method: 'post',
        url: "/customer/getAllCustomers"
    })
}