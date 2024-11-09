import { useState, useEffect } from "react";
import useCardState from "../data/hooks/useCardState";
import "../styles/Card.css";

export default function Card({ titulo, fields }) {

  const {
    step,
    setStep,
    direction,
    setDirection,
    formData,
    errors,
    setFormData,
    handleChange,
    handleNext,
    handlePrev,
    handleSubmit,
    handleKeyDown,  
    currentField,
    progress,
    totalSteps
  } = useCardState(fields, titulo); // Pass fields to the hook


// ALl of this is animation code
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const [boxAnimationClass, setBoxAnimationClass] = useState("");

  useEffect(() => {
    // Remove a classe de animação após o término
    if (animationClass) {
      const timer = setTimeout(() => {
        setAnimationClass("");
      }, 500); // Tempo deve coincidir com a duração da animação CSS
      return () => clearTimeout(timer);
    }
  }, [animationClass]);
  useEffect(() => {
    if (boxAnimationClass) {
      const timer = setTimeout(() => {
        setBoxAnimationClass("");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [boxAnimationClass]);
const handleNextWithAnimation = () => {
  setAnimationClass("animate-next-exit"); // Animação de saída do campo atual
  setBoxAnimationClass("animate-box-exit"); // Animação de saída da box

  // Aguarda a animação de saída terminar antes de avançar
  setTimeout(() => {
    handleNext(); // Avança para o próximo campo
    setAnimationClass("animate-next-enter"); // Animação de entrada do próximo campo
    setBoxAnimationClass("animate-box-enter"); // Animação de entrada da box
  }, 500); // Duração da animação de saída (deve ser igual à animação CSS)
};
const handleAnimatedSubmit = (event) => {
  event.preventDefault();
  setIsAnimating(true); // Ativa a animação
  setAnimationClass("animate-exit"); // Inicia a animação de saída
  setBoxAnimationClass("animate-box-exit");

  // Após o tempo da animação, envia o formulário e prepara a animação de entrada
  setTimeout(() => {
    handleSubmit(event); // Envia o formulário após a animação
    setAnimationClass("animate-enter"); // Configura a animação de entrada
    setBoxAnimationClass("animate-box-enter");

    // Desativa a animação após um tempo (duração da animação)
    setTimeout(() => setIsAnimating(false), 500);
  }, 500); // Duração da animação de saída
};
//End of animation code

return (
  <div className={`outer-box ${boxAnimationClass}`}>
    <div className={`form-container ${isAnimating ? "animate-exit" : ""}`}>
      <h1 className="form-title">{titulo}</h1>
      <form onSubmit={handleAnimatedSubmit} onKeyDown={handleKeyDown}>
        {/* Progress Bar */}
        <div className="progress-bar">
          <div
            className={`progress ${direction === "reverse" ? "reverse" : ""}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Current Field */}
        <div>
          <label>{currentField.label}</label>
          <input
            type={currentField.type || "text"}
            name={currentField.name}
            value={formData[currentField.name]}
            onChange={handleChange}
            placeholder={currentField.placeholder}
          />
          {errors[currentField.name] && (
            <span className="error-message">{errors[currentField.name]}</span>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="navigation-buttons">
          {step > 0 && (
            <button type="button" onClick={handlePrev}>
              Anterior
            </button>
          )}
          {step < totalSteps - 1 ? (
            <button type="button" onClick={handleNextWithAnimation}>
              Próximo
            </button>
          ) : (
            <button 
              type="submit"
              className={isAnimating ? "animate-submit" : ""} // A animação é aplicada apenas no botão Enviar
            >
              Enviar
            </button>
          )}
        </div>
      </form>
    </div>
  </div>
);
}