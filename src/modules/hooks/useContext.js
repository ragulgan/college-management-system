import React, { createContext, useContext } from "react";

const ThemeContext = createContext('light');

//component 1
const UseContextExample = () => {
    const theme = useContext(ThemeContext)

    return (
        <>
            <button>{`Theme is ${theme}`}</button>
        </>
    );
}

//component 2
const UseContextApp = () => {
    return (
        <>
            {/* This will use the provided value 'dark' */}
            <ThemeContext.Provider value="dark">
                <UseContextExample />
            </ThemeContext.Provider>

            {/* This has no provider, so it uses default 'light' (it falls back to the default from createContext('light')) */}
            {/* <UseContextExample /> */}
        </>
    );
}

export default UseContextApp;
