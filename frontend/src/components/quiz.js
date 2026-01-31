
//test 4 with session starts
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './quiz.css';

const questions = [
  {
    question: 'Which country won the ICC Cricket World Cup in 2019?',
    options: ['India', 'Australia', 'England', 'New Zealand'],
    correctAnswer: 'England',
  },
  {
    question: 'Who is known as the "God of Cricket"?',
    options: ['Sachin Tendulkar', 'Virat Kohli', 'Ricky Ponting', 'Brian Lara'],
    correctAnswer: 'Sachin Tendulkar',
  },
  {
    question: 'What is the highest individual score by a batsman in Test cricket?',
    options: ['375', '400', '401', '502*'],
    correctAnswer: '400',
  },
  // Additional cricket-related questions
  {
    question: 'In which year did the first-ever cricket Test match take place?',
    options: ['1877', '1900', '1923', '1945'],
    correctAnswer: '1877',
  },
  {
    question: 'Who holds the record for the fastest century in One Day Internationals (ODIs)?',
    options: ['AB de Villiers', 'Shahid Afridi', 'Chris Gayle', 'Virender Sehwag'],
    correctAnswer: 'AB de Villiers',
  },
  // Add more questions as needed
];

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [clickedOption, setClickedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(5); // Initial time in seconds
  const [userEmail, setUserEmail] = useState('');
  const [quizTaken, setQuizTaken] = useState(false);

  useEffect(() => {
    const userEmail = sessionStorage.getItem('userEmail');
    setUserEmail(userEmail);
    const lastQuizTakenTime = sessionStorage.getItem('lastQuizTakenTime');
    if (lastQuizTakenTime) {
      const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
      const lastQuizTakenDate = new Date(parseInt(lastQuizTakenTime));
      const currentDate = new Date();
      if (currentDate - lastQuizTakenDate < oneDayInMilliseconds) {
        setQuizTaken(true);
      }
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(prevIndex => prevIndex + 1);
          setClickedOption(null); // Reset clicked option for new question
          setTimeLeft(5); // Reset timer for new question
        } else {
          setShowScore(true);
          clearInterval(timer);

          // Send score to backend API
          const scoreData = {
            email: userEmail,
            score: score,
            totalQuestions: questions.length,
          };

          axios.post('http://localhost:4000/score', scoreData)
            .then(response => {
              console.log('Score sent successfully:', response.data);
            })
            .catch(error => {
              console.error('Error sending score:', error);
            });

          // Mark the quiz as taken for the day
          sessionStorage.setItem('lastQuizTakenTime', Date.now().toString());
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, timeLeft, score, userEmail]);

  const handleAnswerClick = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
    setClickedOption(selectedAnswer);
  };

  return (
    <div>
      <div className='img2'>Quiz Time!</div>
    <div className='quizmega'>
      
      <div className='imagebg'></div>
    <div className="quiz-container">
      {quizTaken ? (
        <div>
          <h2>You have already taken the quiz today.</h2>
        </div>
      ) : (
        !showScore ? (
          <>
           {/* <h2 style={{ textAlign: 'center', color: 'black', fontFamily: 'Arial, sans-serif', fontSize: '30px', fontWeight: 'bold', marginTop: '20px' }}>
      Quiz Section! Answer and Earn Points
    </h2> */}
            <h3 style={{marginBottom:"-35px",textAlign:"center"}}>Question {currentQuestionIndex + 1}</h3>
            <div className="timer-container">
              <div className={`timer ${timeLeft <= 2 && 'running'}`}>{timeLeft}</div>
            </div>
            <h4 style={{marginBottom:"0px"}}>{questions[currentQuestionIndex].question}</h4>
            <div className="options-container">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(option)}
                  className={clickedOption === option ? 'selected-option' : ''}
                  disabled={clickedOption !== null}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="score-container">
            <h2>For Final Score:</h2>
            <p>Checkout the leaderbaord and win exciting gifts!</p>
          </div>
        )
      )}
    </div>
    </div>
    </div>
  );
};

export default Quiz;

