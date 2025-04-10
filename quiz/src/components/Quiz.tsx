import { useState, useCallback } from 'react';
import Question from "./Question";
import quizCompleteImg from '../assets/quiz-complete.png';
import Summary from './Summary';
import QUESTIONS from "./questions";

function Quiz() {

    const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);

    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(
        selectedAnswer: string | null
    ) {
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });
    },
        []);


    const handleSkipAnswer = useCallback(
        () => handleSelectAnswer(null),
        [handleSelectAnswer]
    );

    if (quizIsComplete) {
        return <Summary userAnswers={userAnswers} />
    }


    return (
        <div id="quiz">
            <Question
                key={activeQuestionIndex}
                index={activeQuestionIndex}
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer}
            />

        </div>
    );
}

export default Quiz;
