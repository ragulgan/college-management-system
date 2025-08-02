import React, { useCallback, useState } from 'react';

const UseCallBackExample = () => {
  const [count, setCount] = useState(0);
  //The function (increment) will stay the same between renders React will not recreate it unless the dependency array ([]) changes.
  //dependency array is empty ([]), so the function is created once and never recreated.
  //useCallback(fn, deps) → memoizes (cache) the function
  const increment = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return (
    <>
      <button onClick={increment}>Increment</button>
      <div>Count: {count}</div>
    </>
  );
}

export default UseCallBackExample;
