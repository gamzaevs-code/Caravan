import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function Reviews() {
  const reviews = [
    {
      id: 1, name: 'Алексей', city: 'Москва',
      text: 'Перевозили оборудование из Москвы в Казань. Всё пришло вовремя, груз застрахован. Водитель вежливый, помог с погрузкой.',
      date: '12 Октября 2026', rating: 5
    },
    {
      id: 2, name: 'Елена', city: 'Санкт-Петербург',
      text: 'Заказывала перевозку мебели. Цена оказалась ниже, чем у конкурентов. Приехали быстро, всё аккуратно упаковали.',
      date: '05 Октября 2026', rating: 5
    },
    {
      id: 3, name: 'Дмитрий', city: 'Екатеринбург',
      text: 'Надежная компания. Работаем с ними на постоянной основе. Ни разу не подвели со сроками.',
      date: '28 Сентября 2026', rating: 5
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-5 max-w-7xl">
        <div className="text-center mb-12">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-primary">Нам доверяют</p>
          <h2 className="text-4xl font-black tracking-[-0.03em] sm:text-5xl text-foreground">Отзывы клиентов</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="bg-card border-border shadow-md">
              <CardContent className="p-8">
                <div className="flex text-yellow-400 mb-4">
                  {Array(review.rating).fill(0).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-foreground mb-6 italic font-medium">"{review.text}"</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                  <div>
                    <p className="font-bold text-foreground">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.city}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}