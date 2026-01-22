import { FileText, Plus, Search, MoreVertical, Eye, Pencil, Trash2 } from "lucide-react"

// Placeholder data
const posts = [
    {
        id: "1",
        title: "Hội nghị triển khai kế hoạch phát triển kinh tế xã hội năm 2025",
        category: "Tin tức sự kiện",
        author: "Ban Biên Tập",
        status: "Published",
        date: "2025-01-15",
        views: 1234
    },
    {
        id: "2",
        title: "Ra mắt mô hình 'Tổ nhân dân tự quản kiểu mẫu' tại Ấp 5P",
        category: "An ninh trật tự",
        author: "Công An Xã",
        status: "Published",
        date: "2025-01-10",
        views: 856
    },
    {
        id: "3",
        title: "Thông báo về việc cấp căn cước công dân gắn chip đợt 3",
        category: "Thông báo",
        author: "Công An Xã",
        status: "Draft",
        date: "2025-01-20",
        views: 0
    },
]

export default function PostsPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Quản Lý Bài Viết</h1>
                    <p className="text-muted-foreground">Tin tức, thông báo và sự kiện.</p>
                </div>
                <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm">
                    <Plus size={16} /> Viết bài mới
                </button>
            </div>

            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-border flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm bài viết..."
                            className="w-full pl-9 pr-4 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                    </div>
                    <select className="px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                        <option value="">Tất cả danh mục</option>
                        <option value="news">Tin tức sự kiện</option>
                        <option value="security">An ninh trật tự</option>
                        <option value="notice">Thông báo</option>
                    </select>
                </div>
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm text-left">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground w-[400px]">Tiêu đề</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Danh mục</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Tác giả</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Trạng thái</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Ngày đăng</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Lượt xem</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {posts.map((post) => (
                                <tr key={post.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <td className="p-4 align-middle">
                                        <div className="font-medium line-clamp-1" title={post.title}>{post.title}</div>
                                    </td>
                                    <td className="p-4 align-middle">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                                            {post.category}
                                        </span>
                                    </td>
                                    <td className="p-4 align-middle text-muted-foreground">{post.author}</td>
                                    <td className="p-4 align-middle">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${post.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${post.status === 'Published' ? 'bg-green-600' : 'bg-yellow-600'}`}></span>
                                            {post.status === 'Published' ? 'Đã đăng' : 'Nháp'}
                                        </span>
                                    </td>
                                    <td className="p-4 align-middle text-muted-foreground">{post.date}</td>
                                    <td className="p-4 align-middle text-right text-muted-foreground">{post.views.toLocaleString()}</td>
                                    <td className="p-4 align-middle text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 hover:bg-muted rounded-md text-slate-500 hover:text-primary transition-colors" title="Xem">
                                                <Eye size={16} />
                                            </button>
                                            <button className="p-2 hover:bg-muted rounded-md text-slate-500 hover:text-primary transition-colors" title="Sửa">
                                                <Pencil size={16} />
                                            </button>
                                            <button className="p-2 hover:bg-red-50 rounded-md text-slate-500 hover:text-red-600 transition-colors" title="Xóa">
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
