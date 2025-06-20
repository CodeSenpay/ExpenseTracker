
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';
import ExpenseSummary from '@/components/ExpenseSummary';
import { Expense } from '@/types/expense';

const Index = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      amount: 25.50,
      description: 'Coffee and pastry',
      category: 'Food & Dining',
      date: '2024-06-20',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      amount: 1200.00,
      description: 'Monthly rent payment',
      category: 'Housing',
      date: '2024-06-15',
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      amount: 45.00,
      description: 'Gas station fill-up',
      category: 'Transportation',
      date: '2024-06-18',
      createdAt: new Date().toISOString()
    }
  ]);
  const [showForm, setShowForm] = useState(false);

  const addExpense = (expense: Omit<Expense, 'id' | 'createdAt'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setExpenses([newExpense, ...expenses]);
    setShowForm(false);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Expense Tracker
            </h1>
            <p className="text-gray-600 mt-2">Track your spending and manage your budget</p>
          </div>
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </Button>
        </div>

        {/* Summary Cards */}
        <ExpenseSummary expenses={expenses} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Expense List */}
          <div className="lg:col-span-2">
            <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
          </div>

          {/* Quick Stats */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Expenses</span>
                  <span className="font-semibold text-gray-800">{expenses.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">This Month</span>
                  <span className="font-semibold text-indigo-600">
                    ${expenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Categories</span>
                  <span className="font-semibold text-gray-800">
                    {new Set(expenses.map(e => e.category)).size}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expense Form Modal */}
        {showForm && (
          <ExpenseForm 
            onSubmit={addExpense}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
