import axios from "axios";

export async function generalRead(data: any): Promise<any> {
    const result = await axios.post("/user/general/read", data).then((result: any) => { return result.data })
    return result
}


export async function generalFilerRead(): Promise<any> {
    const result = await axios.get("/user/general/filter-read").then((result: any) => { return result.data })
    return result
}

export async function stemAccordingtoGeneralRead(data: any): Promise<any> {
    const result = await axios.post("/user/general/stem-accordingto-general-read", data).then((result: any) => { return result.data })
    return result
}

