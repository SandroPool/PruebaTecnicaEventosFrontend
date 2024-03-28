import React, { useEffect, useState } from 'react';

const AgruparElementos = (lista, elementosPorGrupo) => {
    const grupos = [];
    for (let i = 0; i < lista.length; i += elementosPorGrupo) {
        grupos.push(lista.slice(i, i + elementosPorGrupo));
    }
    return grupos;
};

const Dirigido = ({register}) => {
    const [campus, setCampus] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [campusSeleccionados, setCampusSeleccionados] = useState([]);

    const campusAgrupados = AgruparElementos(campus, 5);

    const getCampus = async () => {
        try {
            const query = 'http://127.0.0.1:4000/api/campus';
            const response = await fetch(query);
            const datos = await response.json();
            setCampus(datos);
            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCampus();
    }, []);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setCampusSeleccionados([...campusSeleccionados, value]);
        } else {
            setCampusSeleccionados(campusSeleccionados.filter(campusId => campusId !== value));
        }
    };

    const handleCapacidadChange = (event) => {
        const value = event.target.value;
        setCapacidad(value);
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
                <label className="form-label">Dirigido a</label>
                <div className="row">
                    <h4>Campus</h4>
                    {campusAgrupados.map((grupo, indiceGrupo) => (
                        <div className="col-md-4" key={indiceGrupo}>
                            {grupo.map(({ id, nombre }) => (
                                <div className="form-check" key={id}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="dirigidoA"
                                        id={`dirRadio${id}`}
                                        value={id}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label className="form-check-label" htmlFor={`dirRadio${id}`}>
                                        {nombre}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className="col">
                <label htmlFor="capacidad" className="form-label">Capacidad - Vacantes</label>
                <input
                    type="number"
                    className="form-control"
                    id="capacidad"
                    placeholder="Capacidad"
                    onChange={handleCapacidadChange}
                    {...register('capacidaVacantes', { required: true, min:1 })}
                />
            </div>
        </div>
    );
};

export default Dirigido;
