import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Turno from '../../components/Turno/Turno';
import styles from './MisTurnos.module.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const MisTurnos = () => {
  const [turnos, setTurnos] = useState([]);
  const navigate = useNavigate();
  const userSesion = useSelector(state => state.sesion.userSesion);

  useEffect(() => {
    if (userSesion) {
      axios.get(`http://localhost:3000/users/${userSesion.id}`)
        .then(res => {
          const appointments = res.data.appointment;
          setTurnos(appointments);

          if (appointments.length === 0) {
            navigate('/NoAppointments');
        
          }
        })
        .catch(err => console.error(err));
    }
  }, [userSesion, navigate]);

  const handleStatusChange = (id) => {
    setTurnos(turnos.map(turno =>
      turno.id === id ? { ...turno, status: 'canceled' } : turno
    ));
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Próximos turnos:</h3>
      <div className={styles.tableTitle}>
        <div></div>
        <div>Descripción</div>
        <div>Data</div>
        <div>Time</div>
        <div>Status</div>
      </div>
      <div className={styles.turnosList}>
        {turnos.map((turno, id) => (
          <Turno
            key={id}
            id={turno.id}
            date={turno.date}
            time={turno.time}
            description={turno.description}
            status={turno.status}
            onCancel={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
};

export default MisTurnos;
