import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { IoPulseOutline } from 'react-icons/io5'
export type StatisticsItem = {
  title: string
  count: string | number
}
export function StatisticsCard({ item }: { item: StatisticsItem }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
        <IoPulseOutline className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{item.count}</div>
      </CardContent>
    </Card>
  )
}
