import { useState } from "react";

export default function FileExplorer({ file, depth = 0 }) {
    const [isVisible, setIsVisible] = useState(false)


    return (
        <>
        <div style={{display: "flex",marginLeft: `${depth * 20}px`}}>
                <h3  style={{ cursor: "pointer", marginLeft: "5px" }} onClick={() => setIsVisible(!isVisible)}>
                    {file.items.length > 0 ? "📁" : "📄"} 
                    {file.name}</h3>
                {
                    file.items.length > 0 && <h3 style={{ cursor: "pointer" }} onClick={() => setIsVisible(!isVisible)}>{">"}</h3>
                }
            </div>
            {
                isVisible && (
                    <>
                        {
                            file.items.map(f => f.items ? <FileExplorer style={{ marginLeft: '20px' }} key={f.id} file={f} depth={depth + 1} /> : <div style={{ marginLeft: `${(depth+1)*20}px` }} key={f.id}><h1>{f.name}</h1></div>)
                        }
                    </>
                )
            }
        </>
    )
}