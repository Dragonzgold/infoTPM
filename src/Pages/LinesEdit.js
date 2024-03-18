import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import { useDataContext } from "../Context/dataContext";

function LinesEdit() {
  const { url } = useDataContext();
  const [lin_name, setName] = useState("");
  const [lin_start, setStart] = useState("");
  const [lin_close, setClose] = useState("");
  const [lin_exit_point, setExit] = useState("");
  const [lin_arrival_point, setArrival] = useState("");
  const [lin_price, setPrice] = useState(Number);
  const [lin_Entrada, setEntrada] = useState("");
  const [lin_Salida, setSalida] = useState("");
  const [line, setLine] = useState([]);
  const [selectedLine, setSelectedLine] = useState(null);
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
    if (modal === false) {
      setName("");
      setStart("");
      setClose("");
      setExit("");
      setArrival("");
      setPrice();
      setEntrada("");
      setSalida("");
    }
  };

  const [searchQuery, setSearchQuery] = useState("");

  const filteredStops = line.filter((line) => {
    const fullName = `${line.lin_name}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/Line`);
      setLine(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEdit = (line) => {
    setSelectedLine(line);
    toggle();

    setName(line.lin_name);
    setStart(line.lin_start);
    setClose(line.lin_close);
    setExit(line.lin_exit_point);
    setArrival(line.lin_arrival_point);
    setPrice(line.lin_price);
    setEntrada(line.lin_scheduleStart);
    setSalida(line.lin_scheduleEnd);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/Line/${id}`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    try {
      if (selectedLine) {
        await axios.put(`${url}/Line/${selectedLine.lin_id}`, {
          lin_name,
          lin_start,
          lin_close,
          lin_exit_point,
          lin_arrival_point,
          lin_price,
          lin_Entrada,
          lin_Salida,
        });
      } else {
        await axios.post(`${url}/line/create`, {
          lin_name,
          lin_start,
          lin_close,
          lin_exit_point,
          lin_arrival_point,
          lin_price,
          lin_Entrada,
          lin_Salida,
        });
      }
      fetchData();
      toggle();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="containerUsers">
        <h1 className="tituloUser">
          Lineas
          <div className="rayaTitulo" />
        </h1>
        <div className=" container">
          <div className="row m-5 ">
            <Input
              type="text"
              className="form-control"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Buscar Linea..."
            />
            <button
              type="button"
              className="btn btn-primary col-6"
              onClick={toggle}
            >
              Agregar Linea
            </button>
          </div>

          <div className="row m-4 userTable">
            <Table bordered responsive className="userTable">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Latitud (Inicio)</th>
                  <th>Longitud (Inicio)</th>
                  <th>Latitud (Llegada)</th>
                  <th>Longitud (Llegada)</th>
                  <th>Precio</th>
                  <th>Funciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredStops.map((line, index) => (
                  <tr key={line.lin_id}>
                    <td>{index + 1}</td>
                    <td>{line.lin_name}</td>
                    <td>{line.lin_start}</td>
                    <td>{line.lin_close}</td>
                    <td>{line.lin_exit_point}</td>
                    <td>{line.lin_arrival_point}</td>
                    <td>{line.lin_price} Bs.</td>
                    <td>
                      <Button color="primary" onClick={() => handleEdit(line)}>
                        Editar
                      </Button>
                      <Button
                        color="danger"
                        onClick={() => handleDelete(line.lin_id)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      <Modal className="mt-5" isOpen={modal} size="xl" centered toggle={toggle}>
        <ModalHeader toggle={toggle}>Agregar Nueva Linea</ModalHeader>
        <ModalBody>
          <div className="row g-3">
            <div className="col-md-12">
              <label for="nombre" className="form-label">
                Nombre:
              </label>
              <Input
                type="text"
                defaultValue={lin_name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                id="nombre"
                maxLength="48"
                required
              />
            </div>
            <div className="col-md-6">
              <label for="latitud" className="form-label">
                Latitud (Punto de Inicio):
              </label>
              <Input
                type="number"
                defaultValue={lin_start}
                onChange={(e) => setStart(e.target.value)}
                className="form-control"
                id="latitud"
                pattern="^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$"
                required
              />
            </div>
            <div className="col-md-6">
              <label for="longitud" className="form-label">
                Longitud Punto de Inicio:
              </label>
              <Input
                type="number"
                defaultValue={lin_close}
                onChange={(e) => setClose(e.target.value)}
                className="form-control"
                id="longitud"
                pattern="^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$"
                required
              />
            </div>
            <div className="col-md-6">
              <label for="latitud" className="form-label">
                Latitud (Punto de Llegada):
              </label>
              <Input
                type="number"
                defaultValue={lin_exit_point}
                onChange={(e) => setExit(e.target.value)}
                className="form-control"
                id="latitud"
                pattern="^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$"
                required
              />
            </div>
            <div className="col-md-6">
              <label for="longitud" className="form-label">
                Longitud Punto de Llegada:
              </label>
              <Input
                type="number"
                defaultValue={lin_arrival_point}
                onChange={(e) => setArrival(e.target.value)}
                className="form-control"
                id="longitud"
                pattern="^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$"
                required
              />
            </div>
            <div className="col-md-6">
              <label for="longitud" className="form-label">
                Precio:
              </label>
              <Input
                type="number"
                defaultValue={lin_price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-control"
                id="Precio"
                pattern="^[0-9]*$"
                required
              />
            </div>
            <div className="col-md-6">
              <label for="longitud" className="form-label">
                Horario:
              </label>
              <br />
              <p style={{ display: "inline" }}>Entrada:</p>
              <Input
                type="number"
                defaultValue={lin_Entrada}
                onChange={(e) => setEntrada(e.target.value)}
                className="form-control"
                style={{ display: "inline", width: "10vw" }}
                id="horaEntrada"
                pattern="^[0-9]*$"
                min={1}
                max={12}
                required
              />
              <Input
                bsSize="sm"
                className="mb-3"
                type="select"
                style={{ width: "7vw", display: "inline" }}
              >
                <option>AM</option>
                <option>PM</option>
              </Input>
              <br />
              <p style={{ display: "inline" }}>Salida:</p>
              <Input
                type="number"
                defaultValue={lin_Salida}
                onChange={(e) => setSalida(e.target.value)}
                className="form-control"
                style={{ display: "inline", width: "10vw" }}
                id="horaSalida"
                min={1}
                max={12}
                pattern="^[0-9]*$"
                required
              />
              <Input
                bsSize="sm"
                className="mb-3"
                type="select"
                style={{ width: "6.5vw", display: "inline" }}
              >
                <option>AM</option>
                <option>PM</option>
              </Input>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button type="button" onClick={handleSave} color="primary">
            Guardar cambios
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export { LinesEdit };
