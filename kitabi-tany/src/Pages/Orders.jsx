import { useState, useEffect } from 'react';
import { getOrders } from '../services/ordersService';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import NewNavbar from "../Component/Shared/NewNavbar";
import NewFooter from "../Component/Shared/NewFooter";

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
        <div className="bg-surface text-on-surface font-manrope min-h-screen" dir="rtl">
            <NewNavbar />

            <main className="pt-32 pb-20 max-w-screen-xl mx-auto px-8">
                <header className="mb-12 text-right">
                    <h1 className="font-notoSerif text-4xl text-primary italic mb-2">الطلبات الواردة</h1>
                    <p className="text-on-surface-variant">متابعة المبيعات والطلبات الجديدة</p>
                </header>

                {loading ? (
                    <div className="flex justify-center py-20"><div className="spinner"></div></div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-20 bg-surface-container-low rounded-2xl border border-outline-variant/10">
                        <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">inventory_2</span>
                        <p className="text-on-surface-variant font-bold">لا توجد طلبات حالياً</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-surface-container-lowest p-8 rounded-2xl shadow-[0_20px_40px_rgba(27,28,26,0.05)] border border-outline-variant/10 group hover:translate-y-[-4px] transition-transform">
                                <div className="flex justify-between items-center mb-6 border-b border-outline-variant/10 pb-4">
                                    <h3 className="font-notoSerif text-lg text-primary italic">الطلب #{order._id.substring(0, 8)}</h3>
                                    <span className="px-3 py-1 bg-secondary-container/30 text-secondary text-[10px] font-bold uppercase tracking-widest rounded-full">جديد</span>
                                </div>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-outline">person</span>
                                        <p className="text-sm"><strong className="text-primary">العميل:</strong> {order.buyer.username}</p>
                                    </div>
                                    <div className="space-y-3">
                                        <p className="text-xs font-bold uppercase tracking-widest text-outline">الكتب المطلوبة:</p>
                                        <ul className="space-y-3">
                                            {order.books.map((item) => (
                                                <li key={item.book._id} className="flex justify-between items-center bg-surface-container-low p-3 rounded-xl">
                                                    <Link to={`/book/${item.book._id}`} className="text-sm font-bold text-primary hover:underline decoration-primary/30">{item.book.title}</Link>
                                                    <span className="text-xs font-bold text-secondary">{item.book.price} ج.م</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="pt-6 border-t border-outline-variant/10 flex justify-between items-center">
                                        <span className="text-sm font-bold text-outline">إجمالي المبلغ:</span>
                                        <span className="text-2xl font-manrope font-extrabold text-primary">{order.totalPrice} ج.م</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <NewFooter />
        </div>
    );
};

export default Orders;
