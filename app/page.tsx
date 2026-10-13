'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Check, ChevronRight, Clock3, MapPin, MessageCircle, Phone, ShieldCheck, Truck, Weight } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'

const fleet = [
  { image: '/truck-man.png', title: 'MAN TGX 18.480', meta: 'Тент · 20 т' },
  { image: '/truck-kamaz.png', title: 'КамАЗ 5490', meta: 'Тент · 20 т' },
  { image: '/truck-refrigerator.png', title: 'Рефрижератор', meta: 'Температурный режим · 20 т' },
  { image: '/truck-board.png', title: 'Бортовая платформа', meta: 'Негабарит · до 25 т' },
  { image: '/truck-metal.png', title: 'Цельнометаллический', meta: 'Закрытый кузов · 10 т' },
  { image: '/truck-tent.png', title: 'Еврофура', meta: 'Тент · 20 т' },
]

const advantages = [
  ['14', 'лет на рынке'],
  ['12 000', 'рейсов выполнено'],
  ['60', 'собственных машин'],
  ['98%', 'клиентов возвращаются'],
]

export default function Page() {
  const [weight, setWeight] = useState([20])
  const [distance, setDistance] = useState('')
  const [bodyType, setBodyType] = useState('tent')
  const [calculated, setCalculated] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  return (
    <main className="min-h-screen overflow-hidden bg-[#eefafa] text-[#071f2a]">
      <header className="absolute inset-x-0 top-0 z-20 border-b border-white/15 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="CaravanExpress — на главную">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#2de2e6] text-white"><Truck /></span>
            <span className="text-lg font-black tracking-tight">Caravan<span className="text-[#8ffcff]">Express</span></span>
          </a>
          <div className="hidden items-center gap-8 text-sm font-semibold md:flex"><a href="#fleet" className="text-white/75 transition hover:text-white">Автопарк</a><a href="#advantages" className="text-white/75 transition hover:text-white">О компании</a><a href="#faq" className="text-white/75 transition hover:text-white">Вопросы</a></div>
          <a href="tel:+79534306888" className="flex items-center gap-2 text-sm font-bold sm:text-base"><Phone className="size-4 text-[#8ffcff]" /> +79534306888</a>
        </div>
      </header>

      <section id="top" className="relative bg-[#071f2a] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_25%,rgba(45,226,230,0.2),transparent_28%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-36 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:pb-28 lg:pt-48">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-[#8ffcff]"><span className="h-px w-8 bg-[#2de2e6]" /> Перевозим без задержек</div>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.04em] sm:text-7xl">Грузоперевозки <span className="text-[#2de2e6]">по всей России</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/70 sm:text-xl">Тоннаж не ограничен. Выезд сегодня.<br className="hidden sm:block" /> От 1,5 до 50 т — доставим точно в срок.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href="#request"><Button className="h-14 rounded-xl bg-[#2de2e6] px-7 text-base font-bold text-white hover:bg-[#1bb9c0]">Заказать звонок <ArrowRight data-icon="inline-end" /></Button></a><a href="https://wa.me/79223334455" target="_blank" rel="noreferrer" className="flex h-14 items-center justify-center gap-2 rounded-xl border border-white/20 px-6 font-bold text-white transition hover:bg-white/10"><MessageCircle className="size-5 text-[#54d68a]" /> WhatsApp</a></div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/55"><span className="flex items-center gap-2"><Check className="size-4 text-[#8ffcff]" /> Собственный автопарк</span><span className="flex items-center gap-2"><Check className="size-4 text-[#8ffcff]" /> Страховка включена</span></div>
          </div>
          <Card className="self-end rounded-2xl border-0 bg-white p-1 shadow-2xl shadow-black/20 lg:mt-12"><CardContent className="rounded-xl bg-[#eefafa] p-6 text-[#071f2a] sm:p-8"><div className="mb-7 flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#2de2e6]">Быстрый расчёт</p><h2 className="mt-2 text-2xl font-black tracking-tight">Узнайте стоимость</h2></div><span className="rounded-full bg-[#2de2e6]/10 p-3 text-[#2de2e6]"><Weight className="size-5" /></span></div><div className="flex flex-col gap-6"><div><div className="mb-3 flex justify-between text-sm font-bold"><Label>Вес груза</Label><span className="text-[#2de2e6]">{weight[0]} т</span></div><Slider value={weight} onValueChange={setWeight} min={1} max={50} step={1} aria-label="Вес груза" className="py-2" /><div className="mt-1 flex justify-between text-xs text-slate-400"><span>1 т</span><span>50 т</span></div></div><div><Label htmlFor="distance" className="mb-2 block text-sm font-bold">Расстояние</Label><div className="relative"><Input id="distance" type="number" placeholder="Например, 850" value={distance} onChange={(e) => setDistance(e.target.value)} className="h-12 rounded-xl border-slate-200 bg-white pr-12" /><span className="absolute right-4 top-3.5 text-sm text-slate-400">км</span></div></div><div><Label className="mb-2 block text-sm font-bold">Тип кузова</Label><Select value={bodyType} onValueChange={setBodyType}><SelectTrigger className="h-12 rounded-xl border-slate-200 bg-white"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="tent">Тент</SelectItem><SelectItem value="reefer">Рефрижератор</SelectItem><SelectItem value="board">Борт</SelectItem><SelectItem value="metal">Цельнометаллический</SelectItem></SelectContent></Select></div><Button onClick={() => setCalculated(true)} className="h-13 rounded-xl bg-[#071f2a] text-base font-bold text-white hover:bg-[#123e5b]">Рассчитать стоимость <ArrowRight data-icon="inline-end" /></Button>{calculated && <div className="rounded-xl bg-[#e9f7ef] p-4 text-center text-sm font-semibold text-[#22744b]">Звоните <a href="tel:+79534306888" className="font-black underline">+79534306888</a> — договоримся за 2 минуты</div>}</div></CardContent></Card>
        </div>
      </section>

      <section id="advantages" className="border-b border-slate-200 bg-white"><div className="mx-auto grid max-w-7xl grid-cols-2 gap-0 px-5 py-8 sm:grid-cols-4 lg:px-8">{advantages.map(([value, label]) => <div key={label} className="border-slate-200 px-4 py-5 first:pl-0 sm:border-l sm:first:border-l-0 lg:px-8"><p className="text-3xl font-black tracking-tight sm:text-4xl">{value}</p><p className="mt-1 text-sm text-slate-500">{label}</p></div>)}</div></section>

      <section id="fleet" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"><div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#2de2e6]">Наш автопарк</p><h2 className="max-w-xl text-4xl font-black tracking-[-0.03em] sm:text-5xl">Машина под задачу,<br />а не наоборот</h2></div><p className="max-w-sm text-sm leading-6 text-slate-500">Собственные машины и проверенные экипажи. Контролируем груз на каждом километре.</p></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{fleet.map((item) => <Card key={item.title} className="group overflow-hidden rounded-2xl border-slate-200 bg-white py-0 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className="relative aspect-[1.45] overflow-hidden"><Image src={item.image} alt={item.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" /></div><CardContent className="p-5"><div className="flex items-center justify-between"><div><h3 className="font-black">{item.title}</h3><p className="mt-1 text-sm text-slate-500">{item.meta}</p></div><ChevronRight className="size-5 text-[#2de2e6]" /></div></CardContent></Card>)}</div></section>

      <section id="request" className="bg-[#071f2a] text-white"><div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-8 lg:py-24"><div><p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#8ffcff]">Есть груз?</p><h2 className="text-4xl font-black tracking-[-0.03em] sm:text-5xl">Перезвоним за<br /><span className="text-[#2de2e6]">25 секунд</span></h2><p className="mt-6 max-w-md leading-7 text-white/65">Расскажите, что нужно перевезти. Подберём машину, рассчитаем маршрут и назовём точную цену.</p><div className="mt-8 flex flex-col gap-4 text-sm text-white/70"><span className="flex items-center gap-3"><Clock3 className="size-5 text-[#2de2e6]" /> Работаем 24/7 без выходных</span><span className="flex items-center gap-3"><ShieldCheck className="size-5 text-[#2de2e6]" /> Груз застрахован на всём маршруте</span></div></div><Card className="rounded-2xl border-white/10 bg-white p-2 text-[#071f2a] shadow-2xl"><CardContent className="rounded-xl bg-[#eefafa] p-6 sm:p-8"><h3 className="text-2xl font-black">Оставьте номер</h3><p className="mt-2 text-sm text-slate-500">Наш спе��иалист свяжется с вами в течение минуты</p><div className="mt-7 flex flex-col gap-4"><div><Label htmlFor="name" className="mb-2 block text-sm font-bold">Ваше имя</Label><Input id="name" placeholder="Иван" className="h-12 rounded-xl border-slate-200 bg-white" /></div><div><Label htmlFor="phone" className="mb-2 block text-sm font-bold">Номер телефона</Label><Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" className="h-12 rounded-xl border-slate-200 bg-white" /></div><Button onClick={() => setSubmitted(true)} className="mt-2 h-13 rounded-xl bg-[#2de2e6] text-base font-bold text-white hover:bg-[#1bb9c0]">{submitted ? 'Заявка отправлена' : 'Перезвоним за 25 секунд'} <ArrowRight data-icon="inline-end" /></Button>{submitted && <p className="text-center text-sm font-semibold text-[#22744b]">Спасибо! Мы уже набираем ваш номер.</p>}</div><div className="my-6 flex items-center gap-3 text-xs text-slate-400"><span className="h-px flex-1 bg-slate-200" /> или <span className="h-px flex-1 bg-slate-200" /></div><a href="https://wa.me/79534306888" target="_blank" rel="noreferrer" className="flex h-12 items-center justify-center gap-2 rounded-xl border border-[#54d68a]/30 bg-[#e9f7ef] font-bold text-[#22744b] transition hover:bg-[#d9f3e3]"><MessageCircle className="size-5" /> Написать в WhatsApp</a></CardContent></Card></div></section>

      <section id="faq" className="mx-auto max-w-3xl px-5 py-20 lg:py-28"><div className="text-center"><p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#2de2e6]">Всё прозрачно</p><h2 className="text-4xl font-black tracking-[-0.03em] sm:text-5xl">Частые вопросы</h2></div><Accordion type="single" collapsible className="mt-10">{['Подадите машину за 3 часа?', 'Работаете с НДС / без НДС?', 'Страховка груза включена?', 'Какие направления обслуживаете?'].map((question, index) => <AccordionItem value={`item-${index}`} key={question} className="border-slate-200"><AccordionTrigger className="py-6 text-left text-base font-bold hover:no-underline">{question}</AccordionTrigger><AccordionContent className="pb-6 leading-7 text-slate-500">Да, в большинстве случаев мы подаём подходящую машину в течение 3 часов. Точный срок зависит от города загрузки и типа кузова — уточним при расчёте.</AccordionContent></AccordionItem>)}</Accordion></section>

      <footer className="border-t border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8"><div className="flex items-center gap-2 font-black text-[#071f2a]"><span className="flex size-8 items-center justify-center rounded-lg bg-[#2de2e6] text-white"><Truck className="size-4" /></span> CaravanExpress</div><div className="flex flex-wrap items-center gap-5"><a href="tel:+79534306888" className="font-bold text-[#071f2a]">+79534306888</a><span>© 2024 Все права защищены</span></div></div></footer>
    </main>
  )
}

