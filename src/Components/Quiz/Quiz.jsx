import he from "he";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Quiz = ({ category }) => {
  const [history, setHistory] = useState([]); //store questions
  const [curQuest, setCurQuest] = useState([]); //stores the current question
  const [answers, setAnswers] = useState([]); //stores answers in array randomly
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lock, setLock] = useState(false);
  const [disabled, setDisabled] = useState(false); // Add disabled state for button
  const option = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const location = useLocation(); //acquire the info from start screen
  const navigate = useNavigate();

  const checkAns = (e, ans) => {
    if (!lock) {
      setLock(true); //we answered one question

      if (curQuest.correct_answer === ans) {
        e.target.classList.add("bg-green-500");
      } else {
        e.target.classList.add("bg-red-500"); //wrong answer

        const correctIndex = answers.findIndex(
          (answer) => answer === curQuest.correct_answer
        );
        if (correctIndex !== -1 && option[correctIndex].current) {
          option[correctIndex].current.classList.add("bg-green-500");
        }
      }
      setCurQuest({ ...curQuest, userAns: ans });
    }
  };

  const nextQuestion = () => {
    if (lock && !disabled) {
      setLock(false);
      resetOptions();
      setHistory((prev) => [...prev, curQuest]);
      fetchQuestion();
      // Disable button and enable it after 5 seconds
      setDisabled(true);
      setTimeout(() => {
        setDisabled(false);
      }, 5000); // 5-second wait
    }
  };

  const resetOptions = () => {
    option.forEach((ref, index) => {
      if (ref.current) {
        console.log(`Resetting option ${index}`); // Debugging log
        ref.current.classList.remove("bg-green-500", "bg-red-500");
      }
    });
  };

  const gotoScore = () => {
    navigate("/score", { state: { history } });
  };

  const fetchQuestion = async () => {
    try {
      //fetch from url
      const { category, difficulty, type } = location.state || {
        category: "any",
        difficulty: "any",
        type: "any",
      };

      const api = `https://opentdb.com/api.php?amount=1${
        category === "any" ? "" : "&category=" + category
      }${difficulty === "any" ? "" : "&difficulty=" + difficulty}${
        type === "any" ? "" : "&type=" + type
      }`;

      console.log(api);

      const response = await fetch(api);
      const data = await response.json();

      console.log(data);

      //if we fetch data properly continue
      if (data.response_code === 0) {
        const question = data.results[0]; //data about the question
        const decodedQuestion = he.decode(question.question);
        const decodedCategory = he.decode(question.category);
        const decodedCorrectAnswer = he.decode(question.correct_answer);
        const decodedIncorrectAnswers = question.incorrect_answers.map((item) =>
          he.decode(item)
        );

        //Shuffle Answers
        const shuffledAnswers = [
          decodedCorrectAnswer,
          ...decodedIncorrectAnswers,
        ].sort(() => Math.random() - 0.5);

        setCurQuest({
          ...question,
          question: decodedQuestion,
          category: decodedCategory,
        });

        setAnswers(shuffledAnswers);
      } else if (data.response_code === 1) {
        setError(
          "Code 1: No Results Could not return results. The API doesnt have enough questions for your query. (Ex. Asking for 50 Questions in a Category that only has 20.)"
        );
        setLoading(false);
      } else if (data.response_code === 2) {
        setError(
          "Code 2: Invalid Parameter Contains an invalid parameter. Arguements passed in arent valid."
        );
        setLoading(false);
      } else if (data.response_code === 3) {
        setError("Code 3: Token Not Found Session Token does not exist.");
        setLoading(false);
      } else if (data.response_code === 4) {
        setError(
          "Code 4: Token Empty Session Token has returned all possible questions for the specified query. Resetting the Token is necessary."
        );
        setLoading(false);
      } else {
        setError(
          "Code 5: Rate Limit Too many requests have occurred. Each IP can only access the API once every 5 seconds."
        );
        setLoading(false);
      }
    } catch (err) {
      setError("An error occured while fetching the question");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 5000); // 5-second wait
  }, []);

  useEffect(() => {
    console.log("Updated questions:", history);
  }, [history]);

  useEffect(() => {
    console.log("Updated answers:", answers);
  }, [answers]);

  return (
    <div className="w-[640px] m-auto mt-[150px] bg-white text-[#262626] flex flex-col gap-5 rounded-lg px-10 py-12">
      <div className="flex justify-between">
        <h1 className="font-semibold text-3xl">{curQuest.category}</h1>
        <h1 className="font-semibold text-3xl">{history.length}</h1>
      </div>

      <hr className="h-1 border-none bg-slate-600" />
      <h2 className="font-semibold text-[27px]">{curQuest.question}</h2>

      <ul>
        {answers.map((answer, index) => (
          <li
            key={index}
            ref={option[index]}
            className="flex items-center h-[70px] pl-[15px] border border-solid border-black rounded-md mb-[20px] text-[20px] cursor-pointer"
            onClick={(e) => checkAns(e, answer)}
          >
            {answer}
          </li>
        ))}
      </ul>

      <div className="flex justify-between">
        <button
          className="w-[250px] h-[65px] bg-white text-black border border-black font-semibold font-[25px] rounded-[8px] cursor-pointer"
          onClick={gotoScore}
        >
          Exit
        </button>
        <button
          className="w-[250px] h-[65px] bg-white text-black border border-black font-semibold font-[25px] rounded-[8px] cursor-pointer"
          onClick={nextQuestion}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Quiz;
