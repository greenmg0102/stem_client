import axios from "axios";

export async function bookmarkCreate(data: any): Promise<any> {
    const result = await axios.post("/user/book-mark/create", data).then((result: any) => { return result.data })
    return result
}


export async function bookmarkRead(data: any): Promise<any> {
    const result = await axios.post("/user/book-mark/read", data).then((result: any) => { return result.data })
    return result
}

