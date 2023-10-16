import Footer from "../src/components/Footer";
import Formulario from '../src/components/Formulario';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Render Footer", () => {
  it("Verificar se o footer personalizado tem a tag footer", () => {
    render(<Footer />);
    const elemento = screen.getByText((content, element) => {
      return element.tagName.toLowerCase() === "footer";
    });
    expect(elemento).toBeInTheDocument();
  });
});

