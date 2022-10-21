import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({
  questions,
  removeFromList,
  updateAnswer
}) {



  const display = questions.map(quest=>{
      return <QuestionItem key={quest.id} question={quest} onDelete={removeFromList} onUpdate={updateAnswer}/>
  });

  return (             
    <section>
      <h1>Quiz Questions</h1>
      <ul>{display}</ul>
    </section>
  );
}

export default QuestionList;
