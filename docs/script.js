// Seu código anterior aqui

// Função para adicionar um item ao carrinho
function adicionarAoCarrinho(nome, preco, tempoPreparo) {
    const item = { nome, preco, tempoPreparo };
    carrinho.push(item);

    // Atualiza o localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Atualiza a interface
    total = 0;
    tempoPreparoTotal = 0;
    atualizarCarrinho();
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

// Função para atualizar o carrinho na interface
function atualizarCarrinho() {
    const itensCarrinho = document.getElementById('itensCarrinho');
    itensCarrinho.innerHTML = ''; // Limpa a lista do carrinho

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

// Adicionar ouvintes de evento para os botões "Pedir agora"
const botoesPedir = document.querySelectorAll('.pedir');

botoesPedir.forEach(botao => {
    botao.addEventListener('click', function() {
        // Obtém o nome e o preço do item a partir dos atributos do botão
        const nome = botao.getAttribute('data-nome');
        const preco = parseFloat(botao.getAttribute('data-preco').replace(',', '.')); // Converter preço para número

        // Definir tempo de preparo arbitrário (pode ser ajustado de acordo com o item)
        const tempoPreparo = 15; // Exemplo: 15 minutos

        // Chama a função para adicionar o item ao carrinho
        adicionarAoCarrinho(nome, preco, tempoPreparo);
    });
});


