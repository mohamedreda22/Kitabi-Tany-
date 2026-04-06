import { useState, useEffect } from 'react';
import { getOrders } from '../services/ordersService';
import Swal from 'sweetalert2';
import '../assets/css/Orders.css';
import { Link } from 'react-router-dom';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersData = await getOrders();
                setOrders(ordersData);
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'فشل في جلب الطلبات';
                Swal.fire({
                    icon: 'error',
                    title: 'خطأ',
                    text: errorMessage,
                });
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div className="orders-container" dir="rtl">
            <h1 className="page-header">الطلبات الواردة</h1>
            {loading ? (
                <div className="spinner"></div>
            ) : orders.length === 0 ? (
                <p className="no-orders">لا توجد طلبات حالياً</p>
            ) : (
                <div className="orders-list">
                    {orders.map((order) => (
                        <div key={order._id} className="order-card">
                            <div className="order-header">
                                <h3>الطلب #{order._id.substring(0, 8)}</h3>
                                <span className="order-status">جديد</span>
                            </div>
                            <div className="order-body">
                                <p><strong>العميل:</strong> {order.buyer.username}</p>
                                <div className="order-books">
                                    <p><strong>الكتب المطلوبة:</strong></p>
                                    <ul>
                                        {order.books.map((item) => (
                                            <li key={item.book._id}>
                                                <Link to={`/book/${item.book._id}`}>{item.book.title}</Link>
                                                <span className="book-price">{item.book.price} ج.م</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="order-footer">
                                    <p className="total-price">إجمالي المبلغ: <span>{order.totalPrice} ج.م</span></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
