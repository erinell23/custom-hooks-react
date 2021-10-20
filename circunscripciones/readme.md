# hook para obtener las circunscripciones en panama
las circunscripcion se divide en povincia, distrito, corregimiento

## instalacion
clonelo del repositorio 

`$ git clone url`

## utilizacion
importe el custon hook

`import { useCircunscripcion } from './hooks/useCircunscripcion.js'`

extraer circuns y handleChangeCirncuns de useCircunscripcion
`const [circuns, handleChangeCirncuns] = useCircunscripcion();`

crear manejador de cambio de los select y llamar a handleChangeCirncuns con los valores correspondiente

#### ejemplo para provincia
`handleChangeCirncuns({ provincia: e.target.value, distrito: null });`

#### ejemplo para distrito
`handleChangeCirncuns({ provincia: formValues.provincia, distrito: e.target.value });`

>solo sera necesario para provincia y distrito
