import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transactions: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions : [
        {
          id: 1,
          title: 'Desenvolvimento de site',
          amount: 12000.00,
          type: 'deposit',
          category: 'Venda',
          createdAt: new Date('2021-08-15 10:18:00'),
        },
        {
          id: 2,
          title: 'Burgão',
          amount: 49.90,
          type: 'withdraw',
          category: 'Alimentação',
          createdAt: new Date('2021-09-03 18:44:00'),
        },
        {
          id: 3,
          title: 'Investimentos',
          amount: 400.00,
          type: 'deposit',
          category: 'Rendimentos',
          createdAt: new Date('2021-09-06 07:02:00'),
        },
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transactions')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transactions', data);
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);