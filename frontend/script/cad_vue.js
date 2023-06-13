const app = new Vue({
  el: "#App",
  data: {
    nome_animal: ' ',
    cidade_animal: ' ',
    estado_animal: ' ',
    especie: null,
    sexo: null,
    idade: null,
    porte: null,
    arquivo_selecionado: null,
    opcoes: [
      { id: 1, label: 'Castrado', checked: false },
      { id: 2, label: 'Vermifugado', checked: false },
      { id: 3, label: 'Vacinado', checked: false },
      { id: 4, label: 'Cuidados Especiais', checked: false }
    ],
    opcoes_s: [
      { id: 0, label: 'Macho', checked: false },
      { id: 1, label: 'Femea', checked: false }
    ],
    opcoes_e: [
      { id: 0, label: 'Gato', checked: false },
      { id: 1, label: 'Cachorro', checked: false }
    ],
    opcoes_i: [
      { id: 0, label: 'Filhote', checked: false },
      { id: 1, label: 'Adulto', checked: false },
      { id: 2, label: 'Idoso', checked: false }
    ],
    opcoes_p: [
      { id: 0, label: 'Pequeno', checked: false },
      { id: 1, label: 'Médio', checked: false },
      { id: 2, label: 'Grande', checked: false }
    ],
    opcoesSelecionadas: []
  },
  methods: {
    handleFileChange(event) {
      this.arquivo_selecionado = event.target.files[0];
    },
    selecionarOpcao(opcao) {
      opcao.selecionado = true;
    },
    async cadastro() {
      //colocando informações com base em seu número de ordem

      this.sexo = this.opcoes_s.find(opcao => opcao.selecionado)?.label || '';
      this.especie = this.opcoes_e.find(opcao => opcao.selecionado)?.label || '';
      this.idade = this.opcoes_i.find(opcao => opcao.selecionado)?.label || '';
      this.porte = this.opcoes_p.find(opcao => opcao.selecionado)?.label || '';

      let castradoValue = this.opcoes.find(opcao => opcao.label === 'Castrado')?.selecionado ? 'sim' : 'não';
      let vermifugadoValue = this.opcoes.find(opcao => opcao.label === 'Vermifugado')?.selecionado ? 'sim' : 'não';
      let vacinadoValue = this.opcoes.find(opcao => opcao.label === 'Vacinado')?.selecionado ? 'sim' : 'não';
      let cuidadoValue = this.opcoes.find(opcao => opcao.label === 'Cuidados Especiais')?.selecionado ? 'sim' : 'não';

      
      const numSelecionadosS = this.opcoes_s.filter(opcao => opcao.selecionado).length;
      const numSelecionadosE = this.opcoes_e.filter(opcao => opcao.selecionado).length;
      const numSelecionadosI = this.opcoes_i.filter(opcao => opcao.selecionado).length;
      const numSelecionadosP = this.opcoes_p.filter(opcao => opcao.selecionado).length;
      
      if (numSelecionadosS !== 1 || numSelecionadosE !== 1 || numSelecionadosI !== 1 || numSelecionadosP !==1) {
          alert("Selecione apenas uma opção antes de cadastrar.");

          location.reload();

          return;
      }

      const form = new FormData();

      form.append('name', this.nome_animal);
      form.append('breed', this.especie);
      form.append('gender', this.sexo);
      form.append('age', this.idade);
      form.append('size', this.porte);
      form.append('city', this.cidade_animal);
      form.append('state', this.estado_animal);
      form.append('dewormed', vermifugadoValue);
      form.append('castrated', castradoValue);
      form.append('vaccinated', vacinadoValue);
      form.append('special_care', cuidadoValue);
      form.append('picture', this.arquivo_selecionado);

      await axios.post('http://localhost:8081/animal', form)
        .then(response => {
          if (response.status == 200) {
            alert('Cadastro efetuado com sucesso!')
          } else {
            response.status(500).send('Erro ao inserir as informações');
          }
        })
    }
  }
});