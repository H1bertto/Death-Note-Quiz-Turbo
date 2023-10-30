/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';
import axios from 'axios';
import { useRouter } from 'next/router';
import { headers } from '../../next.config';

export default function QuizDaGalera() {
  const router = useRouter();
  const [dbExterno, setDbExterno] = React.useState(null);

  if (router.query.id) {
    const [repName, gitHubUser] = router.query.id.split('___');
    load(repName, gitHubUser);
  } else {
    return <div>Carregando...</div>;
  }



  function load(repName, gitHubUser) {
    console.log(repName, gitHubUser)

    fetch(`https://${repName}.${gitHubUser}.vercel.app/api/db`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://127.0.0.1:3000',
        'Access-Control-Allow-Methods': 'GET, POST'
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setDbExterno(response);
      });
  }
  ;

  // return (
  //   <ThemeProvider theme={dbExterno.theme}>
  //     <QuizScreen
  //       externalQuestions={dbExterno.questions}
  //       externalBg={dbExterno.bg}
  //     />
  //   </ThemeProvider>
  // );
}
