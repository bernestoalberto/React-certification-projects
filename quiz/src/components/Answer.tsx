import { useRef } from "react";

export default function Answer({ answers, selectedAnswer, answerState, onSelect }: { answers: Array<string>, selectedAnswer: string, answerState: string, onSelect: (answer: string) => void }) {
    const shuffledAnswers = useRef([] as string[]);

    if (!shuffledAnswers.current || shuffledAnswers.current.length === 0) {
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }
    return (
        <ul id="answers">
            {
                shuffledAnswers.current.map((answer: string, index: number) => {
                    const isSelected = selectedAnswer === answer;
                    let cssClass = '';

                    if (answerState === 'answered' && isSelected) {
                        cssClass = 'selected';
                    }

                    if (
                        (answerState === 'correct' || answerState === 'wrong') &&
                        isSelected
                    ) {
                        cssClass = answerState;
                    }

                    return <li className="answer" key={index}>
                        <button
                            onClick={() => onSelect(answer)}
                            className={cssClass}
                            disabled={answerState !== ''}>
                            {answer}
                        </button>
                    </li>;
                })
            }
        </ul>
    );
}