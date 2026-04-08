import React from 'react';
import NewNavbar from '../../Component/Shared/NewNavbar';
import NewFooter from '../../Component/Shared/NewFooter';

const Shipping = () => {
    return (
        <div className="bg-surface text-on-surface font-manrope min-h-screen" dir="rtl">
            <NewNavbar />
            <main className="pt-32 pb-20 max-w-4xl mx-auto px-8">
                <h1 className="font-notoSerif text-5xl text-primary italic mb-8">معلومات الشحن</h1>
                <div className="space-y-10">
                    <section className="bg-surface-container-low p-8 rounded-2xl flex items-start gap-6">
                        <span className="material-symbols-outlined text-4xl text-primary">local_shipping</span>
                        <div>
                            <h2 className="font-notoSerif text-2xl text-primary mb-2">مدة التوصيل</h2>
                            <p className="text-on-surface-variant">نقوم بتوصيل طلباتكم خلال 2-5 أيام عمل لجميع محافظات مصر.</p>
                        </div>
                    </section>

                    <section className="bg-surface-container-low p-8 rounded-2xl flex items-start gap-6">
                        <span className="material-symbols-outlined text-4xl text-primary">package_2</span>
                        <div>
                            <h2 className="font-notoSerif text-2xl text-primary mb-2">تغليفنا</h2>
                            <p className="text-on-surface-variant">نولي اهتماماً خاصاً بالتغليف لضمان حماية زوايا الكتب ومنع تأثرها بالعوامل الجوية أثناء النقل.</p>
                        </div>
                    </section>

                    <section className="bg-surface-container-low p-8 rounded-2xl flex items-start gap-6">
                        <span className="material-symbols-outlined text-4xl text-primary">payments</span>
                        <div>
                            <h2 className="font-notoSerif text-2xl text-primary mb-2">تكلفة الشحن</h2>
                            <p className="text-on-surface-variant">يتم حساب تكلفة الشحن بناءً على المحافظة، وتظهر لك التكلفة النهائية عند إتمام الدفع.</p>
                        </div>
                    </section>
                </div>
            </main>
            <NewFooter />
        </div>
    );
};

export default Shipping;
