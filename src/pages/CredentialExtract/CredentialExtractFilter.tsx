import { useState, useEffect } from "react"
import { Input } from 'antd';
import { opportunityFilerRead } from '../../api/user/opportunity'
import clsx from 'clsx'

export default function CredentialExtractFilter({ opportunityString, setStemValue }: any) {

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
                        className="flex justify-between items-center mb-4 cursor-pointer"
                        onClick={() => setStemValue(item._id)}
                    >
                        <p className={clsx("hover:text-blue-700 hover:font-bold transition-all", opportunityString === item._id ? "text-blue-700 font-bold" : "text-gray-600")}>{item._id}</p>
                        <p className="text-gray-600 font-bold">{item.count}</p>
                    </div>
                )}
            </div>
        </div>
    )
}