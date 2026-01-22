import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Placeholder components until we create the real ones
function StatCard({ title, value, description }: { title: string, value: string, description: string }) {
    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="font-semibold tracking-tight text-sm text-muted-foreground">{title}</h3>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{description}</p>
            </div>
        </div>
    )
}

export default function AdminDashboard() {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
            </div>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <StatCard title="Total Users" value="1,234" description="+20.1% from last month" />
                <StatCard title="Active Posts" value="573" description="+180 from last month" />
                <StatCard title="Visits" value="12,234" description="+19% from last month" />
                <StatCard title="Active Now" value="573" description="+201 since last hour" />
            </div>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                <div className="xl:col-span-2">
                    <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
                        <div className="flex flex-col space-y-1.5 p-6">
                            <h3 className="font-semibold leading-none tracking-tight">Recent Activity</h3>
                            <p className="text-sm text-muted-foreground">Recent user actions and system events.</p>
                        </div>
                        <div className="p-6 pt-0">
                            <div className="text-sm text-muted-foreground">No recent activity.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
