import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
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
  Input,
} from "reactstrap";
import {
  FaRegHeart,
  FaHeart,
  FaRegCommentDots,
  FaEyeSlash,
} from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import { useDataContext } from "../Context/dataContext";
import guajiraMap from "../Assets/Images/Guajira.png";
import veritasMap from "../Assets/Images/Veritas.png";
import milagroMap from "../Assets/Images/Milagro.png";
import galeriaMap from "../Assets/Images/Galeria.png";
import cincoJulioMap from "../Assets/Images/CincoJulio.png";
import bellaVistaMap from "../Assets/Images/BellaVista.png";

function Lines() {
  const history = useHistory();
  const { url, accessToken } = useDataContext();
  const [likes, setLikes] = useState({});
  const [visibility, setVisibility] = useState(false);
  const [modal, setModal] = useState(false);
  const [lineList, setListLine] = useState([]);
  const [user, setUser] = useState([]);
  const [verifyLike, setVerifyLike] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [com_comment, setCom_comment] = useState("");
  const [selectedLineId, setSelectedLineId] = useState(null);

  const [modal1, setModal1] = useState(false);

  //Funcion para el chqueo u muestra de mapas en los modales

  const imgMapLine = (imgLine) => {
    if (imgLine === "Guajira") {
      return <img src={guajiraMap} alt="guajiraMap" style={{width:'100%'}}/>;
    }
    if (imgLine === "Veritas") {
      return <img src={veritasMap} alt="veritaaMap" style={{width:'100%'}} />;
    }
    if (imgLine === "Milagro") {
      return <img src={milagroMap} alt="milagroMap" style={{width:'90%', marginLeft:'10px'}}/>;
    }
    if (imgLine === "Galeria") {
      return <img src={galeriaMap} alt="galeriaMap" style={{width:'100%'}}/>;
    }
    if (imgLine === "Cinco de Julio") {
      return <img src={cincoJulioMap} alt="CincoJulio" style={{width:'100%'}}/>;
    }
    if (imgLine === "Bella Vista") {
      return <img src={bellaVistaMap} alt="BellaVista" style={{width:'100%'}}/>;
    }
  };

  const handleShow = (name) => {
    setModal1(true);
    setSelectedName(name);
  };

  console.log(selectedName);

  const handleClose = () => {
    setModal1(false);
  };

  const toggle = () => setModal(!modal);

  const fetchDataUser = useCallback(async () => {
    try {
      const response = await axios.get(
        `${url}/Auth/findByToken/${accessToken.access_token}`
      );
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [accessToken, url]);

  const fetchVerifyLike = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/userline`);
      setVerifyLike(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [url]);

  const handleVisibility = () => {
    setVisibility(!visibility);
  };

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
    fetchDataUser();
    fetchVerifyLike();
  }, [fetchData, fetchDataUser, fetchVerifyLike]);

  const handleSubmit = async () => {
    try {
      await axios.post(`${url}/comment/create`, {
        com_comment,
        com_idUser: user.usu_id,
        com_idLine: selectedLineId,
      });

      setCom_comment("");
      setSelectedLineId(null); // reset the selected line ID
      toggle();
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleLike = async (userId, lineId) => {
    const userLiked =
      verifyLike &&
      verifyLike.find(
        (like) => like.user.usu_id === userId && like.line.lin_id === lineId
      );

    try {
      if (userLiked) {
        await axios.delete(`${url}/userline/deletebyids/${userId}/${lineId}`);
        setLikes({ ...likes, [lineId]: false });
      } else {
        await axios.post(`${url}/userline/create`, { userId, lineId });
        setLikes({ ...likes, [lineId]: true });
      }

      // Fetch the likes again after the request is complete
      fetchVerifyLike();
    } catch (error) {
      history.push({
        pathname: "/Account",
      });
    }
  };

  // function handleLike(lineId) {
  //   console.log(lineId)

  //   const userLiked = verifyLike && verifyLike.find(like => like.user.usu_id === user.usu_id && like.line.lin_id === lineId);

  //   setLikes({
  //     ...likes,
  //     [lineId]: !userLiked
  //   });

  //   if (!userLiked) {
  //     handleSubmitLike(user.usu_id, lineId);
  //   } else {
  //     handleDeleteLike(user.usu_id, lineId);
  //   }
  // }

  // const handleSubmitLike = async (userId, lineId) => {
  //   try {
  //     await axios.post(
  //       `${url}/userline/create`,
  //       {
  //         userId: userId,
  //         lineId: lineId
  //       }
  //     );

  //     // Update the likes state after the request is complete
  //     setLikes({
  //       ...likes,
  //       [lineId]: true
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleDeleteLike = async (userId, lineId) => {
  //   try {
  //     await axios.delete(
  //       `${url}/userline/deletebyids/${userId}/${lineId}`
  //     );

  //     // Update the likes state after the request is complete
  //     setLikes({
  //       ...likes,
  //       [lineId]: false
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <Container fluid className="content">
      <Row>
        {lineList.map((line, index) => (
          <Col className="col" key={line.lin_id}>
            <Card className="cardLine">
              <CardHeader className="card-head">Linea: {index + 1}</CardHeader>
              <CardBody className="card-body">
                <CardTitle
                  className="card-tittle"
                  onClick={() => handleShow(line.lin_name)}
                >
                  {line.lin_name}
                </CardTitle>

                <Modal isOpen={modal1} className="mt-5" centered toggle={handleClose} >
                  <ModalHeader toggle={handleClose}>
                    Visualización {selectedName}
                  </ModalHeader>
                  <ModalBody style={{margin: '0 auto', width: '80%'}}>
                    {imgMapLine(selectedName)}
                  </ModalBody>
                </Modal>

                {/* <NonStrictModal
                  className="mt-5"
                  isOpen={show}
                  toggle={handleClose}
                >
                  <ModalHeader toggle={handleClose}>
                    Visualización {selectedName}
                  </ModalHeader>
                  <ModalBody>{imgMapLine(selectedName)}</ModalBody>
                </NonStrictModal> */}

                <div className="lineButtons">
                  <Button className="btn" type="button">
                    {visibility ? (
                      <FaEyeSlash className="icon" onClick={handleVisibility} />
                    ) : (
                      <IoEyeSharp className="icon" onClick={handleVisibility} />
                    )}
                  </Button>
                  <Button className="btn" type="button">
                    {likes[line.lin_id] ? (
                      <FaHeart
                        className="icon"
                        onClick={() =>
                          handleToggleLike(user.usu_id, line.lin_id)
                        }
                      />
                    ) : (
                      <FaRegHeart
                        className="icon"
                        onClick={() =>
                          handleToggleLike(user.usu_id, line.lin_id)
                        }
                      />
                    )}
                  </Button>
                  <Button
                    className="btn"
                    type="button"
                    onClick={() => {
                      toggle();
                      setSelectedLineId(line.lin_id);
                    }}
                  >
                    <FaRegCommentDots className="icon" />
                  </Button>
                  <div className="Modal-comment">
                    <Modal isOpen={modal} centered toggle={toggle}>
                      <ModalHeader toggle={toggle}>Comenta la Ruta</ModalHeader>
                      <ModalBody>
                        <Input
                          type="textarea"
                          name="text"
                          id="exampleText"
                          value={com_comment}
                          onChange={(e) => setCom_comment(e.target.value)}
                          placeholder="Realiza algún comentario que desees agregar acerca de esta ruta"
                          rows={5}
                        />
                      </ModalBody>
                      <ModalFooter>
                        <Button color="primary" onClick={handleSubmit}>
                          Enviar Comentario
                        </Button>{" "}
                        <Button color="secondary" onClick={toggle}>
                          Cancelar
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                </div>
              </CardBody>
              <CardFooter className="card-footer">
                <div className="Horario">Horario: 7am - 8pm</div>
                <div className="Pasaje">Pasaje: {line.lin_price}Bs.</div>
              </CardFooter>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export { Lines };
