import React from "react";
import { nanoid } from "nanoid";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

function App() {
  const [tarea, setTarea] = React.useState('')
  const [listaTareas, setListaTareas] = React.useState([])
  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [id, setId] = React.useState('')
  const [error, setError] = React.useState(null)

  const agregarTarea = e => {
    e.preventDefault()
    if(!tarea.trim()){
      setError('Escriba algo por favor 🥺')
      return
    }
    setListaTareas([...listaTareas, {id: nanoid(10), tarea}])
    console.log(listaTareas)
    setTarea('')
    setError(null)
  }

  const eliminarTarea = (id) => {
    //console.log(id)
    setListaTareas(listaTareas.filter(item => item.id != id))
  }

  const editarTarea = (item) => {
    console.log(item)
    setModoEdicion(true)
    setTarea(item.tarea)
    setId(item.id)
  }

  const actualizarTarea = e => {
    e.preventDefault()
    if(!tarea.trim()){
      setError('Escriba algo por favor 🥺')
      return 
    }
    const arrayEditado = listaTareas.map(item => item.id === id ? {id, tarea} : item)
    setListaTareas(arrayEditado)
    setTarea('')
    setId('')
    setModoEdicion(false)
    setError(null)
  }



  return (
    <div className="container mt-5">
      <h1 className="text-center">CRUD simple</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            {              
              listaTareas.length === 0 ? (
                <li className="list-group-item">No hay tareas</li>
              ) :
              (
                listaTareas.map((item, i) => (
                  <li className="list-group-item" key={i}>
                    <span className="lead">{item.tarea}</span>
                    <button className="btn btn-danger btn-sm float-right mx-2" onClick={() => eliminarTarea(item.id)}>Eliminar</button>
                    <button className="btn btn-warning btn-sm float-right" onClick={() => editarTarea(item)}>Editar</button>
                  </li>
                ))
              )
            }
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {
              modoEdicion ? 'Editar tarea' : 'Agregar tarea'
            }
          </h4>  
          
          
          <form onSubmit={modoEdicion ? actualizarTarea : agregarTarea}>
            {
             error ? <span className="text-danger">{error}</span> : null
            }

            <input
              type='text'
              className="form-control mb-2"
              placeholder="Ingresar tarea"
              onChange={e => setTarea(e.target.value)}
              value = {tarea}
            />
            {
              modoEdicion ? (
                <button className="btn btn-warning btn-sm float-right" type="submit">Editar</button>
              ) 
              :
              (<button className="btn btn-dark btn-block" type="submit">Agregar</button>)
            }
          </form>
          


        </div>
      </div>
    </div>
  );
}

export default App;
