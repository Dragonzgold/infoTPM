import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { useDataContext } from '../Context/dataContext';

function StopsEdit() {
  const { url } = useDataContext();
  const [par_name, setName] = useState('');
  const [par_lat, setLat] = useState('');
  const [par_long, setLong] = useState('');
  const [par_description, setDesc] = useState('');
  const [par_linId, setPar_linId] = useState(Number);
  const [par_img, setPar_img] = useState('');
  const [stop, setStops] = useState([]);
  const [lines, setLines] = useState([]);
  const [selectedStop, setSelectedStop] = useState(null);
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal)
    if (modal === false) {
      setName('')
      setLat('')
      setLong('')
      setDesc('')
    }
  };
  console.log(modal);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStops = stop.filter(stop => {
    const fullName = `${stop.par_name}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const handleSearch = event => {
    setSearchQuery(event.target.value);
  };

  
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/Stops`);
      setStops(response.data);
      
    } catch (error) {
      console.log(error);
    }
  },[url]);

  const fetchLineData = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/Line`);
      setLines(response.data);

    } catch (error) {
      console.log(error);
    }
  }, [url]);
  
  useEffect(() => {
    fetchData();
    fetchLineData();
  }, [fetchData, fetchLineData]);

  const handleEdit = stop => {
    setSelectedStop(stop);
    toggle();

    setName(stop.par_name);
    setLat(stop.par_lat);
    setLong(stop.par_long);
    setDesc(stop.par_description);
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`${url}/Stops/${id}`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    try {
      if (selectedStop) {
        await axios.put(`${url}/Stops/${selectedStop.par_id}`, {
          par_name,
          par_lat,
          par_long,
          par_description,
          par_linId,
          par_img
        });
      } else {
        await axios.post(`${url}/Stops/create`, {
          par_name,
          par_lat,
          par_long,
          par_description,
          par_linId,
          par_img
        });
      }
      setName('');
      setLat('');
      setLong('');
      setDesc('');
      fetchData();
      toggle();
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div>
      <div className='containerUsers'>
        <h1 className='tituloUser'>
          Paradas
          <div className='rayaTitulo' />
        </h1>
        <div className=" container">
          <div className='row m-5 '>
            <Input
              type="text"
              className="form-control"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Buscar Parada..."
            />
            <button
              type="button"
              className="btn btn-primary col-6"
              onClick={toggle}
            >
              Agregar Parada
            </button>
          </div>

          <div className="row m-4 userTable">
            <Table bordered responsive className='userTable'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Latitud</th>
                  <th>Longitud</th>
                  <th>Descripción</th>
                  <th>Funciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredStops.map((stop, index) => (
                  <tr key={stop.par_id}>
                    <td>{index +  1}</td>
                    <td>{stop.par_name}</td>
                    <td>{stop.par_lat}</td>
                    <td>{stop.par_long}</td>
                    <td>{stop.par_description}</td>
                    <td>
                      <Button
                        color="primary"
                        onClick={() => handleEdit(stop)}
                      >
                        Editar
                      </Button>
                      <Button
                        color="danger"
                        onClick={() => handleDelete(stop.par_id)}
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

      <Modal className='mt-5' isOpen={modal} size='lg' centered toggle={toggle}>
        <ModalHeader toggle={toggle}>Agregar Nueva Parada</ModalHeader>
        <ModalBody>
          <div className="row g-3">
            <div className="col-md-12">
              <label for="nombre" className="form-label">
                Nombre:
              </label>
              <Input
                type="text"
                defaultValue={par_name}
                onChange={e => setName(e.target.value)}
                className="form-control"
                id="nombre"
                required
              />
            </div>
            <div className="col-md-12">
              <label for="latitud" className="form-label">
                Latitud:
              </label>
              <Input
                type="text"
                defaultValue={par_lat}
                onChange={e => setLat(e.target.value)}
                className="form-control"
                id="latitud"
                pattern="^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$"
                required
              />
            </div>
            <div className="col-md-12">
              <label for="longitud" className="form-label">
                Longitud:
              </label>
              <Input
                type="text"
                defaultValue={par_long}
                onChange={e => setLong(e.target.value)}
                className="form-control"
                id="longitud"
                pattern="^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$"
                required
              />
            </div>
            <div className="col-md-6">
              <label for="par_linId" className="form-label">
                Linea:
              </label>
              <Input
                id="par_linId"
                name="par_linId"
                type="select"
                value={par_linId}
                placeholderText="Linea"
                required
                onChange={(e) => setPar_linId(e.target.value)}
              >
                <option >Selecciona un linea</option>
                {lines.map((line) => (
                  <option key={line.lin_id} value={line.lin_id}>
                    {line.lin_name}
                  </option>
                ))}
              </Input>
            </div>
            <div className="col-md-6">
              <label for="par_img" className="form-label">
                Imagen:
              </label>
              <Input
                id="par_img"
                name="par_img"
                type="file"
                required
                accept=".jpg,.jpeg,.png,"
                onChange={(e) => setPar_img(e.target.value)}
              />
            </div>
            <div className="col-md-12">
              <label for="longitud" className="form-label">
                Descripción:
              </label>
              <Input
                type="text"
                defaultValue={par_description}
                onChange={e => setDesc(e.target.value)}
                className="form-control"
                id="descripcion"
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            type="button"
            onClick={handleSave}
            color="primary"
          >
            Guardar cambios
          </Button>
          <Button
            color="secondary"
            onClick={toggle}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export { StopsEdit }