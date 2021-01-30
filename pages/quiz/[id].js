/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGalera({ dbExterno }) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen
        externalQuestions={dbExterno.questions}
        externalBg={dbExterno.bg}
      />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [repName, gitHubUser] = context.query.id.split('___');
  try {
    const dbExterno = await fetch(`https://${repName}.${gitHubUser}.vercel.app/api/db`)
      .then((respServer) => {
        if (respServer.ok) {
          return respServer.json();
        }
        throw new Error('Falhou em pegar dados');
      })
      .then((respInObject) => respInObject);
    return {
      props: { dbExterno },
    };
  } catch (err) {
    throw new Error(err);
  }
}
