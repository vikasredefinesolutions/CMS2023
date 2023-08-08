import { Redis } from 'ioredis';

const redis = new Redis({
  host: '127.0.0.1', // Redis server host
  port: 6379, // Redis server port
});

export const getDataFromRedis = async (key: string) => {
  const cachedData = await redis.get(key);
  return cachedData;
  // return {} as any;
};

export const setDataInRedis = async (
  key: string,
  value: string,
  expiryTime: number,
) => {
  await redis.set(key, value, 'EX', expiryTime);
};
// let response: any = {};

// const cachedData = await getDataFromRedis('storeConfig');
// if (cachedData) {
// console.log("----------",cachedData)
//  response = JSON.parse(cachedData);
//  } else {
//    console.log('calling API');
//    response = await callConfigsAndRemainingStoreAPIsAndSetURls(
//      storeDetails,
//    );
//   await setDataInRedis('storeConfig', JSON.stringify(response), 3600);
// }
