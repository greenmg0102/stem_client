import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { integrationReadId } from '../api/user/integration'
import IdDetailData from './IntegrationSearchId/IdDetailData'

const IntegrationSearchId = () => {

    const { id } = useParams();

    const [detailData, setDetailData] = useState<any>({})

    useEffect(() => {
        async function fetchData() {
            let result = await integrationReadId(id)
            if (result.isOkay) {
                setDetailData(result.result[0])
            }
        }
        fetchData()
    }, [id])

    return (
        <div>
            <div className="pt-5">
                {Object.keys(detailData).length > 0 ?
                    <IdDetailData data={detailData} />
                    :
                    null
                }
            </div>
        </div>
    );
};

export default IntegrationSearchId;
