import React, { useState } from 'react';

const EditTaskModal = ({ task, onUpdate, onClose }) => {
  const [newStatus, setNewStatus] = useState(task.status);

  const handleUpdate = () => {
    // Lógica para actualizar la tarea
    onUpdate(task.id, newStatus);
    // Cerrar la ventana emergente/modal después de la actualización
    onClose();
  };

  return (
    <div>
      {/* Contenido de la ventana emergente/modal */}
      <p>Editar tarea: {task.title}</p>
      <label>
        Nuevo estado:
        <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
          <option value="completada">Completada</option>
          <option value="pendiente">Pendiente</option>
        </select>
      </label>
      <button onClick={handleUpdate}>Guardar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default EditTaskModal;
