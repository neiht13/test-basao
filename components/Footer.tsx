export default function Footer() {
    return (
        <footer className="bg-slate-950 text-slate-400 py-12 border-t-4 border-primary mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4"> Trang thông tin tra cứu xã Ba Sao</h3>
                        <p className="text-xs leading-relaxed max-w-xs">
                            Trang thông tin điện tử phục vụ công tác quản lý nhà nước và nhu cầu tra cứu thông tin của người dân.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Liên kết</h3>
                        <ul className="space-y-2 text-xs">
                            <li><a href="https://dongthap.gov.vn/" target="_blank" className="hover:text-white transition-colors">Cổng thông tin Tỉnh Đồng Tháp</a></li>
                            <li><a href="https://dichvucong.gov.vn/" target="_blank" className="hover:text-white transition-colors">Dịch vụ công trực tuyến</a></li>
                            <li><a href="https://www.baodongthap.vn/" target="_blank" className="hover:text-white transition-colors">Báo Đồng Tháp</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Liên hệ</h3>
                        <p className="text-xs mb-2">Điện thoại: 02773.927.242  </p>
                        <p className="text-xs">Email: xabasao.hcl@dongthap.gov.vn</p>
                    </div>
                </div>
                <div className="border-t border-slate-800 pt-8 text-center">
                    <p className="text-xs opacity-50">© 2025 Đoàn Thanh niên Xã Ba Sao. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}