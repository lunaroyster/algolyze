export default class AlgorithmCollection {
   constructor(algorithms) {
       this.algorithms = algorithms;
   }
   getTagCollection() {
        let tags = {};
        for(let algorithm of this.algorithms) {
            for(let tag of algorithm.tags) {
                if(!tags[tag]) tags[tag] = [];
                tags[tag].push(algorithm);
            }
        }
        return tags;
   }
   getCountedTags() {
       let tags = this.getTagCollection();
       let countedTags = [];
        for(let tag in tags) {
            countedTags.push({
                name: tag,
                algorithms: tags[tag],
                count: tags[tag].length
            });
        }
        return countedTags.sort((a,b)=>{return b.count-a.count});
   }
   getAlgorithms(...tags) {
       let algorithms = [];
       for(let algorithm of this.algorithms) {
           try {
               for(let tag of tags) {
                   if(algorithm.tags.indexOf(tag)==-1) throw new Error();
               }
               algorithms.push(algorithm);
           }
           catch (e) {
               
           }
       }
       return algorithms;
   }
   getSubTags(...tags) {
       let algorithms = this.getAlgorithms(...tags);
       return new AlgorithmCollection(algorithms).getCountedTags();
   }
}