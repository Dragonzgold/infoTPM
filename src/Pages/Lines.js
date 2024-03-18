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
  Collapse,
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
import { ReactComponent as IconMaker } from "../Assets/Images/mapPrueba.svg";
import { ReactComponent as IconArrowDown } from "../Assets/Images/flechaBaja.svg";
import { ReactComponent as PointRed } from "../Assets/Images/pointRed.svg";

//Usestate

function Lines() {
  const history = useHistory();
  const { url, accessToken } = useDataContext();
  const [likes, setLikes] = useState({});
  const [visibility, setVisibility] = useState({});
  const [modal, setModal] = useState(false);
  const [lineList, setListLine] = useState([]);
  const [user, setUser] = useState([]);
  const [verifyLike, setVerifyLike] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [com_comment, setCom_comment] = useState("");
  const [selectedLineId, setSelectedLineId] = useState(null);
  const [SelectedStop, setSelectedStop] = useState(null);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [paradas, setParadas] = useState([]);
  const [line, setLine] = useState([]);
  const positionGuajira = [10.675, -71.629];
  const positionVeritas = [10.65, -71.62];
  const positionMilagro = [10.67, -71.6];
  const positionGaleria = [10.67, -71.63];
  const positionCincoDeJulio = [10.67, -71.63];
  const positionBellaVista = [10.66, -71.61];
  const [selectId, setSelectId] = useState(null);
  const [collapsed, setCollapsed] = React.useState(true);
  // const [stop, setStop] = useState(null);

  //Funcion para el chqueo y muestra de mapas en los modales
  
  const mapLine = (imgLine) => {
    //Mapa de la Guajira
    if (imgLine === "Guajira") {
      const limeOptions = { color: "lime" };
      const coordsGuajira = List.find(
        (elemento) => elemento.nombre === "Guajira"
      )?.coords;
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
            <Polyline pathOptions={limeOptions} positions={coordsGuajira} />
          </MapContainer>
        </div>
      );
    }
    if (imgLine === "Veritas") {
      //Mapa de Veritas
      const blueOptions = { color: "blue" };
      const coordsVeritas = List.find(
        (elemento) => elemento.nombre === "Veritas"
      )?.coords;
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
            <Polyline pathOptions={blueOptions} positions={coordsVeritas} />
          </MapContainer>
        </div>
      );
    }
    if (imgLine === "Milagro") {
      //Mapa de Milagro
      const redOptions = { color: "red" };
      const coordsMilagro = List.find(
        (elemento) => elemento.nombre === "Milagro"
      )?.coords;
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
            <Polyline pathOptions={redOptions} positions={coordsMilagro} />
          </MapContainer>
        </div>
      );
    }
    if (imgLine === "Galeria") {
      //Mapa de Galeria
      const cyanOptions = { color: "cyan" };
      const coordsGaleria = List.find(
        (elemento) => elemento.nombre === "Galeria"
      )?.coords;
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
            <Polyline pathOptions={cyanOptions} positions={coordsGaleria} />
          </MapContainer>
        </div>
      );
    }
    if (imgLine === "Cinco de Julio") {
      //Mapa de cinco de Julio
      const greenOptions = { color: "green" };
      const coordsCincoJulio = List.find(
        (elemento) => elemento.nombre === "Cinco de Julio"
      )?.coords;
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
            <Polyline pathOptions={greenOptions} positions={coordsCincoJulio} />
          </MapContainer>
        </div>
      );
    }
    if (imgLine === "Bella Vista") {
      //Mapa de bella Vista
      const yellowOptions = { color: "yellow" };
      const coordsBellaVista = List.find(
        (elemento) => elemento.nombre === "Bella Vista"
      )?.coords;
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
            <Polyline
              pathOptions={yellowOptions}
              positions={coordsBellaVista}
            />
          </MapContainer>
        </div>
      );
    }
  };

  const handleShow = (name) => {
    setModal1(true);
    setSelectedName(name);
  };

  const toggle = () => setModal(!modal);

  const handleShowStop = (stop) => {
    setModal2(true);
    setSelectedStop(stop);
  };

  //Cerrar los modales
  const handleClose = () => {
    setModal1(false);
  };

  const handleCloseStop = () => {
    setModal2(false);
  };

  //Token para el aceso
  const fetchDataUser = useCallback(async () => {
    try {
      const response = await axios.get(
        `${url}/Auth/findByToken/${accessToken.access_token}`
      );
      setUser(response.data);
    } catch (error) {
      console.log("unlogged");
    }
  }, [accessToken, url]);

  //Verificacion de los likes en el aparatado de las lineas
  const fetchVerifyLike = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/userline`);
      setVerifyLike(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [url]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/line/linesAndStops`);
      setListLine(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [url]);

  //Funcion para agarrar las paradas de la BD
  const fetchStops = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/Stops`);
      setParadas(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [url]);

  //Funcion para agarrar las lineas de la BD
  const fetchLine = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/line`);
      setLine(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [url]);

  // const fetchStop = useCallback(async () => {
  //   try {
  //     const response = await axios.get(`${url}/stops`);
  //     setStop(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [url]);

  //Renderizacion de las funciones
  useEffect(() => {
    fetchData();
    fetchDataUser();
    fetchVerifyLike();
    fetchStops();
    fetchLine();
  }, [fetchData, fetchDataUser, fetchVerifyLike, fetchStops, fetchLine]);

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
      history.push({
        pathname: "/Account",
      });
    }
  };

  //Funcion para la verificacion de los likes
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

  const handleHidden = (nombre) => {
    // Obtén el objeto actual del localStorage
    let data = JSON.parse(localStorage.getItem("lines"));

    // Busca el objeto con el nombre correspondiente
    let item = data.find((item) => item.nombre === nombre);

    // Cambia el valor de hidden
    item.hidden = item.hidden === true ? false : true;

    // Guarda el objeto modificado de nuevo en el localStorage
    localStorage.setItem("lines", JSON.stringify(data));

    // Actualiza el estado
    // setVisibility(!visibility);

    const updatedVisibility = { ...visibility };
    updatedVisibility[nombre] = !updatedVisibility[nombre];
    setVisibility(updatedVisibility);
  };

  function findLineNameByStopDescription(lineData, query) {
    return lineData.stops.some(
      (stop) =>
        stop.par_name.toLowerCase().includes(query.toLowerCase()) ||
        stop.par_description.toLowerCase().includes(query.toLowerCase())
    );
  }

  const [searchQuery, setSearchQuery] = useState("");

  const filteredLines = lineList.filter((lin) => {
    return (
      lin.lin_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      findLineNameByStopDescription(lin, searchQuery)
    );
  });

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  //Acceder al mapeo de la linea completa
  const toggleNavbar = (param) => {
    setSelectId(param);
    setCollapsed(!collapsed);
  };

  function findStopName(stop) {
    return paradas.find(data => data.par_id === stop.par_id);
  }

  //Acceder al mapeo de las paradas

  const mapStop = (param) => {
    const stop = findStopName({ par_id: param });
    return stop ? stop : '';
  };

  return (
    <Container fluid className="content">
      <Row>
        <div className="searchLine">
          <Input
            type="text"
            className="form-control"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Buscar Parada..."
          />
        </div>
        {filteredLines.map((line, index) => (
          <div>
            <Col className="col" key={line.lin_id}>
              <Card className="cardLine">
                <CardHeader className="card-head">
                  Linea: {index + 1}
                  <Button onClick={() => toggleNavbar(line.lin_id)} className="btnArrow">
                    <IconArrowDown />
                  </Button>
                </CardHeader>
                <CardBody className="card-body">
                  <CardTitle
                    className="card-tittle"
                    onClick={() => handleShow(line.lin_name)}
                  >
                    <IconMaker className="iconMap" />
                    {line.lin_name}
                  </CardTitle>

                  <Modal
                    isOpen={modal1}
                    className="mt-5"
                    centered
                    toggle={handleClose}
                  >
                    <ModalHeader toggle={handleClose}>
                      Visualización {selectedName}
                    </ModalHeader>
                    <ModalBody style={{ margin: "0 auto", width: "80%" }}>
                      {mapLine(selectedName)}
                    </ModalBody>
                  </Modal>

                  <div className="lineButtons">
                    <Button
                      className="btn"
                      type="button"
                      onClick={() => handleHidden(line.lin_name)}
                    >
                      {visibility[line.lin_name] ? (
                        <FaEyeSlash className="icon" />
                      ) : (
                        <IoEyeSharp className="icon" />
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
                  <div className="Horario">Horario: {line.lin_scheduleStart} - {line.lin_scheduleEnd}</div>
                  <div className="Pasaje">Pasaje: {line.lin_price}Bs.</div>
                </CardFooter>
                <Collapse
                  isOpen={!collapsed && selectId === line.lin_id}
                  navbar
                  className="colapseStop mt-"
                >
                  <CardBody className="card-body cardBodyStop">
                    <ul className="ListStop">
                      {line.stops.map((stop, index) => (
                        <li key={index} className="cardStopInt">
                            <Button onClick={() => handleShowStop(stop.par_id)} className="btnStop">
                              <PointRed className="pointMaker"/>
                            </Button>
                          <div className="cardStopContent">
                            <h4 className="titleStop"> {stop.par_name}</h4>
                            <p className="descriptionStop">{stop.par_description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <Modal
                      isOpen={modal2}
                      className="mt-5"
                      centered
                      toggle={handleCloseStop}
                    >
                      <ModalHeader toggle={handleCloseStop}>
                        Visualización {mapStop(SelectedStop).par_name}
                      </ModalHeader>
                      <ModalBody style={{ margin: "0 auto", width: "80%" }}>
                        {
                          <MapContainer
                            center={[
                              mapStop(SelectedStop).par_lat,
                              mapStop(SelectedStop).par_long,
                            ]}
                            zoom={15}
                            style={{ width: "100%" }}
                          >
                            <Marker
                              position={[
                                mapStop(SelectedStop).par_lat,
                                mapStop(SelectedStop).par_long,
                              ]}
                              icon={IconLocation}
                            >
                              <Popup>{mapStop(SelectedStop).par_name}</Popup>
                            </Marker>
                            <TileLayer
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Polyline
                              pathOptions={{
                                color: {
                                  Guajira: "lime",
                                  Veritas: "blue",
                                  Milagro: "red",
                                  Galeria: "cyan",
                                  "Cinco de Julio": "green",
                                  "Bella Vista": "yellow",
                                }[mapStop(SelectedStop)?.Line?.lin_name] || "black"
                              }}
                              positions={
                                List.find(
                                  (elemento) => {
                                    const mapStopResult = mapStop(SelectedStop);
                                    return mapStop(SelectedStop) && mapStopResult.Line && elemento.nombre === mapStopResult.Line.lin_name
                                  }
                                )?.coords || []
                              }
                            />
                            {mapStop(SelectedStop) ? (
                              <Marker
                                position={[mapStop(SelectedStop).Line.lin_exit_point, mapStop(SelectedStop).Line.lin_arrival_point]}
                                icon={IconLocation2}
                              >
                                <Popup>
                                  {mapStop(SelectedStop).Line.lin_name}
                                  <FontAwesomeIcon icon={faBus} />
                                </Popup>
                              </Marker>
                            ) : null}
                            {mapStop(SelectedStop) ? (
                              <Marker
                                position={[mapStop(SelectedStop).Line.lin_start, mapStop(SelectedStop).Line.lin_close]}
                                icon={IconLocation2}
                              >
                                <Popup>
                                  {mapStop(SelectedStop).Line.lin_name}
                                  <FontAwesomeIcon icon={faBus} />
                                </Popup>
                              </Marker>
                            ) : null}
                          </MapContainer>
                        }
                      </ModalBody>
                    </Modal>
                  </CardBody>
                </Collapse>
              </Card>
            </Col>
          </div>
        ))}
      </Row>
    </Container>
  );
}

export { Lines };