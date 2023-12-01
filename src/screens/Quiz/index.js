/* eslint-disable react/prop-types */
import React from 'react';
import Widget from '../../components/Widget';
import QuizLogo from '../../components/QuizLogo';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import Button from '../../components/Button';
import LoadingWidget from '../../components/LoadingWidget';
import BackLinkArrow from '../../components/BackLinkArrow';
import { useRouter } from 'next/router';

function ResultWidget({ totalQuestions, userWrongQuestions }) {
  const media = ((totalQuestions - userWrongQuestions.questions.length) / totalQuestions) * 100;
  return (
    <Widget>
      <Widget.Header>
        {`Sua média foi de ${media}% de acerto!`}
      </Widget.Header>

      <Widget.Content>
        {Math.floor(media) >= 0 && Math.floor(media) < 20
          && <p>Estou me segurando para não escrever seu nome no Death Note...</p>}
        {Math.floor(media) >= 20 && Math.floor(media) < 60
          && <p>Dá para melhorar, você não acha?</p>}
        {Math.floor(media) >= 60 && Math.floor(media) < 80
          && <p>Você foi bem, meus parabéns.</p>}
        {Math.floor(media) >= 80 && Math.floor(media) <= 100
          && <p>Quer se juntar a mim na construção do novo mundo?</p>}

        <p>{`Qtde. de perguntas: ${totalQuestions}`}</p>
        <p>{`Acertos: ${totalQuestions - userWrongQuestions.questions.length}`}</p>
        <p>{`Erros: ${userWrongQuestions.questions.length}`}</p>

      </Widget.Content>
      {userWrongQuestions.questions.map((question) => (
        <UserErrors
          question={question}
        />
      ))}
    </Widget>
  );
}

function UserErrors({ question }) {
  return (
    <Widget>
      <Widget.Header>
        <h3>
          {question.title}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <p>{`Você escolheu a alternativa: ${question.selectedAlternative + 1}`}</p>
        <Widget.WrongAlternative
          as="label"
        >
          <input
            style={{ display: 'none' }}
            type="radio"
          />
          {question.wrongAlternative}
        </Widget.WrongAlternative>

        <p>{`alternativa correta era: ${question.correctAlternative.iQuest + 1}`}</p>
        <Widget.CorrectAlternative
          as="label"
        >
          <input
            style={{ display: 'none' }}
            type="radio"
          />
          {question.correctAlternative.quest}
        </Widget.CorrectAlternative>

      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

// eslint-disable-next-line object-curly-newline
function QuestionWidget({ question, questionIndex, totalQuestions, onSubmit, setUserScore }) {
  const questionId = `question__${questionIndex}`;
  const [selectedAlternative, setSelectedAlternative] = React.useState();
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <form onSubmit={(event) => {
          event.preventDefault();
          setUserScore(isCorrect, selectedAlternative);
          onSubmit();
        }}
        >
          {question.alternatives.map((alternative, index) => {
            const alternativeId = `alternative_${index}`;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
              >
                <input
                  // style={{ display: 'none' }}
                  type="radio"
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(index)}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          <p>{selectedAlternative !== undefined ? `Você escolheu: ${selectedAlternative + 1}` : ''}</p>
        </form>
      </Widget.Content>
    </Widget>
  );
}

function asd() {
  
  console.log("AMOR")
}

export default function QuizPage({ externalQuestions, externalBg }) {
  const { query } = useRouter();
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];
  const totalQuestions = externalQuestions.length;

  const [userWrongQuestions] = React.useState({
    questions: [],
  });

  React.useEffect(() => {
    console.log("SADasd")
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function setUserScore(isCorrect, selectedAlternative) {
    if (!isCorrect) {
      userWrongQuestions.questions.push({
        title: question.title,
        wrongAlternative: question.alternatives[selectedAlternative],
        correctAlternative: {
          quest: question.alternatives[question.answer],
          iQuest: question.answer,
        },
        image: question.image,
        selectedAlternative,
      });
    }
  }

  function handleSubmit() {
    setScreenState(screenStates.LOADING);
    console.log(query.name)

    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
      const nextQuestion = questionIndex + 1;
      if (nextQuestion < totalQuestions) {
        setCurrentQuestion(questionIndex + 1);
      } else {
        setScreenState(screenStates.RESULT);
      }
    }, 1 * 1000);
  }
  
  return (
    <QuizBackground backgroundImage={externalBg}>
      <QuizContainer>
        <QuizLogo />

        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmit}
            setUserScore={setUserScore}
          />
        )}
        {screenState === screenStates.RESULT
          && (
            <ResultWidget
              totalQuestions={totalQuestions}
              userWrongQuestions={userWrongQuestions}
            />
          )}
      </QuizContainer>
    </QuizBackground>
  );
}
