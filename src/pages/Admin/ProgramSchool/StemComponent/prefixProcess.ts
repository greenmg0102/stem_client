export const unRepeatedArrayExtracting = async (data: any) => {

    return {
        name: data.name,
        list: [...new Set(data.list)].filter((item: any) => item !== undefined)
    }

}

export const unRepeatedArrayArrayExtracting = async (data: any) => {

    let uniqueResult = data.list.filter((arr: any, index: any) => {
        return (
            index === data.list.findIndex(
                (innerArr: any) => JSON.stringify(innerArr) === JSON.stringify(arr)
            )
        );
    });

    return {
        type: data.type,
        name: data.name,
        list: uniqueResult
    }

}