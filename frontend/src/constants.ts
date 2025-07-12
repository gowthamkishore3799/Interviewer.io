export const SSO = "http://localhost:3000/v1/sso"
export const userDetailsKey = "USER_DETAILS"


export enum JOB_ROLE_TYPE {
    FULL_TIME = "Full Time",
    PART_TIME = "Part Time",
    INTERNSHIP = "Internship"
}

export const JOB_ROLE = {
    [JOB_ROLE_TYPE.FULL_TIME] : {
        color: "green",
        role: JOB_ROLE_TYPE.FULL_TIME
    },
    [JOB_ROLE_TYPE.PART_TIME] : {
        color: "cyan",
        role: JOB_ROLE_TYPE.PART_TIME
    },
    [JOB_ROLE_TYPE.INTERNSHIP] : {
        color: "blue",
        role: JOB_ROLE_TYPE.INTERNSHIP
    }
}