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


//Get aircraft that belongs to a customer
//type:required(A380)
//registration:required(B-3657)MSN=Manufacturing Serial number 
//  制造序列号，制造商对其所有生产线生产的飞机数量的统计，
//  不区分机型，表示该架飞机在厂家所生产全部飞机中的排序号。比如：波音公司制造序列号为38388的飞机，代表波音生产的第38388架飞机。
//serial:reqired(12344)Registration number注册号，此编号由飞机持有国的官方制定，开头的一、两位的字母由国际航空组织给定，代表该航空器注册的国籍。
//   一个注册号对应一架飞机，没有重号，必须符合国际民用航空公约的规定，一般在机身尾部和两侧机翼，少数在垂直尾翼。飞机注册号包括国籍标志和登记标志
//    比如：我国国内一般是B-XXXX(四位数）
//total_flight_time:requried(5000)
//maintenance_cycle:required(5000)
//last_modify_time:required(2020-10-22)
//status:0:Servicing  1:Maintaining 99:need staff to confirm register information; when created, the value must be 99

//INSERT INTO aircraft (type,aircraft_pic,registration,serial,total_flight_time,customer_id)
//VALUES ('A380','https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601270564166&di=e52ae2fe6ae9285eefdbab7f0a4e2ca1&imgtype=0&src=http%3A%2F%2Ffinance.sina.com.cn%2Fn.sinaimg.cn%2Ffinance%2Ftransform%2F50%2Fw550h300%2F20190214%2FpY15-hswimzz3967770.png',
//'B-3657','12344',3340,1);
export const registerAircraft = function (aircraft) {
    return request({
        method: 'post',
        url: "/workshop/registerAircraft",
        data: {
            type: aircraft.type,
            registration: aircraft.registration,
            serial: aircraft.serial,
            total_flight_time: aircraft.total_flight_time,
            maintenance_cycle: aircraft.maintenance_cycle,
            last_modify_time: aircraft.last_modify_time,
            customer_id: aircraft.customer_id,
            aircraft_pic: aircraft.aircraft_pic,
            status: 99,
        }
    })
}

export const registerComponents= function (componets) {
    return request({
        method: 'post',
        url: "/workshop/registerComponents",
        data:componets
    })
}