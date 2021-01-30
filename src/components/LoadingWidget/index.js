import React from 'react';
import Lottie from 'react-lottie';
import animationData from './loading.json';
import Widget from '../Widget';

export default function LoadingWidget() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    renderSetting: {
      preserveRatio: 'xMidYMid sclice',
    },
  };

  return (
    <div className="loadingAnimation">
      <Widget>
        <Widget.Header>
          Carregando...
        </Widget.Header>
        <Lottie
          options={defaultOptions}
          height="100%"
          width="100%"
        />
      </Widget>
    </div>
  );
}
