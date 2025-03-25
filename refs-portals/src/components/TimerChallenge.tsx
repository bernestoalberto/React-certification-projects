import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

interface TimerChallengeProps {
    title: string;
    targetTime: number;
}

export default function TimerChallenge({ title, targetTime }: TimerChallengeProps) {
    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const dialog = useRef<HTMLDialogElement>(null);

    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if (timeRemaining <= 0) {
        clearInterval(timer.current);
        setTimeRemaining(targetTime * 1000);
        dialog.current?.showModal();

    }

    function handleReset() {
        setTimeRemaining(targetTime * 1000);
    }


    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemianing => prevTimeRemianing - 10);

        }, 10);

    }

    function handleStop() {
        if (timer.current) {
            clearInterval(timer.current);
        }
    }
    return (
        <>
            <ResultModal 
                ref={dialog}
                targetTime={targetTime} 
                remainingTime={timeRemaining} 
                onReset={handleReset} />
            <section className="challenge" >
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime !== 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? 'Stop' : ' Start'} Challenge
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : undefined}>
                    {timerIsActive ? 'Time is running...' : 'Time inactive'}
                </p>
            </section>
        </>
    );
}
