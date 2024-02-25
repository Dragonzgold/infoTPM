import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Button, Table, Input } from 'reactstrap';
import { useDataContext } from '../Context/dataContext';

function Comments() {
  const { url } = useDataContext();
  const [comments, setComments] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredComment = comments.filter(com => {
  
    const fullName = `
    ${com.User.usu_name} 
    ${com.User.usu_lastName} 
    ${com.User.usu_email} 
    ${com.line.lin_name} 
    ${com.com_comment}`.toLowerCase();
  
    return fullName.includes(searchQuery.toLowerCase());
  });

  const handleSearch = event => {
    setSearchQuery(event.target.value);
  };
  
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/comment`);
      setComments(response.data);
    } catch (error) {
      console.log(error);
    }
  },[url]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async id => {
    try {
      await axios.delete(`${url}/comment/${id}`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className='containerUsers'>
        <h1 className='tituloUser'>
          Comentarios
          <div className='rayaTitulo' />
        </h1>
        <div className=" container">
          <div className='row m-5 '>
            <Input
              type="text"
              className="form-control"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Buscar Comentario..."
            />
          </div>

          <div className="row m-4 userTable">
            <Table bordered responsive className='userTable'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Comentario</th>
                  <th>Linea</th>
                  <th>Funciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredComment.map((com, index) => (
                  <tr key={com.com_id}>
                    <td>{index +  1}</td>
                    <td>{com.User.usu_name}</td>
                    <td>{com.User.usu_lastName}</td>
                    <td>{com.com_comment}</td>
                    <td>{com.line.lin_name}</td>
                    <td>
                      <Button
                        color="danger"
                        onClick={() => handleDelete(com.com_id)}
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

    </div>
  )
}

export { Comments }