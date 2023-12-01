import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import {db} from '../db.js';
import { useEffect } from 'react';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Link from '../src/components/Link';
import Formulario from '../src/components/Formulario';
import IntroQuiz from '../src/components/IntroQuiz';

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  const [showIntro, setShowIntro] = React.useState(true); // Novo estado para controlar a exibição da introdução

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 1700); // Aguarda 1.7 segundos antes de esconder a introdução

    return () => clearTimeout(timer); // Limpeza do timer
  }, []); // Array vazio significa que este efeito roda apenas uma vez após o render inicial

  // Seu código existente para exibir o formulário
  // ...

  if (showIntro) {
    return (
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <h1>Bem-vindo ao Quiz de Death Note!</h1>
          <p>Aguarde, preparando tudo para você...</p>
          {/* Pode colocar alguma animação ou ícone de carregamento aqui */}
        </QuizContainer>
      </QuizBackground>
    );
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>Death Note</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Informe seu nome</p>
            <Formulario onSubmit={(event) => {
              event.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}
            >
              <Input
                onChange={(event) => {
                  setName(event.target.value);
                }}
                placeholder="(prometo não escrever no Death Note)"
                value={name}
                name="nomeDoUsuario"
              />
              <p>
                {`${name} Vamos Jogar?`}
              </p>
              <Button type="submit" disabled={name.length === 0}>
                {`Iniciar`}
              </Button>
            </Formulario>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Quizes da Galera</h1>
            <ul>
              {db.external.map((link) => {
                const [repName, gitHubUser] = link
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');
                return (
                  <li key={link}>
                    <Widget.Topic
                      as={Link}
                      href={`/quiz/${repName}___${gitHubUser}`}
                    >
                      {`${gitHubUser}/${repName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.footer}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/HugoPoletto34/Death-Note-Quiz" />
    </QuizBackground>
  );
}
