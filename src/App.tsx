import { useState } from "react";
import Modal from "react-modal";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTansactionModal } from "./components/NewTansactionModal";
import { GlobalStyle } from "./styles/global";
import { TransactionsProvider } from "./hooks/useTransactions";

Modal.setAppElement('#root');

export function App() {
  const [ isNewTransactionModalOpen, setIsNewTransactionModal ] = useState(false);

  function handleOpenNewTransactionModal() { 
      setIsNewTransactionModal(true);
  }

  function handleCloseNewTransactionModal() { 
      setIsNewTransactionModal(false); 
  }

  return (
    <TransactionsProvider>
      <GlobalStyle />
      
      <Header 
        onOpenNewTransactionModal={handleOpenNewTransactionModal} 
      />

      <Dashboard />

      <NewTansactionModal 
        isOpen={isNewTransactionModalOpen} 
        onRequestClose={handleCloseNewTransactionModal} 
      />
    </TransactionsProvider>
  );
}