const validateEmail = (field_name, field_value) => {
    const regex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim

    if(!(regex.test(field_value))){
        return `${field_name} debe ser un email válido`
    }
    return null
}

const validateMinLength = (field_name, field_value) => {
    if(field_name === "name" && field_value.length <= 4){
        return `${field_name} debe 5 caracteres o más`
    }

    if(field_name === "password" && field_value.length <= 7){
        return `${field_name} debe tener 8 caracteres o más`
    }

    return null
}


const validateString = (field_name, field_value) => {
    if((typeof field_value) != 'string'){
        return `${field_name} debe ser una cadena de texto`
    }

    return null
}

const validateNumber = (field_name, field_value) => {
    if((typeof field_value) != 'number'){
        return `${field_name} debe ser un número`
    }

    return null
}


export { validateEmail, validateMinLength, validateNumber, validateString }