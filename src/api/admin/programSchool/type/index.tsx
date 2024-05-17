import axios from "axios";

export async function programTypeRead(): Promise<any> {
    const result = await axios.post("/admin/program-school/type/read").then((result: any) => { return result.data })
    return result
}

export async function programTypeCreate(data: any): Promise<any> {
    const result = await axios.post("/admin/program-school/type/create", data).then((result: any) => { return result.data })
    return result
}

export async function programTypeDelete(data: any): Promise<any> {
    const result = await axios.post("/admin/program-school/type/delete", data).then((result: any) => { return result.data })
    return result
}

export async function programTypeUpdate(data: any): Promise<any> {
    const result = await axios.post("/admin/program-school/type/update", data).then((result: any) => { return result.data })
    return result
}
