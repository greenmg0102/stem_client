
import React, { useMemo, useRef, useState } from 'react';
import { Select, Spin } from 'antd';
import type { SelectProps } from 'antd';
import debounce from 'lodash/debounce';
import { apiList } from '../../../../api/admin/stem'
import axios from "axios";

export interface DebounceSelectProps<ValueType = any>
    extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
    fetchOptions: (search: string) => Promise<ValueType[]>;
    debounceTimeout?: number;
}

const StemItemSearch = ({ category, title, placeholder, gatherValue, stemValue }: any) => {

    function DebounceSelect<ValueType extends { key?: string; label: React.ReactNode; value: string | number } = any>({ fetchOptions, debounceTimeout = 800, ...props }: DebounceSelectProps<ValueType>) {

        const [fetching, setFetching] = useState(false);
        const [options, setOptions] = useState<ValueType[]>([]);
        const fetchRef = useRef(0);

        const debounceFetcher = useMemo(() => {
            const loadOptions = (value: string) => {
                fetchRef.current += 1;
                const fetchId = fetchRef.current;
                setOptions([]);
                setFetching(true);

                fetchOptions(value).then((newOptions) => {
                    if (fetchId !== fetchRef.current) {
                        return;
                    }

                    setOptions(newOptions);
                    setFetching(false);
                });
            };

            return debounce(loadOptions, debounceTimeout);
        }, [fetchOptions, debounceTimeout]);

        return (
            <Select
                labelInValue
                filterOption={false}
                onSearch={debounceFetcher}
                notFoundContent={fetching ? <Spin size="small" /> : null}
                {...props}
                options={options}
                className=''
            />
        );
    }

    async function fetchUserList(searchHint: string): Promise<any[]> {

        const result = await axios.get(`${apiList[category].link}?${apiList[category].hint}=${searchHint}`).then((result: any) => { return result.data })
        return result.map((item: any) => {
            return {
                label: item[apiList[category].hint],
                value: item._id
            }
        })
    }

    return (
        <div className="">
            <p className='text-[14px] font-bold text-gray-600 mb-2'>{title}</p>
            <DebounceSelect
                mode="multiple"
                value={stemValue[category]}
                placeholder={placeholder}
                fetchOptions={fetchUserList}
                onChange={(newValue) => gatherValue(newValue as any[])}
                style={{ width: '100%' }}
            />
        </div>
    );
};

export default StemItemSearch;