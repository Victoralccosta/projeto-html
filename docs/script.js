// Inicializa a variável carrinho
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Função para atualizar o carrinho na interface
function atualizarCarrinho() {
    const itensCarrinho = document.getElementById('itensCarrinho');
    itensCarrinho.innerHTML = ''; // Limpa o carrinho na interface

    let total = 0;  // Zera o total para recalcular
    let tempoPreparoTotal = 0;  // Zera o tempo de preparo total

    // Exibe os itens no carrinho
    carrinho.forEach(item => {
        const itemElement = document.createElement('li');
        itemElement.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)} - ${item.tempoPreparo} min`;

        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';
        botaoRemover.classList.add('remover');
        botaoRemover.onclick = () => removerDoCarrinho(item, itemElement);
        itemElement.appendChild(botaoRemover);
        itensCarrinho.appendChild(itemElement);

        total += item.preco;
        tempoPreparoTotal += item.tempoPreparo;
    });

    // Atualiza o total na interface
    document.getElementById('total').textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Função para adicionar um item ao carrinho
function adicionarAoCarrinho(nome, preco, tempoPreparo) {
    const item = { nome, preco, tempoPreparo };
    carrinho.push(item);

    // Atualiza o localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Atualiza a interface
    atualizarCarrinho();
}

// Função para remover um item do carrinho
function removerDoCarrinho(item, itemElement) {
    carrinho = carrinho.filter(c => c !== item);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Atualiza a interface
    atualizarCarrinho();
}

// Função para finalizar o pedido
function finalizarPedido() {
    const mensagem = document.getElementById('mensagem');
    mensagem.textContent = `Obrigado por seu pedido! Total: R$ ${total.toFixed(2)}. Seu pedido está sendo preparado e será entregue em ${tempoPreparoTotal} minutos.`;

    // Limpa o carrinho
    carrinho = [];
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Atualiza a interface
    atualizarCarrinho();
}

// Renderiza o cardápio
const produtos = {
    "Macarrão à Bolonhesa": { preco: 79.00, tempo: 40 },
    "Macarrão Penne": { preco: 65.00, tempo: 30 },
    "Espaguete Carbonara": { preco: 80.00, tempo: 35 },
    "Farfalle da Casa": { preco: 75.00, tempo: 40 },
    "Ravioli Prime": { preco: 65.00, tempo: 30 },
    "Fusilli de Salmão Grelhado": { preco: 90.00, tempo: 45 },
    "Tagliatelle Italiana": { preco: 85.00, tempo: 50 },
    "Capellini com Prosciutto": { preco: 55.00, tempo: 25 },
    "Macaroni Cheddar": { preco: 80.00, tempo: 20 }
};

// Renderiza os itens do cardápio
const cardapio = document.getElementById('cardapio');
for (let prato in produtos) {
    const produto = document.createElement('div');
    produto.classList.add('produto');
    produto.innerHTML = `
        <h3>${prato}</h3>
        <p>Preço: R$ ${produtos[prato].preco.toFixed(2)}</p>
        <p>Tempo de preparo: ${produtos[prato].tempo} minutos</p>
        <button onclick="adicionarAoCarrinho('${prato}', ${produtos[prato].preco}, ${produtos[prato].tempo})">Adicionar ao carrinho</button>
    `;
    cardapio.appendChild(produto);
}

// Carrega o carrinho ao carregar a página
window.onload = function() {
    atualizarCarrinho(); // Para inicializar o carrinho
};

// Funções para controle do slider

// Variáveis para controle do slider
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const slidesContainer = document.querySelector('.slides');
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

// Função para mudar para o slide anterior
function showPreviousSlide() {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    updateSliderPosition();
}

// Função para mudar para o próximo slide
function showNextSlide() {
    currentSlide++;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    updateSliderPosition();
}

// Função para atualizar a posição do slider
function updateSliderPosition() {
    const newTransformValue = -currentSlide * 100; // Desloca os slides para a esquerda
    slidesContainer.style.transform = `translateX(${newTransformValue}%)`;
}

// Adiciona os ouvintes de evento para os botões
prevButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener('click', showNextSlide);

// Inicializa o slider com o primeiro slide
updateSliderPosition();

// Função para adicionar o item do slider ao carrinho
document.querySelectorAll('.button.pedir').forEach(button => {
    button.addEventListener('click', (event) => {
        const nome = event.target.getAttribute('data-nome');
        const preco = parseFloat(event.target.getAttribute('data-preco'));
        const tempoPreparo = 20;  // Defina um tempo padrão de preparo ou calcule se necessário

        adicionarAoCarrinho(nome, preco, tempoPreparo);
    });
});
