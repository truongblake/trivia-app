import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Score = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const gotoStart = () => {
    navigate("/");
  };

  const { history } = location.state || {};
  console.log(history);

  return (
    //display history here
    <div className="w-[640px] m-auto mt-[150px] bg-white text-[#262626] flex flex-col gap-5 rounded-lg px-10 py-12">
      <h1 className="text-3xl">Score</h1>
      <hr className="h-1 border-none bg-slate-600" />
      <div>
        <ul className="max-h-[400px] overflow-y-auto">
          {history.map((item, index) => (
            <div key={index}>
              <li>
                Question{index + 1}: {item.question}
              </li>
              <li>Incorrect Answers: {item.incorrect_answers}</li>
              <li>Correct Answer: {item.correct_answer}</li>
              <li>Your Answer: {item.correct_answer}</li>
              <hr className="h-1 border-none bg-slate-600"/>
            </div>
          ))}
        </ul>
      </div>

      <button
        className="place-self-center w-[250px] h-[65px] bg-white text-black border border-black font-semibold font-[25px] rounded-[8px] cursor-pointer"
        onClick={gotoStart}
      >
        Retry?
      </button>
    </div>
  );
};

export default Score;
