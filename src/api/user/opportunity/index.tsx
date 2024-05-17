import axios from "axios";

export async function opportunityRead(data: any): Promise<any> {
    const result = await axios.post("/user/opportunity/read", data).then((result: any) => { return result.data })
    return result
}
