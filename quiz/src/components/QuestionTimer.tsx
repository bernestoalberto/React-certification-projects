import { useState, useEffect } from "react";


export default function QuestionTimer({ timeout, onTimeout, mode }: { timeout: number, onTimeout: (() => void) | null, mode: string }) {

    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        console.log('SETTING TIMEOUT');
        const timer = onTimeout && setTimeout(onTimeout, timeout);
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [timeout, onTimeout]);



    useEffect(() => {
        console.log('SETTING INTERVAL');
        const interval = setInterval(() => {
            setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
        }, 100);
        return () => {
            clearInterval(interval);
        }
    }, []);
    return (

        <progress
            id="question-time"
            max={timeout}
            value={remainingTime}
            className={mode} />

    )
}