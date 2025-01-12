import { useEffect, useState } from "react"

type ProgressBarProps = {
    value?: number
}

export default function ProgressBar({ value=0 }: ProgressBarProps) {
    const [percent, setPercent] = useState<number>(value)

    useEffect(()=>{
        setPercent(Math.min(100,Math.max(0,value)))
    },[value])

    return(
        <div className="progress">
            <span style={{color: percent>=50 ? 'white' : 'black'}}>{percent.toFixed()}%</span>
            <div style={{width:`${percent}%`}} />
        </div>
    )
}