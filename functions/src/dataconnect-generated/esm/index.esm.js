import { queryRef, executeQuery, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'timeless-persona-site',
  location: 'asia-south1'
};

export const dummyRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'dummy');
}
dummyRef.operationName = 'dummy';

export function dummy(dc) {
  return executeQuery(dummyRef(dc));
}

