export interface Leader {
    role: string;
    name: string;
    phone?: string;
    email?: string;
    image?: string;
}

export interface OrgGroup {
    title: string;
    members: Leader[];
}

export interface HamletStats {
    area?: string;
    households?: string;
    population?: string;
    partyMembers?: string;
    exemptPartyMembers?: string;
    partyCellMembers?: string;
    selfGovGroups?: string;
    mainOccupation?: string;
}

export interface Hamlet {
    id: string;
    name: string;
    shortName: string;
    description: string;
    detailedDescription?: string;
    organizations?: Leader[];
    goals?: string;
    stats: HamletStats;
    leaders: Leader[];
    security?: Leader[];
    avatar?: string;
    coverImage?: string;
    location?: {
        lat: number;
        lng: number;
    };
    images: string[];
    isSpotlight?: boolean;
}

export const COMMUNE_ORG_DATA: OrgGroup[] = [
    {
        title: "Đảng Uỷ Xã Ba Sao",
        members: [
            { role: "Bí thư Đảng uỷ, Chủ tịch HĐND", name: "Nguyễn Chí Vũ", phone: "", email: "" },
            { role: "Phó Bí thư Thường trực Đảng uỷ", name: "Nguyễn Chí Công", phone: "", email: "" },
        ]
    },
    {
        title: "Hội Đồng Nhân Dân (HĐND)",
        members: [
            { role: "Chủ tịch HĐND", name: "Nguyễn Chí Vũ", phone: "", email: "" },
            { role: "ĐUV, Phó Chủ tịch HĐND", name: "Lê Thị Thắm", phone: "", email: "" },
        ]
    },
    {
        title: "Ủy Ban Nhân Dân (UBND)",
        members: [
            { role: "Phó Bí thư Đảng uỷ, Chủ tịch UBND", name: "Trương Huyền Trang", phone: "", email: "" },
            { role: "UVTV, Phó Chủ tịch UBND, Chánh VP", name: "Nguyễn Thanh Long", phone: "", email: "" },
            { role: "ĐUV, Phó Chủ tịch UBND, GĐ TTPVHCC", name: "Nguyễn Thanh Dũng", phone: "", email: "" },
        ]
    },
    {
        title: "UB MTTQ & Các Đoàn Thể",
        members: [
            { role: "UVTV, Chủ tịch UB MTTQ VN", name: "Lê Trung Đông", phone: "", email: "" },
            { role: "Phó CT UB MTTQ, Chủ tịch HND", name: "Đặng Phương Nam", phone: "", email: "" },
            { role: "Phó CT UB MTTQ, Chủ tịch Hội LHPN", name: "Lê Thị Hồng Gấm", phone: "", email: "" },
            { role: "Phó CT UB MTTQ, Bí thư Đoàn TNCS", name: "Nguyễn Trần Chánh Tính", phone: "", email: "" },
            { role: "ĐUV, Phó Chủ tịch UB MTTQ", name: "Trương Thanh Phong", phone: "", email: "" },
        ]
    }
];

export const HAMLETS_DATA: Hamlet[] = [
    {
        id: "ap-5p",
        name: "Ấp 5P",
        shortName: "5P",
        isSpotlight: true,
        description: "Đơn vị điển hình về An ninh trật tự & Văn hóa. Người dân chủ yếu sống bằng nghề nông nghiệp (trên 95%). Ấp có 10 Tổ nhân dân tự quản hoạt động nề nếp.",
        detailedDescription: "Ấp 5P, xã Ba Sao, tỉnh Đồng Tháp là địa bàn có 10 Tổ nhân dân tự quản hoạt động nề nếp, sinh hoạt hàng tháng hiệu quả. Các tổ đã góp phần quan trọng trong việc tuyên truyền, vận động nhân dân chấp hành tốt các chủ trương của Đảng, chính sách pháp luật của Nhà nước; đồng thời hỗ trợ ấp trong công tác giữ gìn an ninh trật tự, xây dựng đời sống văn hóa và thực hiện các phong trào thi đua. Các tổ chức chính trị - xã hội ấp hoạt động hiệu quả góp phần cùng ấp thực hiện hoàn thành các chỉ tiêu do Đảng ủy, Ủy ban nhân dân xã giao.",
        organizations: [
            { name: "Chi đoàn Thanh niên", role: "Tổ chức chính trị - xã hội" },
            { name: "Chi hội Phụ nữ", role: "Tổ chức chính trị - xã hội" },
            { name: "Chi hội Nông dân", role: "Tổ chức chính trị - xã hội" },
            { name: "Chi hội Cựu chiến binh", role: "Tổ chức chính trị - xã hội" }
        ],
        goals: "Với sự quan tâm lãnh đạo của Đảng ủy, chính quyền xã cùng sự đoàn kết của nhân dân, Ấp 5P tiếp tục phấn đấu nâng cao đời sống người dân, xây dựng ấp văn hóa, phát triển kinh tế - xã hội và đảm bảo an ninh trật tự trên địa bàn.",
        stats: {
            area: "160 ha",
            households: "406 hộ",
            population: "1.902 khẩu",
            partyMembers: "24 đảng viên",
            exemptPartyMembers: "06 đảng viên",
            partyCellMembers: "03 đồng chí",
            selfGovGroups: "10 tổ",
            mainOccupation: "Nông nghiệp (>95%)"
        },
        leaders: [
            { role: "Bí thư, Trưởng ấp", name: "Nguyễn Minh Hữu", phone: "0939191649" },
            { role: "Phó Bí thư, TB CTMT", name: "Huỳnh Ngọc Nhi", phone: "0917212470" },
            { role: "Chi ủy viên", name: "Đặng Văn Lắm", phone: "" },
        ],
        security: [
            { role: "Tổ trưởng ANTT", name: "Nguyễn Tấn Vũ", phone: "0858809325" },
            { role: "Tổ Phó", name: "Đặng Chí Thảo", phone: "0909445608" },
            { role: "Thành viên", name: "Đinh Văn Sung", phone: "0916470380" },
        ],
        images: ["https://images.unsplash.com/photo-1625246333195-f8d9c7a74553?auto=format&fit=crop&q=80&w=1000"]
    },
    {
        id: "ap-1", name: "Ấp 1", shortName: "1", description: "Cửa ngõ quan trọng của xã, phát triển thương mại dịch vụ.",
        stats: { area: "Đang cập nhật", households: "~350 hộ", population: "~1.500 khẩu" },
        leaders: [
            { role: "Bí thư, Trưởng ấp", name: "Lê Văn Thoại", phone: "0944977161" },
            { role: "Phó Bí thư", name: "Lê Công Minh", phone: "0386395501" },
            { role: "Phó Trưởng ấp", name: "Trần Văn Vàng", phone: "0944292153" },
        ], images: ["https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&q=80&w=1000"]
    },
    {
        id: "ap-2", name: "Ấp 2", shortName: "2", description: "Vùng chuyên canh lúa chất lượng cao.",
        stats: { area: "Đang cập nhật", households: "~380 hộ", population: "~1.600 khẩu" },
        leaders: [
            { role: "Bí thư, Trưởng ấp", name: "Huỳnh Minh Trọng", phone: "0917626395" },
            { role: "Phó Bí thư", name: "Đinh Đăng Định", phone: "0989227198" },
            { role: "Phó Trưởng ấp", name: "Nguyễn Thành Công", phone: "0783911272" },
        ], images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000"]
    },
    {
        id: "ap-3", name: "Ấp 3", shortName: "3", description: "Khu vực dân cư tập trung, phát triển đa dạng ngành nghề.", stats: {},
        leaders: [
            { role: "Bí thư, Trưởng ấp", name: "Nguyễn Văn Suồl", phone: "0911634797" },
            { role: "Phó Bí thư", name: "Võ Văn Ái", phone: "" },
            { role: "Phó Trưởng ấp", name: "Nguyễn Chí Linh", phone: "0934353790" },
        ], images: []
    },
    {
        id: "ap-4", name: "Ấp 4", shortName: "4", description: "Đẩy mạnh chuyển đổi cơ cấu cây trồng vật nuôi.", stats: {},
        leaders: [
            { role: "Bí thư", name: "Đinh Thị Như Hảo", phone: "0523939732" },
            { role: "Trưởng ấp", name: "Nguyễn Văn Phú", phone: "0389299119" },
            { role: "Phó Bí thư", name: "La Minh Hải", phone: "0377007280" },
            { role: "Phó Trưởng ấp", name: "Võ Minh Tiến", phone: "0939532258" },
        ], images: []
    },
    {
        id: "ap-5", name: "Ấp 5", shortName: "5", description: "Phát huy truyền thống văn hóa, xây dựng nông thôn mới.", stats: {},
        leaders: [
            { role: "Bí thư, Trưởng ấp", name: "Tống Thành Hậu", phone: "0933435378" },
            { role: "Phó Trưởng ấp", name: "Nguyễn Văn Suôl", phone: "0706427211" },
        ], images: []
    },
    {
        id: "ap-6", name: "Ấp 6", shortName: "6", description: "An ninh trật tự ổn định, đời sống nhân dân được nâng cao.", stats: {},
        leaders: [
            { role: "Bí thư, Trưởng ấp", name: "Nguyễn Văn Trí", phone: "0396595328" },
            { role: "Phó Bí thư", name: "Trần Minh Tuyến", phone: "0917555365" },
            { role: "Phó Trưởng ấp", name: "Lưu Khánh Tâm", phone: "0813013495" },
        ], images: []
    },
    {
        id: "ap-7", name: "Ấp 7", shortName: "7", description: "Nỗ lực hoàn thành các chỉ tiêu kinh tế xã hội.", stats: {},
        leaders: [
            { role: "Bí thư, Trưởng ấp", name: "Nguyễn Văn Tú", phone: "0907386336" },
            { role: "Phó Bí thư", name: "Lê Văn Đức", phone: "0919844178" },
            { role: "Phó Trưởng ấp", name: "Nguyễn Hữu Trọng", phone: "0398633529" },
        ], images: []
    },
    {
        id: "ap-1p", name: "Ấp 1P", shortName: "1P", description: "Địa bàn vùng sâu đang từng bước phát triển cơ sở hạ tầng.", stats: {},
        leaders: [{ role: "Phó Bí thư", name: "Đinh Hoàng Lâm", phone: "0948662336" }], images: []
    },
    {
        id: "ap-2p", name: "Ấp 2P", shortName: "2P", description: "Tập trung sản xuất nông nghiệp công nghệ cao.", stats: {},
        leaders: [{ role: "Bí thư, Trưởng ấp", name: "Đỗ Văn Ân", phone: "0916799150" }, { role: "Phó Bí thư", name: "Phạm Thanh Thảo", phone: "0907476827" }], images: []
    },
    {
        id: "ap-3p", name: "Ấp 3P", shortName: "3P", description: "Đoàn kết xây dựng đời sống văn hóa khu dân cư.", stats: {},
        leaders: [{ role: "Bí thư, Trưởng ấp", name: "Phạm Tấn Đạt", phone: "0941338368" }, { role: "Phó Bí thư", name: "Lê Hoàng Thanh", phone: "0919196484" }], images: []
    },
    {
        id: "ap-4p", name: "Ấp 4P", shortName: "4P", description: "Giữ vững an ninh chính trị, trật tự an toàn xã hội.", stats: {},
        leaders: [{ role: "Bí thư, Trưởng ấp", name: "Lê Ngọc Lý", phone: "0917440499" }], images: []
    },
    {
        id: "ap-6p", name: "Ấp 6P", shortName: "6P", description: "Phát triển các mô hình kinh tế tập thể.", stats: {},
        leaders: [{ role: "Bí thư, Trưởng ấp", name: "Nguyễn Văn Ninh", phone: "0763834325" }, { role: "Phó Bí thư", name: "Đặng Hồng Châu", phone: "0383188273" }], images: []
    },
];
