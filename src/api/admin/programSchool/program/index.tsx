import axios from "axios";

export async function programSchoolOrgRead(): Promise<any> {
    const result = await axios.post("/admin/program-school-org/read").then((result: any) => { return result.data })
    return result
}

export async function programSchoolOrgCreate(data: any): Promise<any> {
    const result = await axios.post("/admin/program-school-org/create", data).then((result: any) => { return result.data })
    return result
}

export async function programSchoolOrgDelete(data: any): Promise<any> {
    const result = await axios.post("/admin/program-school-org/delete", data).then((result: any) => { return result.data })
    return result
}

export async function programSchoolOrgUpdate(data: any): Promise<any> {
    const result = await axios.post("/admin/program-school-org/update", data).then((result: any) => { return result.data })
    return result
}
