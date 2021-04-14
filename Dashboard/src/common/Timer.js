import {useEffect} from "react";

export const Timer = ({timer, children}) => {
    useEffect(() => {
        const interval = setInterval(() => {}, timer)
        return () => clearInterval(interval)
    })
    return (
        <>{children}</>
    )
}