import 'server-only'

export const businessMetrics = [
  { label: 'Tržby tento měsíc', value: '486 200 Kč', change: '+12,4 %', tone: 'success' as const },
  { label: 'Aktivní zakázky', value: '18', change: '6 tento týden', tone: 'primary' as const },
  { label: 'Čeká na úhradu', value: '128 400 Kč', change: '4 faktury', tone: 'warning' as const },
  { label: 'Hrubá marže', value: '38,6 %', change: '+2,1 p. b.', tone: 'success' as const },
]

export const monthlySales = [
  { month: 'Led', revenue: 322, costs: 198 },
  { month: 'Úno', revenue: 358, costs: 213 },
  { month: 'Bře', revenue: 410, costs: 244 },
  { month: 'Dub', revenue: 386, costs: 226 },
  { month: 'Kvě', revenue: 452, costs: 269 },
  { month: 'Čvn', revenue: 486, costs: 298 },
]

export const orderCategories = [
  { name: 'Stoly', value: 42 },
  { name: 'Doplňky', value: 27 },
  { name: 'Desky', value: 19 },
  { name: 'Ostatní', value: 12 },
]

export const recentActivity = [
  {
    title: 'Záloha přijata',
    detail: 'Ateliér Novák · FV-2026-061',
    amount: '+ 48 000 Kč',
    time: 'Před 18 min',
    tone: 'success',
  },
  {
    title: 'Zakázka posunuta do výroby',
    detail: 'Jídelní stůl Aurora · ZK-184',
    amount: '',
    time: 'Dnes 09:42',
    tone: 'primary',
  },
  {
    title: 'Nová poptávka',
    detail: 'Petra K. · konferenční stolek',
    amount: '62 000 Kč',
    time: 'Včera 16:08',
    tone: 'warning',
  },
  {
    title: 'Materiál objednán',
    detail: 'Epoxid Crystal Clear · 36 kg',
    amount: '- 17 640 Kč',
    time: 'Včera 11:30',
    tone: 'danger',
  },
]

export const pipeline = [
  { label: 'Nová poptávka', count: 7, value: '391 000 Kč' },
  { label: 'Nabídka odeslána', count: 5, value: '284 000 Kč' },
  { label: 'Potvrzeno', count: 4, value: '236 000 Kč' },
  { label: 'Výroba', count: 8, value: '512 000 Kč' },
]

export const invoices = [
  {
    id: 'FV-2026-061',
    customer: 'Ateliér Novák',
    due: '18. 9. 2026',
    total: '96 000 Kč',
    status: 'Částečně uhrazeno',
  },
  {
    id: 'FV-2026-059',
    customer: 'Kavárna Pod Lipou',
    due: '12. 9. 2026',
    total: '42 800 Kč',
    status: 'Po splatnosti',
  },
  {
    id: 'FV-2026-058',
    customer: 'Jan Jelínek',
    due: '28. 9. 2026',
    total: '31 600 Kč',
    status: 'Čeká na úhradu',
  },
]

export const personalMetrics = [
  {
    label: 'Celkový majetek',
    value: '1 284 500 Kč',
    change: '+4,8 % letos',
    tone: 'success' as const,
  },
  { label: 'Výdaje v září', value: '38 720 Kč', change: '72 % rozpočtu', tone: 'warning' as const },
  { label: 'Měsíční úspora', value: '24 300 Kč', change: '+3 100 Kč', tone: 'success' as const },
]

export const personalSpending = [
  { month: 'Dub', expenses: 43, income: 65 },
  { month: 'Kvě', expenses: 39, income: 72 },
  { month: 'Čvn', expenses: 48, income: 69 },
  { month: 'Čvc', expenses: 36, income: 78 },
  { month: 'Srp', expenses: 41, income: 74 },
  { month: 'Zář', expenses: 39, income: 76 },
]

export const expenseCategories = [
  { name: 'Bydlení', value: 14500 },
  { name: 'Jídlo', value: 8240 },
  { name: 'Doprava', value: 6180 },
  { name: 'Volný čas', value: 5300 },
  { name: 'Ostatní', value: 4500 },
]
