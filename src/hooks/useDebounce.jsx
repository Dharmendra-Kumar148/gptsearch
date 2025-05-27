import { useEffect, useState } from "react"

const useDebounce = (value,delay)=>{
    const [debouncedValue, setDebounceValue]= useState(value);

    useEffect(()=> {
        const timeout = setTimeout(()=>{
            setDebounceValue(value);
        },delay);
        return () => clearTimeout(timeout);
    }, [value,delay]);

    return debouncedValue;
};

export default useDebounce