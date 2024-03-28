import React, { useEffect, useState } from 'react'

const Organizado = () => {

    const organizadores = {
        a: 'Vida Universitaria',
        b: 'Empleabilidad',
        c: 'Internacional',
        d: 'Consejería',
        e: 'Salud',
        f: 'Responsabilidad Social',
        g: 'Académico'
    };
    const [docentes, setDocentes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [organizadorSeleccionado, setOrganizadorSeleccionado] = useState('a');


    const getDocentes = async _ => {
        try {
            const query = 'http://127.0.0.1:4000/api/docentes';
            const response = await fetch(query);
            const datos = await response.json();
            setDocentes(datos);
            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getDocentes();
    }, []);

    const handleOrganizadorChange = (event) => {
        setOrganizadorSeleccionado(event.target.value);
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
                <label className="form-label">Organizado por</label>
                {
                    Object.entries(organizadores).map(([key, organizador]) => (
                        <div className="form-check" key={key}>
                            <input
                                className="form-check-input"
                                type="radio"
                                name="organizadoPor"
                                id={`orgRadio${key}`}
                                value={key}
                                checked={organizadorSeleccionado === key}
                                onChange={handleOrganizadorChange}
                            />
                            <label className="form-check-label" htmlFor={`orgRadio${key}`}>
                                {organizador}
                            </label>
                        </div>
                    ))
                }
            </div>

            <div className="col">
                <label htmlFor="docente" className="form-label">Docente</label>
                <select
                    className="form-select"
                    id="docente"
                    disabled={organizadorSeleccionado !== 'g'} // Deshabilitar si no es 'Académico'
                >
                    <option value="">Seleccionar docente</option>
                    {
                        docentes.map(({ id, nombre }) => (
                            <option key={id}>{nombre}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    )
}

export default Organizado
