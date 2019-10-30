function mascaraCpf(i){
    var v = i.value;
    if(isNaN(v[v.length-1])){ // impede entrar outro caractere que não seja número
        i.value = v.substring(0, v.length-1);
        return;
    }
    i.setAttribute("maxlength", "14");
    if (v.length == 3 || v.length == 7) i.value += ".";
        if (v.length == 11) i.value += "-";
}
function mascaraCnpj(t){
    var cnpj = t.value
    if(isNaN(cnpj[cnpj.length-1])){ // impede entrar outro caractere que não seja número
        t.value = cnpj.substring(0, cnpj.length-1);
        return;
    }
    t.setAttribute("maxlength", "18");
    if (cnpj.length == 2 || cnpj.length == 6) t.value += ".";
    if (cnpj.length == 10) t.value += "/";
    if (cnpj.length == 15) t.value += "-";
}
function mascaraCep(c) {
    var cep = c.value;
    if(isNaN(cep[cep.length-1])){ // impede entrar outro caractere que não seja número
        i.value = cep.substring(0, cel.length-1);
        return;
    }
    c.setAttribute("maxlength", "9");
    if (cep.length == 5) c.value += "-";
}
function mascaraTel(t){
    var tel = t.value
    if(isNaN(tel[tel.length-1])){ // impede entrar outro caractere que não seja número
        t.value = tel.substring(0, tel.length-1);
        return;
    }
    t.setAttribute("maxlength", "13");
    if (tel.length == 2) t.value += " ";
    if (tel.length == 8) t.value += "-";
}
function mascaraData(d){
    var data = d.value
    if(isNaN(data[data.length-1])){ // impede entrar outro caractere que não seja número
        d.value = data.substring(0, data.length-1);
        return;
    }
    d.setAttribute("maxlength", "10");
    if (data.length == 2 || data.length == 5) d.value += "/";
}