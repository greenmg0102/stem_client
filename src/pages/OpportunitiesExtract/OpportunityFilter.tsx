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
        <div>
            <Input
                value={value}
                placeholder="Basic usage"
                onChange={(e: any) => setValue(e.target.value)}
            />
            <div className="px-2 mt-4">

                {list.map((item: any, index: any) =>
                    <div
                        key={index}
                        className={clsx(
                            Definitions.find((each: any) => each.title === item._id) ? "border border-dashed border-gray-500 cursor-pointer rounded-[8px] p-2 mt-2" : "hidden"
                        )}
                        onClick={() => setStemValue(item._id)}
                    >
                        <div
                            className="flex justify-between items-center mb-1"
                        >
                            <p className={clsx("hover:text-blue-700 hover:font-bold transition-all", opportunityString === item._id ? "text-blue-700 font-bold" : "text-gray-700")}>{item._id}</p>
                            <p className="text-gray-700 font-bold text-[12px]">({item.count})</p>
                        </div>
                        <p className="text-[12px] text-gray-500">
                            {Definitions.find((each: any) => each.title === item._id)?.description}
                        </p>
                    </div>
                )}
            </div>
        </div >
    )
}