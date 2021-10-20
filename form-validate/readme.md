# hook para obtener las useForm con validaciones en panama
El hooks maneja el estado de formulario y puede validar diferentes campos

## instalacion
clonelo del repositorio 

`$ git clone url`



## utilizacion
importe el custon hook

`import { useForm } from '../hooks/useForm''`

extraer lo requerido de useForm y enviar el estado inicial

`const { formValues, formInputChange, formChangeAll, formValidate, formChangeClean } = useForm(formValuesInit);`



#### ejemplo de creacion de un input

`<input type="text" className="form-control" name="primerNombre"
    value={formValues.primerNombre} onChange={formInputChange}
    placeholder="-" required letter="" capitalize="change" trim="submit" disabled
/>`

