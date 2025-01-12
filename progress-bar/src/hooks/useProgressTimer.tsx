import { useEffect, useState } from "react"

type useProgressTimerProps = {
    duration: number,
    step: number,
    maxValue: number
}

export default function useProgressTimer({ duration, step, maxValue }: useProgressTimerProps) {
    const [value, setValue] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setValue(value => {
                if (value >= maxValue) {
                    clearInterval(timer)
                    return 0
                }
                return value + step
            })
        }, duration)

        return () => clearInterval(timer)
        
    }, [])

    return { value }
}