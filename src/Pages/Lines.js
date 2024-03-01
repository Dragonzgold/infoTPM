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
import { List } from '../Components/List';

//Usestate

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
  const [paradas, setParadas] = useState([]);
  const [line, setLine] = useState([]);
  const positionGuajira = [10.675, -71.629];
  const positionVeritas = [10.650, -71.620];
  const positionMilagro = [10.670, -71.600];
  const positionGaleria = [10.670, -71.630];
  const positionCincoDeJulio = [10.670, -71.630];
  const positionBellaVista = [10.660, -71.610];

  //Funcion para el chqueo y muestra de mapas en los modales

  const imgMapLine = (imgLine) => {

    //Mapa de la Guajira
    if (imgLine === "Guajira") {
      const limeOptions = { color: "lime" };
      return (
        <div className="MapViewGuajira">
          <MapContainer center={positionGuajira} zoom={13} style={{ width: "100%"}}>
            {paradas.map((parada) => (
              parada.Line.lin_id === 1?
              <Marker
                position={[parada.par_lat, parada.par_long, parada.Line.lin_id]}
                icon={IconLocation}
              >
                <Popup>{parada.par_name}</Popup>
              </Marker>:null
            ))}
            {line.map((linea) => (
              linea.lin_id === 1?
              <Marker
                position={[linea.lin_start, linea.lin_close]}
                icon={IconLocation2}
              >
                <Popup>
                  {linea.lin_name}
                  <FontAwesomeIcon icon={faBus} />
                </Popup>
              </Marker>:null
            ))}
            {line.map((linea) => (
              linea.lin_id === 1?
              <Marker
                position={[linea.lin_exit_point, linea.lin_arrival_point]}
                icon={IconLocation2}
              >
                <Popup>
                  {linea.lin_name}
                  <FontAwesomeIcon icon={faBus} />
                </Popup>
              </Marker>:null
            ))}

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
      const blueOptions = { color: 'blue' }
      return <div className="MapViewVerita">
          <MapContainer center={positionVeritas} zoom={14} style={{ width: "100%" }}>
            {paradas.map((parada) => (
              parada.Line.lin_id === 2?
              <Marker
                position={[parada.par_lat, parada.par_long, parada.Line.lin_id]}
                icon={IconLocation}
              >
                <Popup>{parada.par_name}</Popup>
              </Marker>:null
            ))}
            {line.map((linea) => (
              linea.lin_id === 2?
              <Marker
                position={[linea.lin_start, linea.lin_close]}
                icon={IconLocation2}
              >
                <Popup>
                  {linea.lin_name}
                  <FontAwesomeIcon icon={faBus} />
                </Popup>
              </Marker>:null
            ))}
            {line.map((linea) => (
              linea.lin_id === 2?
              <Marker
                position={[linea.lin_exit_point, linea.lin_arrival_point]}
                icon={IconLocation2}
              >
                <Popup>
                  {linea.lin_name}
                  <FontAwesomeIcon icon={faBus} />
                </Popup>
              </Marker>:null
            ))}

            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* <LocationMarker /> */}
            <LocationTestMarker />
            <Polyline pathOptions={blueOptions} positions={List.Veritas} />
          </MapContainer>
        </div>
    }
    if (imgLine === "Milagro") {

      //Mapa de Milagro
      const redOptions = { color: 'red' }
      return <div className="MapViewGuajira">
          <MapContainer center={positionMilagro} zoom={13} style={{ width: "100%"}}>
            {paradas.map((parada) => (
              parada.Line.lin_id === 3?
              <Marker
                position={[parada.par_lat, parada.par_long, parada.Line.lin_id]}
                icon={IconLocation}
              >
                <Popup>{parada.par_name}</Popup>
              </Marker>:null
            ))}
            {line.map((linea) => (
              linea.lin_id === 3?
              <Marker
                position={[linea.lin_start, linea.lin_close]}
                icon={IconLocation2}
              >
                <Popup>
                  {linea.lin_name}
                  <FontAwesomeIcon icon={faBus} />
                </Popup>
              </Marker>:null
            ))}
            {line.map((linea) => (
              linea.lin_id === 3?
              <Marker
                position={[linea.lin_exit_point, linea.lin_arrival_point]}
                icon={IconLocation2}
              >
                <Popup>
                  {linea.lin_name}
                  <FontAwesomeIcon icon={faBus} />
                </Popup>
              </Marker>:null
            ))}

            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* <LocationMarker /> */}
            <LocationTestMarker />
            <Polyline pathOptions={redOptions} positions={List.Milagro} />
          </MapContainer>
        </div>
    }
    if (imgLine === "Galeria") {

      //Mapa de Galeria
      const cyanOptions = { color: "cyan" };
      return <div className="MapViewGuajira">
          <MapContainer center={positionGaleria} zoom={13} style={{ width: "100%"}}>
            {paradas.map((parada) => (
              parada.Line.lin_id === 4?
              <Marker
                position={[parada.par_lat, parada.par_long, parada.Line.lin_id]}
                icon={IconLocation}
              >
                <Popup>{parada.par_name}</Popup>
              </Marker>:null
            ))}
            {line.map((linea) => (
              linea.lin_id === 4?
              <Marker
                position={[linea.lin_start, linea.lin_close]}
                icon={IconLocation2}
              >
                <Popup>
                  {linea.lin_name}
                  <FontAwesomeIcon icon={faBus} />
                </Popup>
              </Marker>:null
            ))}
            {line.map((linea) => (
              linea.lin_id === 4?
              <Marker
                position={[linea.lin_exit_point, linea.lin_arrival_point]}
                icon={IconLocation2}
              >
                <Popup>
                  {linea.lin_name}
                  <FontAwesomeIcon icon={faBus} />
                </Popup>
              </Marker>:null
            ))}

            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* <LocationMarker /> */}
            <LocationTestMarker />
            <Polyline pathOptions={cyanOptions} positions={List.galeria} />
          </MapContainer>
        </div>
    }
    if (imgLine === "Cinco de Julio") {

      //Mapa de cinco de Julio
      const greenOptions = { color: "green" };
      return <div className="MapViewGuajira">
          <MapContainer center={positionCincoDeJulio} zoom={13} style={{ width: "100%"}}>
            {paradas.map((parada) => (
              parada.Line.lin_id === 8?
              <Marker
                position={[parada.par_lat, parada.par_long, parada.Line.lin_id]}
                icon={IconLocation}
              >
                <Popup>{parada.par_name}</Popup>
              </Marker>:null
            ))}
            {line.map((linea) => (
              linea.lin_id === 8?
              <Marker
                position={[linea.lin_start, linea.lin_close]}
                icon={IconLocation2}
              >
                <Popup>
                  {linea.lin_name}
                  <FontAwesomeIcon icon={faBus} />
                </Popup>
              </Marker>:null
            ))}
            {line.map((linea) => (
              linea.lin_id === 8?
              <Marker
                position={[linea.lin_exit_point, linea.lin_arrival_point]}
                icon={IconLocation2}
              >
                <Popup>
                  {linea.lin_name}
                  <FontAwesomeIcon icon={faBus} />
                </Popup>
              </Marker>:null
            ))}

            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* <LocationMarker /> */}
            <LocationTestMarker />
            <Polyline pathOptions={greenOptions} positions={List.julio5} />
          </MapContainer>
        </div>
    }
    if (imgLine === "Bella Vista") {

      //Mapa de bella Vista
      const yellowOptions = { color: "yellow" };
      return <div className="MapViewGuajira">
          <MapContainer center={positionBellaVista} zoom={14} style={{ width: "100%"}}>
            {paradas.map((parada) => (
              parada.Line.lin_id === 9?
              <Marker
                position={[parada.par_lat, parada.par_long, parada.Line.lin_id]}
                icon={IconLocation}
              >
                <Popup>{parada.par_name}</Popup>
              </Marker>:null
            ))}
            {line.map((linea) => (
              linea.lin_id === 9?
              <Marker
                position={[linea.lin_start, linea.lin_close]}
                icon={IconLocation2}
              >
                <Popup>
                  {linea.lin_name}
                  <FontAwesomeIcon icon={faBus} />
                </Popup>
              </Marker>:null
            ))}
            {line.map((linea) => (
              linea.lin_id === 9?
              <Marker
                position={[linea.lin_exit_point, linea.lin_arrival_point]}
                icon={IconLocation2}
              >
                <Popup>
                  {linea.lin_name}
                  <FontAwesomeIcon icon={faBus} />
                </Popup>
              </Marker>:null
            ))}

            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* <LocationMarker /> */}
            <LocationTestMarker />
            <Polyline pathOptions={yellowOptions} positions={List.sinNombre} />
          </MapContainer>
        </div>
    }
  };

  //Funcion para acceder a los modales

  const handleShow = (name) => {
    setModal1(true);
    setSelectedName(name);
  };

  const toggle = () => setModal(!modal);

  //Cerrar los modales
  const handleClose = () => {
    setModal1(false);
  };

  //Token para el aceso
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
      const response = await axios.get(`${url}/Line`);
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
      console.log(error);
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
  
    //Visibilidad del mapa
  const handleVisibility = () => {
    setVisibility(!visibility);
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
