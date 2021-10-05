export function validateName(text){
    const regx = RegExp(/^[a-z ,.'-]+$/i);
    return !regx.test(text)
}

export function validateEmail(text){
    const regx = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    return !regx.test(text)
}

export function validatePassword(text){
    // const regx = RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
    const regx = RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/);
    return !regx.test(text)
}

export function validateConfirmPass(entPass, cnfPass){
    if(entPass === cnfPass){
        return false;
    }else{
        return true;
    }
}