import React from 'react';
import VirtualOrderTable from './component/VirtualOrderTable';

const App: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Virtual Table (Backend Data)</h1>
      <VirtualOrderTable apiEndpoint="http://localhost:3000/order/all" itemHeight={80} />
    </div>
  );
};

export default App;
