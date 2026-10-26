'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Check, ChevronRight, Clock3, MessageCircle, Phone, ShieldCheck, Weight, Newspaper } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Reviews from '@/components/Reviews'

const fleet = [
  { image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_3_2026-10-18_10-22-12-3fWcANPCdjnO4r8S2LFnjRh6E7eiEz.jpg', title: 'Малотоннажный транспорт', meta: 'От 1,5 до 3 т · до 20 м³' },
  { image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_1_2026-10-18_10-22-12-htInuqueFP5kOS5grE5oVaPTBIimpg.jpg', title: 'Бортовая платформа', meta: '10–15 т · длина 10 м' },
  { image: '/caravanexpress-logo.jpg', title: 'Тяжёлый транспорт', meta: '20 т · длина до 13,6 м' },
  { image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2_2026-10-18_10-22-12-CuHPxXMvmC6kyVwpGoo6oEYl1vee42.jpg', title: 'Контейнеровоз', meta: '25–32 т · длина до 13,6 м' },
]

const advantages = [['14', 'лет на рынке'], ['12 000', 'рейсов выполнено'], ['60', 'собственных машин'], ['98%', 'клиентов возвращаются']]

const news = [
  { date: '20 Окт 2026', title: 'Открыт новый маршрут', desc: 'Теперь доставляем грузы в страны СНГ без пересадок и лишних таможенных пошлин.' },
  { date: '15 Окт 2026', title: 'Обновление автопарка', desc: 'Мы закупили 5 новых рефрижераторов для перевозки скоропортящихся продуктов.' },
  { date: '01 Окт 2026', title: 'Скидка на первый заказ', desc: 'Для новых клиентов действует скидка 10% на перевозку сборных грузов.' },
]

const faqs = [
  { q: 'Подадите машину за 3 часа?', a: 'Да, в большинстве случаев мы подаём подходящую машину в течение 3 часов после подтверждения заявки.' },
  { q: 'Работаете с НДС / без НДС?', a: 'Мы работаем как с НДС, так и без НДС. Форма оплаты и пакет документов обсуждаются индивидуально.' },
  { q: 'Страховка груза включена?', a: 'Да, ваш груз застрахован на всём маршруте следования. Мы гарантируем его сохранность.' },
  { q: 'Какие направления обслуживаете?', a: 'Мы осуществляем перевозки по всей территории России. Межгород, международные направления и доставка в труднодоступные регионы.' },
]

export default function Page() {
  const [weight, setWeight] = useState('')
  const [distance, setDistance] = useState('')
  const [calculatedCost, setCalculatedCost] = useState<number | null>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setShowIntro(false), 2600)
    return () => window.clearTimeout(timer)
  }, [])

  const handleCalculate = () => {
    const w = parseFloat(weight) || 0;
    const d = parseFloat(distance) || 0;
    let rate = 55; 
    if (w >= 2 && w < 5) rate = 85;
    else if (w >= 5 && w < 10) rate = 105;
    else if (w >= 10) rate = 145;
    setCalculatedCost(Math.round((d * rate) + 5000));
  }

  const handleSubmit = async () => {
    if (!name || !phone) { alert('Пожалуйста, заполните имя и телефон'); return }
    setIsSubmitting(true)
    try {
      await fetch('/api/send-request', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, phone }) })
      setSubmitted(true)
    } catch (e) { alert('Ошибка. Позвоните нам напрямую.') } finally { setIsSubmitting(false) }
  }

  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <>
      {showIntro && (
        <div className="intro-screen" role="status" aria-label="CaravanExpress загружается">
          <Image src="/camel-desert-intro.jpg" alt="Верблюд с грузом" fill priority className="intro-backdrop" sizes="100vw" />
          <div className="intro-overlay" />
          <div className="intro-content">
            <p className="intro-kicker">CaravanExpress</p>
            <div className="intro-mark">CARAVAN</div>
            <p className="intro-caption">Доставляем точно в срок</p>
            <span className="intro-loader" />
          </div>
        </div>
      )}
      
      <main className="min-h-screen overflow-hidden bg-background text-foreground">
        <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
            <a href="#top" className="flex items-center gap-3">
              <span className="relative flex size-10 items-center justify-center overflow-hidden rounded-xl bg-primary ring-2 ring-primary/50">
                <Image src="/caravanexpress-logo.jpg" alt="Логотип" fill className="object-contain" sizes="40px" />
              </span>
              <span className="text-lg font-black tracking-tight text-foreground">Caravan<span className="text-primary">Express</span></span>
            </a>
            <div className="hidden items-center gap-8 text-sm font-semibold md:flex">
              <button onClick={() => scrollTo('fleet')} className="text-muted-foreground transition hover:text-foreground">Автопарк</button>
              <button onClick={() => scrollTo('news')} className="text-muted-foreground transition hover:text-foreground">Новости</button>
              <button onClick={() => scrollTo('faq')} className="text-muted-foreground transition hover:text-foreground">Вопросы</button>
            </div>
            <a href="tel:+79509092181" className="flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary transition">
              <Phone className="size-4 text-primary" /> +7 (950) 909-21-81
            </a>
          </div>
        </header>

        <section id="top" className="relative pt-32 pb-20 lg:pt-48 lg:pb-28">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
            <div className="max-w-3xl">
              <div className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-primary">
                <span className="h-px w-8 bg-primary" /> Перевозим без задержек
              </div>
              <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-[-0.04em] text-foreground sm:text-7xl">
                Грузоперевозки <span className="text-primary">по всей России</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl">
                Тоннаж не ограничен. Выезд сегодня.<br className="hidden sm:block" /> От 1,5 до 50 т — доставим точно в срок.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button onClick={() => scrollTo('request')} className="h-14 rounded-xl bg-primary px-7 text-base font-bold text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-105">
                  Заказать звонок <ArrowRight className="ml-2 size-5" />
                </Button>
                <a href="https://wa.me/79509092181" target="_blank" rel="noreferrer" className="flex h-14 items-center justify-center gap-2 rounded-xl border border-border px-6 font-bold text-foreground transition hover:bg-muted hover:scale-105">
                  <MessageCircle className="size-5 text-green-400" /> WhatsApp
                </a>
              </div>
            </div>

            <Card className="self-end rounded-2xl border border-border bg-card p-1 shadow-2xl lg:mt-12">
              <CardContent className="rounded-xl bg-background p-6 sm:p-8">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">Быстрый расчёт</p>
                    <h2 className="mt-2 text-2xl font-black tracking-tight text-foreground">Узнайте стоимость</h2>
                  </div>
                  <span className="rounded-full bg-primary/10 p-3 text-primary"><Weight className="size-5" /></span>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <Label className="mb-2 block text-sm font-bold text-foreground">Вес груза (тонн)</Label>
                    <Input type="number" placeholder="Например: 1.5" value={weight} onChange={(e) => setWeight(e.target.value)} className="h-12 rounded-xl border-border bg-input text-foreground" />
                  </div>
                  <div>
                    <Label className="mb-2 block text-sm font-bold text-foreground">Расстояние (км)</Label>
                    <Input type="number" placeholder="Например: 850" value={distance} onChange={(e) => setDistance(e.target.value)} className="h-12 rounded-xl border-border bg-input text-foreground" />
                  </div>
                  <Button onClick={handleCalculate} className="h-14 rounded-xl bg-primary text-base font-bold text-primary-foreground hover:bg-primary/90 mt-2 transition-transform hover:scale-105">
                    Рассчитать стоимость <ArrowRight className="ml-2 size-5" />
                  </Button>
                  {calculatedCost !== null && (
                    <div className="mt-2 rounded-xl bg-card p-4 border border-border text-center">
                      <p className="text-sm text-muted-foreground mb-1">Примерная стоимость:</p>
                      <p className="text-3xl font-black text-primary">{calculatedCost.toLocaleString('ru-RU')} ₽</p>
                      <div className="mt-2 text-xs text-muted-foreground bg-background p-2 rounded-lg">Включает подачу машины и страховку</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="advantages" className="border-y border-border bg-card/30">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-0 px-5 py-8 sm:grid-cols-4 lg:px-8">
            {advantages.map(([value, label]) => (
              <div key={label} className="border-border px-4 py-5 first:pl-0 sm:border-l sm:first:border-l-0 lg:px-8">
                <p className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">{value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="news" className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="mb-12 flex items-center justify-between">
              <div>
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-primary">Будьте в курсе</p>
                <h2 className="text-3xl font-black sm:text-4xl text-foreground">Новости компании</h2>
              </div>
              <Newspaper className="hidden sm:block size-12 text-primary/20" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {news.map((item, i) => (
                <Card key={i} className="group cursor-pointer border-border bg-card hover:bg-card/80 shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <CardContent className="p-6 relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                    <span className="text-xs font-bold text-primary mb-3 block">{item.date}</span>
                    <h3 className="text-xl font-bold mb-3 text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    <div className="mt-4 flex items-center text-sm font-bold text-foreground group-hover:text-primary transition-colors">Подробнее <ChevronRight className="ml-1 size-4" /></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="fleet" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-primary">Наш автопарк</p>
              <h2 className="max-w-xl text-4xl font-black tracking-[-0.03em] text-foreground sm:text-5xl">Машина под задачу,<br />а не наоборот</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">Собственные машины и проверенные экипажи. Контролируем груз на каждом километре.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fleet.map((item) => (
              <Card key={item.title} className="group overflow-hidden rounded-2xl border-border bg-card shadow-md py-0 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-primary/50">
                <div className="relative aspect-[1.45] overflow-hidden">
                  <Image src={item.image} alt={item.title} fill className="object-cover transition duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-6 relative bg-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-black text-lg text-foreground">{item.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{item.meta}</p>
                    </div>
                    <div className="bg-primary/10 p-2 rounded-full text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"><ChevronRight className="size-5" /></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Reviews />

        <section id="request" className="py-20 lg:py-24 bg-card/30 border-y border-border">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-8">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-primary">Есть груз?</p>
              <h2 className="text-4xl font-black tracking-[-0.03em] text-foreground sm:text-5xl">Перезвоним за<br /><span className="text-primary">25 секунд</span></h2>
              <p className="mt-6 max-w-md leading-7 text-muted-foreground">Расскажите, что нужно перевезти. Подберём машину, рассчитаем маршрут и назовём точную цену.</p>
              <div className="mt-8 flex flex-col gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-3"><Clock3 className="size-5 text-primary" /> Работаем 24/7 без выходных</span>
                <span className="flex items-center gap-3"><ShieldCheck className="size-5 text-primary" /> Груз застрахован на всём маршруте</span>
              </div>
            </div>
            <Card className="rounded-2xl border-border bg-card p-2 shadow-2xl">
              <CardContent className="rounded-xl bg-background p-6 sm:p-8">
                <h3 className="text-2xl font-black text-foreground">Оставьте номер</h3>
                <p className="mt-2 text-sm text-muted-foreground">Наш специалист свяжется с вами в течение минуты</p>
                <div className="mt-7 flex flex-col gap-4">
                  <div>
                    <Label htmlFor="name" className="mb-2 block text-sm font-bold text-foreground">Ваше имя</Label>
                    <Input id="name" placeholder="Иван" value={name} onChange={(e) => setName(e.target.value)} className="h-12 rounded-xl border-border bg-input text-foreground" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="mb-2 block text-sm font-bold text-foreground">Номер телефона</Label>
                    <Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" value={phone} onChange={(e) => setPhone(e.target.value)} className="h-12 rounded-xl border-border bg-input text-foreground" />
                  </div>
                  <Button onClick={handleSubmit} disabled={isSubmitting || submitted} className="mt-2 h-14 rounded-xl bg-primary text-base font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-70 transition-transform hover:scale-105">
                    {submitted ? 'Заявка отправлена' : isSubmitting ? 'Отправка...' : 'Перезвоним за 25 секунд'} <ArrowRight className="ml-2 size-5" />
                  </Button>
                  {submitted && <p className="text-center text-sm font-semibold text-green-400">Спасибо! Мы уже набираем ваш номер.</p>}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-3xl px-5 py-20 lg:py-28">
          <div className="text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-primary">Всё прозрачно</p>
            <h2 className="text-4xl font-black tracking-[-0.03em] text-foreground sm:text-5xl">Частые вопросы</h2>
          </div>
                  <Accordion className="mt-10">
            {faqs.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={item.q} className="border-border">
                <AccordionTrigger className="py-6 text-left text-base font-bold hover:no-underline text-foreground">{item.q}</AccordionTrigger>
                <AccordionContent className="pb-6 leading-7 text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <footer className="border-t border-border bg-background">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <div className="flex items-center gap-2 font-black text-foreground">
              <span className="relative flex size-8 items-center justify-center overflow-hidden rounded-lg bg-primary ring-2 ring-primary/50">
                <Image src="/caravanexpress-logo.jpg" alt="Логотип" fill className="object-contain" sizes="32px" />
              </span> 
              CaravanExpress
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <a href="tel:+79509092181" className="font-bold text-foreground hover:text-primary transition">+7 (950) 909-21-81</a>
              <span>© 2026 Все права защищены</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}