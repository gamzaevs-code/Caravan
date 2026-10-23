import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react"; // Если у тебя нет lucide-react, можно заменить на "★"

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
    <section className="py-16 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Что о нас говорят</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="bg-white dark:bg-gray-900 shadow-md">
              <CardContent className="p-6">
                <div className="flex text-yellow-400 mb-4">
                  {Array(review.rating).fill(0).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic">"{review.text}"</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t">
                  <div>
                    <p className="font-bold">{review.name}</p>
                    <p className="text-xs text-gray-500">{review.city}</p>
                  </div>
                  <p className="text-xs text-gray-400">{review.date}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}