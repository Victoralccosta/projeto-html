let show = true;
const menuContent = document.querySelector('.content');
const menuToggle = menuContent.querySelector('.menu-toggle');


menuToggle.addEventListener('click', () => {

    document.body.style.overflow = show ? 'hidden' : 'initial'

    menuContent.classList.toggle('on', show);
    show = !show;
    let carrinho = [];

// Função para adicionar itens ao carrinho
function adicionarAoCarrinho(nome, preco) {
    const item = { nome, preco };
    carrinho.push(item);
    alert(`${nome} foi adicionado ao seu carrinho!`);
    atualizarCarrinho();
}

// Função para atualizar a exibição do carrinho
function atualizarCarrinho() {
    const carrinhoDiv = document.getElementById('carrinho');
    carrinhoDiv.innerHTML = '';

    if (carrinho.length === 0) {
        carrinhoDiv.innerHTML = '<p>O carrinho está vazio.</p>';
        return;
    }

    let total = 0;
    carrinho.forEach((item, index) => {
        total += parseFloat(item.preco);
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item-carrinho');
        itemDiv.innerHTML = `
            <span>${item.nome} - R$${item.preco}</span>
            <button class="remover" data-index="${index}">Remover</button>
        `;
        carrinhoDiv.appendChild(itemDiv);
    });

    const totalDiv = document.createElement('div');
    totalDiv.innerHTML = `<strong>Total: R$${total.toFixed(2)}</strong>`;
    carrinhoDiv.appendChild(totalDiv);

    // Adiciona evento para remover itens
    document.querySelectorAll('.remover').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            removerDoCarrinho(index);
        });
    });
}

// Função para remover itens do carrinho
function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    alert('Item removido do carrinho.');
    atualizarCarrinho();
}

// Adiciona event listeners aos botões "pedir agora"
document.querySelectorAll('.pedir').forEach(button => {
    button.addEventListener('click', function() {
        const nome = this.getAttribute('data-nome');
        const preco = this.getAttribute('data-preco');
        adicionarAoCarrinho(nome, preco);
    });
});

})
