const app = new Vue({
    el: "#App",
    data: {
      especie: null,
      sexo: null,
      idade: null,
      animais: [],
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
      opcoesSelecionadas: []
    },
    methods: {
      selecionarOpcao(opcao) {
        opcao.selecionado = true;
      },
      async mostrar() {
        //colocando informações com base em seu número de ordem
  
        this.sexo = this.opcoes_s.find(opcao => opcao.selecionado)?.label || '';
        this.especie = this.opcoes_e.find(opcao => opcao.selecionado)?.label || '';
        this.idade = this.opcoes_i.find(opcao => opcao.selecionado)?.label || '';

        console.log(
            this.especie,
            this.sexo,
            this.idade
          );

        const numSelecionadosS = this.opcoes_s.filter(opcao => opcao.selecionado).length;
        const numSelecionadosE = this.opcoes_e.filter(opcao => opcao.selecionado).length;
        const numSelecionadosI = this.opcoes_i.filter(opcao => opcao.selecionado).length;
        if (numSelecionadosS !== 1 || numSelecionadosE !== 1 || numSelecionadosI !== 1) {
            alert("Selecione apenas uma opção antes de filtrar.");

            location.reload();

            return;
        }
  
        await axios.get('http://localhost:8081/animais', {
            params:{
                breed: this.especie,
                gender: this.sexo,
                age: this.idade
            }
        })
        .then(response => {
            this.animais = response.data;
            console.log(this.animais)
          })
          .catch(error => {
            console.error('Erro ao obter os animais:', error);
          });
      }
    }
  });