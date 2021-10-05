// Author Nirmal Bhimani B00878753
export function validateCourseName(text){
    if(text.length < 8){
        return true;
    }
    return false;
}

export function courseName(text){
    if(text == "" || text == undefined || text == null){
        return true;
    }
    else{
        return false;
    }
}

export function courseDescription(text){
    if(text == "" || text == undefined || text == null){
        return true;
    }
    else{
        return false;
    }
}

export function courseCredit(text){ 
    if(text == "" || text == undefined || text == null){
        return true;
    }
    else{
        return false;
    }
}

export function fileValidation(file){
    var fileName, fileExtension;
      fileName = file.name;
      fileExtension = fileName.replace(/^.*\./, '');
      if (fileExtension.toLowerCase() == 'png' || fileExtension.toLowerCase() == 'jpg' || fileExtension.toLowerCase() == 'jpeg' ) {
       readImageFile(file);            
    }
    else {
        return true;
    }  
}

function readImageFile(file) {    
    var reader = new FileReader();
    reader.onload = function (e) {
        var img = new Image();      
        img.src = e.target.result;
        img.onload = function () {
            var w = this.width;
            var h = this.height;
           return false;
        }
    };
    reader.readAsDataURL(file);
}