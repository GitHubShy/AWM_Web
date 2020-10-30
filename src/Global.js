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



function getJobButtonType (status) {
    for (let i = 0 ; i < job_status.length;i++) {
        if (job_status[i].status == status ) {
            return job_status[i].vxeButtonText
        }
    }
}

function getJobStatus(status) {
    for (let i = 0 ; i < job_status.length;i++) {
        if (job_status[i].status == status ) {
            return job_status[i].value
        }
    }
}

function getTaskButtonType (status) {
    for (let i = 0 ; i < task_status.length;i++) {
        if (task_status[i].status == status ) {
            return task_status[i].vxeButtonText
        }
    }
}

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