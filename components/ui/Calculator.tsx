'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Calculator() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState<number | null>(null);

  const calculatePrice = () => {
    if (!from || !to || !weight) return;
    // Логика расчета: Базовая ставка 5000 + 15 руб за кг (можешь изменить под себя)
    const basePrice = 5000; 
    const weightCost = Number(weight) * 15; 
    const total = basePrice + weightCost;
    setPrice(Math.round(total));
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Рассчитать стоимость</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Откуда</label>
          <Input placeholder="Например: Москва" value={from} onChange={(e) => setFrom(e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Куда</label>
          <Input placeholder="Например: Казань" value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Вес груза (кг)</label>
          <Input type="number" placeholder="Например: 500" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </div>
        <Button onClick={calculatePrice} className="w-full mt-2">
          Узнать цену
        </Button>
        {price !== null && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-center">
            <p className="text-sm text-muted-foreground">Примерная стоимость:</p>
            <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">{price.toLocaleString('ru-RU')} ₽</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}