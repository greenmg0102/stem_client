import axios from "axios";

export async function integrationRead(data: any): Promise<any> {
    const result = await axios.post("/user/integration-search/read", data).then((result: any) => { return result.data })
    return result
}
