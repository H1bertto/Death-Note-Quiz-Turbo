/* eslint-disable react/prop-types */
import React from 'react';
import { db } from '../../db.js';
import Widget from '../../src/components/Widget';
import QuizLogo from '../../src/components/QuizLogo';
import QuizBackground from '../../src/components/QuizBackground';
import QuizContainer from '../../src/components/QuizContainer';
import Button from '../../src/components/Button';
import LoadingWidget from '../../src/components/LoadingWidget';
import BackLinkArrow from '../../src/components/BackLinkArrow';
import { useRouter } from 'next/router';

function ResultWidget({ difficulty, totalQuestions, userWrongQuestions }) {
  const media = ((totalQuestions.length - userWrongQuestions.questions.length) / totalQuestions.length) * 100;
  const router = useRouter();
  const { name } = router.query;

  React.useEffect(() => {
      setTimeout(() => {
        if (!localStorage.getItem('userScore-' + difficulty)) {
          localStorage.setItem('userScore-' + difficulty, `{
            "name": "${name}",
            "media": ${media}
          }`);
        } else {
          const userScore = JSON.parse(localStorage.getItem('userScore-' + difficulty));
          if (userScore.media < media) {
            localStorage.setItem('userScore-' + difficulty, `{
              "name": "${name}",
              "media": ${media}
            }`);
          }
        }
      }, 5 * 1000);
    }
  );

  return (
    <>
      <Widget>
        <Widget.Header>
          <BackLinkArrow href="/" />
          <h3>
            {`${name}, sua média foi de ${Math.round(media)}% de acerto!`}
          </h3>
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

          <p>{`Qtde. de perguntas: ${totalQuestions.length}`}</p>
          <p>{`Acertos: ${totalQuestions.length - userWrongQuestions.questions.length}`}</p>
          <p>{`Erros: ${userWrongQuestions.questions.length}`}</p>

        </Widget.Content>
      </Widget>
      {userWrongQuestions.questions.map((question) => (
        <UserErrors
          question={question}
        />
      ))}

    </>
  );
}

function SelectDifficulty({ difficulty, setDifficulty, handleSubmit }) {


  function resultadoUser(difficultylabel) {
    const resultado = localStorage.getItem('userScore-' + difficultylabel);
    if (resultado) {
      console.log(resultado)
      const userScore = JSON.parse(resultado);
      if (userScore) {
        return `- (${userScore.media}%)`;
      }
    }

  }
  

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          Selecione a dificuldade
        </h3>
      </Widget.Header>

      <Widget.Content>
        <form onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
        >
          <Widget.Topic
            as="label"
            htmlFor="FACIL"
          >
            <input
              style={{ display: 'none' }}
              type="radio"
              id="FACIL"
              name="difficulty"
              value="FACIL"
              onChange={() => setDifficulty(selectDifficult.FACIL)}
            />
            {selectDifficult.FACIL} {resultadoUser(selectDifficult.FACIL)}
          </Widget.Topic>
          <Widget.Topic
            as="label"
            htmlFor="MEDIO"
          >
            <input
              style={{ display: 'none' }}
              type="radio"
              id="MEDIO"
              name="difficulty"
              value="MEDIO"
              onChange={() => setDifficulty(selectDifficult.MEDIO)}
            />
            {selectDifficult.MEDIO}
          </Widget.Topic>
          <Widget.Topic
            as="label"
            htmlFor="DIFICIL"
          >
            <input
              style={{ display: 'none' }}
              type="radio"
              id="DIFICIL"
              name="difficulty"
              value="DIFICIL"
              onChange={() => setDifficulty(selectDifficult.DIFICIL)}
            />
            {selectDifficult.DIFICIL}
          </Widget.Topic>
          {difficulty && <Button type="submit" disabled={!difficulty}>
          {difficulty && `Iniciar no modo ${difficulty}`}
          </Button>}
        </form>
      </Widget.Content>
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
  SELECT_DIFFICULTY: 'SELECT_DIFFICULTY',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

const selectDifficult = {
  FACIL: 'Fácil',
  MEDIO: 'Médio',
  DIFICIL: 'Difícil',
};


// eslint-disable-next-line object-curly-newline
function QuestionWidget({ question, questionIndex, totalQuestions, onSubmit, setUserScore }) {
  console.log(question)
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
          setSelectedAlternative(undefined);
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
                style={{ backgroundColor: selectedAlternative === index ? '#4CAF50' : '' }}
              >
                <input
                  style={{ display: 'none'}}
                  type="radio"
                  id={alternativeId}
                  name={questionId}
                  onChange={() => {
                    setSelectedAlternative(index);                    

                  }}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
        </form>
      </Widget.Content>
    </Widget>
  );
}

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const [difficulty, setDifficulty] = React.useState();

  const [userWrongQuestions] = React.useState({
    questions: [],
  });

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.SELECT_DIFFICULTY);
    }, 1 * 1000);
  }, []);

  function setUserScore(isCorrect, selectedAlternative) {
    const question = db.questions.filter((question) => question.dificuldade == difficulty)[questionIndex];
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
    setScreenState(screenStates.QUIZ);
    const totalQuestions = db.questions.filter((question) => question.dificuldade == difficulty).length;
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(questionIndex + 1);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  function handleSelectDifficulty() {
    setScreenState(screenStates.LOADING);
    setScreenState(screenStates.QUIZ);
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />

        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={db.questions.filter((question) => question.dificuldade == difficulty)[questionIndex]}
            questionIndex={questionIndex}
            totalQuestions={db.questions.filter((question) => question.dificuldade == difficulty).length}
            onSubmit={handleSubmit}
            setUserScore={setUserScore}
          />
        )}
        {screenState === screenStates.RESULT
          && (
            <ResultWidget
              difficulty={difficulty}
              totalQuestions={db.questions.filter((question) => question.dificuldade == difficulty)}
              userWrongQuestions={userWrongQuestions}
            />
          )}
        {screenState === screenStates.SELECT_DIFFICULTY
          && (
            <SelectDifficulty
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              handleSubmit={handleSelectDifficulty}
            />
          )}
      </QuizContainer>
    </QuizBackground>
  );
}
