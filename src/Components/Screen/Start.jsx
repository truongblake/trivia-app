import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Start = () => {

    const [category, setCategory] = useState("any");
    const [difficulty, setDifficulty] = useState("any");
    const [type, setType] = useState("any");

    const navigate = useNavigate();

    const handleStartQuiz = () => {
        // Pass the selected values via navigate state
        navigate('/quiz', { state: { category, difficulty, type } });
      };

  return (
    <div className='w-[640px] m-auto mt-[150px] bg-white text-[#262626] flex flex-col gap-5 rounded-lg px-10 py-12'>
        <div className='font-semibold text-5xl'>
            Trivia Application
        </div>
        <hr />
        <div className='flex justify-between'>
            <h1 className='text-2xl'>Category</h1>
            <select name="category" value={category} onChange={(e)=>(setCategory(e.target.value))}>
                <option value="any">any category</option>
                <option value="22">geography</option>
                <option value="23">history</option>
                <option value="17">science & nature</option>
            </select>
        </div>
        <hr />
        <div className='flex justify-between'>
            <h1 className='text-2xl'>Difficulty</h1>
            <select className="difficulty" value={difficulty} onChange={(e)=>(setDifficulty(e.target.value))}>
                <option value="any">any difficulty</option>
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
            </select>
        </div>
        <hr />
        <div className='flex justify-between'>
            <h1 className='text-2xl'>Type</h1> 
            <select name="type" value={type} onChange={(e)=>(setType(e.target.value))}>
                <option value="any">any type</option>
                <option value="multiple">multiple</option>
                <option value="boolean">true/false</option>
            </select>
        </div>
        <hr />
        <button className='place-self-center w-[250px] h-[65px] bg-white text-black border border-black font-semibold font-[25px] rounded-[8px]' onClick={handleStartQuiz}>Ready?</button>
    </div>
  )
}

export default Start
