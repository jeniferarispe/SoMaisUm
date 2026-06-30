<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$json_recebido = file_get_contents('php://input');
$dados = json_decode($json_recebido, true);

if (!$dados) {
    echo json_encode(["sucesso" => false, "erro" => "Nenhum dado enviado."]);
    exit;
}

$host = 'localhost';
$db   = 'soMaisUm';
$user = 'postgres';
$pass = 'postgres';

try {
    $pdo = new PDO("pgsql:host=$host;dbname=$db", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);

    $nome = trim($dados['nomeCompleto']);
    $email = trim($dados['email']);
    $senha = $dados['senha'];
    $cpf = preg_replace('/[^0-9]/', '', $dados['cpf']); 
    $tipo = $dados['perfil']; 
    
    $senha_criptografada = password_hash($senha, PASSWORD_BCRYPT);

    $sql = "INSERT INTO usuario (email, senha, cpf, nomepf, tipo, datahoracriacao) 
            VALUES (:email, :senha, :cpf, :nomepf, :tipo, CURRENT_TIMESTAMP)";
    
    $stmt = $pdo->prepare($sql);
    
    $stmt->bindValue(':email', $email);
    $stmt->bindValue(':senha', $senha_criptografada);
    $stmt->bindValue(':cpf', $cpf);
    $stmt->bindValue(':nomepf', $nome);
    $stmt->bindValue(':tipo', $tipo);

    $stmt->execute();

    echo json_encode(["sucesso" => true, "mensagem" => "Vendedor salvo com sucesso!"]);

} catch (PDOException $e) {
    if ($e->getCode() == 23505) {
        echo json_encode(["sucesso" => false, "erro" => "O E-mail ou CPF informado já possui cadastro."]);
    } else {
        echo json_encode(["sucesso" => false, "erro" => "Erro na base de dados: " . $e->getMessage()]);
    }
}