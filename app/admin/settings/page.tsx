import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Save } from "lucide-react"

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Cài đặt hệ thống</h3>
                <p className="text-sm text-muted-foreground">
                    Quản lý các thiết lập chung cho website.
                </p>
            </div>
            <Separator />

            <div className="grid gap-8">
                <div className="grid gap-4 max-w-2xl">
                    <h4 className="text-sm font-medium text-foreground">Thông tin chung</h4>
                    <div className="grid gap-2">
                        <Label htmlFor="site-name">Tên đơn vị</Label>
                        <Input id="site-name" defaultValue="UBND Xã Ba Sao" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="site-desc">Mô tả</Label>
                        <Input id="site-desc" defaultValue="Cổng thông tin điện tử UBND Xã Ba Sao - Tỉnh Đồng Tháp" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="contact-email">Email liên hệ</Label>
                        <Input id="contact-email" defaultValue="ubndxabasao@dongthap.gov.vn" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="contact-phone">Số điện thoại</Label>
                        <Input id="contact-phone" defaultValue="(0277) 3xxx xxx" />
                    </div>
                </div>

                <Separator />

                <div className="grid gap-4 max-w-2xl">
                    <h4 className="text-sm font-medium text-foreground">Cấu hình SEO</h4>
                    <div className="grid gap-2">
                        <Label htmlFor="seo-title">Meta Title Mặc định</Label>
                        <Input id="seo-title" defaultValue="Cổng thông tin Xã Ba Sao" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="seo-keywords">Keywords</Label>
                        <Input id="seo-keywords" defaultValue="ba sao, cao lanh, dong thap, ubnd xa ba sao" />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Button>
                        <Save className="w-4 h-4 mr-2" /> Lưu thay đổi
                    </Button>
                </div>
            </div>
        </div>
    )
}
