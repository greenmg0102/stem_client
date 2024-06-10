import axios from "axios";

export async function opportunityRead(data: any): Promise<any> {
    const result = await axios.post("/user/opportunity/read", data).then((result: any) => { return result.data })
    return result
}

export async function opportunityFilerRead(): Promise<any> {
    console.log('start ~~~');

    const result = await axios.get("/user/opportunity/filter-read").then((result: any) => { return result.data })
    
    console.log('end ~~~');
    
    return result
}


export async function stemAccordingtoOpportunityRead(data: any): Promise<any> {
    const result = await axios.post("/user/opportunity/stem-accordingto-opportunity-read ", data).then((result: any) => { return result.data })
    return result
}