


export default function ProgressBar({ timer, onTimeOut }: { timer: number, onTimeOut: () => void }) {

    return (
        <progress id="question-time" />
    );
}