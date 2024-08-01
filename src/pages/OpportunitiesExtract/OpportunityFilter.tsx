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
        <div className="flex justify-between items-start flex-wrap">
            {/* <Input
                value={value}
                placeholder="Basic usage"
                onChange={(e: any) => setValue(e.target.value)}
            /> */}
            <div className="w-full pl-4">
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
            <div className="w-full p-2 rounded-[8px] pt-4 px-8">
                <p className="text-[17px] text-gray-500">
                    {
                        Definitions.find((each: any) => each.title === opportunityString)?.description ??
                        <div className="w-full flex justify-center items-center">
                            {/* <p className="text-gray-800">Opportunity Description ?</p> */}
                            {/* <svg viewBox="64 64 896 896" focusable="false" data-icon="border-top" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M872 144H152c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM208 310h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 498h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0-332h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 166h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm166-166h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 332h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm332 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0-332h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm166 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm-332 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm332 332h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm-332 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm332-498h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm-332 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm332 332h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm-332 0h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z"></path></svg> */}
                        </div>
                    }
                </p>
            </div>
        </div>
    )
}