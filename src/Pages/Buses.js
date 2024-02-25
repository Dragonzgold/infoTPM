import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';
import { useDataContext } from '../Context/dataContext';

function Buses() {
  const [bus_plate, setBusPlate] = useState('');
  const [bus_status, setBusStatus] = useState('');
  const [bus_LinId, setBusLinId] = useState('');
  const [bus_UsuId, setBusUsuId] = useState('');
  const [buses, setBuses] = useState([]);
  const [lines, setLines] = useState([]);
  const [Users, setUsers] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [modal, setModal] = useState(false);
  const { url } = useDataContext();;
  const toggle = () => {
    setModal(!modal)
    if (modal === false) {
      setBusPlate('');
      setBusStatus('');
    }
  };
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBuses = buses.filter(bus => {
    const fullName = `${bus.bus_plate} ${bus.bus_status} ${bus.Line.lin_name} ${bus.user.usu_name} ${bus.user.usu_lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const handleSearch = event => {
    setSearchQuery(event.target.value);
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/Bus`);
      setBuses(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [url]);

  const fetchDataLines = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/line`);
      setLines(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [url]);

  const fetchDataUsers = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/users`);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
    fetchDataLines();
    fetchDataUsers();
  }, [fetchData, fetchDataLines, fetchDataUsers]);

  const handleEdit = bus => {
    setSelectedBus(bus);
    toggle();

    setBusPlate(bus.bus_plate);
    setBusStatus(bus.bus_status);
    setBusLinId(bus.bus_linId);
    setBusUsuId(bus.bus_usuId);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      if (selectedBus) {
        await axios.put(
          `${url}/Bus/${selectedBus.bus_id}`,
          {
            bus_plate,
            bus_status,
            bus_usuId: selectedBus.bus_usuId,
            bus_linId: selectedBus.bus_linId
          });
        setSelectedBus(null);

      } else {
        await axios.post(
          `${url}/Bus/create`,
          {
            bus_plate,
            bus_status,
            bus_usuId: bus_UsuId,
            bus_linId: bus_LinId
          });
      }

      setBusPlate('');
      setBusStatus('');
      setBusLinId('');
      setBusUsuId('');
      fetchData();
      toggle();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async id => {
    try {
      await axios.delete(
        `${url}/Bus/${id}`
      );
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className='containerUsers'>
        <h1 className='tituloUser'>
          Buses
          <div className='rayaTitulo' />
        </h1>
        <div className=" container">
          <div className='row m-5 '>
            <Input
              type="text"
              className="form-control"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Buscar Bus..."
            />
            <button
              type="button"
              className="btn btn-primary col-6"
              onClick={toggle}
            >
              Agregar Bus
            </button>
          </div>
        </div>

        <div className="row m-4 userTable">
          <Table bordered responsive className='userTable'>
            <thead>
              <tr>
                <th>#</th>
                <th>Placa</th>
                <th>Status</th>
                <th>Linea de Bus</th>
                <th>Conductor</th>
                <th>Funciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredBuses.map((bus, id) => (
                <tr key={bus.bus_id}>
                  <td>{id + 1}</td>
                  <td>{bus.bus_plate}</td>
                  <td>{bus.bus_status}</td>
                  <td>{bus.Line.lin_name}</td>
                  <td>{bus.user.usu_name} {bus.user.usu_lastName}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(bus.bus_id)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEdit(bus)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <Modal className='mt-5' isOpen={modal} size='xl' centered toggle={toggle}>
        <ModalHeader toggle={toggle}>Agregar Nuevo Bus</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">
                Placa:
              </label>
              <Input
                type="text"
                defaultValue={bus_plate}
                onChange={event => setBusPlate(event.target.value)}
                className="form-control"
                id="nombre"
                required
              />
            </div>
            <div className="col-md-6">
              <Label className="form-label" for="status">
                Status:
              </Label>
              <Input
                id="status"
                name="select"
                type="select"
                className="form-control"
                defaultValue={bus_status}
                onChange={event => setBusStatus(event.target.value)}
                required
              >
                <option>
                  Active
                </option>
                <option>
                  Disactive
                </option>
              </Input>
            </div>
            <div className="col-md-6">
              <Label className="form-label" for="status">
                Lineas:
              </Label>
              <Input
                id="lines"
                name="select"
                type="select"
                className="form-control"
                defaultValue={bus_LinId}
                onChange={event => setBusLinId(event.target.value)}
                required
              >
                <option >Selecciona una Linea</option>
                {lines.map((lin) => (
                  <option key={lin.lin_id} value={lin.lin_id}>
                    {lin.lin_name}
                  </option>
                ))}
              </Input>
            </div>
            <div className="col-md-6">
              <Label className="form-label" for="status">
                Conductor:
              </Label>
              <Input
                id="driver"
                name="select"
                type="select"
                className="form-control"
                defaultValue={bus_UsuId}
                onChange={event => setBusUsuId(event.target.value)}
                required
              >
                <option>Selecciona un conductor</option>
                {Users.map((user) => (
                  <option key={user.usu_id} value={user.usu_id}>
                    {user.usu_name}
                  </option>
                ))}
              </Input>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Guardar
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export { Buses }