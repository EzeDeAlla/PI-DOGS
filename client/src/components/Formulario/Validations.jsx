export function validation(input){
    let errors ={};

    if(!input.name){
        errors.name ="El nombre es obligatorio";
    }else if(input.name.search(/^[a-zA-Z\s]*$/) ){
        errors.name ="No se permiten numeros ni simbolos en el nombre"
    }
    if(!input.minHeight){
        errors.minHeight ="La altura minima es obligatoria";
    }else if( parseInt(input.minHeight) > parseInt(input.maxHeight)){
        errors.minHeight = "La altura minima no puede ser mayor a la maxima";
    }else if(input.minHeight < 0){
        errors.minHeight = "No se permiten los numeros negativos "
    }
    if(!input.maxHeight){
        errors.maxHeight ="La altura maxima es obligatoria";
    }else if( parseInt(input.maxHeight) < parseInt(input.minHeight) ){
        errors.maxHeight = "La altura maxima no puede ser menor a la minima";
    }
    if(!input.minWeight){
        errors.minWeight ="El peso minimo es obligatorio";
    }else if( parseInt(input.minWeight) > parseInt(input.maxWeight)){
        errors.minWeight = "El peso minimo no puede ser mayor al maximo";
    }
    if(!input.maxWeight){
        errors.maxWeight ="El peso maximo es obligatorio";
    }else if( parseInt(input.maxWeight) < parseInt(input.minWeight) ){
        errors.maxWeight = "El peso maximo no puede ser menor al minimo";
    }
    if(!input.minlife_span){
        errors.minlife_span ="La esperanza minima de vida es obligatoria";
    }else if( parseInt(input.minlife_span) > parseInt(input.maxlife_span)){
        errors.minlife_span = "La esperanza minima de vida no puede ser mayor a la maxima";
    }
    if(!input.maxlife_span){
        errors.maxlife_span ="La esperanza maxima de vida es obligatoria";
    }else if( parseInt(input.maxlife_span) < parseInt(input.minlife_span) ){
        errors.maxlife_span = "La esperanza maxima de vida ano puede ser menor a la minima";
    }
    
    return errors;

    
}