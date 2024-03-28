import React from 'react';
import Evento from './Evento';
import Organizado from './Organizado';
import Dirigido from './Dirigido';
import Ubicacion from './Ubicacion';
import Fecha from './Fecha';


import { useForm } from 'react-hook-form';

const Formulario = _ => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data); 
    };

    return (
        <>
            <h1 className="mb-4 text-center ">Crear Evento</h1>
            <div className="container mt-5 mb-5 ">
                <h1 className="mb-4 border-bottom border-primary">Manual</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Evento register={register} />
                    {errors.nombreEvento?.type && <span className="alert alert-danger " role="alert">Nombre del evento es requerido.</span>}
                    {errors.detalleEvento?.type && <span className="alert alert-danger m-5" role="alert">Descriipción del evento es requerido.</span>}
                    <hr />
                    <Organizado register={register} />
                    <Dirigido register={register} />
                    <div className="col d-flex justify-content-end">
                        {errors.capacidaVacantes?.type && <span className='alert alert-danger' role='alert'>Se Requiere poner capacidad Minimo de 1</span>}
                    </div>
                    <hr />
                    <Ubicacion register={register} />
                    <Fecha register={register} />
                    <div className="row">
                        <div className="col">
                            <button type="reset" className="btn btn-secondary btn-lg">Cancelar</button>
                        </div>
                        <div className="col">
                            <button type="submit" className="btn btn-info btn-lg">Programar</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Formulario;

