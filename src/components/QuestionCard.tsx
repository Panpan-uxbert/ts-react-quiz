import React, { MouseEvent } from "react";
import { AnswerObject } from "../App";

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined | any;
  questionNr: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => (
  <>
    <p className="py-2 px-2 bg-red-300 text-red-800 rounded border border-red-60">
      Question: {questionNr} / {totalQuestions}
    </p>

    {/**
     * You onlu user dangersoulySetInnerHTML if you expect a code that contains HTML tags
     * it will render that HTML correctly
     * why its dangerous though?
     * because if the code contains javascript, its gonna run, so if the resources of the code
     * isn't trusted, its dangerous to let him put HTML code since he can break the whole site with javascript
     * TODO: I have to read this
     */}

    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {answers.map((answer) => (
        <button key={answer} className="pr-20 ">
          <button
            className=" hover:bg-red-700 border-4 border-grey-500 "
            disabled={userAnswer ? true : false}
            value={answer}
            onClick={callback}
          >
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </button>
      ))}
    </div>
  </>
);

export default QuestionCard;
