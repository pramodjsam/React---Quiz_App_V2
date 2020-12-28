import React from 'react';

const Questionaire = ({data,handleAnswer,showAnswers,handleNextQuestion})=>{
	const {question,correct_answer,answers}=data;
	return(
		<div className='flex flex-col'>
			<div className='bg-white text-purple-800 p-10 rounded shadow'>
	          <h2 className='text-2xl' dangerouslySetInnerHTML={{__html:question}}/>
	        </div>
	        <div className='mt-6 grid grid-cols-2 gap-6'>
	        	{answers.map((answer,index)=>{
	        		const bgColor= showAnswers ? answer===correct_answer? "bg-green-500":"bg-red-500":"bg-white";
	        		const textColor=showAnswers? "text-white" : "text-purple-800"
	        		return (
	        			<button key={index} className={`${bgColor} ${textColor} p-4 font-semibold rounded shadow`}
	        		onClick={()=>handleAnswer(answer)} dangerouslySetInnerHTML={{__html:answer}} />
	        			)
	        	})}
	        </div>
	        {showAnswers && (
	        	<button onClick={handleNextQuestion}
	        	className='ml-auto p-4 bg-purple-700 text-white mt-6 font-semibold rounded shadow'>
		        	Next Question
		        </button>
	        )}
	        
		</div>
	)
}

export default Questionaire;