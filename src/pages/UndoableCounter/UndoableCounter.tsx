import { useState } from "react";
import "./UndoableCounter.css";

const UndoableCounter = () => {
    const [history, setHistory] = useState<number[]>([0])
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    const currentValue = history[currentIndex]

    const updateHistory = (newValue:number) => {
        const newHistory = [...history.slice(0, currentIndex + 1), newValue]

        console.log(newHistory)

        setHistory(newHistory)
        setCurrentIndex(newHistory.length-1)
    }

    const increment = () => updateHistory(currentValue+1)
    const decrement = () => updateHistory(currentValue-1)

    const undo = () => {
        if(currentIndex > 0) (
            setCurrentIndex(currentIndex-1)
        )
    }

    const redo = () => {
        if(currentIndex < history.length -1){
            setCurrentIndex(currentIndex+1)
        }
    }

    const handleClearHistory = () => {
        setHistory([0])
        setCurrentIndex(0)
    }

    return (
        <div className="counter-container">
        <div className="counter-card">
            <h1>Undoable Counter</h1>

            <div className="counter-value">{currentValue}</div>

            <div className="button-group">
            <button onClick={increment}>+ Increment</button>
            <button onClick={decrement}>- Decrement</button>
            <button onClick={()=>updateHistory(0)}>Reset</button>
            </div>

            <div className="button-group">
                <>
                    {
                        [10,20,100,-5,-25,-50].map((val)=>(
                            <button 
                                className="addBtn"
                                onClick={()=>updateHistory(currentValue+val)}
                            >
                                {val > 0 ? `+${val}` : val}
                            </button>
                        ))
                    }
                </>
            </div>

            <div className="button-group">
            <button
                className="secondary"
                disabled={currentIndex === 0}
                onClick={undo}
            >
                Undo
            </button>

            <button
                className="secondary"
                disabled={currentIndex === history.length -1}
                onClick={redo}
            >
                Redo
            </button>
            </div>

            <div className="button-group">
            <button
                className="historyBtn"
                onClick={handleClearHistory}
            >
                Clear History
            </button>
            </div>

            <div className="history">
            <h3>History</h3>

            <ul>
                {   history.map((val, index)=>(
                        <li
                            key = {index}
                            className={index === currentIndex ? 'active' : ''}
                        >
                            Step {index}: {val}
                        </li>
                    ))   
                }    
            </ul>
            </div>

        </div>
        </div>
    );
};

export default UndoableCounter;