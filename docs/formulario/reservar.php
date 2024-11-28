<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Receber os dados do formulário
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $telefone = $_POST['telefone'];
    $personas = $_POST['personas'];
    $data = $_POST['data'];
    $hora = $_POST['hora'];
    $comentarios = $_POST['comentarios'];

    // Exibir os dados (você pode, por exemplo, salvar no banco ou enviar um e-mail)
    echo "<h1>Reserva Confirmada</h1>";
    echo "<p><strong>Nome:</strong> $nome</p>";
    echo "<p><strong>Email:</strong> $email</p>";
    echo "<p><strong>Telefone:</strong> $telefone</p>";
    echo "<p><strong>Número de Pessoas:</strong> $personas</p>";
    echo "<p><strong>Data da Reserva:</strong> $data</p>";
    echo "<p><strong>Hora da Reserva:</strong> $hora</p>";
    echo "<p><strong>Comentários:</strong> $comentarios</p>";

    // Aqui você poderia adicionar um código para salvar em um banco de dados ou enviar um e-mail, por exemplo.
} else {
    // Se a requisição não for POST, redireciona para o formulário
    header("Location: reserva.html"); // Altere para o nome correto do seu arquivo HTML
    exit;
}
?>
