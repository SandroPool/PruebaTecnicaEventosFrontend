import React, { useEffect, useState } from 'react';

const Ubicacion = () => {
    const [ubicaciones, setUbicaciones] = useState([]);
    const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState('Presencial');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const getUbicaciones = async () => {
        try {
            const query = 'http://127.0.0.1:4000/api/espacios';
            const response = await fetch(query);
            const datos = await response.json();
            setUbicaciones(datos);
            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getUbicaciones();
    }, []);

    const handleUbicacionChange = (event) => {
        setUbicacionSeleccionada(event.target.value);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="row mb-3 border-bottom pb-3">
            <div className="col">
                <label className="form-label">Ubicación</label>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="ubicacion"
                        id="ubiRadio1"
                        value="Presencial"
                        checked={ubicacionSeleccionada === 'Presencial'}
                        onChange={handleUbicacionChange}
                    />
                    <label className="form-check-label" htmlFor="ubiRadio1">
                        Presencial
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="ubicacion"
                        id="ubiRadio2"
                        value="Remoto"
                        checked={ubicacionSeleccionada === 'Remoto'}
                        onChange={handleUbicacionChange}
                    />
                    <label className="form-check-label" htmlFor="ubiRadio2">
                        Remoto
                    </label>
                </div>
            </div>
            <div className="col">
                <label htmlFor="ubicaciones" className="form-label">Ubicaciones</label>
                <select
                    className="form-select"
                    id="ubicaciones"
                    disabled={ubicacionSeleccionada !== 'Presencial'} 
                >
                    <option value="">Seleccionar ubicación</option>
                    {ubicaciones.map(({ id, nombre }) => (
                        <option key={id}>{nombre}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Ubicacion;
