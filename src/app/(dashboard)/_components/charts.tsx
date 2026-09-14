'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const colors = [
  'var(--primary)',
  'var(--success)',
  'var(--warning)',
  'var(--accent)',
  'var(--danger)',
]
const tooltipStyle = {
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 12,
  color: 'var(--foreground)',
  fontSize: 12,
}

export function DonutChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <div className="h-56 w-full" aria-label="Koláčový graf kategorií">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={54}
            outerRadius={82}
            paddingAngle={3}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell fill={colors[index % colors.length]} key={entry.name} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export function MonthlyBarChart({
  data,
  personal = false,
}: {
  data: Record<string, string | number>[]
  personal?: boolean
}) {
  const first = personal ? 'income' : 'revenue'
  const second = personal ? 'expenses' : 'costs'
  return (
    <div className="h-64 w-full" aria-label="Měsíční sloupcový graf">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ left: -24, right: 2 }}>
          <CartesianGrid stroke="var(--border)" strokeDasharray="3 5" vertical={false} />
          <XAxis
            axisLine={false}
            dataKey="month"
            fontSize={11}
            stroke="var(--muted)"
            tickLine={false}
          />
          <YAxis axisLine={false} fontSize={11} stroke="var(--muted)" tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey={first} fill="var(--primary)" radius={[6, 6, 0, 0]} />
          <Bar dataKey={second} fill="var(--accent)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
