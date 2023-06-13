
  const app = new Vue({
    el: '#App',
    data: {
      especie: false,
      sexo: false,
      porte: false,
      idade: false,
      animaisFiltrados: []
    },
    methods: {
      realizarBusca() {
        const parametros = {
          especie: this.especie,
          sexo: this.sexo,
          porte: this.porte,
          idade: this.idade
        };

        axios.get('/animaisfiltro', { params: parametros })
          .then(response => {
            this.animaisFiltrados = response.data;
          })
          .catch(error => {
            console.error('Erro ao realizar busca:', error);
          });
      }
    }
  });
