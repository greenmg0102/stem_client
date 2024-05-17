import axios from "axios";

export async function credentialRead(): Promise<any> {
    const result = await axios.post("/admin/credential/read").then((result: any) => { return result.data })
    return result
}

export async function credentialCreate(data: any): Promise<any> {
    const result = await axios.post("/admin/credential/create", data).then((result: any) => { return result.data })
    return result
}

export async function credentialDelete(data: any): Promise<any> {
    const result = await axios.post("/admin/credential/delete", data).then((result: any) => { return result.data })
    return result
}

export async function credentialUpdate(data: any): Promise<any> {
    const result = await axios.post("/admin/credential/update", data).then((result: any) => { return result.data })
    return result
}
