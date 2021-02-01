import {useState} from "react";

// 이 function은 defaultValue를 가짐
export default (defaultValue) => {
    const [value, setValue] = useState(defaultValue);
    
    // event를 가짐
    const onChange = e => {
        const { target: {value} } = e;
        setValue(value);
    };

    return { value, onChange, setValue }; 
};

/*
    useInput은 하나의 value를 가지는데, useState에서 그 value를 사용 함 
    그리고 그 value를 return 함 -> useState는 value와 setValue를 줌
    value를 return하고, onChange라는 function을 export할 수 있음 
*/