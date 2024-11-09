import { useEffect, useState } from 'react';
import { AdmnistracaoFields, ImplementacaoFields, ManutencaoFields, VendasFields } from '../constants/card/fields';

const useCardState = (fields, titulo) => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState('forward');
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(
  // Inicializa formData com campos baseados em 'fields'
  fields.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {})
);


  const validateRequiredFields = () => {
    const currentField = fields[step];
    const newErrors = { ...errors};
      if(currentField.required && !formData[currentField.name]) {
        newErrors[currentField.name] = 'Este campo é obrigatório';
      }else{
        delete newErrors[currentField.name];
      }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
  };

  const handleNext = () => {
    if (validateRequiredFields()) {
      if (step < totalSteps - 1) setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (validateRequiredFields()) {
      // Construct requestData based on all formData values
      const requestData = {
        type: titulo, // Dynamically use the title
        ...formData,  // Spreads formData properties into requestData
      };
  
      try {
        const response = await fetch("http://localhost:4000/card", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(requestData)
        });
  
        if (response.ok) {
          alert("Formulário enviado com sucesso!");
        } else {
          const errorData = await response.json();
          alert(`Erro ao enviar formulário: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Erro de rede:", error);
        alert("Erro ao enviar formulário, por favor tente novamente.");
      }
    } else {
      alert("Preencha todos os campos obrigatórios");
    }
  };
  

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const totalSteps = fields.length;
  const currentField = fields[step];
  const progress = ((step + 1) / totalSteps) * 100;

  return {
    step,
    setStep,
    direction,
    setDirection,
    formData,
    setFormData,
    errors,
    handleChange,
    handleNext,
    handlePrev,
    handleSubmit,
    handleKeyDown,
    totalSteps,
    currentField,
    progress,
  };
};

export default useCardState;
