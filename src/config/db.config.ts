
import * as config from 'config';



const dbConfig = config.get('Customer.dbConfig');
console.log(dbConfig)

if(config.has('optionalFeature.detail')) {
  const detail = config.get('optionalFeature.detail');
}
export const test = () => {
  console.log('TSET')
}