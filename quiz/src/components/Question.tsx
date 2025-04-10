import { useState } from "react";
import Answer from "./Answer";
import QuestionTimer from "./QuestionTimer";
import QUESTIONS from "./questions";

interface iAnswerObject {
    selectedAnswer: string;
    isCorrect: boolean | null;
}
const answerObject: iAnswerObject = {
    selectedAnswer: '',
    isCorrect: null
}
export default function Question({
    index,
    onSelectAnswer,
    onSkipAnswer }: {
        index: number,
        onSelectAnswer: (answer: string | null) => void,
        onSkipAnswer: () => void
    }) {
    const [answer, setAnswer] = useState(answerObject);
    let timer = 10000;

    if (answer.selectedAnswer) {
        timer = 10000;
    }

    if (answer.isCorrect !== null) {
        timer = 2000;
    }

    function handleSelectAnswer(answer: string) {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        })

        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: QUESTIONS[index].answers[0] === answer
            })

            setTimeout(() => {
                onSelectAnswer(answer);
            }, 2000);
        }, 1000);
    }
    let answerState = '';

    if (answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if (answer.selectedAnswer) {
        answerState = 'answered';
    }
    return (
        <div id="question">
            <QuestionTimer
                key={timer}
                timeout={timer}
                onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
                mode={answerState}
            />
            <h2>{QUESTIONS[index].text}</h2>
            <Answer
                answers={QUESTIONS[index].answers}
                selectedAnswer={answer.selectedAnswer}
                answerState={answerState}
                onSelect={handleSelectAnswer}
            />

        </div>
    );
}