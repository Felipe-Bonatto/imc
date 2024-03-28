var peso = document.getElementById('peso')
var altura = document.getElementById('altura')
var requiredPeso = document.getElementById('alertPeso')
var requiredAltura = document.getElementById('alertAltura')
var botao = document.getElementById('botao')

botao.addEventListener('click', function(){

    removeError()

    if (isNaN(peso.value)) {
        errorPesoLetra()
    }else if (peso.value == '') {
        errorPesoVazio()
    }else if (isNaN(altura.value)) {
        errorAlturaLetra()
    }else if (altura.value == '') {
        errorAlturaVazio()
    }else {
        calculoImc()
    }
})


const errorPesoLetra = function (){
    peso.style.border = '3px solid #e63636'
    peso.focus()
    requiredPeso.innerText = 'Digite apenas números'
    peso.value = ''
}

const errorPesoVazio = function () {
    peso.style.border = '3px solid #e63636'
    peso.focus()
    requiredPeso.innerText = 'O campo peso esta vázio'
}

const errorAlturaLetra = function () {
    altura.style.border = '3px solid #e63636'
    altura.focus()
    requiredAltura.innerText = 'Digite apenas números'
    altura.value = ''
}

const errorAlturaVazio = function () {
    altura.style.border = '3px solid #e63636'
    altura.focus()
    requiredAltura.innerText = 'O campo altura esta vázio'
}

const removeError = function () {
    peso.style.border = ''
    altura.style.border = ''
    requiredPeso.innerText = ''
    requiredAltura.innerText = ''
}

const limpar = function () {
    peso.value = ''
    altura.value = ''
}


const calculoImc = function () {
    let imc = document.getElementById('imc')
    let status = document.getElementById('status')
    let resultado = peso.value / (altura.value * altura.value)
    
    if (resultado < 18.5) {
        imc.innerText = (resultado).toFixed(2)
        status.innerText = ('Baixo peso')
        limpar()
    }else if (resultado >= 18.5 && resultado <= 24.99) {
        imc.innerText = (resultado).toFixed(2)
        status.innerText = ('Peso normal')
        limpar()
    }else if (resultado >= 25 && resultado <= 29.99) {
        imc.innerText = (resultado).toFixed(2)
        status.innerText = ('Sobrepeso')
        limpar()
    }else if (resultado >= 30 && resultado <= 34.99) {
        imc.innerText = (resultado).toFixed(2)
        status.innerText = ('Obesidade grau I')
        limpar()
    }else if (resultado >= 35 && resultado <= 39.99) {
        imc.innerText = (resultado).toFixed(2)
        status.innerText = ('Obesidade grau II')
        limpar()
    }else if (resultado >= 40) {
        imc.innerText = (resultado).toFixed(2)
        status.innerText = ('Obesidade grau III')
        limpar()
    }
}