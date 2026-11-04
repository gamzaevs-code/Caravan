import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, phone } = await req.json();

    // Берем ключи из переменных окружения Timeweb Cloud
    const MAX_BOT_TOKEN = process.env.MAX_BOT_TOKEN;
    const MAX_CHAT_ID = process.env.MAX_CHAT_ID;

    if (!MAX_BOT_TOKEN || !MAX_CHAT_ID) {
      console.error('Переменные MAX_BOT_TOKEN или MAX_CHAT_ID не заданы');
      return NextResponse.json({ ok: false, error: 'Настройки сервера не указаны' }, { status: 500 });
    }

    const text = `🚛 **Новая заявка с сайта!**\n\n👤 **Имя:** ${name}\n📞 **Телефон:** ${phone}`;

    // Отправка сообщения через API мессенджера MAX
    const response = await fetch(`https://platform-api2.max.ru/bot${MAX_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: Number(MAX_CHAT_ID), // Передаем ID чата как число
        text: text,
        parse_mode: 'Markdown'
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Ошибка API MAX:', errorText);
      throw new Error('Ошибка при отправке в MAX');
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Ошибка формы:', error);
    return NextResponse.json({ ok: false, error: 'Ошибка отправки' }, { status: 500 });
  }
}