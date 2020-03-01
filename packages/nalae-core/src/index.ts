import { IStorage } from './lib/storage';
import { NalaeCluster } from './lib/cluster';

function main() {
  let cluster = new NalaeCluster();
  let clusterList = cluster.getAvailableStorageList();
  console.log(clusterList);
}

main()
