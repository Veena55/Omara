import React, { useEffect, useState, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import axios from 'axios';

// Define types for props and data structure
interface VirtualOrderTableProps {
  apiEndpoint: string; // API endpoint for fetching data
  itemHeight: number; // Height of each row
}

interface Order {
  id: number;
  customerName: string;
  quantity: string;
  totalPrice: string,
  orderDate: string
}

const VirtualOrderTable: React.FC<VirtualOrderTableProps> = ({
  apiEndpoint,
  itemHeight,
}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);

  // Fetch orders from the backend
  const fetchOrders = useCallback(async () => {
    if (!hasMore) return;

    try {
      const response = await axios.get(apiEndpoint, {
        params: {
          cursor,
          limit: 20, // Number of records to fetch per request
        },
      });


      const { data, nextCursor } = response.data;
      setOrders((prevOrders) => [...prevOrders, ...data]);
      setCursor(nextCursor ? nextCursor.id : null);
      setHasMore(!!nextCursor);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }, [apiEndpoint, cursor, hasMore]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Render a single row in the virtualized list
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const order = orders[index];


    if (!order) {
      return <div style={style}>Loading...</div>;
    }

    return (
      <div
        style={{
          ...style,
          display: 'flex',
          justifyContent: 'space-around',
          padding: '10px',
          borderBottom: '1px solid #ccc',
        }}
      >
        <h3>{order.customerName}</h3>
        <p>{order.quantity}</p>
        <p>{order.totalPrice}</p>
        <p>{order.orderDate}</p>
      </div>
    );
  };

  return (
    <List
      height={500} // Height of the container
      itemCount={orders.length + 1} // Add one for loading indicator
      itemSize={itemHeight} // Row height
      width="100%" // Width of the container
      onItemsRendered={({ visibleStopIndex }) => {
        if (visibleStopIndex === orders.length - 1 && hasMore) {
          fetchOrders();
        }
      }}
    >
      {Row}
    </List>
  );
};

export default VirtualOrderTable;
