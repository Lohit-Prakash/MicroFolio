const { queryRef, executeQuery, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'timeless-persona-site',
  location: 'asia-south1'
};
exports.connectorConfig = connectorConfig;

const dummyRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'dummy');
}
dummyRef.operationName = 'dummy';
exports.dummyRef = dummyRef;

exports.dummy = function dummy(dc) {
  return executeQuery(dummyRef(dc));
};
