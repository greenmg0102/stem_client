import { Carousel, Button, Modal } from 'antd';

const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

export default function SearchByGroupModal({ isOpen, imageList, setIsOpen }: any) {
    console.log("imageList", imageList);

    return (
        <Modal
            title={<p className='text-center mb-4 text-[20px]'>{isOpen}</p>}
            centered
            open={isOpen === undefined ? false : true}
            onOk={() => setIsOpen(undefined)}
            onCancel={() => setIsOpen(undefined)}
            width={1000}
            footer={null}
        >
            <Carousel arrows infinite={isOpen}>
                {imageList.map((item: any, index: any) =>
                    <div
                        key={index}
                        className=''
                    >
                        <img className="w-full ltr:-ml-1 rtl:-mr-1 inline" src={item} alt="logo" />
                    </div>
                )}
            </Carousel>
        </Modal>

    )
}