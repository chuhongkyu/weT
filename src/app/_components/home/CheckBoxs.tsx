import { useEffect, useState } from "react";
import { HomeListStoreState } from "@/utils/store";

const CheckBoxs = ({ query, setQuery }:HomeListStoreState) => {

    const [formData, setFormData] = useState({
        latest: true,
        old: false,
    });

    const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = event.target; 
        
        setFormData({
            latest: false,
            old: false,
            [name]: true,
        });
    };

    useEffect(()=>{
        if (formData.latest) {
            setQuery({ ...query, type: "latest" });
        }else if(formData.old){
            setQuery({...query, type: "old" })
        }
    },[formData])

    return(
        <div className="flex py-4 gap-4 pl-6 md:pl-0">
            <div className="inline-flex items-center">
                <label className="relative flex items-center p-1 rounded-full cursor-pointer" htmlFor="latest">
                    <input type="checkbox"
                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-1 before:w-1 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                        onChange={onHandleChange}
                        checked={formData.latest}
                        id="latest" 
                        name="latest" 
                    />
                    <span className="absolute text-white transition-opacity opacity-0 pointer-events-none left-1.5 peer-checked:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                        <path fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"></path>
                        </svg>
                    </span>
                </label>
                <span className="ms-1 text-sm font-medium text-gray-900">최신 순</span>
            </div>
            
            <div className="inline-flex items-center">
                <label className="relative flex items-center p-1 rounded-full cursor-pointer" htmlFor="old">
                    <input type="checkbox"
                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-1 before:w-1 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                        onChange={onHandleChange}
                        checked={formData.old}
                        id="old" 
                        name="old" 
                    />
                    <span className="absolute text-white transition-opacity opacity-0 pointer-events-none left-1.5 peer-checked:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                        <path fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"></path>
                        </svg>
                    </span>
                    <span className="ms-1 text-sm font-medium text-gray-900">오래된 순</span>
                </label>
            </div>
        </div>
    )
}

export default CheckBoxs;