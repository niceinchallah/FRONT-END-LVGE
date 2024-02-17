import React, { useState, useEffect } from 'react';
import { Typography, Button, Card, CardContent, ButtonGroup } from '@mui/material';

const Profit_fact = () => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [profit, setProfit] = useState(0);

  useEffect(() => {
    const generateRandomData = () => {
      const incomes = [];
      const expenses = [];
      for (let i = 0; i < 10; i++) {
        incomes.push({
          date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - i).toISOString(),
          montant: Math.floor(Math.random() * 1000),
        });
        expenses.push({
          date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - i).toISOString(),
          montant: Math.floor(Math.random() * 1000),
        });
      }
      setIncomes(incomes);
      setExpenses(expenses);
    };

    generateRandomData();
  }, []);

  useEffect(() => {
    updateChartData();
  }, [filterType]);

  const updateChartData = () => {
    const today = new Date();

    const filteredIncomes = incomes.filter((income) => {
      switch (filterType) {
        case 'today':
          return new Date(income.date).toDateString() === today.toDateString();
        case 'thisWeek':
          const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
          return new Date(income.date) >= startDate && new Date(income.date) <= today;
        case 'thisMonth':
          return new Date(income.date).getMonth() === today.getMonth();
         // Include all incomes for 'all' filter
          case 'thisYear':
        return new Date(income.date).getFullYear() === today.getFullYear();
     // Include all expenses for 'all' filter
     default:
          return true;
      }
    });

    const filteredExpenses = expenses.filter((expense) => {
      switch (filterType) {
        case 'today':
          return new Date(expense.date).toDateString() === today.toDateString();
        case 'thisWeek':
          const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
          return new Date(expense.date) >= startDate && new Date(expense.date) <= today;
        case 'thisMonth':
          return new Date(expense.date).getMonth() === today.getMonth();
     // Include all expenses for 'all' filter
          case 'thisYear':
        return new Date(expense.date).getFullYear() === today.getFullYear();
      default:
        return true; // Include all incomes for 'all' filter
      }
    });

    const totalIncome = filteredIncomes.reduce((acc, income) => acc + income.montant, 0);
    const totalExpenses = filteredExpenses.reduce((acc, expense) => acc + expense.montant, 0);
    const profit = totalIncome - totalExpenses;

    setTotalIncome(totalIncome);
    setTotalExpenses(totalExpenses);
    setProfit(profit);
  };

  const handleFilterClick = (type) => {
    setFilterType(type);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" align="center">Facture</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', marginTop: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle1" style={{  fontSize: '1.5rem' }}>Income :</Typography>

  <div style={{ display: 'flex', alignItems: 'center', marginLeft: '8px' }}>
    <Typography style={{ color: 'green', fontSize: '1.4rem' }}>+</Typography>
    <Typography style={{  fontWeight: 'bold', marginLeft: '4px',fontSize: '1.4rem' }}>{totalIncome}$</Typography>
  </div>
</div>


<div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle1" style={{  fontSize: '1.5rem' }}>Expense :</Typography>

  <div style={{ display: 'flex', alignItems: 'center', marginLeft: '8px' }}>
    <Typography style={{ color: 'red', fontSize: '1.4rem' }}>-</Typography>
    <Typography style={{  fontWeight: 'bold', marginLeft: '4px',fontSize: '1.4rem' }}>{totalExpenses}$</Typography>
  </div>
</div>
<div style={{ textAlign: 'left', marginLeft: '300px', marginBottom: '20px' }}>
  <Typography variant="h5" style={{  fontSize: '1.5rem' }} >Profit = </Typography>
  <Typography style={{ color: profit >= 0 ? 'green' : 'red' ,  fontSize: '1.5rem' , marginLeft: '90px'}}  >  {profit}$</Typography>
</div>
     </div>
     <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <ButtonGroup>
            <Button onClick={() => handleFilterClick('today')}>Aujourd'hui</Button>
            <Button onClick={() => handleFilterClick('thisWeek')}>Cette semaine</Button>
            <Button onClick={() => handleFilterClick('thisMonth')}>Ce mois</Button>
            <Button onClick={() => handleFilterClick('thisYear')}>Cette année</Button>
            {/* ... (autres boutons de filtre si nécessaire) */}
          </ButtonGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default Profit_fact;

