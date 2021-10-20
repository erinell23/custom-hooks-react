import { useCallback, useState } from 'react';
import { inputValidate, formValidate, setMessage } from './validations-forms';


export const useForm = (initialState = {}) => {
    const [formValues, setFormValues] = useState(initialState);
    const formInputChange = ({ target }) => {
        inputValidate(target);
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    /**
     * cambiar todos los valores
     */
    const formChangeAll = useCallback((allValues) => {
        const validState = {};
        for (let cv in allValues) {
            if (allValues.hasOwnProperty(cv)) {
                if (allValues[cv] && String(allValues[cv]).trim()) {
                    validState[cv] = allValues[cv];
                } else {
                    validState[cv] = '';
                }
            }
        }
        setFormValues(validState);
    }, []);
    /**
     * 
     * @param {*} input 
     * @param {*} clean objeto con campos a limpiar ejemplo {nombre:'', id:''}
     */
    const formChangeClean = ({target}, clean) => {
        inputValidate(target);
        setFormValues({
            ...formValues,
            ...clean,
            [target.name]: target.value
        });
    }

    return {formValues, formInputChange, formChangeAll, formValidate, formChangeClean, setMessage};
}