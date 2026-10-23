'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Check, ChevronRight, Clock3, MessageCircle, Phone, ShieldCheck, Weight } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import Reviews from '@/components/Reviews'

const fleet = [
  { image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_3_2026-10-18_10-22-12-3fWcANPCdjnO4r8S2LFnjRh6E7eiEz.jpg', title: 'Малотоннажный транспорт', meta: 'От 1,5 до 3 т · до 20 м³' },
  { image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_1_2026-10-18_10-22-12-htInuqueFP5kOS5grE5oVaPTBIimpg.jpg', title: 'Бортовая платформа', meta: '10–15 т · длина 10 м' },
  { image: '/caravanexpress-logo.jpg', title: 'Тяжёлый транспорт', meta: '20 т · длина до 13,6 м' },
  { image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2_2026-10-18_10-22-12-CuHPxXMvmC6kyVwpGoo6oEYl1vee42.jpg', title: 'Контейнеровоз', meta: '25–32 т · длина до 13,6 м' },
]

const advantages = [
  ['14', 'лет на рынке'],
  ['12 000', 'рейсов выполнено'],
  ['60', 'собственных машин'],
  ['98%', 'клиентов возвращаются'],
]

// Уникальные вопросы и ответы для FAQ
const faqs = [
  { q: 'Подадите машину за 3 часа?', a: 'Да, в большинстве случаев мы подаём подходящую машину в течение 3 часов после подтверждения заявки. Точный срок зависит от города загрузки и типа кузова.' },
  { q: 'Работаете с НДС / без НДС?', a: 'Мы работаем как с НДС, так и без НДС. Форма оплаты и пакет документов обсуждаются индивидуально при оформлении заявки.' },
  { q: 'Страховка груза включена?', a: 'Да, ваш груз застрахован на всём маршруте следования. Мы гарантируем его сохранность и компенсируем ущерб в случае непредвиденных ситуаций.' },
  { q: 'Какие направления обслуживаете?', a: 'Мы осуществляем перевозки по всей территории России. Межгород, международные направления и доставка в труднодоступные регионы.' },
]

export default function Page() {
  const [weight, setWeight] = useState([0.5])
  const [distance, setDistance] = useState('')
  const [bodyType, setBodyType] = useState('tent')
  const [calculated, setCalculated] = useState(false)
  
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const calculateRatePerKilometer = (w: number): number => {
    if (w >= 0.1 && w < 2) return 55
    if (w >= 2 && w < 5) return 85
    if (w >= 5 && w < 10) return 105
    if (w >= 10 && w <= 20) return 145
    return 55
  }
  
  const ratePerKilometer = calculateRatePerKilometer(weight[0])
  const estimatedCost = Math.max(0, Number(distance) || 0) * ratePerKilometer
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setShowIntro(false), 2600)
    return () => window.clearTimeout(timer)
  }, [])

  const displayWeight = weight[0].toFixed(1) === '0.1' ? '0.1 (100 кг)' : weight[0].toFixed(1)

  const handleSubmit = async () => {
    if (!name || !phone) {
      alert('Пожалуйста, заполните имя и телефон')
      return
    }
    setIsSubmitting(true)
    try {
      await fetch('/api/send-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone })
      })
      setSubmitted(true)
    } catch (e) {
      alert('Ошибка при отправке. Позвоните нам напрямую.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Плавный скролл к секциям
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {showIntro && (
        <div className="intro-screen" role="status" aria-label="CaravanExpress загружается">
          <Image src="/camel-desert-intro.jpg" alt="Верблюд с грузом идёт по пустыне" fill priority className="intro-backdrop" sizes="100vw" />
          <div className="intro-overlay" />
          <div className="intro-content">
            <p className="intro-kicker">CaravanExpress</p>
            <div className="intro-mark" aria-hidden="true">CARAVAN</div>
            <p className="intro-caption">Доставляем точно в срок</p>
            <span className="intro-loader" aria-hidden="true" />
          </div>
        </div>
      )}
      <main className="min-h-screen overflow-hidden bg-[#eefafa] text-[#071f2a]">
      <header className="absolute inset-x-0 top-0 z-20 border-b border-white/15 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="CaravanExpress — на главную">
            <span className="relative flex size-10 items-center justify-center overflow-hidden rounded-xl bg-[#2de2e6] ring-2 ring-[#8ffcff]/60"><Image src="/caravanexpress-logo.jpg" alt="Логотип CaravanExpress с верблюдом" fill className="object-contain" sizes="40px" /></span>
            <span className="text-lg font-black tracking-tight">Caravan<span className="text-[#8ffcff]">Express</span></span>
          </a>
          <div className="hidden items-center gap-8 text-sm font-semibold md:flex">
            {/* ИСПРАВЛЕНО: Кнопки меню теперь работают */}
            <button onClick={() => scrollTo('fleet')} className="text-white/75 transition hover:text-white">Автопарк</button>
            <button onClick={() => scrollTo('advantages')} className="text-white/75 transition hover:text-white">О компании</button>
            <button onClick={() => scrollTo('faq')} className="text-white/75 transition hover:text-white">Вопросы</button>
          </div>
          <a href="tel:+79509092181" className="flex items-center gap-2 text-sm font-bold sm:text-base"><Phone className="size-4 text-[#8ffcff]" /> +7 (950) 909-21-81</a>
        </div>
      </header>

      <section id="top" className="relative bg-[#071f2a] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_25%,rgba(45,226,230,0.2),transparent_28%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-36 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:pb-28 lg:pt-48">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-[#8ffcff]"><span className="h-px w-8 bg-[#2de2e6]" /> Перевозим без задержек</div>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.04em] sm:text-7xl">Грузоперевозки <span className="text-[#2de2e6]">по всей России</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/70 sm:text-xl">Тоннаж не ограничен. Выезд сегодня.<br className="hidden sm:block" /> От 1,5 до 50 т — доставим точно в срок.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {/* ИСПРАВЛЕНО: Кнопка теперь скроллит к форме */}
              <Button onClick={() => scrollTo('request')} className="h-14 rounded-xl bg-[#2de2e6] px-7 text-base font-bold text-white hover:bg-[#1bb9c0]">Заказать звонок <ArrowRight data-icon="inline-end" /></Button>
              <a href="https://wa.me/79509092181" target="_blank" rel="noreferrer" className="flex h-14 items-center justify-center gap-2 rounded-xl border border-white/20 px-6 font-bold text-white transition hover:bg-white/10"><MessageCircle className="size-5 text-[#54d68a]" /> WhatsApp</a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/55"><span className="flex items-center gap-2"><Check className="size-4 text-[#8ffcff]" /> Собственный автопарк</span><span className="flex items-center gap-2"><Check className="size-4 text-[#8ffcff]" /> Страховка включена</span></div>
          </div>
          <Card className="self-end rounded-2xl border-0 bg-white p-1 shadow-2xl shadow-black/20 lg:mt-12"><CardContent className="rounded-xl bg-[#eefafa] p-6 text-[#071f2a] sm:p-8"><div className="mb-7 flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#2de2e6]">Быстрый расчёт</p><h2 className="mt-2 text-2xl font-black tracking-tight">Узнайте стоимость</h2></div><span className="rounded-full bg-[#2de2e6]/10 p-3 text-[#2de2e6]"><Weight className="size-5" /></span></div><div className="flex flex-col gap-6"><div><div className="mb-3 flex justify-between text-sm font-bold"><Label>Вес груза</Label><span className="text-[#2de2e6]">{displayWeight} т</span></div><Slider value={weight} onValueChange={setWeight} min={0.1} max={20} step={0.1} aria-label="Вес груза" className="py-2" /><div className="mt-1 flex justify-between text-xs text-slate-400"><span>0.1 т (100 кг)</span><span>20 т</span></div></div><div><Label htmlFor="distance" className="mb-2 block text-sm font-bold">Расстояние</Label><div className="relative"><Input id="distance" type="number" placeholder="Например, 850" value={distance} onChange={(e) => setDistance(e.target.value)} className="h-12 rounded-xl border-slate-200 bg-white pr-12" /><span className="absolute right-4 top-3.5 text-sm text-slate-400">км</span></div></div><div><Label className="mb-2 block text-sm font-bold">Тип кузова</Label><Select value={bodyType} onValueChange={setBodyType}><SelectTrigger className="h-12 rounded-xl border-slate-200 bg-white"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="tent">Тент</SelectItem><SelectItem value="reefer">Рефрижератор</SelectItem><SelectItem value="board">Борт</SelectItem><SelectItem value="metal">Цельнометаллический</SelectItem></SelectContent></Select></div><Button onClick={() => setCalculated(Number(distance) > 0)} className="h-13 rounded-xl bg-[#071f2a] text-base font-bold text-white hover:bg-[#123e5b]">Рассчитать стоимость <ArrowRight data-icon="inline-end" /></Button>{calculated && <p className="text-sm font-bold text-[#2de2e6]">Тариф: {ratePerKilometer} ₽/км · Итого: {estimatedCost.toLocaleString('ru-RU')} ₽</p>}{calculated && <div className="rounded-xl bg-[#e9f7ef] p-4 text-center text-sm font-semibold text-[#22744b]">Звоните <a href="tel:+79509092181" className="font-black underline">+7 (950) 909-21-81</a> — договоримся за 2 минуты</div>}</div></CardContent></Card>
        </div>
      </section>

      <section id="advantages" className="border-b border-slate-200 bg-white"><div className="mx-auto grid max-w-7xl grid-cols-2 gap-0 px-5 py-8 sm:grid-cols-4 lg:px-8">{advantages.map(([value, label]) => <div key={label} className="border-slate-200 px-4 py-5 first:pl-0 sm:border-l sm:first:border-l-0 lg:px-8"><p className="text-3xl font-black tracking-tight sm:text-4xl">{value}</p><p className="mt-1 text-sm text-slate-500">{label}</p></div>)}</div></section>

      <section id="fleet" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"><div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#2de2e6]">Наш автопарк</p><h2 className="max-w-xl text-4xl font-black tracking-[-0.03em] sm:text-5xl">Машина под задачу,<br />а не наоборот</h2></div><p className="max-w-sm text-sm leading-6 text-slate-500">Собственные машины и проверенные экипажи. Контролируем груз на каждом километре.</p></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{fleet.map((item) => <Card key={item.title} className="group overflow-hidden rounded-2xl border-slate-200 bg-white py-0 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className="relative aspect-[1.45] overflow-hidden"><Image src={item.image} alt={item.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" /></div><CardContent className="p-5"><div className="flex items-center justify-between"><div><h3 className="font-black">{item.title}</h3><p className="mt-1 text-sm text-slate-500">{item.meta}</p></div><ChevronRight className="size-5 text-[#2de2e6]" /></div></CardContent></Card>)}</div></section>

      <Reviews />

      <section id="request" className="bg-[#071f2a] text-white"><div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-8 lg:py-24"><div><p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#8ffcff]">Есть груз?</p><h2 className="text-4xl font-black tracking-[-0.03em] sm:text-5xl">Перезвоним за<br /><span className="text-[#2de2e6]">25 секунд</span></h2><p className="mt-6 max-w-md leading-7 text-white/65">Расскажите, что нужно перевезти. Подберём машину, рассчитаем маршрут и назовём точную цену.</p><div className="mt-8 flex flex-col gap-4 text-sm text-white/70"><span className="flex items-center gap-3"><Clock3 className="size-5 text-[#2de2e6]" /> Работаем 24/7 без выходных</span><span className="flex items-center gap-3"><ShieldCheck className="size-5 text-[#2de2e6]" /> Груз застрахован на всём маршруте</span></div></div><Card className="rounded-2xl border-white/10 bg-white p-2 text-[#071f2a] shadow-2xl"><CardContent className="rounded-xl bg-[#eefafa] p-6 sm:p-8"><h3 className="text-2xl font-black">Оставьте номер</h3><p className="mt-2 text-sm text-slate-500">Наш специалист свяжется с вами в течение минуты</p><div className="mt-7 flex flex-col gap-4"><div><Label htmlFor="name" className="mb-2 block text-sm font-bold">Ваше имя</Label><Input id="name" placeholder="Иван" value={name} onChange={(e) => setName(e.target.value)} className="h-12 rounded-xl border-slate-200 bg-white" /></div><div><Label htmlFor="phone" className="mb-2 block text-sm font-bold">Номер телефона</Label><Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" value={phone} onChange={(e) => setPhone(e.target.value)} className="h-12 rounded-xl border-slate-200 bg-white" /></div><Button onClick={handleSubmit} disabled={isSubmitting || submitted} className="mt-2 h-13 rounded-xl bg-[#2de2e6] text-base font-bold text-white hover:bg-[#1bb9c0] disabled:opacity-70">{submitted ? 'Заявка отправлена' : isSubmitting ? 'Отправка...' : 'Перезвоним за 25 секунд'} <ArrowRight data-icon="inline-end" /></Button>{submitted && <p className="text-center text-sm font-semibold text-[#22744b]">Спасибо! Мы уже набираем ваш номер.</p>}</div><div className="my-6 flex items-center gap-3 text-xs text-slate-400"><span className="h-px flex-1 bg-slate-200" /> или <span className="h-px flex-1 bg-slate-200" /></div><a href="https://wa.me/79509092181" target="_blank" rel="noreferrer" className="flex h-12 items-center justify-center gap-2 rounded-xl border border-[#54d68a]/30 bg-[#e9f7ef] font-bold text-[#22744b] transition hover:bg-[#d9f3e3]"><MessageCircle className="size-5" /> Написать в WhatsApp</a></CardContent></Card></div></section>

      <section id="faq" className="mx-auto max-w-3xl px-5 py-20 lg:py-28"><div className="text-center"><p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#2de2e6]">Всё прозрачно</p><h2 className="text-4xl font-black tracking-[-0.03em] sm:text-5xl">Частые вопросы</h2></div><Accordion type="single" collapsible className="mt-10">
        {/* ИСПРАВЛЕНО: Уникальные ответы для FAQ */}
        {faqs.map((item, index) => (
          <AccordionItem value={`item-${index}`} key={item.q} className="border-slate-200">
            <AccordionTrigger className="py-6 text-left text-base font-bold hover:no-underline">{item.q}</AccordionTrigger>
            <AccordionContent className="pb-6 leading-7 text-slate-500">{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion></section>

      <footer className="border-t border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8"><div className="flex items-center gap-2 font-black text-[#071f2a]"><span className="relative flex size-8 items-center justify-center overflow-hidden rounded-lg bg-[#2de2e6] ring-2 ring-[#8ffcff]/60"><Image src="/caravanexpress-logo.jpg" alt="Логотип CaravanExpress с верблюдом" fill className="object-contain" sizes="32px" /></span> CaravanExpress</div><div className="flex flex-wrap items-center gap-5"><a href="tel:+79509092181" className="font-bold text-[#071f2a]">+7 (950) 909-21-81</a><span>© 2026 Все права защищены</span></div></div></footer>
      </main>
    </>
  )
}