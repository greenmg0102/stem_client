import axios from "axios";

export async function stemRead(data: any): Promise<any> {
    const result = await axios.post("/admin/stem/read", data).then((result: any) => { return result.data })
    return result
}


export async function stemCreate(data: any): Promise<any> {
    const result = await axios.post("/admin/stem/create", data).then((result: any) => { return result.data })
    return result
}


export async function stemDumpCreate(data: any): Promise<any> {
    const result = await axios.post("/admin/stem/dump-create", data).then((result: any) => { return result.data })
    return result
}


export async function stemWholeCreate(data: any): Promise<any> {
    const result = await axios.post("/admin/stem/stem-stream", data).then((result: any) => { return result.data })
    return result
}


export const apiList: any = {
    "programSchoolOrg": {
        link: "/admin/stem/program-school-org/",
        hint: "name"
    },
    "programSchoolOrgType": {
        link: "/admin/stem/program-school-org-type/",
        hint: "type"
    },
    "credentialSchool": {
        link: "/admin/stem/crendential-school/",
        hint: "school"
    },
    "Opportunity": {
        link: "/admin/stem/opportunity/",
        hint: "opportunity"
    },
    "field": {
        link: "/admin/stem/field/",
        hint: "field"
    },
    "credential": {
        link: "/admin/stem/credential/",
        hint: "credential"
    }
}

