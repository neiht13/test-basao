import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Plus, Pencil, Trash2, Search } from "lucide-react"

// Placeholder data
const users = [
    {
        id: "1",
        name: "Nguyễn Văn Admin",
        email: "admin@basao.gov.vn",
        role: "Admin",
        status: "Active",
        lastActive: "2024-01-15 08:30",
    },
    {
        id: "2",
        name: "Lê Thị Cán Bộ",
        email: "canbo@basao.gov.vn",
        role: "User",
        status: "Active",
        lastActive: "2024-01-14 16:45",
    },
    {
        id: "3",
        name: "Trần Văn Soạn Thảo",
        email: "editor@basao.gov.vn",
        role: "Editor",
        status: "Inactive",
        lastActive: "2023-12-20 09:00",
    },
]

export default function UsersPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Quản Lý Người Dùng</h1>
                    <p className="text-muted-foreground">Danh sách tài khoản truy cập hệ thống.</p>
                </div>
                <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm">
                    <Plus size={16} /> Thêm mới
                </button>
            </div>

            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-border flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm người dùng..."
                            className="w-full pl-9 pr-4 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                    </div>
                </div>
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm text-left">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Tên</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Email</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Vai trò</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Trạng thái</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Hoạt động cuối</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {users.map((user) => (
                                <tr key={user.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <td className="p-4 align-middle font-medium">{user.name}</td>
                                    <td className="p-4 align-middle">{user.email}</td>
                                    <td className="p-4 align-middle">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-4 align-middle">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-600' : 'bg-slate-500'}`}></span>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="p-4 align-middle text-muted-foreground">{user.lastActive}</td>
                                    <td className="p-4 align-middle text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 hover:bg-muted rounded-md text-slate-500 hover:text-primary transition-colors">
                                                <Pencil size={16} />
                                            </button>
                                            <button className="p-2 hover:bg-red-50 rounded-md text-slate-500 hover:text-red-600 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
