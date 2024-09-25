import React, { useState } from 'react';
import styles from './Turno.module.css';
import axios from 'axios';
import { toast } from 'sonner';

const Turno = ({ id, date, time, userId, status, description, onCancel }) => {
  const [currentStatus, setCurrentStatus] = useState(status);

  const handleCancel = async () => {
    if (!id) {
      console.error('ID del turno no definido');
      return;
    }

    if (window.confirm('¿Estás seguro de que deseas cancelar este turno?')) {
      try {
        await axios.put(`http://localhost:3000/turns/cancel/${id}`, { status: 'canceled' });
        setCurrentStatus('cancelled');
        onCancel(id);
        toast.success('El turno ha sido cancelado con éxito.');
      } catch (error) {
        console.error('Error al cancelar el turno:', error);
        toast.error('Hubo un problema al cancelar el turno. Por favor, intente nuevamente.');
      }
    }
  };

  return (
    <div className={styles.turno}>
      <div className={styles.turno__description}>{description}</div>
      <div className={styles.turno__date}>{date}</div>
      <div className={styles.turno__time}>{time}</div>
      <div className={styles.turno__userId}>{userId}</div>
      <button
        className={styles.turno__status}
        onClick={handleCancel}
        disabled={currentStatus === 'cancelled'}
      >
        {currentStatus === 'active' ? 'pending' : 'cancelled'}
      </button>
    </div>
  );
};

export default Turno;
