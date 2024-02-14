import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input
} from 'reactstrap';
import { FaRegHeart, FaHeart, FaRegCommentDots, FaEyeSlash  } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { useDataContext } from '../Context/dataContext';

function NonStrictModal(props) {
  return (
    <Modal {...props}>
      {props.children}
    </Modal>
  );
}

function Lines() {
  const { url } = useDataContext();
  const [like, setLike] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(false);
  const [lineList, setListLine] = useState([]);
  const [selectedName, setSelectedName] = useState('');
  const [com_idUser, setCom_idUser] = useState('');
  const [com_idLine, setCom_idLine] = useState('');
  const [com_comment, setCom_comment] = useState('');

  const handleShow = (name) => {
    setShow(true);
    setSelectedName(name);
  };

  const handleClose = () => {
    setShow(false);
  };

  const toggle = () => setModal(!modal);

  const handleLike = () => {
    setLike(!like);
  }

  const handleVisibility = () => {
    setVisibility(!visibility);
  }

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/Line`);
      setListLine(response.data);

    } catch (error) {
      console.log(error);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await axios.post(
        `${url}/comment/create`,
        {
          com_comment,
          com_idUser,
          com_idLine,
        }
      );

      setCom_comment('');
      setCom_idUser('');
      setCom_idLine('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container fluid className="content">
      <Row>
        {
          lineList.map(line => (
            <Col className='col' key={line.lin_id}>
              <Card className="cardLine">
                <CardHeader className="card-head">
                  id {line.lin_id}
                </CardHeader>
                <CardBody className="card-body">

                  <CardTitle className="card-tittle" onClick={() => handleShow(line.lin_name)}>
                    {line.lin_name}
                  </CardTitle>

                  <NonStrictModal className='mt-5' isOpen={show} size='xl' centered toggle={handleClose}>
                    <ModalHeader toggle={handleClose}>Visualización {selectedName}</ModalHeader>
                    <ModalBody>
                      Contenido del modal
                    </ModalBody>
                  </NonStrictModal>

                  <div className='lineButtons'>
                    <Button className="btn" type="button">
                      {
                        visibility ? (
                          <FaEyeSlash className="icon" onClick={handleVisibility} />
                        ) : (
                          <IoEyeSharp className="icon" onClick={handleVisibility} />
                        )
                      }
                    </Button>
                    <Button className="btn" type="button">
                      {
                        like ? (
                          <FaHeart className="icon" onClick={handleLike} />
                        ) : (
                          <FaRegHeart className="icon" onClick={handleLike} />
                        )
                      }
                    </Button>
                    <Button className="btn" type="button" onClick={toggle}>
                      <FaRegCommentDots className="icon" />
                    </Button>
                    <div className='Modal-comment'>
                      <Modal isOpen={modal} centered toggle={toggle}>
                        <ModalHeader toggle={toggle}>Comenta la Ruta</ModalHeader>
                        <ModalBody>
                          <Input
                            type="textarea"
                            name="text"
                            id="exampleText"
                            value={com_comment}
                            onChange={e => setCom_comment(e.target.value)}
                            placeholder="Realiza algún comentario que desees agregar acerca de esta ruta"
                            rows={5}
                          />
                        </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={handleSubmit}>
                            Enviar Comentario
                          </Button>{' '}
                          <Button color="secondary" onClick={toggle}>
                            Cancelar
                          </Button>
                        </ModalFooter>
                      </Modal>
                    </div>
                  </div>
                </CardBody>
                <CardFooter className="card-footer">
                  <div className='Horario'>
                    Horario: 7am - 8pm
                  </div>
                  <div className='Pasaje'>
                    Pasaje: {line.lin_price}Bs.
                  </div>
                </CardFooter>
              </Card>
            </Col>
          ))
        }
      </Row>
    </Container>
  )
}

export { Lines }