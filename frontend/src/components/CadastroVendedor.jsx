import React, { useState, useEffect } from 'react';

export default function CadastroVendedor() {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    cpf: '',
    dataNascimento: '',
    telefone: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });

  const [perfisSelecionados, setPerfisSelecionados] = useState([]);
  
  const [listaPerfis, setListaPerfis] = useState([]);

  useEffect(() => {
    async function carregarPerfis() {
      try {
        const resposta = await fetch('http://localhost/site/backend/listar_perfis.php');
        const dados = await resposta.json();
        setListaPerfis(dados);
      } catch (erro) {
        console.error("Erro ao carregar perfis do banco:", erro);
        setListaPerfis([
          { id: '1', chave: 'artesao', nome: 'Artesão', descricao: 'Produz artigos artesanais, joias, cerâmica, etc.', icone: 'artesao' },
          { id: '2', chave: 'produtor', nome: 'Produtor', descricao: 'Produz artigos artesanais, joias, cerâmica, etc.', icone: 'produtor' }
        ]);
      }
    }
    carregarPerfis();
 }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTogglePerfil = (chavePerfil) => {
    setPerfisSelecionados((prev) =>
      prev.includes(chavePerfil)
        ? prev.filter((item) => item !== chavePerfil) 
        : [...prev, chavePerfil] 
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    if (perfisSelecionados.length === 0) {
      alert("Por favor, selecione pelo menos um perfil!");
      return;
    }

    const payload = { ...formData, perfis: perfisSelecionados };

    try {
      const resposta = await fetch('http://localhost/site/backend/salvar_vendedor.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const resultado = await resposta.json();

      if (resultado.sucesso) {
        alert("Cadastro realizado com sucesso!");
        setFormData({
          nomeCompleto: '',
          cpf: '',
          dataNascimento: '',
          telefone: '',
          email: '',
          senha: '',
          confirmarSenha: ''
        });
        setPerfisSelecionados([]);
      } else {
        alert("Erro ao cadastrar: " + resultado.erro);
      }
    } catch (erro) {
      console.error("Erro na requisição:", erro);
      alert("Não foi possível conectar ao servidor backend.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-4">
        
        {/* Cabeçalho */}
        <div className="bg-emerald-800 text-white text-center py-8 px-4 relative">
          <span className="absolute top-4 right-6 text-sm opacity-80 cursor-pointer hover:underline">Ajuda</span>
          <h1 className="text-3xl font-bold mb-2">Dados Pessoais</h1>
          <p className="text-sm opacity-90">Preencha seus dados para concluir o cadastro.</p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-10">
          
          {/* Grid de Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-8">
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-1">Nome Completo</label>
              <input type="text" name="nomeCompleto" placeholder="Digite seu nome completo" value={formData.nomeCompleto} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none" />
              <span className="text-xs text-gray-400 mt-1">Ex.: Maria da Silva</span>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-1">CPF</label>
              <input type="text" name="cpf" placeholder="000.000.000-00" value={formData.cpf} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none" />
              <span className="text-xs text-gray-400 mt-1">Apenas números e pontuação.</span>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-1">Data de Nascimento</label>
              <input type="text" name="dataNascimento" placeholder="DD/MM/AAAA" value={formData.dataNascimento} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none" />
              <span className="text-xs text-gray-400 mt-1">Informe sua data de nascimento.</span>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-1">Telefone / WhatsApp</label>
              <input type="text" name="telefone" placeholder="(DDD) 9XXXX-XXXX" value={formData.telefone} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none" />
              <span className="text-xs text-gray-400 mt-1">Inclua o DDD.</span>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-1">E-mail</label>
              <input type="email" name="email" placeholder="voce@exemplo.com" value={formData.email} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none" />
              <span className="text-xs text-gray-400 mt-1">Usado para notificações e login.</span>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-1">Senha</label>
              <input type="password" name="senha" placeholder="Crie uma senha" value={formData.senha} onChange={handleChange} required minLength={8} className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none" />
              <span className="text-xs text-gray-400 mt-1">Deve conter pelo menos 8 caracteres.</span>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700 mb-1">Confirmar Senha</label>
              <input type="password" name="confirmarSenha" placeholder="Repita a sua senha" value={formData.confirmarSenha} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none" />
              <span className="text-xs text-gray-400 mt-1">Digite exatamente igual à anterior.</span>
            </div>
          </div>

          {/* Seleção de Perfil Dinâmica */}
          <div className="border-t border-gray-200 pt-6">
            <p className="text-sm font-medium text-gray-600 mb-4 text-center md:text-left">
              Selecione o perfil que melhor descreve sua atividade (pode selecionar mais de um)
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              
              {/* Renderiza as opções vindas da tabela do banco de dados */}
              {listaPerfis.map((item) => {
                const estaSelecionado = perfisSelecionados.includes(item.chave);
                return (
                  <div 
                    key={item.id}
                    onClick={() => handleTogglePerfil(item.chave)}
                    className={`border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all ${
                      estaSelecionado ? 'border-emerald-600 bg-emerald-50/50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-gray-100 rounded-lg text-emerald-700">
                        {item.icone === 'artesao' ? (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 17h.01M17 7h.01M17 17h.01M12 12V3m0 9v9m0-9H3m9 0h9" /></svg>
                        ) : (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m1.414 7.072a5 5 0 1110 0 5 5 0 01-10 0z" /></svg>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-emerald-800 text-sm">{item.nome}</h3>
                        <p className="text-xs text-gray-500">{item.descricao}</p>
                      </div>
                    </div>
                    {/* Indicador visual de Checkbox circular */}
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${estaSelecionado ? 'border-emerald-600 bg-emerald-600' : 'border-gray-400'}`}>
                      {estaSelecionado && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                  </div>
                );
              })}

            </div>
          </div>

          {/* Botões */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 border-t border-gray-100 pt-6">
            <button type="button" className="w-full sm:w-44 py-2.5 px-4 border border-gray-400 rounded-md text-gray-600 font-medium hover:bg-gray-50 transition-colors cursor-pointer">Cancelar</button>
            <button type="submit" className="w-full sm:w-44 py-2.5 px-4 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 transition-colors shadow-sm cursor-pointer">Salvar Dados</button>
          </div>

        </form>
      </div>
    </div>
  );
}