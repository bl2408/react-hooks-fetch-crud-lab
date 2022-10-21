import React, { useState } from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  const [selected, setSelected] = useState(correctIndex);

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleOnClick=()=>{
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "DELETE",
      headers: {
        "Content-type": "application/json"
      },
    })
    .then(res=>res.json())
    .then(data=>{
      onDelete(id);
    });
  };

  const handleOnChange =(e)=>{
      const selectedIndex = parseInt(e.target.value);
      setSelected(sel=>selectedIndex);
      fetch(`http://localhost:4000/questions/${id}`,{
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        "correctIndex": selectedIndex
      })
    })
    .then(res=>res.json())
    .then(data=>{
      onUpdate(data);
    })
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={selected} onChange={handleOnChange}>{options}</select>
      </label>
      <button onClick={handleOnClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
