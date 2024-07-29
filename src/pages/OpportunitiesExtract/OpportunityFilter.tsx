import { useState, useEffect } from "react"
import { Input } from 'antd';
import { Definitions } from './Definitions'
import { opportunityFilerRead } from '../../api/user/opportunity'
import clsx from 'clsx'

export default function OpportunityFilter({ opportunityString, setStemValue }: any) {

    const [list, setList] = useState<any>([])
    const [value, setValue] = useState("")

    useEffect(() => {
        async function fetchData() {
            let result = await opportunityFilerRead()
            if (result.isOkay) {
                setList(() => [
                    ...result.result.filter((item: any) =>
                        item._id.toLowerCase().includes(value.toLowerCase())
                    ),
                ]);
            }
        }
        fetchData()
    }, [value])

    return (
        <div className="flex justify-between items-start">
            {/* <Input
                value={value}
                placeholder="Basic usage"
                onChange={(e: any) => setValue(e.target.value)}
            /> */}
            <div className="w-3/4 pl-4">
                <div className="px-2 flex justify-start items-start flex-wrap">

                    {list.map((item: any, index: any) =>
                        <div
                            key={index}
                            className={clsx(Definitions.find((each: any) => each.title === item._id) ? "w-1/2 h-42 mt-2 px-2" : "hidden")}
                        >
                            <div
                                className="p-2 border border-dashed border-gray-500 cursor-pointer rounded-[8px]"
                                onClick={() => setStemValue(item._id)}
                            >
                                <div
                                    className="flex justify-between items-center mb-1"
                                >
                                    <p className={clsx("hover:text-blue-700 hover:font-bold transition-all", opportunityString === item._id ? "text-blue-700 font-bold" : "text-gray-700")}>{item._id}</p>
                                    <p className="text-gray-700 font-bold text-[12px]">({item.count})</p>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </div>
            <div className="w-1/4 p-2 rounded-[8px]">
                <p className="text-[17px] text-gray-500">
                    {Definitions.find((each: any) => each.title === opportunityString)?.description}
                </p>
            </div>
        </div>
    )
}