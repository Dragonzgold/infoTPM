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
import { useDataContext } from "../Context/dataContext";
import { ReactComponent as IconBus } from "../Assets/Images/bus.svg";
import { FaRegHeart, FaHeart, FaRegCommentDots } from "react-icons/fa";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Popup,
  Marker,
} from "react-leaflet";
import { IconLocation } from "../Components/IconLocation";
import { IconLocation2 } from "../Components/IconLocation2";
import { LocationTestMarker } from "../Components/LocationTestMarker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBus } from "@fortawesome/free-solid-svg-icons";
import { List } from "../Components/List";
import { useHistory } from "react-router-dom";

function NonStrictModal(props) {
  return <Modal {...props}>{props.children}</Modal>;
}

function Perfil() {
  const history = useHistory();
  // const [like, setLike] = useState(false);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [show, setShow] = useState(false);
  const toggle = () => setModal(!modal);
  const test = () => setModal1(!modal1);
  const [selectedName, setSelectedName] = useState("");
  // const [testF, setTestF] = useState([]);
  const [bus, setBus] = useState([]);
  const [user, setUser] = useState([]);
  // const [com_idUser, setCom_idUser] = useState("");
  // const [com_idLine, setCom_idLine] = useState("");
  const [com_comment, setCom_comment] = useState("");
  const { url, accessToken } = useDataContext();
  const [modal2, setModal2] = useState(false);
  const [selectedNameMap, setSelectedNameMap] = useState("");
  const [likes, setLikes] = useState({});
  const [selectedLineId, setSelectedLineId] = useState(null);
  const [verifyLike, setVerifyLike] = useState([]);
  const fetchVerifyLike = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/userline`);
      setVerifyLike(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [url]);

  const [line, setLine] = useState([]);
  const [paradas, setParadas] = useState([]);
  const positionGuajira = [10.675, -71.629];
  const positionVeritas = [10.65, -71.62];
  const positionMilagro = [10.67, -71.6];
  const positionGaleria = [10.67, -71.63];
  const positionCincoDeJulio = [10.67, -71.63];
  const positionBellaVista = [10.66, -71.61];

  const imgMapLine = (imgLine) => {
    //Mapa de la Guajira
    if (imgLine === "Guajira") {
      const limeOptions = { color: "lime" };
      return (
        <div className="MapViewGuajira">
          <MapContainer
            center={positionGuajira}
            zoom={13}
            style={{ width: "100%" }}
          >
            {paradas.map((parada) =>
              parada.Line.lin_id === 1 ? (
                <Marker
                  position={[
                    parada.par_lat,
                    parada.par_long,
                    parada.Line.lin_id,
                  ]}
                  icon={IconLocation}
                >
                  <Popup>{parada.par_name}</Popup>
                </Marker>
              ) : null
            )}
            {line.map((linea) =>
              linea.lin_id === 1 ? (
                <Marker
                  position={[linea.lin_start, linea.lin_close]}
                  icon={IconLocation2}
                >
                  <Popup>
                    {linea.lin_name}
                    <FontAwesomeIcon icon={faBus} />
                  </Popup>
                </Marker>
              ) : null
            )}
            {line.map((linea) =>
              linea.lin_id === 1 ? (
                <Marker
                  position={[linea.lin_exit_point, linea.lin_arrival_point]}
                  icon={IconLocation2}
                >
                  <Popup>
                    {linea.lin_name}
                    <FontAwesomeIcon icon={faBus} />
                  </Popup>
                </Marker>
              ) : null
            )}

            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* <LocationMarker /> */}
            <LocationTestMarker />
            <Polyline pathOptions={limeOptions} positions={List.Guajira} />
          </MapContainer>
        </div>
      );
    }
    if (imgLine === "Veritas") {
      //Mapa de Veritas
      const blueOptions = { color: "blue" };
      return (
        <div className="MapViewVerita">
          <MapContainer
            center={positionVeritas}
            zoom={14}
            style={{ width: "100%" }}
          >
            {paradas.map((parada) =>
              parada.Line.lin_id === 2 ? (
                <Marker
                  position={[
                    parada.par_lat,
                    parada.par_long,
                    parada.Line.lin_id,
                  ]}
                  icon={IconLocation}
                >
                  <Popup>{parada.par_name}</Popup>
                </Marker>
              ) : null
            )}
            {line.map((linea) =>
              linea.lin_id === 2 ? (
                <Marker
                  position={[linea.lin_start, linea.lin_close]}
                  icon={IconLocation2}
                >
                  <Popup>
                    {linea.lin_name}
                    <FontAwesomeIcon icon={faBus} />
                  </Popup>
                </Marker>
              ) : null
            )}
            {line.map((linea) =>
              linea.lin_id === 2 ? (
                <Marker
                  position={[linea.lin_exit_point, linea.lin_arrival_point]}
                  icon={IconLocation2}
                >
                  <Popup>
                    {linea.lin_name}
                    <FontAwesomeIcon icon={faBus} />
                  </Popup>
                </Marker>
              ) : null
            )}

            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* <LocationMarker /> */}
            <LocationTestMarker />
            <Polyline pathOptions={blueOptions} positions={List.Veritas} />
          </MapContainer>
        </div>
      );
    }
    if (imgLine === "Milagro") {
      //Mapa de Milagro
      const redOptions = { color: "red" };
      return (
        <div className="MapViewGuajira">
          <MapContainer
            center={positionMilagro}
            zoom={13}
            style={{ width: "100%" }}
          >
            {paradas.map((parada) =>
              parada.Line.lin_id === 3 ? (
                <Marker
                  position={[
                    parada.par_lat,
                    parada.par_long,
                    parada.Line.lin_id,
                  ]}
                  icon={IconLocation}
                >
                  <Popup>{parada.par_name}</Popup>
                </Marker>
              ) : null
            )}
            {line.map((linea) =>
              linea.lin_id === 3 ? (
                <Marker
                  position={[linea.lin_start, linea.lin_close]}
                  icon={IconLocation2}
                >
                  <Popup>
                    {linea.lin_name}
                    <FontAwesomeIcon icon={faBus} />
                  </Popup>
                </Marker>
              ) : null
            )}
            {line.map((linea) =>
              linea.lin_id === 3 ? (
                <Marker
                  position={[linea.lin_exit_point, linea.lin_arrival_point]}
                  icon={IconLocation2}
                >
                  <Popup>
                    {linea.lin_name}
                    <FontAwesomeIcon icon={faBus} />
                  </Popup>
                </Marker>
              ) : null
            )}

            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* <LocationMarker /> */}
            <LocationTestMarker />
            <Polyline pathOptions={redOptions} positions={List.Milagro} />
          </MapContainer>
        </div>
      );
    }
    if (imgLine === "Galeria") {
      //Mapa de Galeria
      const cyanOptions = { color: "cyan" };
      return (
        <div className="MapViewGuajira">
          <MapContainer
            center={positionGaleria}
            zoom={13}
            style={{ width: "100%" }}
          >
            {paradas.map((parada) =>
              parada.Line.lin_id === 4 ? (
                <Marker
                  position={[
                    parada.par_lat,
                    parada.par_long,
                    parada.Line.lin_id,
                  ]}
                  icon={IconLocation}
                >
                  <Popup>{parada.par_name}</Popup>
                </Marker>
              ) : null
            )}
            {line.map((linea) =>
              linea.lin_id === 4 ? (
                <Marker
                  position={[linea.lin_start, linea.lin_close]}
                  icon={IconLocation2}
                >
                  <Popup>
                    {linea.lin_name}
                    <FontAwesomeIcon icon={faBus} />
                  </Popup>
                </Marker>
              ) : null
            )}
            {line.map((linea) =>
              linea.lin_id === 4 ? (
                <Marker
                  position={[linea.lin_exit_point, linea.lin_arrival_point]}
                  icon={IconLocation2}
                >
                  <Popup>
                    {linea.lin_name}
                    <FontAwesomeIcon icon={faBus} />
                  </Popup>
                </Marker>
              ) : null
            )}

            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* <LocationMarker /> */}
            <LocationTestMarker />
            <Polyline pathOptions={cyanOptions} positions={List.galeria} />
          </MapContainer>
        </div>
      );
    }
    if (imgLine === "Cinco de Julio") {
      //Mapa de cinco de Julio
      const greenOptions = { color: "green" };
      return (
        <div className="MapViewGuajira">
          <MapContainer
            center={positionCincoDeJulio}
            zoom={13}
            style={{ width: "100%" }}
          >
            {paradas.map((parada) =>
              parada.Line.lin_id === 8 ? (
                <Marker
                  position={[
                    parada.par_lat,
                    parada.par_long,
                    parada.Line.lin_id,
                  ]}
                  icon={IconLocation}
                >
                  <Popup>{parada.par_name}</Popup>
                </Marker>
              ) : null
            )}
            {line.map((linea) =>
              linea.lin_id === 8 ? (
                <Marker
                  position={[linea.lin_start, linea.lin_close]}
                  icon={IconLocation2}
                >
                  <Popup>
                    {linea.lin_name}
                    <FontAwesomeIcon icon={faBus} />
                  </Popup>
                </Marker>
              ) : null
            )}
            {line.map((linea) =>
              linea.lin_id === 8 ? (
                <Marker
                  position={[linea.lin_exit_point, linea.lin_arrival_point]}
                  icon={IconLocation2}
                >
                  <Popup>
                    {linea.lin_name}
                    <FontAwesomeIcon icon={faBus} />
                  </Popup>
                </Marker>
              ) : null
            )}

            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* <LocationMarker /> */}
            <LocationTestMarker />
            <Polyline pathOptions={greenOptions} positions={List.julio5} />
          </MapContainer>
        </div>
      );
    }
    if (imgLine === "Bella Vista") {
      //Mapa de bella Vista
      const yellowOptions = { color: "yellow" };
      return (
        <div className="MapViewGuajira">
          <MapContainer
            center={positionBellaVista}
            zoom={14}
            style={{ width: "100%" }}
          >
            {paradas.map((parada) =>
              parada.Line.lin_id === 9 ? (
                <Marker
                  position={[
                    parada.par_lat,
                    parada.par_long,
                    parada.Line.lin_id,
                  ]}
                  icon={IconLocation}
                >
                  <Popup>{parada.par_name}</Popup>
                </Marker>
              ) : null
            )}
            {line.map((linea) =>
              linea.lin_id === 9 ? (
                <Marker
                  position={[linea.lin_start, linea.lin_close]}
                  icon={IconLocation2}
                >
                  <Popup>
                    {linea.lin_name}
                    <FontAwesomeIcon icon={faBus} />
                  </Popup>
                </Marker>
              ) : null
            )}
            {line.map((linea) =>
              linea.lin_id === 9 ? (
                <Marker
                  position={[linea.lin_exit_point, linea.lin_arrival_point]}
                  icon={IconLocation2}
                >
                  <Popup>
                    {linea.lin_name}
                    <FontAwesomeIcon icon={faBus} />
                  </Popup>
                </Marker>
              ) : null
            )}

            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* <LocationMarker /> */}
            <LocationTestMarker />
            <Polyline pathOptions={yellowOptions} positions={List.sinNombre} />
          </MapContainer>
        </div>
      );
    }
  };

  const handleShow = (name) => {
    setShow(true);
    setSelectedName(name);
  };

  const handleClose = () => {
    setShow(false);
    setModal2(false);
  };

  const handleActive = (buses) => {
    try {
      if (buses.bus_status === "active") {
        axios.put(`${url}/bus/${buses.bus_id}`, {
          bus_status: "desactive",
        });
        fetchBus();
      } else {
        axios.put(`${url}/bus/${buses.bus_id}`, {
          bus_status: "active",
        });
        fetchBus();
      }
    } catch (error) { }
  };

  const modalMap = (lin) => {
    setModal2(true);
    setSelectedNameMap(lin);
  };

  const fetchTest = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/userline`);
      setVerifyLike(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [url]);

  const fetchBus = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/bus`);
      setBus(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [url]);

  const fetchDataUser = useCallback(async () => {
    try {
      const response = await axios.get(
        `${url}/Auth/findByToken/${accessToken.access_token}`
      );
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [setUser, accessToken, url]);

  const fetchStops = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/Stops`);
      setParadas(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [url]);

  const fetchLine = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/line`);
      setLine(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [url]);

  useEffect(() => {
    fetchDataUser();
    fetchTest();
    fetchBus();
    fetchStops();
    fetchLine();
  }, [fetchDataUser, fetchTest, fetchBus, fetchStops, fetchLine]);

  const handleSubmit = async () => {
    try {
      await axios.post(`${url}/comment/create`, {
        com_comment,
        com_idUser: user.usu_id,
        com_idLine: selectedLineId.lin_id,
      });

      setCom_comment("");
      console.log(selectedLineId)
      setSelectedLineId(null); // reset the selected line ID
      toggle();
    } catch (error) {
      history.push({
        pathname: "/Account",
      });
    }
  };

  const handleToggleLike = async (userId, lineId) => {
    const userLiked =
      verifyLike &&
      verifyLike.find(
        (like) => like.user.usu_id === userId && like.line.lin_id === lineId
      );
    try {
      console.log(userLiked)
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

  return (
    <div>
      <div className="prueba">
        <div className="circuloFace"></div>
        <div className="circuloBody"></div>
      </div>
      <div className="containerNombre">
        <h2 className="nombreCuenta">
          {user.usu_name ? user.usu_name : ""}{" "}
          {user.usu_lastName ? user.usu_lastName : ""}
          <div className="rayaTituloP" />
        </h2>
        <p className="CorreoElectronico">
          {user.usu_email ? user.usu_email : ""}
        </p>
      </div>

      {user.usu_role === "Driver" ? (
        <Button className="btnTest" onClick={test}>
          <IconBus className="iconBusTest" />
          <div className="Modal-comment">
            <Modal isOpen={modal1} centered toggle={test}>
              <ModalHeader toggle={test}>Ruta/s</ModalHeader>
              <ModalBody>
                Numero de placa:{" "}
                {bus.map((buses) =>
                  user.usu_id === buses.user.usu_id ? buses.bus_plate : null
                )}
                <br />
                <br />
                Lineas:{" "}
                {bus.map((buses) =>
                  user.usu_id === buses.user.usu_id ? buses.Line.lin_name : null
                )}{" "}
                <Button
                  color="primary"
                  onClick={() =>
                    bus.map((buses) =>
                      user.usu_id === buses.user.usu_id
                        ? modalMap(buses.Line.lin_name)
                        : null
                    )
                  }
                >
                  Ver linea
                </Button>
                <br />
                <br />
                Estado:
                {bus.map((buses) =>
                  user.usu_id === buses.user.usu_id ? (
                    <Button onClick={() => handleActive(buses)} color={buses.bus_status === 'active' ? 'success' : 'danger'}>{buses.bus_status === 'active' ? 'Activo' : 'Inactivo'}</Button>
                  ) : null
                )}
                <Modal
                  isOpen={modal2}
                  className="mt-5"
                  centered
                  toggle={handleClose}
                >
                  <ModalHeader toggle={handleClose}>
                    Visualización {selectedNameMap}
                  </ModalHeader>
                  <ModalBody style={{ margin: "0 auto", width: "80%" }}>
                    {imgMapLine(selectedNameMap)}
                  </ModalBody>
                </Modal>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={test}>
                  Salir
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </Button>
      ) : null}

      <div className="containerBody">
        <h3 className="titleRutasF">
          Rutas Favoritas
          <div className="rayaTituloP" />
        </h3>

        <Container fluid className="contentP">
          <Row>
            {verifyLike.map((prueba, index) =>
              prueba.user.usu_id === user.usu_id ? (
                <Col className="col">
                  <Card className="cardLine">
                    <CardHeader className="card-head"># {index}</CardHeader>
                    <CardBody className="card-body">
                      <CardTitle
                        className="card-tittle"
                        onClick={() => handleShow()}
                      >
                        {prueba.line.lin_name}
                      </CardTitle>

                      <NonStrictModal
                        className="mt-5"
                        isOpen={show}
                        size="xl"
                        centered
                        toggle={handleClose}
                      >
                        <ModalHeader toggle={handleClose}>
                          Visualización {selectedName}
                        </ModalHeader>
                        <ModalBody>Contenido del modal</ModalBody>
                      </NonStrictModal>

                      <div className="lineButtons">
                        <Button className="btn" type="button">
                          {likes[prueba.line.lin_id] ? (
                            <FaHeart
                              className="icon"
                              onClick={() =>
                                handleToggleLike(user.usu_id, prueba.line.lin_id)
                              }
                            />
                          ) : (
                            <FaRegHeart
                              className="icon"
                              onClick={() =>
                                handleToggleLike(user.usu_id, prueba.line.lin_id)
                              }
                            />
                          )}
                        </Button>
                        <Button
                          className="btn"
                          type="button"
                          onClick={() => {
                            toggle();
                            setSelectedLineId(prueba.line);
                          }}
                        >
                          <FaRegCommentDots className="icon" />
                        </Button>
                        <div className="Modal-comment">
                          <Modal isOpen={modal} centered toggle={toggle}>
                            <ModalHeader toggle={toggle}>
                              Comenta la Ruta
                            </ModalHeader>
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
                      <div className="Pasaje">
                        Pasaje: {prueba.line.lin_price}Bs.
                      </div>
                    </CardFooter>
                  </Card>
                </Col>
              ) : null
            )}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export { Perfil };
