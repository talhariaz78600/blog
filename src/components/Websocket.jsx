// // src/OrderList.js
// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// const socket = io('https://websocket-plum.vercel.app'); // Adjust the URL if your server is running on a different address

// const OrderList = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     socket.on('connect', () => {
//       console.log('Connected to WebSocket server');
//     });
    

//     socket.on('newOrder', order => {
//       console.log('New order received:', order);
//       setOrders(prevOrders => [...prevOrders, order]);
//     });

//     socket.on('disconnect', () => {
//       console.log('Disconnected from WebSocket server');
//     });

    



//     // Cleanup on unmount
//     return () => {
//       socket.off('connect');
//       socket.off('newOrder');
//       socket.off('disconnect');
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Admin Panel</h1>
//       <div id="orders">
//         {orders.length === 0 ? (
//           <p>No orders yet.</p>
//         ) : (
//           <ul>
//             {orders.map(order => (
//               <li key={order._id}>
//                 {order.title} - ${order.price}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrderList;
