export interface IPaymentCredientals {
  key: string;
  value: string;
};

const PAYMENT_CREDIENTALS: IPaymentCredientals[] = [ 
  {
    key: 'dai',
    value: '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea'
  },
  {
    key: 'usdt',
    value: '0xd9ba894e0097f8cc2bbc9d24d308b98e36dc6d02'
  },
  {
    key: 'usdc',
    value: '0x4dbcdf9b62e891a7cec5a2568c3f4faf9e8abe2b'
  },
  {
    key: 'wbtc',
    value: '0x577d296678535e4903d59a4c929b718e1d575e0a'
  },
  {
    key: 'eth',
    value: '0x85A76d9f773Ae5BAe1ffF576d49aC414940A65D1'
  }
];

export default PAYMENT_CREDIENTALS;