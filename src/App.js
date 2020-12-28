import React,{useState,useEffect} from 'react';
import Questionaire from './components/Questionaire'

const API_URL='https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple'

function App() {
  const [questions,setQuestions]=useState([]);
  const [currentIndex,setCurrentIndex]=useState(0);
  const [score,setScore]=useState(0);
  // const [gameEnded,setGameEnded]=useState(false);
  const [showAnswers,setShowAnswers]=useState(false);

  useEffect(()=>{
    fetch(API_URL)
      .then((res)=>res.json())
      .then((data)=>{
        
        const questions=data.results.map((question)=>(
        {
          ...question,
          answers:[question.correct_answer,...question.incorrect_answers].sort(()=>Math.random()-0.5)
        }
        ))
        setQuestions(questions);
        setCurrentIndex(0);
      });
  },[])
console.log(questions);

  const handleAnswer=(answer)=>{    
    if(!showAnswers){
      if(answer===questions[currentIndex].correct_answer){
      setScore(score+1);
      }
    }    
    setShowAnswers(true);    
  }

  const handleNextQuestion=()=>{
    setShowAnswers(false);
    setCurrentIndex(currentIndex+1);
  }

  return (
      <div className='container'>
      {questions.length>0 ? (
        <React.Fragment>
          {currentIndex>=questions.length? (
             <div>
                <h1 className='text-3xl text-white text-bold'>Game ended! Your score is {score}</h1>
              </div>
            ):(
              <Questionaire data={questions[currentIndex]}
              showAnswers={showAnswers} 
              handleNextQuestion={handleNextQuestion}
              handleAnswer={handleAnswer} />
            )}
          
        </React.Fragment>
        ):(
          <h2 className='text-2xl text-white text-bold'>Loading...</h2>
        )}      
      </div>    
  );
}

export default App;
