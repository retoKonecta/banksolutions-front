const SaleList = ({ sales, onEdit, onDelete }) => {
    return (
      <div className="ventas-container">
        <h3>Lista de Productos Radicados</h3>
        <table className="dashboard-table styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Cupo Solicitado</th>
              <th>Franquicia</th>
              <th>Tasa</th>
              <th>Estado</th>
              <th>Creado Por</th>
              <th>Editado Por</th>
              <th>Fecha Creación</th>
              <th>Última Actualización</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sales.length > 0 ? (
              sales.map((sale) => (
                <tr key={sale.id}>
                  <td>{sale.id}</td>
                  <td>{sale.product}</td>
                  <td>{sale.requestedLimit}</td>
                  <td>{sale.franchise}</td>
                  <td>{sale.rate || "N/A"}</td>
                  <td>{sale.status}</td>
                  <td>{sale.creator.email}</td>
                  <td>{sale.editor.email}</td>
                  <td>{new Date(sale.createdAt).toLocaleString()}</td>
                  <td>{new Date(sale.updatedAt).toLocaleString()}</td>
                  <td>
                    <button className="edit-btn" onClick={() => onEdit(sale)}>✏ Editar</button>
                    <button className="delete-btn" onClick={() => onDelete(sale.id)}>🗑 Eliminar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11">No hay ventas registradas</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default SaleList;
  