const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';

const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');

// Atualiza senha quando checkbox for clicado
for (let i = 0; i < checkbox.length; i++) {
  checkbox[i].onclick = geraSenha;
}

// Atualiza senha ao clicar nos botões + e -
for (let i = 0; i < botoes.length; i++) {
  botoes[i].addEventListener('click', function () {
    if (this.textContent === '+' && tamanhoSenha < 30) {
      tamanhoSenha++;
    } else if (this.textContent === '-' && tamanhoSenha > 1) {
      tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
  });
}

function geraSenha() {
  let alfabeto = '';
  if (checkbox[0].checked) alfabeto += letrasMaiusculas;
  if (checkbox[1].checked) alfabeto += letrasMinusculas;
  if (checkbox[2].checked) alfabeto += numeros;
  if (checkbox[3].checked) alfabeto += simbolos;

  let senha = '';
  for (let i = 0; i < tamanhoSenha; i++) {
    let numeroAleatorio = Math.floor(Math.random() * alfabeto.length);
    senha += alfabeto[numeroAleatorio];
  }

  campoSenha.value = senha;

  if (alfabeto.length > 0) {
    classificaSenha(alfabeto.length);
  }
}

function classificaSenha(tamanhoAlfabeto) {
  let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
  console.log(entropia);

  forcaSenha.classList.remove('fraca', 'media', 'forte');

  if (entropia > 57) {
    forcaSenha.classList.add('forte');
  } else if (entropia > 35) {
    forcaSenha.classList.add('media');
  } else {
    forcaSenha.classList.add('fraca');
  }

  const valorEntropia = document.querySelector('.entropia');
  valorEntropia.textContent =
    "Um computador pode levar até " +
    Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24)) +
    " dias para descobrir essa senha.";
}

// Gera a senha inicialmente ao carregar
geraSenha();