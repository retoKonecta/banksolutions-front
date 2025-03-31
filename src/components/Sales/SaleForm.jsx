import { useState, useEffect } from 'react';
import '../Dashboard/Dashboard.css';

const SaleForm = ({ fetchSales, saleToEdit, clearEdit }) => {
  const [saleData, setSaleData] = useState({
    product: '',
    requestedLimit: '',
    franchise: '',
    rate: '',
    status: 'Open',
    createdBy: 1,
    updatedBy: 1,
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (saleToEdit) {
      setSaleData({
        product: saleToEdit.product,
        requestedLimit: saleToEdit.requestedLimit,
        franchise: saleToEdit.franchise,
        rate: saleToEdit.rate || '',
        status: saleToEdit.status,
        createdBy: saleToEdit.createdBy || 1,
        updatedBy: 1,
      });
      setEditMode(true);
    }
  }, [saleToEdit]);

  const handleSaleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = editMode
        ? `http://localhost:3000/api/editSales/${saleToEdit.id}`
        : `http://localhost:3000/api/addSales`;
      
      const response = await fetch(url, {
        method: 'POST',  
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(saleData),
      });

      if (response.ok) {
        alert(editMode ? 'Venta actualizada correctamente' : 'Venta radicada exitosamente');
        fetchSales();
        clearEdit();
        setSaleData({
          product: '',
          requestedLimit: '',
          franchise: '',
          rate: '',
          status: 'Open',
          createdBy: 1,
          updatedBy: 1,
        });
        setEditMode(false);
      } else {
        alert('Error en la operación');
      }
    } catch (error) {
      console.error('Error en la operación:', error);
    }
  };

  return (
    <div>
      <h3>{editMode ? 'Editar Venta' : 'Radicar Nueva Venta'}</h3>
      <form className="dashboard-form" onSubmit={handleSaleSubmit}>
        <label>Producto:</label>
        <select
          required
          value={saleData.product}
          onChange={e => setSaleData({ ...saleData, product: e.target.value })}
        >
          <option value="">Seleccione un producto</option>
          <option value="Credito de Consumo">Crédito de Consumo</option>
          <option value="Libranza Libre Inversión">Libranza Libre Inversión</option>
          <option value="Tarjeta de Credito">Tarjeta de Crédito</option>
        </select>

        <label>Cupo Solicitado:</label>
        <input
          type="text"
          placeholder="Ej: 1.000.000"
          value={saleData.requestedLimit}
          onChange={e => setSaleData({ ...saleData, requestedLimit: e.target.value })}
        />

        <label>Franquicia:</label>
        <select
          value={saleData.franchise}
          onChange={e => setSaleData({ ...saleData, franchise: e.target.value })}
        >
          <option value="AMEX">AMEX</option>
          <option value="VISA">VISA</option>
          <option value="MASTERCARD">MASTERCARD</option>
        </select>

        <label>Tasa:</label>
        <input
          type="text"
          placeholder="Ej: 10.58"
          value={saleData.rate}
          onChange={e => setSaleData({ ...saleData, rate: e.target.value })}
        />

        <button type="submit">{editMode ? 'Actualizar Venta' : 'Guardar Venta'}</button>
      </form>
    </div>
  );
};

export default SaleForm;
