"use strict";

const form = document.getElementById("form-imc");
const pesoEl = document.getElementById("peso");
const alturaEl = document.getElementById("altura");

const msgPeso = document.getElementById("alertPeso");
const msgAltura = document.getElementById("alertAltura");

const imcOut = document.getElementById("imc");
const statusOut = document.getElementById("status");

const limparBtn = document.getElementById("limpar");

function parsePtNumber(value) {
  // aceita "1,75" e "1.75"
  const v = String(value ?? "")
    .trim()
    .replace(",", ".");
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
}

function setError(input, msgEl, message) {
  input.classList.add("is-invalid");
  msgEl.textContent = message;
}

function clearError(input, msgEl) {
  input.classList.remove("is-invalid");
  msgEl.textContent = "";
}

function clearAllErrors() {
  clearError(pesoEl, msgPeso);
  clearError(alturaEl, msgAltura);
}

function classifyImc(imc) {
  if (imc < 18.5) return "Baixo peso";
  if (imc < 25) return "Peso normal";
  if (imc < 30) return "Sobrepeso";
  if (imc < 35) return "Obesidade grau I";
  if (imc < 40) return "Obesidade grau II";
  return "Obesidade grau III";
}

function resetResult() {
  imcOut.textContent = "—";
  statusOut.textContent = "—";
}

function validate() {
  clearAllErrors();

  const peso = parsePtNumber(pesoEl.value);
  const altura = parsePtNumber(alturaEl.value);

  let ok = true;

  // Peso
  if (!pesoEl.value.trim()) {
    setError(pesoEl, msgPeso, "O campo peso está vazio.");
    ok = false;
  } else if (!Number.isFinite(peso)) {
    setError(pesoEl, msgPeso, "Digite um número válido (ex: 80,2).");
    ok = false;
  } else if (peso <= 0 || peso > 500) {
    setError(pesoEl, msgPeso, "Informe um peso entre 1 e 500 kg.");
    ok = false;
  }

  // Altura
  if (!alturaEl.value.trim()) {
    setError(alturaEl, msgAltura, "O campo altura está vazio.");
    ok = false;
  } else if (!Number.isFinite(altura)) {
    setError(alturaEl, msgAltura, "Digite um número válido (ex: 1,75).");
    ok = false;
  } else if (altura < 0.5 || altura > 2.5) {
    setError(alturaEl, msgAltura, "Informe uma altura entre 0,50 e 2,50 m.");
    ok = false;
  }

  return ok ? { peso, altura } : null;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = validate();
  if (!data) return;

  const { peso, altura } = data;

  const imc = peso / (altura * altura);
  imcOut.textContent = imc.toFixed(2);
  statusOut.textContent = classifyImc(imc);
});

limparBtn.addEventListener("click", () => {
  pesoEl.value = "";
  alturaEl.value = "";
  clearAllErrors();
  resetResult();
  pesoEl.focus();
});

// Limpa erro ao digitar
[pesoEl, alturaEl].forEach((el) => {
  el.addEventListener("input", () => {
    if (el === pesoEl) clearError(pesoEl, msgPeso);
    if (el === alturaEl) clearError(alturaEl, msgAltura);
  });
});
