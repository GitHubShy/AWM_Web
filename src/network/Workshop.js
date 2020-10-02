import {
    request
} from "./request";

//Get aircraft
//if aircraftId = 0, return all;otherwise return the aircraft with the specific id
export const getAircraft = function (aircraftId) {
    const formdata = new FormData();
    formdata.append('id',aircraftId);
    return request({
        method: 'post',
        url: "/workshop/getAircraft",
        data:formdata
    })
}

//Get aircraft that belongs to a customer
//return the aircraft that belong to a customer
export const getCustomerAircraft = function (customerID) {
    const formdata = new FormData();
    formdata.append('id',customerID);
    return request({
        method: 'post',
        url: "/workshop/getCustomerAircraft",
        data:formdata
    })
}