import React, { useRef } from "react";

const InputRefExample = () => {
    const inputRef = useRef();

    const focusInput = () => {
        inputRef.current.focus();
        console.log('first render useRef=======>')
    }
    //not whole component re-render again when i click focusInput (without re-rendering the component)
    console.log('render time=======>')
    return(
        <>
        <input ref={inputRef} type="text"/>
        <button onClick={focusInput}>Text Focus</button>
        </>
    );
}

export default InputRefExample;