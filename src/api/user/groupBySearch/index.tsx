import axios from "axios";

export async function groupListGet(): Promise<any> {
    const result = await axios.get("/user/group-by-search/read").then((result: any) => { return result.data })
    return result
}

export async function credentialFromOpportunity(data: any): Promise<any> {
    const result = await axios.post("/user/group-by-search/credential-from-opportunity", data).then((result: any) => { return result.data })
    return result
}

export async function pathwayFromCredential(data: any): Promise<any> {
    const result = await axios.post("/user/group-by-search/pathway-from-credential", data).then((result: any) => { return result.data })
    return result
}

export async function opportunutyFromPathway(data: any): Promise<any> {
    const result = await axios.post("/user/group-by-search/opportunity-from-pathway", data).then((result: any) => { return result.data })
    return result
}

export async function occupationFromPathway(data: any): Promise<any> {
    const result = await axios.post("/user/group-by-search/occupation-from-pathway", data).then((result: any) => { return result.data })
    return result
}

export async function credentialFromOccupation(data: any): Promise<any> {
    const result = await axios.post("/user/group-by-search/occupation-from-credential", data).then((result: any) => { return result.data })
    return result
}