let message = {
    cell: 'El campo debe ser un telefono celular (6000-0000)',
    phone: 'El campo debe ser un telefono recidencial (123-4567)',
    cellorphone: 'El campo debe ser un telefono celular o recidencial valido',
    cedula: 'El campo debe ser una cédula (8-88-8888)',
    required: 'El campo es requerido',
    email: 'El campo debe ser un correo (email@correo.com)',
    min: 'El campo no debe ser menor a {?}',
    max: 'El campo no debe ser mayor a {?}',
    minlength: `El campo debe tener una longitud mayor a {?}`,
    maxlength: `El campo debe tener una longitud menor a {?}`,
}

export const setMessage = (newMessage) => {
    message = { ...message, ...newMessage }
}
const validations = {
    correct: (regex, target) => {
        if (!regex.test(target.value) && target.value.length > 0) {
            target.value = target.value.substring(0, target.value.length - 1);
            validations.correct(regex, target);
        }
    },
    custom: (target, startWhen) => {
        if (startWhen === "change" && target.value) {
            if (target.attributes.letter && !(/^[A-Z\u00f1 ]+$/i.test(target.value))) {
                validations.correct(/^[A-Z\u00f1 ]+$/i, target);
            }
            if (target.attributes.integer && !(/^[1-9]+$/.test(target.value))) {
                validations.correct(!/^[1-9]+$/, target);
            }
            if (target.attributes.double && !(/^[\d]+[.]?([\d]+)?$/.test(target.value))) {
                validations.correct(/^[\d]+[.]?([\d]+)?$/, target);
            }
            if (target.attributes.alphanumeric && !(/^[0-9a-zA-Z]+$/.test(target.value))) {
                validations.correct(/^[0-9a-zA-Z]+$/, target);
            }
        }
        if (target.attributes.cell && target.value) {
            startWhen === "change" && validations.correct(/^((6[\d]{0,7})|(6[\d]{3}-[\d]{0,4}))$/, target);
            if (/^6[\d]{3}-[\d]{4}$/.test(target.value) || /^6[\d]{7}$/.test(target.value) || !target.value) {
                target.value = target.value.replace(/^(6[\d]{3})([\d]{4})$/, "$1-$2");
            } else {
                return { valid: false, msj: message.cell };
            }
        }
        if (target.attributes.phone && target.value) {
            startWhen === "change" && validations.correct(/^(([1-9][\d]{0,6})|([1-9][\d]{2}-[\d]{0,4}))$/, target);
            if (/^[1-9][\d]{2}-[\d]{4}$/.test(target.value) || /^[1-9][\d]{6}$/.test(target.value) || !target.value) {
                target.value = target.value.replace(/^([1-9][\d]{2})([\d]{4})$/, "$1-$2");
            } else {
                return { valid: false, msj: message.phone };
            }
        }
        if (target.attributes.cellorphone && target.value) {
            startWhen === "change" && validations.correct(/^(([1-9][\d]{0,6})|([1-9][\d]{2}-[\d]{0,4})|(6[\d]{0,7})|(6[\d]{3}-[\d]{0,4})|(6[\d]{2}-[\d]{0,5}))$/, target);
            const val = target.value.replace('-', '');
            if (/^6[\d]{7}$/.test(val) || /^6[\d]{2}-[\d]{0,5}$/.test(val) || !target.value) {
                target.value = val.replace(/^(6[\d]{3})([\d]{4})$/, "$1-$2");
            } else if (/^[1-9][\d]{6}$/.test(val) || /^6[\d]{3}-[\d]{3}$/.test(val)) {
                target.value = val.replace(/^([1-9][\d]{2})([\d]{4})$/, "$1-$2");
            } else {
                return { valid: false, msj: message.cellorphone };
            }
        }
        if (target.attributes.cedula && target.value) {
            target.value = target.value.toUpperCase();
            if (!(/^([1-9]|1[0-3]|N|E|PE)[-][1-9]([\d]{1,3})?[-][1-9]([\d]{1,3})?$/.test(target.value))) {
                return { valid: false, msj: message.cedula };
            }
        }
        return null;
    },
    native: (target) => {

        if (!target.attributes.disabled) {
            if (target.attributes.required && (!target.checked && !target.value)) {
                return { valid: false, msj: message.required };
            }
            if (target.attributes.email && !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})$/.test(target.value))) {
                return { valid: false, msj: message.email };
            }
            if (target.attributes.min) {
                if (parseInt(target.attributes.min.value) > parseInt(target.value || 0)) {
                    return { valid: false, msj: message.min.replace('{?}', target.attributes.min.value) };
                } else if (["datetime", "datetime-local", "time", "date", "month", "week"].indexOf(target.type) >= 0
                    && new Date(target.attributes.min.value) > new Date(target.value)) {
                    return { valid: false, msj: message.min.replace('{?}', target.attributes.min.value) };
                }
            }
            if (target.attributes.max) {
                if (parseInt(target.value || 0) > parseInt(target.attributes.max.value)) {
                    return { valid: false, msj: message.max.replace('{?}',target.attributes.max.value)  };
                } else if (["datetime", "datetime-local", "time", "date", "month", "week"].indexOf(target.type) >= 0
                    && new Date(target.value) > new Date(target.attributes.max.value)) {
                    return { valid: false, msj: message.max.replace('{?}',target.attributes.max.value)  };
                }
            }
            if (target.attributes.minlength && parseInt(target.attributes.maxlength.value) > parseInt(target.value.length)) {
                return { valid: false, msj: message.minlength.replace('{?}', target.attributes.minlength.value) };
            }
            if (target.attributes.maxlength && parseInt(target.value.length) > parseInt(target.attributes.maxlength.value)) {
                return { valid: false, msj: message.maxlength.replace('{?}',target.attributes.maxlength.value) };
            }
        }
        return null;
    },
    actions: (target, startWhen) => {
        if (target.attributes.uppercase && target.attributes.uppercase.value === startWhen) {
            target.value = target.value.toUpperCase();
        }
        if (target.attributes.lowercase && target.attributes.lowercase.value === startWhen) {
            target.value = target.value.toLowerCase();
        }
        if (target.attributes.capitalize && target.attributes.capitalize.value === startWhen) {
            target.value = target.value.toLowerCase()
                .split(' ')
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ');
        }
        if (target.attributes.trim && target.attributes.trim.value === startWhen) {
            target.value = target.value.trim()
        }
        return null;
    },
    init: (target, startWhen) => {
        return validations.actions(target, startWhen) || validations.native(target) || validations.custom(target, startWhen) || { valid: true };
    }
}
const initStyles = () => {
    const style = document.createElement('style');
    style.innerHTML = `
    .spn-validate{
        display: block;
        width: 100%;
        margin-top: .25rem;
        font-size: .875em;
        color: #dc3545!important;
    }
    .inp-invalid{
        border: 1px solid #dc3545!important;
        
    }
    .inp-invalid:focus{
        border-color: #dc3545!important;
    }
    `;
    document.getElementsByTagName('head')[0].appendChild(style);
}
initStyles();


/**
 * valida los input al cambiar el valor
 * @param {*} target 
 * 
 */
export const inputValidate = (target) => {
    if (typeof target === 'object' && Object.keys(target).length > 0) {
        Array.from(target.parentNode.childNodes).forEach((e) => {
            if (e.classList && e.classList.contains("spn-validate")) {
                e.remove();
                target.classList.remove("inp-invalid");
            }
        });
        const valid = validations.init(target, "change");
        if (valid && !valid.valid) {
            const msj = document.createElement("span");
            msj.className = "spn-validate"
            msj.innerHTML = valid.msj;
            target.parentNode.insertBefore(msj, target.nextSibling);
            target.classList.add("inp-invalid");
        }
        return valid?.valid;
    }
    return null;
}
/**
 * valida el formulario
 */
export const formValidate = (frm) => {
    let isValid = true;
    Array.from(frm).forEach((c) => {
        if (c.attributes.required || c.value) {
            Array.from(c.parentNode.childNodes).forEach((e) => {
                if (e.classList && e.classList.contains("spn-validate")) {
                    e.remove();
                    c.classList.remove("inp-invalid");
                }
            });
            const valid = validations.init(c, "submit");
            if (valid && !valid.valid) {
                const msj = document.createElement("span");
                msj.className = "spn-validate"
                msj.innerHTML = valid.msj;
                c.parentNode.insertBefore(msj, c.nextSibling);
                c.classList.add("inp-invalid");
                c.focus();
                isValid = false;
            }
        }
    });
    return isValid;
}