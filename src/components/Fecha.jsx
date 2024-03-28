import React from 'react';

const Fecha = () => {
    return (
        <div className="row mb-3 border-bottom pb-3">
            <div className="col">
                <label htmlFor="fechaInicio" className="form-label">Fecha Inicio</label>
                <input type="date" className="form-control" id="fechaInicio" />
            </div>
            <div className="col">
                <label htmlFor="horaInicio" className="form-label">Hora Inicio</label>
                <input
                    type="time"
                    className="form-control"
                    id="horaInicio"
                    min="06:00"
                    max="22:00"
                />
            </div>
            <div className="col">
                <label htmlFor="horaFin" className="form-label">Hora Fin</label>
                <input
                    type="time"
                    className="form-control"
                    id="horaFin"
                    min="07:00"
                    max="23:00"
                />
            </div>
        </div>
    );
};

export default Fecha;
