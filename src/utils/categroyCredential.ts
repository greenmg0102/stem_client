export const categroyCredential = (bufferCredentialList: any) => {

    let filterOption = ["Adobe", "Microsoft", "CompTIA"]

    let result: any = Array(filterOption.length).fill(0).map((item: any, index: any) => {
        return {
            createdAt: null,
            status: 1,
            credential: filterOption[index] + " Certifications",
            updatedAt: null,
            _id: null,
            list: []
        }
    })

    bufferCredentialList.forEach((item: any, index: any) => {

        if (filterOption.some((each: any, order: any) => item.credential.includes(each))) {
            filterOption.forEach((each: any, order: any) => {
                if (item.credential.includes(each)) {
                    let real = result[order].list
                    real.push(item)
                }
            })
        } else result.push(item)
    })

    return result

}