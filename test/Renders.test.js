import Footer from "../src/components/Footer";
import Formulario from '../src/components/Formulario';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import db from '../db.json';
import Widget from '../src/components/Widget';
import Link from '../src/components/Link';


describe("Render Footer", () => {
  it("Verificar se o footer personalizado tem a tag footer", () => {
    render(<Footer />);
    const elemento = screen.getByText((content, element) => {
      return element.tagName.toLowerCase() === "footer";
    });
    expect(elemento).toBeInTheDocument();
  });
});

describe("Render Formulario", () => {
  it("Verificar se o input está como 'Jogar Hugo'", () => {
    const name = "Hugo";
    const { getByText } = render(
      <Formulario
        onSubmit={(event) => {
          event.preventDefault();
          router.push(`/quiz?name=${name}`);
        }}
      >
        <input
          onChange={(event) => {
            setName(event.target.value);
          }}
          placeholder="(prometo não escrever no Death Note)"
          value={name}
          name="nomeDoUsuario"
        />
        <button type="submit" disabled={name.length === 0}>
          {`Jogar ${name}`}
        </button>
      </Formulario>
    );
  
    const botao = getByText(`Jogar ${name}`);
    expect(botao).toBeInTheDocument();
  });
});
