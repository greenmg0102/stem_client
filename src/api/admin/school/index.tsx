import axios from "axios";

export async function schoolRead(): Promise<any> {
    const result = await axios.post("/admin/school/read").then((result: any) => { return result.data })
    return result
}

export async function schoolCreate(data: any): Promise<any> {
    const result = await axios.post("/admin/school/create", data).then((result: any) => { return result.data })
    return result
}

export async function schoolDelete(data: any): Promise<any> {
    const result = await axios.post("/admin/school/delete", data).then((result: any) => { return result.data })
    return result
}

export async function schoolUpdate(data: any): Promise<any> {
    const result = await axios.post("/admin/school/update", data).then((result: any) => { return result.data })
    return result
}
