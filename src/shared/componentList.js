import React from 'react';

import HomeIcon from '@material-ui/icons/Home';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ListAltIcon from '@material-ui/icons/ListAlt';

import AddTransaction from '../home/components/addTransaction';
import TransactionList from '../home/components/transactionList';
import TotalValue from '../home/components/totalValue';
import AddRecurringBill from '../recurringBills/components/addRecurringBill';
import RecurringBillsList from '../recurringBills/components/recurringBillsList';

let componentList = [
  {
    name: "Home",
    icon: HomeIcon,
    component: <div>
      <TotalValue />
      <AddTransaction />
      <TransactionList />
    </div>
  },
  {
    name: "Contas Recorrentes",
    icon: MonetizationOnIcon,
    component: <div>
      <AddRecurringBill />
      <RecurringBillsList />
      <RecurringBillsList />
    </div>
  },
  {
    name: "Planilhas",
    icon: ListAltIcon,
    component: <div>
      Test
    </div>
  },
];

export default componentList;