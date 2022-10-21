import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then(res=>res.json())
    .then(data=>setQuestions(data))
  }, []);

  const addToList =(question)=>{
    setQuestions(questions => [...questions, question]);
    setPage("List");
  };

  const removeFromList=(id)=>{
    setQuestions(questions => questions.filter(quest=>quest.id !== id))
  };

  const updateAnswer =(question)=>{
    setQuestions(questions => questions.map(quest=>quest.id===question.id ? {...question} : quest));
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onFormSubmit={addToList} /> : <QuestionList questions={questions} removeFromList={removeFromList} updateAnswer={updateAnswer}/>}
    </main>
  );
}

export default App;
