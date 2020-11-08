/**
 * Global constant
 *
 * @author Yao Shi
 * @version 1.0
 * @date 2020/09/30 11:47 pm
 */

 // job status and Corresponding button type
const job_status = [{
        status: -1,
        value: 'All',
        vxeButtonText:'All'
    },{
        status: 0,
        value: 'Created',
        vxeButtonText:'primary'
    },
    {
        status: 1,
        value: 'Started',
        vxeButtonText:'success'
    },
    {
        status: 3,
        value: 'Over Due',
        vxeButtonText:'danger'
    },
    {
        status: 4,
        value: 'Need Close',
        vxeButtonText:'warning'
    },
    {
        status: 5,
        value: 'Closed',
        vxeButtonText:'info'
    }
]
// task status and Corresponding button type
const task_status = [{
        status: -1,
        value: 'All',
        vxeButtonText:'All'
    },{
        status: 0,
        value: 'Created',
        vxeButtonText:'primary'
    },
    {
        status: 1,
        value: 'Started',
        vxeButtonText:'success'
    },
    {
        status: 3,
        value: 'Over Due',
        vxeButtonText:'danger'
    },
    {
        status: 4,
        value: 'Need Close',
        vxeButtonText:'warning'
    },
    {
        status: 5,
        value: 'Finished',
        vxeButtonText:'warning'
    }
]


// Return button type for a specific job status
function getJobButtonType (status) {
    for (let i = 0 ; i < job_status.length;i++) {
        if (job_status[i].status == status ) {
            return job_status[i].vxeButtonText
        }
    }
}
// Return job text for a specific job status
function getJobStatus(status) {
    for (let i = 0 ; i < job_status.length;i++) {
        if (job_status[i].status == status ) {
            return job_status[i].value
        }
    }
}
// Return button type for a specific task status
function getTaskButtonType (status) {
    for (let i = 0 ; i < task_status.length;i++) {
        if (task_status[i].status == status ) {
            return task_status[i].vxeButtonText
        }
    }
}
// Return task text for a specific task status
function getTaskStatus(status) {
    for (let i = 0 ; i < task_status.length;i++) {
        if (task_status[i].status == status ) {
            return task_status[i].value
        }
    }
}

export default{
    job_status,
    getJobButtonType,
    getJobStatus,
    getTaskButtonType,
    getTaskStatus
}