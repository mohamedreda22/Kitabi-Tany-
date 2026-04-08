import React from 'react';
import NewNavbar from '../../Component/Shared/NewNavbar';
import NewFooter from '../../Component/Shared/NewFooter';

const Privacy = () => {
    return (
        <div className="bg-surface text-on-surface font-manrope min-h-screen" dir="rtl">
            <NewNavbar />
            <main className="pt-32 pb-20 max-w-4xl mx-auto px-8">
                <h1 className="font-notoSerif text-5xl text-primary italic mb-8">سياسة الخصوصية</h1>
                <div className="space-y-8 text-on-surface-variant leading-relaxed">
                    <p>في "كتابي تاني"، نحن نلتزم بحماية خصوصيتك ومعلوماتك الشخصية.</p>

                    <h2 className="font-notoSerif text-2xl text-primary mt-8 mb-4">المعلومات التي نجمعها</h2>
                    <p>نجمع المعلومات الضرورية فقط لإتمام عمليات الشراء والتواصل معك، مثل الاسم، البريد الإلكتروني، العنوان، ورقم الهاتف.</p>

                    <h2 className="font-notoSerif text-2xl text-primary mt-8 mb-4">كيفية استخدام المعلومات</h2>
                    <p>نستخدم معلوماتك لمعالجة طلباتك، تحسين تجربة التسوق، وإرسال تحديثات حول طلبك أو عروضنا الخاصة (في حال اشتراكك في النشرة البريدية).</p>

                    <h2 className="font-notoSerif text-2xl text-primary mt-8 mb-4">حماية البيانات</h2>
                    <p>نستخدم تقنيات أمان متطورة لمنع الوصول غير المصرح به إلى بياناتك الشخصية.</p>
                </div>
            </main>
            <NewFooter />
        </div>
    );
};

export default Privacy;
