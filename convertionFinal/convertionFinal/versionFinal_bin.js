const nb1 = document.querySelector("#nb1");
const convertir = document.querySelector("#convertir");
const nb2 = document.querySelector("#nb2");
const echanger = document.querySelector("#echange");
const lblNb1 = document.querySelector("#lbl_nb1");
const lblNb2= document.querySelector("#lbl_nb2");

let convert = "bin";
let conv;
let stock = nb1.value;

function convertirEnBinaire(nb){
    let result = new Array();
    let resultInverser = "";
    
    if (/^[0123456789]+$/.test(nb)){
        while (nb != 0) {
            if(nb % 2 === 1){
                result.push('1');
                nb = (nb - 1) / 2;
            }else{
                result.push('0');
                nb = nb / 2;
            }
        
        }
        for (let i = result.length - 1 ; i >= 0 ; i--) {
        resultInverser = resultInverser + result[i];
        }
        console.log(resultInverser);
        nb2.value = resultInverser;
    }else{
        nb2.value = "nombre trop long"
    }
    

    
}

function convertirEnChiffre(bin){
    let result = 0;
    if(/^[01]+$/.test(bin)){
        for (let i = 0 ; i <= bin.length - 1 ; i++){
            if (bin[i] == 1){
                result += 2 ** (bin.length - i - 1);
            }
        }
        console.log(result);
        nb2.value = result;
    }else{
        nb2.value = "nombre trop long"
    }   
}

// convertir.addEventListener("click", () =>{
//         if(nb1.value.trim() != ""){
//             if(convert == "bin"){
//             convertirEnBinaire(Number(nb1.value));
//             }else{
//                 convertirEnChiffre(nb1.value);
//             }
//         }
//     })

echanger.addEventListener("click", () =>{
    let temp;
        if(convert == "bin"){
            convert = "dec";
            lblNb1.textContent = "binaire : ";
            lblNb2.textContent = "decimal : ";
        }else{
            convert = "bin";
            lblNb1.textContent = "decimal : ";
            lblNb2.textContent = "binaire : ";
        }
        console.log("echange")
        if(nb1.value == "nombre trop long" || nb2.value == "nombre trop long"){
            nb1.value = "";
            nb2.value = "";
        }
        temp = nb1.value;
        nb1.value = nb2.value;
        nb2.value = temp;
    })

    let nb1Rows = 0;
    let nb2Rows = 0;
    conv = setInterval(() => {
        if (nb1.value.trim() != stock){
            if(convert == "bin"){
                convertirEnBinaire(Number(nb1.value));
            }else{
                convertirEnChiffre(nb1.value);
            }
            stock = nb1.value;
        }else if(nb1.value.trim() == ""){
            nb2.value = "";            
        }
        if(nb1.value.length - nb1Rows > 23){
            nb1.rows += 1;
            nb1Rows += 23;
        }
        else if(nb1.value.length - nb1Rows < 0){
            nb1.rows -= 1;
            nb1Rows -= 23;
        }
        if(nb2.value.length - nb2Rows > 23){
            nb2.rows += 1;
            nb2Rows += 23;
        }
        else if(nb2.value.length - nb2Rows < 0){
            nb2.rows -= 1;
            nb2Rows -= 23;
        }
    },150);

    nb1.addEventListener("keydown", (e) => {
        if(convert == "dec"){
            if(e.key != "Backspace")
                {
                    if(nb1.value == "nombre trop long"){
                        e.preventDefault();
                        return;
                    }else if (!/^[01]+$/.test(e.key)) {
                        e.preventDefault();
                        return;
                    }
                    
                }
        }else{
            if(e.key != "Backspace"){
            if(nb2.value == "nombre trop long"){
                        e.preventDefault();
                        return;
            }else if(!/^[0123456789]+$/.test(e.key)){
                e.preventDefault();
                return;
            }
        }
        }
    });