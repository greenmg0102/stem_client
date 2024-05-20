import axios from "axios";

export async function integrationRead(data: any): Promise<any> {
    const result = await axios.post("/user/integration-search/read", data).then((result: any) => { return result.data })
    return result
}


export async function integrationReadId(id: any): Promise<any> {
    const result = await axios.get(`/user/integration-search/readId/${id}`).then((result: any) => { return result.data })
    return result
}
