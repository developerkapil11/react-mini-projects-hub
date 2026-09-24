import { useEffect, useState } from "react";
import "./CountdownTimer.css";

export const CountdownTimer = () => {
    //setVariables
    const [inputTime, setInputTime] = useState('')
    const [totalSeconds, setTotalSeconds] = useState<number>(0)
    const [isRunning, setIsRunning] = useState<boolean>(false)
    const [activeBtn, setActiveBtn] = useState("")

    //set total Seconds
    const handleTimer = () => {
        setTotalSeconds(Number(inputTime))
        setActiveBtn("")
        setIsRunning(false)
    }

    //convert total seconds into hours, minutes and seconds
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) /  60)
    const seconds = totalSeconds % 60

    //formate the time upto 2 digits
    const formatTime = (value:number) => String(value).padStart(2, "0") 

    //handle Start on start button click
    const handleStart = () => {
        setIsRunning(true)
        setActiveBtn('startBtn')
    }

    const handlePause = () => {
        setIsRunning(false)
        setActiveBtn('pauseBtn')
    }

    const handleReset = () => {
        setActiveBtn('resetBtn')
        setIsRunning(false)
        setInputTime('')
        setTotalSeconds(0)
    }

    useEffect(()=>{
        let timer:number;
            if(isRunning && totalSeconds > 0){
                timer = setInterval(()=>{
                    setTotalSeconds((prev)=>{
                        if(prev <= 1){
                            setIsRunning(false)
                            return 0
                        }
                        return prev - 1
                    })
                }, 1000)
            }

            return () => clearInterval(timer)
    },[isRunning, totalSeconds])

    return (
        <div className="countdown-container">
        <div className="input-container">
            <input
            className="countdown-input"
            type="number"
            placeholder="Enter total seconds"
            value={inputTime}
            onChange={(e)=>setInputTime(e.target.value)}
            />

            <button
            className="set-btn"
            onClick = {handleTimer}
            >
            Set Timer
            </button>
        </div>

        <div className="timer-box">
            {formatTime(hours)}:
            {formatTime(minutes)}:
            {formatTime(seconds)}
        </div>

        <div className="button-container">
            <button
                className={`start-btn ${
                    activeBtn === "startBtn"
                    ? "active-btn"
                    : ""
                }`}
                onClick={handleStart}    
            >
            Start
            </button>

            <button 
                className= {`pause-btn ${
                    activeBtn === "pauseBtn" 
                    ? "active-btn" 
                    : ""
                }`}
                onClick={handlePause}
            >
            Pause
            </button>

            <button 
                className= {`reset-btn ${
                    activeBtn === "resetBtn" 
                    ? "active-btn" 
                    : ""
                }`}
                onClick={handleReset}
            >
            Reset
            </button>
        </div>
        </div>
    );
};

export default CountdownTimer;