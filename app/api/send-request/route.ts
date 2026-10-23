import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, phone } = await req.json();

    // Замени эти две строки на свои данные
    const TG_TOKEN = 'ТВОЙ_ТОКЕН_БОТА'; 
    const TG_CHAT_ID = 'ТВОЙ_CHAT_ID'; // Узнать можно у бота @userinfobot

    const text = `🚛 Новая заявка с сайта!\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}`;

    await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TG_CHAT_ID, text }),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}