import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

class DataService {
  async fetchAlgorithms() {
    let response = await Vue.http.get('algorithms/compiled.json');
    return response.data;
  }
}

export default new DataService();

