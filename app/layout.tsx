import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Грузоперевозки по России от 1,5 до 50 т | CaravanExpress',
  description: 'Собственный автопарк. Страховка груза. Доставка точно в срок по всей России и СНГ. Рассчитайте стоимость перевозки онлайн за 1 минуту.',
  keywords: ['грузоперевозки', 'доставка грузов', 'перевозка фурой', 'межгород', 'карго', 'логистика'],
  openGraph: {
    title: 'CaravanExpress — надежные грузоперевозки',
    description: 'Перевозим от 1,5 до 50 тонн по всей России. Страховка включена.',
    url: 'https://caravanexpress.online',
    siteName: 'CaravanExpress',
    images: [{ url: 'https://caravanexpress.online/logo.png', width: 800, height: 600 }],
    locale: 'ru_RU',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0b2b44',
  userScalable: true,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className="antialiased bg-background text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}