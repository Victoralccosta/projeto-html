let carrinho = JSON.parse(localStorage.getItem('carrinho')) || []; // Carrega carrinho do localStorage

// Função para adicionar itens ao carrinho
function adicionarAoCarrinho(nome, preço) {
    // Verifica se o item já está no carrinho
    const itemExistente = carrinho.find(item => item.nome === nome && item.preço === preço);
    if (itemExistente) {
        alert(`${nome} já está no seu carrinho.`);
        return;  // Se o item já existe, não faz nada
    } else {
        // Adiciona o item ao carrinho
        const item = { nome, preço };
        carrinho.push(item);
        alert(`${nome} foi adicionado ao seu carrinho!`);
    }

    // Atualiza o carrinho no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}

// Função para atualizar a exibição do carrinho
function atualizarCarrinho() {
    const carrinhoDiv = document.getElementById('carrinho');
    carrinhoDiv.innerHTML = '';  // Limpa a exibição atual

    if (carrinho.length === 0) {
        carrinhoDiv.innerHTML = '<p>O carrinho está vazio.</p>';
        return;
    }

    let total = 0;
    carrinho.forEach((item, index) => {
        total += parseFloat(item.preço);
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item-carrinho');
        itemDiv.innerHTML = `
            <span>${item.nome} - R$${item.preço}</span>
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
    carrinho.splice(index, 1); // Remove o item do carrinho
    alert('Item removido do carrinho.');

    // Atualiza o carrinho no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}

// Adiciona event listeners aos botões "pedir agora"
document.querySelectorAll('.pedir').forEach(button => {
    button.addEventListener('click', function() {
        const nome = this.getAttribute('data-nome');
        const preço = this.getAttribute('data-preço');
        
        if (nome && preço) {
            adicionarAoCarrinho(nome, preço);
        } else {
            alert("Erro ao adicionar item ao carrinho.");
        }
    });
});

// Carregar o carrinho na página inicial
atualizarCarrinho();

// Controle de Slideshow
let slideIndex = 0;
showSlides();

// Função para exibir os slides
function showSlides() {
    let slides = document.getElementsByClassName("mySlides");

    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
    if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }

    slides[slideIndex].style.display = "block";  

    slideIndex++;
    setTimeout(showSlides, 3000); // Muda de slide a cada 3 segundos
}

// Função para ir para o slide anterior
function plusSlides(n) {
    slideIndex += n;
    showSlides();
}

// Função para ir para um slide específico
function currentSlide(n) {
    slideIndex = n;
    showSlides();
}

// Adicionando eventos aos botões de navegação
document.querySelector(".prev").addEventListener("click", function() {
    plusSlides(-1);
});
document.querySelector(".next").addEventListener("click", function() {
    plusSlides(1);
});
