import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";
import QuestionCard from "./components/QuestionCard";
import { QuestionsState, Difficulty } from "./API";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const start = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQ = number + 1;
    if (nextQ > TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };

  return (
    <div className=" space-x-80 space-y-40  ">
      <h1 className="pl-96 italic font-extrabold tracking-widest md:focus:underline">
        RANDOM QUIZ
      </h1>

      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button
          className=" flex-auto space-x-6 w-1/2 px-6 py-3 rounded-md bg-black text-white "
          onClick={start}
        >
          <p className=" font-light tracking-widest md:focus:underline">
            Yalla
          </p>
        </button>
      ) : null}
      {!gameOver ? (
        <p className="w-12 h-12 flex items-center justify-center bg-red-100 rounded-lg">
          Score: {score}
        </p>
      ) : null}
      {loading && (
        <p className="animate-spin h-5 w-5 mr-3">Loading Questions...</p>
      )}
      {!loading && !gameOver && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {!gameOver &&
      !loading &&
      userAnswers.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ? (
        <button
          onClick={nextQuestion}
          className=" shadow-2xl px-3 py-3 rounded-md bg-red-600 text-white "
        >
          Next Question
        </button>
      ) : null}
    </div>
  );
};

export default App;
