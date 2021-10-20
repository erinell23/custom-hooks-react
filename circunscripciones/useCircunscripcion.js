import { useCallback, useState } from 'react';
import { provincias } from './circunscripcion.json';
export const useCircunscripcion = () => {
    const [circuns, setCircuns] = useState({
        provincias: provincias.map((e) => ({ id: e.id, name: e.nombre })),
        distritos: [],
        corregimientos: []
    });
    
    const handleChangeCirncuns = useCallback(async({ provincia, distrito }) => {
        
        const distritos = await provincia ?
            provincias.find(obj => (obj.id === parseInt(provincia)) && obj)
                ?.distritos.map(e => ({ id: e.id, name: e.nombre?e.nombre:'-Listar Corregiminetos-' }))
            : [];
        const corregimientos = await (provincia && distrito) ? (
            provincias.find(obj => (obj.id === parseInt(provincia)) && obj)
                ?.distritos.find(obj2 => (obj2.id === parseInt(distrito)) && obj2)
                ?.corregimientos.map(e => ({ id: e.id, name: e.nombre }))
        ) : [];
        setCircuns({
            provincias: provincias.map((e) => ({ id: e.id, name: e.nombre })),
            distritos: distritos,
            corregimientos: corregimientos
        });
    },[setCircuns]);
    return [circuns, handleChangeCirncuns];
}
