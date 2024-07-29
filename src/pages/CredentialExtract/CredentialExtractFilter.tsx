import { useState, useEffect } from "react"
import { TreeSelect, Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import type { TreeSelectProps } from 'antd';
import { credentialFilerRead } from '../../api/user/credential'
import { categroyCertifications, menuCategroyCertifications } from '../../utils/categroyCredential'
import clsx from 'clsx'


export default function CredentialExtractFilter({ credentialString, setStemValue }: any) {

    const [list, setList] = useState<any>([])
    const [menuList, setMenuList] = useState<any>([])
    const [value, setValue] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const onChange = (newValue: string) => {
        setValue(newValue);
        setStemValue(newValue)
    };

    const onPopupScroll: TreeSelectProps['onPopupScroll'] = (e) => {
        // console.log('onPopupScroll', e);
    };

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true)
            let result = await credentialFilerRead()
            if (result.isOkay) {
                let real = [...result.result.filter((item: any) => item.toLowerCase())]

                let bufferedResult = categroyCertifications(real)
                let bufferedMenuResult = menuCategroyCertifications(real)
                setList(bufferedResult)
                setMenuList(bufferedMenuResult)
            }
            setIsLoading(false)
        }
        fetchData()
    }, [])


    // useEffect(() => {
    //     async function fetchData() {
    //         setIsLoading(true)
    //         let result = await credentialFilerRead()
    //         if (result.isOkay) {
    //             setList(() => [
    //                 ...result.result.filter((item: any) =>
    //                     item._id.toLowerCase().includes(value.toLowerCase())
    //                 )
    //             ]);
    //         }
    //         setIsLoading(false)
    //     }
    //     fetchData()
    // }, [value])

    const onClick: MenuProps['onClick'] = (e) => {

        setValue(e.key);
        setStemValue(e.key)
    };



    return (
        <div>
            <div className="mb-1 h-4 flex justify-end">
                {isLoading ?
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="sync" width="1em" height="1em" fill="currentColor" aria-hidden="true" className="animate-spin"><path d="M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27A341.5 341.5 0 01755 268.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8zm756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4A342.45 342.45 0 01512.1 856a342.24 342.24 0 01-243.2-100.8c-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47a8 8 0 00-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8a8 8 0 00-8-8.2z"></path></svg>
                    :
                    null}
            </div>
            <TreeSelect
                showSearch
                style={{ width: '100%' }}
                value={value}
                dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
                placeholder="Please select"
                allowClear
                treeDefaultExpandAll
                onChange={onChange}
                treeData={list}
                onPopupScroll={onPopupScroll}
            />
            <Menu
                onClick={onClick}
                style={{ width: "100%", height: 200 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={menuList}
                className="overflow-y-auto border rounded-bl-[8px] py-1"
            />
            {/* <Input
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
                        <p className={clsx("hover:text-blue-700 hover:font-bold transition-all", credentialString === item._id ? "text-blue-700 font-bold" : "text-gray-600")}>{item._id}</p>
                        <p className="text-gray-600 font-bold text-[12px]">({item.count})</p>
                    </div>
                )}
            </div> */}
        </div>
    )
}