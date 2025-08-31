import React, { useState, useEffect } from 'react';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import Sidebar from './Sidebar.jsx';
import DashboardHome from './DashboardHome.jsx';
import DrafterPage from './Drafter.jsx';
import ArchivesPage from './Archives.jsx';
import ManagerPage from './Manager.jsx';

function DashboardPage() {
  const [user, setUser] = useState(null);
  const [activePage, setActivePage] = useState('Dashboard');
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'Drafter':
        return <DrafterPage />;
      case 'Archives':
        return <ArchivesPage />;
      case 'Manager':
        return <ManagerPage />;
      case 'Dashboard':
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="d-flex vh-100">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        user={user}
        handleLogout={handleLogout}
      />
      <div className="main-content flex-grow-1">
        <main className="p-4">
          {renderActivePage()}
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;

