import React, {useMemo} from 'react'

const UseMemoExample = ({number}) => {
    //It only recalculates when number changes.
    //If the parent re-renders but number hasn’t changed, it reuses the old result — it doesn’t re-run the calculation.
    //Without useMemo → recalculates every render
    //With useMemo → recalculates only when dependencies change ([number])
    const computedValue = useMemo(()=> {
        //useMemo(fn, deps) → memoizes the result of a calculation when number not change
        console.log('Computing...', number);
        return number * 2;
    },[number])
    return(
        <>
        <div>
            compututed value {computedValue}
        </div>
        </>
    )
}

export default UseMemoExample;