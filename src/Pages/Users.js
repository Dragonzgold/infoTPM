import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';
import { useDataContext } from '../Context/dataContext';

function Users() {
  const [usu_name, setName] = useState('');
  const [usu_lastName, setLastname] = useState('');
  const [usu_email, setEmail] = useState('');
  const [usu_role, setRole] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modal, setModal] = useState(false);
  const { url } = useDataContext();;
  const toggle = () => {
    setModal(!modal)
    if (modal === false) {
      setName('')
      setLastname('')
      setEmail('')
      setRole('')
    }
  };
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsuarios = usuarios.filter(user => {
    const fullName = `${user.usu_name} ${user.usu_lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const handleSearch = event => {
    setSearchQuery(event.target.value);
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/Users`);
      setUsuarios(response.data);

    } catch (error) {
      console.log(error);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEdit = user => {
    setSelectedUser(user);
    toggle();

    setName(user.usu_name);
    setLastname(user.usu_lastName);
    setEmail(user.usu_email);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      if (selectedUser) {
        await axios.put(
          `${url}/Users/${selectedUser.usu_id}`,
          {
            usu_name,
            usu_lastName,
            usu_email,
            usu_role
          });
        setSelectedUser(null);

      } else {
        await axios.post(
          `${url}/Auth/register`,
          {
            usu_name,
            usu_lastName,
            usu_email,
            usu_password: '12345678',
            usu_role
          });
      }

      setName('');
      setLastname('');
      setEmail('');
      setRole('');
      fetchData();
      toggle();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async id => {
    try {
      await axios.delete(
        `${url}/Users/${id}`
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
          Usuarios
          <div className='rayaTitulo' />
        </h1>
        <div className=" container">
          <div className='row m-5 '>
            <Input
              type="text"
              className="form-control"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Buscar Usuario..."
            />
            <button
              type="button"
              className="btn btn-primary col-6"
              onClick={toggle}
            >
              Agregar Usuario
            </button>
          </div>
        </div>

        <div className="row m-4 userTable">
          <Table bordered responsive striped className='userTable'>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Funciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsuarios.map((user, id) => (
                <tr key={user.usu_id}>
                  <td>{id + 1}</td>
                  <td>{user.usu_name}</td>
                  <td>{user.usu_lastName}</td>
                  <td>{user.usu_email}</td>
                  <td>{user.usu_role}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(user.usu_id)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEdit(user)}
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
        <ModalHeader toggle={toggle}>Agregar Nuevo Usuario</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">
                Nombre:
              </label>
              <Input
                type="text"
                defaultValue={usu_name}
                onChange={event => setName(event.target.value)}
                className="form-control"
                id="nombre"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">
                Apellido:
              </label>
              <Input
                type="text"
                className="form-control"
                defaultValue={usu_lastName}
                onChange={event => setLastname(event.target.value)}
                id="apellido"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">
                Correo:
              </label>
              <Input
                type="email"
                className="form-control"
                defaultValue={usu_email}
                onChange={event => setEmail(event.target.value)}
                id="correo"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">
                Rol:
              </label>
              <br />
              <Label>
                <Input
                  type="radio"
                  value="user"
                  checked={usu_role === 'user'}
                  onChange={e => setRole(e.target.value)}
                />
                User.
              </Label>
              &nbsp;
              <br />
              <Label>
                <Input
                  type="radio"
                  value="Driver"
                  checked={usu_role === 'Driver'}
                  onChange={e => setRole(e.target.value)}
                />
                Conductor
              </Label>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}
          disabled={(usu_name==="")||(usu_lastName==="")||(usu_email==="")||(usu_role==="")}
          >
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

export { Users }