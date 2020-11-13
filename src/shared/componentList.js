import React from 'react';

import HomeIcon from '@material-ui/icons/Home';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ListAltIcon from '@material-ui/icons/ListAlt';

import AddTransaction from '../pages/home/components/addTransaction';
import TransactionList from '../pages/home/components/transactionList';
import TotalValue from '../pages/home/components/totalValue';
import AddRecurringBill from '../recurringBills/components/addRecurringBill';
import RecurringBillsList from '../recurringBills/components/recurringBillsList';
import Bills from '../pages/home/components/bills';

const componentList = [
  {
    name: 'Home',
    icon: HomeIcon,
    component: (
      <>
        <TotalValue />
        <Bills />
        <AddTransaction />
        <TransactionList />
      </>
    ),
  },
  {
    name: 'Contas Recorrentes',
    icon: MonetizationOnIcon,
    component: (
      <div>
        <AddRecurringBill />
        <RecurringBillsList />
        <RecurringBillsList />
      </div>
    ),
  },
  {
    name: 'Planilhas',
    icon: ListAltIcon,
    component: <div> Test </div>,
  },
];

export default componentList;
