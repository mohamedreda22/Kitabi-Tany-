const emailBody = (token, username) => `
  <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
    <h2 style="color: #2c3e50;">مرحبًا ${username}،</h2>

    <p style="font-size: 16px;">لقد طلبت إعادة تعيين كلمة المرور لحسابك على تطبيق "كتاب تانى". لتحديث كلمة المرور، يرجى النقر على الزر أدناه:</p>

    <div style="text-align: center; margin: 20px 0;">
      <a href="http://localhost:3000/reset-password?token=${token}"  
         style="display: inline-block; padding: 12px 24px; background-color: #3498db; color: #fff; text-decoration: none; border-radius: 5px; font-size: 16px;">
        إعادة تعيين كلمة المرور
      </a>
    </div>

    <p style="font-size: 16px;">يرجى ملاحظة أن هذا الرابط صالح لمدة 5 دقائق فقط. إذا لم تطلب إعادة تعيين كلمة المرور، يمكنك تجاهل هذه الرسالة.</p>

    <p style="font-size: 16px;">شكرًا لك،<br>فريق دعم "كتاب تانى"</p>
  </div>
`

module.exports = emailBody;
