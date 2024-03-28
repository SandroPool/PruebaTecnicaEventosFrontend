import React, { useState } from 'react';

const Evento = ({ register }) => {
    const eventos = {
        a: 'Talleres de un día',
        b: 'Talleres con programación',
        c: 'Conferencias',
        d: 'Concursos',
        e: 'Activaciones',
        f: 'Otros'
    };

    const subtipos = {
        a: ['Culturales', 'Deportivos'],
        b: ['Culturales', 'Deportivos'],
        c: ['Culturales', 'Deportivos', 'Académico', 'Salud', 'Consejería', 'Responsabilidad Social'],
        d: ['Culturales', 'Deportivos', 'Académico', 'Salud', 'Consejería', 'Responsabilidad Social'],
        e: ['Culturales', 'Deportivos', 'Académico', 'Salud', 'Consejería', 'Responsabilidad Social'],
        f: ['Culturales', 'Deportivos', 'Académico', 'Salud', 'Consejería', 'Responsabilidad Social']
    };

    const [tipoEventoSeleccionado, setTipoEventoSeleccionado] = useState('');

    const handleTipoEventoChange = (event) => {
        setTipoEventoSeleccionado(event.target.value);
    };

    return (
        <div className="row mb-3 border-bottom pb-3">
            <div className="col">
                <label htmlFor="nombreEvento" className="form-label">Nombre Evento</label>
                <input type="text" className="form-control"
                    id="nombreEvento" placeholder="Nombre"
                    {...register('nombreEvento', { required: true, maxLength: 100, })} />
            </div>
            <div className="col">
                <label htmlFor="descripcionEvento" className="form-label">Descripcion del Evento</label>
                <input type="text" className="form-control"
                    id="descripcionEvento" placeholder="Descripción"
                    {...register('detalleEvento', { required: true, maxLength: 400 })} />
            </div>
            <div className="col">
                <label htmlFor="tipoEvento" className="form-label">Tipo de Evento</label>
                <select className="form-select" id="tipoEvento" {...register('tipoEvento')} onChange={handleTipoEventoChange}>
                    <option value="">Seleccionar tipo de evento</option>
                    {
                        Object.entries(eventos).map(([key, ev]) => (
                            <option key={key} value={key}>{ev}</option>
                        ))
                    }
                </select>
            </div>
            <div className="col">
                <label htmlFor="subtipoEvento" className="form-label">SubTipo de Evento</label>
                <select className="form-select" id="subtipoEvento" {...register('subtipoEvento')}>
                    <option value="">Seleccionar subtipo de evento</option>
                    {
                        tipoEventoSeleccionado && subtipos[tipoEventoSeleccionado].map((sub, index) => (
                            <option key={index}>{sub}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    )
}

export default Evento;
