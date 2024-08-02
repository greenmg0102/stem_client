export const categroyCredential = (bufferCredentialList: any) => {
    let filterOption = ["Adobe", "Microsoft", "Program School / Org Type"]

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


export const categroyCertifications = (bufferCredentialList: any) => {

    let filterOption = ["Adobe", "Microsoft", "Program School / Org Type"]

    let result: any = Array(filterOption.length).fill(0).map((item: any, index: any) => {
        return {
            value: filterOption[index] + " Certifications Category",
            title: filterOption[index] + " Certifications Category",
            children: []
        }
    })

    bufferCredentialList.forEach((item: any, index: any) => {

        if (filterOption.some((each: any, order: any) => item.includes(each))) {
            filterOption.forEach((each: any, order: any) => {
                if (item.includes(each)) {
                    let real = result[order].children
                    real.push({
                        value: item,
                        title: item
                    })
                }
            })
        } else result.push({
            value: item,
            title: item
        })
    })

    return result
}


export const menuCategroyCertifications = (bufferCredentialList: any) => {

    let filterOption = ["Adobe", "Microsoft", "Program School / Org Type"]

    let result: any = Array(filterOption.length).fill(0).map((item: any, index: any) => {
        return {
            key: filterOption[index] + " Certifications Category",
            label: filterOption[index] + " Certifications Category",
            children: [{
                key: filterOption[index] + " Certifications Category",
                label: filterOption[index] + " Certifications Category",
            }]
        }
    })


    bufferCredentialList.forEach((item: any, index: any) => {

        if (filterOption.some((each: any, order: any) => item.includes(each))) {
            filterOption.forEach((each: any, order: any) => {
                if (item.includes(each)) {
                    let real = result[order].children
                    real.push({
                        key: item,
                        label: item
                    })
                    // real.unshift({
                    //     key: item + " Certifications Category",
                    //     label: item + " Certifications Category",
                    // })
                }
            })
        } else result.push({
            key: item,
            label: item
        })
    })

    return result

}