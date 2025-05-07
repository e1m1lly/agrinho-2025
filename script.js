
// Comentários persistentes com editar/excluir
const formComentario = document.getElementById('form-comentario');
const listaComentarios = document.getElementById('lista-comentarios');
const inputComentario = document.getElementById('comentario');

let comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];

function salvarComentarios() {
  localStorage.setItem('comentarios', JSON.stringify(comentarios));
}

function renderizarComentarios() {
  listaComentarios.innerHTML = '';
  comentarios.forEach((comentario, index) => {
    const p = document.createElement('p');
    p.innerHTML = `<span>${comentario}</span>
      <button onclick="editarComentario(${index})">Editar</button>
      <button onclick="excluirComentario(${index})">Excluir</button>`;
    listaComentarios.appendChild(p);
  });
}

function editarComentario(index) {
  const novoTexto = prompt("Editar comentário:", comentarios[index]);
  if (novoTexto !== null) {
    comentarios[index] = novoTexto;
    salvarComentarios();
    renderizarComentarios();
  }
}

function excluirComentario(index) {
  if (confirm("Deseja excluir este comentário?")) {
    comentarios.splice(index, 1);
    salvarComentarios();
    renderizarComentarios();
  }
}

formComentario.addEventListener('submit', function(e) {
  e.preventDefault();
  const texto = inputComentario.value.trim();
  if (texto) {
    comentarios.push(texto);
    salvarComentarios();
    renderizarComentarios();
    inputComentario.value = '';
  }
});

// Renderiza ao carregar a página
renderizarComentarios();
