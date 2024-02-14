import React, { useState } from "react";
import Faq from "react-faq-component";


const data = {
    title: "Preguntas Frecuentes",
    rows: [
        {
            title: "¿Cómo creo una cuenta?",
            content:
                "Para crear una cuenta, ve a la página de registro y sigue los pasos que se indican. Deberás proporcionar tu dirección de correo electrónico y crear una contraseña segura.",
        },
        {
            title: "¿Cómo puedo cambiar mi contraseña?",
            content:
                "Para cambiar tu contraseña, ve a la sección de Olvidaste tu contraseña, indica el correo electronico y le indicara en su correo electronico los pasos para cambiar su contraseña.",
        },
        {
            title: "¿Cómo puedo contactar al equipo de soporte?",
            content:
                "Puedes enviar un correo electrónico al equipo de soporte a infotpm3@gmail.com.",
        },
    ],
};

const HelpSection = () => {
    const [selected, setSelected] = useState("");

    const handleSelected = (id) => {
        setSelected(id);
    };

    return (
        <div className="help-container">
            <Faq data={data} onTitleClick={handleSelected} active={selected} />
        </div>
    );
};


export { HelpSection };