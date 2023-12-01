import React, { useState } from 'react';

const IntroQuiz = ({ onContinue }) => {
  const [name, setName] = useState('');

  return (
    <div>
      <h1>Bem-vindo ao Quiz de Death Note!</h1>
      <p>
        Neste quiz, você será desafiado com perguntas sobre o anime Death Note.
        Insira seu nome para começar!
      </p>
      <input
        type="text"
        placeholder="Digite seu nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => onContinue(name)} disabled={!name}>
        Começar
      </button>
    </div>
  );
};

export default IntroQuiz;
