import axios from "axios";

export async function credentialRead(data: any): Promise<any> {
    const result = await axios.post("/user/credential/read", data).then((result: any) => { return result.data })
    return result
}


export async function credentialFilerRead(): Promise<any> {
    const result = await axios.get("/user/credential/filter-read").then((result: any) => { return result.data })
    return result
}


export async function stemAccordingtoCredentialRead(data: any): Promise<any> {
    const result = await axios.post("/user/credential/stem-accordingto-credential-read", data).then((result: any) => { return result.data })
    return result
}

