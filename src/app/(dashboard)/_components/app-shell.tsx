import type { ReactNode } from 'react'
import { BottomNavigation, Sidebar } from './navigation'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="dashboard-app">
      <Sidebar />
      <div className="dashboard-main min-h-dvh md:pl-64">
        <div className="mx-auto w-full max-w-[1540px] px-4 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
          {children}
        </div>
      </div>
      <BottomNavigation />
    </div>
  )
}
