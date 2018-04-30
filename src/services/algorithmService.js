import Fuse from 'fuse.js';

import dataService from '@/services/dataService';
import AlgorithmCollection from '@/types/AlgorithmCollection';

class AlgorithmService {
  constructor() {
    this.initializeFuse();    
  }
  async initializeFuse() {
    this.fuseOptions = {
      shouldSort: true,
      findAllMatches: true,
      includeScore: true,
      includeMatches: true,
      threshold: 0.5,
      maxPatternLength: 32,
      minMatchCharLength: 4,
      keys: [
        {
          "name": "name",
          "weight": 1
        },
        {
          "name": "longName",
          "weight": 1
        },
        {
          "name": "tags",
          "weight": 0.4
        },
        {
          "name": "description",
          "weight": 0.1
        }
      ]
    };
    let algorithmList = await this.getAlgorithms();
    this.fuse = new Fuse(algorithmList, this.fuseOptions);
  }
  async getAlgorithms() {
    if(this.algorithmList) return this.algorithmList;
    this.algorithmList = await dataService.fetchAlgorithms();
    return this.algorithmList;
  }
  async getAlgorithm(name) {
    let algorithms = await this.getAlgorithms();
    return algorithms.filter((item)=>{return item.name==name})[0];
  }
  async getAlgorithmByURL(url) {
    let algorithms = await this.getAlgorithms();
    return algorithms.filter((item)=>{return item.url==url})[0];
  }
  async getAlgorithmMasterCollection() {
    return new AlgorithmCollection(await this.getAlgorithms());
  }
  async getGlobalTagList() {
    return Object.getOwnPropertyNames((await this.getAlgorithmMasterCollection()).getTagCollection());
  }
  async getAlgorithmTagVectors() {
    let algTagVectors = {};
    let algorithms = await this.getAlgorithms();
    let globalTagList = await this.getGlobalTagList();
    for(let algorithm of algorithms) {
      let tagList = [];
      for(let tag of globalTagList) {
        if(algorithm.tags.indexOf(tag)!=-1) {
          tagList.push(1);
        }
        else {
          tagList.push(0);
        }
      }
      algTagVectors[algorithm.name] = tagList;
    }
    return algTagVectors;
  }
  async getSimilarAlgorithms(name) {
    let algorithmTagVectors = await this.getAlgorithmTagVectors();
    let algorithms = await this.getAlgorithms();
    let contextAlg = await this.getAlgorithm(name);
    let cosineSimilarity = (A, B)=> {
      let dotProduct = (a, b)=> {
        if(a.length!=b.length) throw Error("Bad vector");
        let sum = 0;
        for(let i = 0; i<a.length; i++) {
          sum+=(a[i]*b[i]);
        }
        return sum;
      };
      let AdotB = dotProduct(A, B);
      let Amag = Math.hypot(...A);
      let Bmag = Math.hypot(...B);
      return AdotB/(Amag*Bmag);
    };
    let similarities = {};
    for(let algorithmTagVector in algorithmTagVectors) {
      if(name==algorithmTagVector) continue;
      similarities[algorithmTagVector] = (cosineSimilarity(algorithmTagVectors[name], algorithmTagVectors[algorithmTagVector]))
    }
    return similarities;
  }
  fuzzySearch(term) {
    return this.fuse.search(term);
  }
}

export default new AlgorithmService();
