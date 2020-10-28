import {
    request
} from "./request";

export const updateEmployee = function (newInfo) {
    return request({
        method: 'post',
        url: "/employee/updateEmployee",
        data: {
            id: newInfo.id,
            account_name: newInfo.account_name,
            password: newInfo.password,
            first_name: newInfo.first_name,
            surname: newInfo.surname,
            title: newInfo.title,
            gender: newInfo.gender,
            tax_file_number: newInfo.tax_file_number,
            payment_rate: newInfo.payment_rate,
            email: newInfo.email,
            phone: newInfo.phone,
            birth_year: newInfo.birth_year,
        }
    })
}

export const createEmployee = function (newInfo) {
    return request({
        method: 'post',
        url: "/employee/register",
        data: {
            id: newInfo.id,
            account_name: newInfo.account_name,
            password: newInfo.password,
            first_name: newInfo.first_name,
            surname: newInfo.surname,
            title: newInfo.title,
            gender: newInfo.gender,
            tax_file_number: newInfo.tax_file_number,
            payment_rate: newInfo.payment_rate,
            email: newInfo.email,
            phone: newInfo.phone,
            birth_year: newInfo.birth_year,
        }
    })
}

export const getAllEmployee = function () {
    return request({
        method: 'post',
        url: "/employee/getAllEmployee",
    })
}

export const getSpecificEmployee = function (employeeId) {
    return request({
        method: 'post',
        url: "/employee/getEmployee",
        data: {
            id: employeeId
        }
    })
}

export const clock = function () {
    return request({
        method: 'post',
        url: "/employee/clock",
    })
}

export const getAttendance = function (date) {
    const formdata = new FormData();
    formdata.append('date',date);
    return request({
        method: 'post',
        url: "/employee/getAttendance",
        data:formdata
    })
}

/**
 * employee login
 */
export function employeeLogin(params) {
    return request({
        method: 'post',
        url: '/employee/login',
        data: params
    })
}

/**
 * Get employees according different types
 * 0: Engineer   1: Manager  99:Super Administrator
 */
export function getEmployeeByType(id) {
    const formdata = new FormData();
    formdata.append('type',id);
    return request({
        method: 'post',
        url: '/employee/getEmployeeByType',
        data: formdata
    })
}

/**
 * Update employee portrait
 * 0: Engineer   1: Manager  99:Super Administrator
 */
export function updatePortrait(url) {
    const formdata = new FormData();
    formdata.append('url',url);
    return request({
        method: 'post',
        url: '/employee/updatePortrait',
        data: formdata
    })
}

