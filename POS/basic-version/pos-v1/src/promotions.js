function loadPromotions() {
  return [
      {
          type: 'BUY_TWO_GET_ONE_FREE',
          barcodes: [
              'ITEM000000',
              'ITEM000001',
              'ITEM000005'
          ]
      },
      {
          type: 'OTHER_PROMOTION',
          barcodes: [
              'ITEM000003',
              'ITEM000004'
          ]
      }
  ];
}


module.exports = {
    loadPromotions
};