'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CallbackForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    // Имитация отправки (потом заменим на реальную)
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStatus('success');
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gray-900 text-white border-gray-800 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Перезвоним за 25 секунд</CardTitle>
        <p className="text-gray-400 text-sm">Оставьте номер, и мы рассчитаем точную стоимость.</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            type="text" placeholder="Ваше имя" required
            value={name} onChange={(e) => setName(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500" 
          />
          <Input 
            type="tel" placeholder="Ваш телефон" required
            value={phone} onChange={(e) => setPhone(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500" 
          />
          <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white" disabled={status === 'loading'}>
            {status === 'loading' ? 'Отправка...' : 'Жду звонка'}
          </Button>
          {status === 'success' && (
            <p className="text-green-400 text-center text-sm">Спасибо! Мы скоро свяжемся с вами.</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}