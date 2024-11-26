// Função para finalizar o pedido
function finalizarPedido() {
    // Limpa o carrinho no localStorage
    localStorage.removeItem('carrinho');

    // Limpa o array do carrinho
    carrinho = [];

    // Reinicia o total e o tempo total
    total = 0;
    tempoPreparoTotal = 0;

    // Atualiza a interface para refletir que o carrinho está vazio
    atualizarCarrinho();

    // Exibe uma mensagem de confirmação ou redireciona para uma nova página, por exemplo
    alert('Pedido finalizado com sucesso!');
}

// Função para adicionar um item ao carrinho
function adicionarAoCarrinho(nome, preco, tempoPreparo) {
    const item = { nome, preco, tempoPreparo };
    carrinho.push(item);

    // Atualiza o localStorage com os novos itens no carrinho
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Atualiza a interface
    atualizarCarrinho();
}

// Função para atualizar o carrinho na interface
function atualizarCarrinho() {
    const itensCarrinho = document.getElementById('itensCarrinho');
    itensCarrinho.innerHTML = ''; // Limpa a lista do carrinho

    total = 0;  // Resetando o total a cada atualização
    tempoPreparoTotal = 0; // Resetando o tempo total

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

    // Atualiza o total
    document.getElementById('total').textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Função para remover um item do carrinho
function removerDoCarrinho(item, itemElement) {
    carrinho = carrinho.filter(c => c !== item);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Atualiza o total
    total -= item.preco;
    tempoPreparoTotal -= item.tempoPreparo;

    // Remove da interface
    itemElement.remove();

    // Atualiza o total na interface
    document.getElementById('total').textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Funções para controle do slider
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

// Adicionar ouvintes de evento para os botões "Pedir agora"
const botoesPedir = document.querySelectorAll('.pedir');
botoesPedir.forEach(botao => {
    botao.addEventListener('click', function() {
        const nome = botao.getAttribute('data-nome');
        const preco = parseFloat(botao.getAttribute('data-preco').replace(',', '.')); // Converter preço para número
        const tempoPreparo = 15; // Tempo de preparo arbitrário
        adicionarAoCarrinho(nome, preco, tempoPreparo);
    });
});
// Função para finalizar o pedido
function finalizarPedido() {
    // Limpa o carrinho no localStorage
    localStorage.removeItem('carrinho');

    // Limpa o array do carrinho
    carrinho = [];

    // Reinicia o total e o tempo total
    total = 0;
    tempoPreparoTotal = 0;

    // Atualiza a interface para refletir que o carrinho está vazio
    atualizarCarrinho();

    // Exibe uma mensagem de confirmação ou redireciona para uma nova página, por exemplo
    alert('Pedido finalizado com sucesso!');
}
