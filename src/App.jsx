import React from "react";
import Quiz from "./Components/Quiz/Quiz";
import Score from "./Components/Screen/Score";
import Start from "./Components/Screen/Start";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Start/>} />
          <Route path="/quiz" element={<Quiz/>} />
          <Route path="/score" element={<Score/>} />
        </Routes>
    </div>
  );
};

export default App;
