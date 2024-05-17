import axios from "axios";

export async function generalStudyFieldRead(): Promise<any> {
    const result = await axios.post("/admin/general-study-field/read").then((result: any) => { return result.data })
    return result
}

export async function generalStudyFieldCreate(data: any): Promise<any> {
    const result = await axios.post("/admin/general-study-field/create", data).then((result: any) => { return result.data })
    return result
}

export async function generalStudyFieldDelete(data: any): Promise<any> {
    const result = await axios.post("/admin/general-study-field/delete", data).then((result: any) => { return result.data })
    return result
}

export async function generalStudyFieldUpdate(data: any): Promise<any> {
    const result = await axios.post("/admin/general-study-field/update", data).then((result: any) => { return result.data })
    return result
}
