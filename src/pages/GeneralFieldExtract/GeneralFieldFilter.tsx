import { useState, useEffect } from "react"
import { Input } from 'antd';
import { generalFilerRead } from '../../api/user/general'
import clsx from 'clsx'

export default function GeneralFieldFilter({ generalString, setStemValue }: any) {

    const [list, setList] = useState<any>([])
    const [value, setValue] = useState("")

    useEffect(() => {
        async function fetchData() {
            let result = await generalFilerRead()
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
            {/* <Input
                value={value}
                placeholder="Hint, plz"
                onChange={(e: any) => setValue(e.target.value)}
            /> */}

            <div className="px-2 flex justify-start items-start flex-wrap">
                {list.map((item: any, index: any) =>
                    <div
                        key={index}
                        className="w-1/4 p-2"
                    >
                        <div
                            className="p-2 border border-dashed border-gray-500 cursor-pointer rounded-[8px] flex justify-between items-center mt-1 cursor-pointer  border border-dashed border-gray-500 cursor-pointer rounded-[8px]"
                            onClick={() => setStemValue(item._id)}
                        >
                            <p className={clsx("hover:text-blue-700 hover:font-bold transition-all", generalString === item._id ? "text-blue-700 font-bold" : "text-gray-600")}>{item._id}</p>
                            <p className="text-gray-600 font-bold text-[12px]">({item.count})</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}