import React from "react";
import { Accordion } from '@mantine/core';
import { Button } from 'reactstrap'
import { Link } from "react-router-dom";

const VariableEditor = () => {
    return (
        <div className="editor-container">
            <Accordion defaultValue="customization">
                <Accordion.Item value="customization">
                    <Accordion.Control className="rdw-faq-title">¿Deseas ver o editar la lista de Usuarios?</Accordion.Control>
                    <Accordion.Panel className="rdw-faq-content">
                        Proporcionamos la opcion del administrador de poder visualizar o editar la lista de usuarios y sus roles dentro del sistema.
                        <br/>
                        <Link to={'/Users'} className="btns">
                            <Button type="button" className="btn btn-primary btn-block" color="success">
                                Acceder
                            </Button>
                        </Link>
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="flexibility">
                    <Accordion.Control className="rdw-faq-title">¿Deseas ver o editar la lista de Paradas?</Accordion.Control>
                    <Accordion.Panel className="rdw-faq-content">
                    Proporcionamos la opcion del administrador de poder visualizar o editar la lista de Paradas dentro del sistema.
                        <br/>
                        <Link to={'/StopsEdit'} className="btns">
                            <Button type="button" className="btn btn-primary btn-block" color="success">
                            Acceder
                            </Button>
                        </Link>
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="focus-ring">
                    <Accordion.Control className="rdw-faq-title">¿Deseas ver o editar la lista de Lineas?</Accordion.Control>
                    <Accordion.Panel className="rdw-faq-content">
                    Proporcionamos la opcion del administrador de poder visualizar o editar la lista de Lineas dentro del sistema.
                        <br/>
                        <Link to={'/LinesEdit'} className="btns">
                            <Button type="button" className="btn btn-primary btn-block" color="success">
                            Acceder
                            </Button>
                        </Link>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

export { VariableEditor };