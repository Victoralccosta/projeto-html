// Função para finalizar o pedido e enviar os dados para o servidor
function finalizarReserva() {
    // Coleta os dados do formulário
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const personas = document.getElementById("personas").value;
    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;
    const comentarios = document.getElementById("comentarios").value;

    // Validação simples
    if (!nome || !email || !telefone || !personas || !data || !hora) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    // Criar um objeto com os dados do formulário
    const reserva = {
        nome,
        email,
        telefone,
        personas,
        data,
        hora,
        comentarios,
        carrinho: carrinho // Adiciona os itens do carrinho à reserva
    };

    // Envia os dados para o servidor usando fetch
    fetch('/reservar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reserva) // Envia os dados como JSON
    })
    .then(response => response.json())
    .then(data => {
        // Exibe uma mensagem de sucesso ou falha
        alert("Reserva realizada com sucesso!");

        // Limpa o carrinho e o localStorage
        carrinho = [];
        localStorage.setItem('carrinho', JSON.stringify(carrinho));

        // Atualiza a interface do carrinho
        atualizarCarrinho();

        // Opcionalmente, você pode limpar os campos do formulário
        document.getElementById("formularioReserva").reset();
    })
    .catch(error => {
        console.error("Erro ao enviar a reserva:", error);
        alert("Houve um erro ao realizar a reserva. Tente novamente.");
    });
}

// Adiciona um ouvinte de evento no botão de envio do formulário
document.getElementById("formularioReserva").addEventListener("submit", function(event){
    event.preventDefault(); // Previne o envio padrão do formulário

    // Chama a função para finalizar a reserva
    finalizarReserva();
});
let slideIndex = 0;

function moverSlide(n) {
    slideIndex += n;
    mostrarSlides();
}

function mostrarSlides() {
    const slides = document.querySelectorAll('.slide');
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
    if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }
    
    const offset = -slideIndex * 100; // Cada slide ocupa 100% da largura
    document.querySelector('.slides').style.transform = `translateX(${offset}%)`;
}

// Inicia o slider exibindo o primeiro slide
mostrarSlides();
