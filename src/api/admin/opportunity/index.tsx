import axios from "axios";

export async function opportunityRead(): Promise<any> {
    const result = await axios.post("/admin/opportunity/read").then((result: any) => { return result.data })
    return result
}

export async function opportunityCreate(data: any): Promise<any> {
    const result = await axios.post("/admin/opportunity/create", data).then((result: any) => { return result.data })
    return result
}

export async function opportunityDelete(data: any): Promise<any> {
    const result = await axios.post("/admin/opportunity/delete", data).then((result: any) => { return result.data })
    return result
}

export async function opportunityUpdate(data: any): Promise<any> {
    const result = await axios.post("/admin/opportunity/update", data).then((result: any) => { return result.data })
    return result
}
