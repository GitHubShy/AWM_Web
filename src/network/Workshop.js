/**
 * Base file to encapsulat requests about workshop
 *
 * @author Yao Shi
 * @version 1.0
 * @date 2020/10/05 13:12 pm
 */
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

//type:required(A380)
//registration:required(B-3657)MSN=Manufacturing Serial number 
//serial:reqired(12344)Registration number
//total_flight_time:requried(5000)
//maintenance_cycle:required(5000)
//last_modify_time:required(2020-10-22)
//status:0:Servicing  1:Need maintaining 2:Maintaining 99:need staff to confirm register information; when created, the value must be 99

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
            status: 0,
        }
    })
}
//Update a aircraft
export const updateAircraft = function (aircraft) {
    return request({
        method: 'post',
        url: "/workshop/updateAircraft",
        data: {
            id:aircraft.id,
            type: aircraft.type,
            registration: aircraft.registration,
            serial: aircraft.serial,
            total_flight_time: aircraft.total_flight_time,
            maintenance_cycle: aircraft.maintenance_cycle,
            last_modify_time: aircraft.last_modify_time,
            customer_id: aircraft.customer_id,
            aircraft_pic: aircraft.aircraft_pic,
            status: aircraft.status,
        }
    })
}

// components: [{
//     type: 1,
//     registration: 'E0001',
//     provider: 'General Electric Company',
//     maintenance_cycle: 5000,
//     last_modify_time: '2020-12-22',
//     aircraft_id: 1,
//     pic: null,
// },
// {
//     type: 2,
//     registration: 'W0001',
//     provider: 'Rolls-Royce Plc Company',
//     maintenance_cycle: 5000,
//     last_modify_time: '2020-12-25',
//     aircraft_id: 1,
//     pic: null,
// },
//]
//
//type:required(0:undefined 1:Engine 2:Wing 3:Fuselage 4:Avionics System 5:Landing Gear)
//registration:required(E0001,F0001,L0001 W0001,A0001)
//provider:required(General Electric Company;Rolls-Royce Plc Company;Pratt & Whitney Group Company;The Airbus Company;The Boeing Company)
//aircraft_id:required
//maintenance_cycle:requried(5000)
//pic:
//last_modify_time: if null is given, will use the last_modify_time of aricraft
export const registerComponents= function (componets) {
    return request({
        method: 'post',
        url: "/workshop/registerComponents",
        data:componets
    })
}


//employeeId = 0 reutrn all jobs
export const getAllJobs= function (employeeId,status) {
    const formdata = new FormData();
    formdata.append('id',employeeId);
    formdata.append('status',status);
    return request({
        method: 'post',
        url: "/workshop/getAllJobs",
        data:formdata
    })
}

// All the following parameters are required
// this.formData = {
//     aircraft_id: 1,
//     employee_id: 1,
//     description: 'Job created from Test.vue',
//     start_time: '2020-10-15',
//     due_time: '2020-11-20',
//     portrait_url: '',
//     phone: '123456789',
//     company_name: 'apple',
// }
export const createJob= function (job) {
    return request({
        method: 'post',
        url: "/workshop/createJob",
        data:job
    })
}
//Create sub task
export const createSubTask = function (task) {
    return request({
        method: 'post',
        url: "/workshop/createSubTask",
        data:task
    })
}



//employeeId = 0 reutrn all jobs
export const getAvailableTemplates= function () {
    return request({
        method: 'post',
        url: "/workshop/findAvailableTemplates"

    })
}
//Get all sub tasks
export const getAllSubTasks = function (jobId) {
    const formdata = new FormData();
    formdata.append('id',jobId);
    return request({
        method: 'post',
        url: "/workshop/getAllSubTasks",
        data:formdata
    })
}

//update sub task
export const updateSubTask = function (subTask) {
    return request({
        method: 'post',
        url: "/workshop/updateSubTask",
        data:subTask
    })
}
//Get job by id
export const getJob = function (jobId) {
    const formdata = new FormData();
    formdata.append('id',jobId);
    return request({
        method: 'post',
        url: "/workshop/getJob",
        data:formdata
    })
}
//update a job
export const updateJob = function (job) {
    return request({
        method: 'post',
        url: "/workshop/updateJob",
        data:job
    })
}
//Get all sub task type
export const getAllSubTaskType = function () {
    return request({
        method: 'post',
        url: "/workshop/getAllSubTaskType"
    })
}
//Delete a sub task
export const deleteSubTask = function (subTaskId) {
    const formdata = new FormData();
    formdata.append('id',subTaskId);
    return request({
        method: 'post',
        url: "/workshop/deleteSubTask",
        data:formdata
    })
}
//Create a new template
export const createNewTemplate = function (template) {
    return request({
        method: 'post',
        url: "/workshop/createNewTemplate",
        data:template
    })
}
//Get tasks for a employee
export const getTasksForEmployee = function (employeeId) {
    const formdata = new FormData();
    formdata.append('employeeId',employeeId);
    return request({
        method: 'post',
        url: "/workshop/getTasksForEmployee",
        data:formdata
    })
}
//get comment for a job
export const getComment = function (jobId) {
    const formdata = new FormData();
    formdata.append('job_id',jobId);
    return request({
        method: 'post',
        url: "/workshop/getComments",
        data:formdata
    })
}
//Create a comment for a job
export const createComment = function (Comment) {
    return request({
        method: 'post',
        url: "/workshop/createComment",
        data:Comment
    })
}