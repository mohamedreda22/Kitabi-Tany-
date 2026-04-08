import React from 'react';
import NewNavbar from '../../Component/Shared/NewNavbar';
import NewFooter from '../../Component/Shared/NewFooter';

const Curation = () => {
    return (
        <div className="bg-surface text-on-surface font-manrope min-h-screen" dir="rtl">
            <NewNavbar />
            <main className="pt-32 pb-20 max-w-4xl mx-auto px-8">
                <h1 className="font-notoSerif text-5xl text-primary italic mb-8">عن اختياراتنا</h1>
                <div className="space-y-8 text-lg leading-relaxed text-on-surface-variant">
                    <p>
                        في "كتابي تاني"، لا نعتبر أنفسنا مجرد متجر للكتب، بل نحن منسقون أدبيون. كل كتاب يدخل مجموعتنا يمر بعملية تقييم دقيقة.
                    </p>
                    <section className="bg-surface-container-low p-8 rounded-2xl">
                        <h2 className="font-notoSerif text-2xl text-primary mb-4">كيف نختار الكتب؟</h2>
                        <ul className="list-disc list-inside space-y-4">
                            <li><strong>القيمة الأدبية:</strong> نركز على الكتب التي تركت أثراً، من الكلاسيكيات إلى الروايات المعاصرة الحائزة على جوائز.</li>
                            <li><strong>الندرة:</strong> نبحث دائماً عن الطبعات القديمة والكنوز التي لم تعد متوفرة بسهولة في المكتبات العادية.</li>
                            <li><strong>حالة النسخة:</strong> نتأكد من أن الكتاب صالح للقراءة الممتعة، مع الحفاظ على بصمة الزمن التي تميز الكتب القديمة.</li>
                        </ul>
                    </section>
                </div>
            </main>
            <NewFooter />
        </div>
    );
};

export default Curation;
