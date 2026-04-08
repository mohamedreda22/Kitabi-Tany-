import React from 'react';
import NewNavbar from '../../Component/Shared/NewNavbar';
import NewFooter from '../../Component/Shared/NewFooter';

const ConditionGuide = () => {
    return (
        <div className="bg-surface text-on-surface font-manrope min-h-screen" dir="rtl">
            <NewNavbar />
            <main className="pt-32 pb-20 max-w-4xl mx-auto px-8">
                <h1 className="font-notoSerif text-5xl text-primary italic mb-8">دليل حالة الكتاب</h1>
                <p className="mb-12 text-lg text-on-surface-variant">الشفافية هي سر ثقتكم بنا. نستخدم المعايير التالية لوصف حالة كل كتاب في متجرنا:</p>

                <div className="space-y-12">
                    <div className="border-r-4 border-primary pr-6">
                        <h2 className="font-notoSerif text-2xl text-primary mb-2">مثل الجديد (As New)</h2>
                        <p className="text-on-surface-variant">الكتاب في حالة ممتازة، لا توجد به أي علامات استخدام أو طيات في الصفحات. الغلاف سليم تماماً.</p>
                    </div>

                    <div className="border-r-4 border-secondary pr-6">
                        <h2 className="font-notoSerif text-2xl text-primary mb-2">ممتاز (Excellent)</h2>
                        <p className="text-on-surface-variant">استخدم بشكل طفيف جداً. قد توجد علامات تكاد لا تُذكر على الغلاف، لكن الصفحات نظيفة تماماً.</p>
                    </div>

                    <div className="border-r-4 border-outline pr-6">
                        <h2 className="font-notoSerif text-2xl text-primary mb-2">جيد جداً (Very Good)</h2>
                        <p className="text-on-surface-variant">كتاب نظيف مع بعض علامات الاستخدام العادية على الغلاف أو الحواف. قد يحتوي على توقيع المالك السابق.</p>
                    </div>

                    <div className="border-r-4 border-tertiary pr-6">
                        <h2 className="font-notoSerif text-2xl text-primary mb-2">مقبول (Fair)</h2>
                        <p className="text-on-surface-variant">كتاب تمت قراءته كثيراً. الغلاف قد يكون متهالكاً قليلاً، وقد توجد ملاحظات مكتوبة بالهامش، لكنه كامل وصالح للقراءة.</p>
                    </div>
                </div>
            </main>
            <NewFooter />
        </div>
    );
};

export default ConditionGuide;
