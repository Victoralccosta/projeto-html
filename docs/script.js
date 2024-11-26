let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
let total = 0;
let tempoPreparoTotal = 0;

// Função para adicionar um item ao carrinho
function adicionarAoCarrinho(nome, preco, tempoPreparo) {
    // Verifica se o item já está no carrinho
    const itemExistente = carrinho.find(item => item.nome === nome && item.preco === preco);
    if (itemExistente) {
        return;  // Se o item já existe, apenas não faz nada
    }

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

        // Atualiza o total e tempo de preparo
        total += item.preco;
        tempoPreparoTotal += item.tempoPreparo;
    });

    // Atualiza o total na interface
    document.getElementById('total').textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Função para finalizar o pedido
function finalizarPedido() {
    const mensagem = document.getElementById('mensagem');
    mensagem.textContent = `Obrigado por seu pedido! Total: R$ ${total.toFixed(2)}. Seu pedido está sendo preparado e será entregue em ${tempoPreparoTotal} minutos.`;

    // Limpa o carrinho
    carrinho = [];
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Atualiza a interface
    total = 0;
    tempoPreparoTotal = 0;
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

// Exibe os produtos no cardápio
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
atualizarCarrinho();
