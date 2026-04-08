import React from 'react';
import NewNavbar from '../../Component/Shared/NewNavbar';
import NewFooter from '../../Component/Shared/NewFooter';

const About = () => {
    return (
        <div className="bg-surface text-on-surface font-manrope min-h-screen" dir="rtl">
            <NewNavbar />
            <main className="pt-32 pb-20 max-w-4xl mx-auto px-8">
                <h1 className="font-notoSerif text-5xl text-primary italic mb-8">عن كتابي تاني</h1>
                <div className="space-y-6 text-lg leading-relaxed text-on-surface-variant">
                    <p>
                        "كتابي تاني" هو منصة رقمية مخصصة لعشاق الكتب الذين يقدرون القيمة الأدبية والجمالية للكتب المستعملة والقديمة. مهمتنا هي توفير تجربة تسوق فريدة تجمع بين الجودة، الاستدامة، والأسعار المناسبة.
                    </p>
                    <p>
                        نحن نؤمن أن كل كتاب يستحق فرصة ثانية ليجد قارئاً جديداً يغوص في صفحاته. لذا، نقوم باختيار الكتب بدقة وعناية لضمان وصولها إليكم في أفضل حالة ممكنة.
                    </p>
                    <h2 className="font-notoSerif text-3xl text-primary mt-12 mb-4">رؤيتنا</h2>
                    <p>
                        أن نكون الوجهة الأولى لكل باحث عن كنز أدبي في العالم العربي، مع المساهمة في نشر ثقافة إعادة التدوير والحفاظ على البيئة من خلال تشجيع تداول الكتب.
                    </p>
                </div>
            </main>
            <NewFooter />
        </div>
    );
};

export default About;
