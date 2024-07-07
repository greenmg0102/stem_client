import axios from "axios";

export async function groupListGet(): Promise<any> {
    const result = await axios.get("/user/group-by-search/read").then((result: any) => { return result.data })
    return result
}