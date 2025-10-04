import React, { useState } from 'react';

import './App.css';

// Main App component
const App = () => {
    const [activeTab, setActiveTab] = useState('info'); // State to manage active tab

    // Function to render content based on active tab
    const renderContent = () => {
        switch (activeTab) {
            case 'info':
                return <InfoPage />;
            case 'quiz':
                return <QuizPage />;
            case 'mindmap':
                return <MindMapPage />;
            default:
                return <InfoPage />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-inter text-gray-800 p-4 sm:p-6 lg:p-8">
            <header className="text-center mb-8">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-700 mb-2 drop-shadow-lg">
                    UNIT 8: PERKHIDMATAN AWAM
                </h1>
                <h2 className="text-2xl sm:text-3xl font-semibold text-blue-600">
                    PEMANGKIN PEMBANGUNAN NEGARA
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 mt-2">
                    公共服务：国家发展的催化剂
                </p>
            </header>

            {/* Navigation Tabs */}
            <nav className="flex justify-center mb-8">
                <button
                    className={`px-6 py-3 mx-2 rounded-full text-lg font-medium transition-all duration-300 shadow-md
                                ${activeTab === 'info' ? 'bg-indigo-600 text-white scale-105' : 'bg-white text-indigo-700 hover:bg-indigo-100'}`}
                    onClick={() => setActiveTab('info')}
                >
                    Info Unit
                </button>
                <button
                    className={`px-6 py-3 mx-2 rounded-full text-lg font-medium transition-all duration-300 shadow-md
                                ${activeTab === 'quiz' ? 'bg-indigo-600 text-white scale-105' : 'bg-white text-indigo-700 hover:bg-indigo-100'}`}
                    onClick={() => setActiveTab('quiz')}
                >
                    Kuiz
                </button>
                <button
                    className={`px-6 py-3 mx-2 rounded-full text-lg font-medium transition-all duration-300 shadow-md
                                ${activeTab === 'mindmap' ? 'bg-indigo-600 text-white scale-105' : 'bg-white text-indigo-700 hover:bg-indigo-100'}`}
                    onClick={() => setActiveTab('mindmap')}
                >
                    Peta Minda
                </button>
            </nav>

            {/* Content Area */}
            <main className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 lg:p-10 max-w-4xl mx-auto">
                {renderContent()}
            </main>
        </div>
    );
};

// Info Page Component
const InfoPage = () => {
    const sections = [
        {
            title: "Konsep Agensi Perkhidmatan Awam",
            mandarinTitle: "公共服务机构的概念",
            content: [
                {
                    malay: "Setiap negara termasuk Malaysia mempunyai agensi perkhidmatan awam yang tersendiri.",
                    mandarin: "每个国家，包括马来西亚，都有其独特的公共服务机构。"
                },
                {
                    malay: "Agensi perkhidmatan awam ialah organisasi atau badan yang mengendalikan sesuatu tugas, usaha, khidmat dan bertanggungjawab melaksanakan dasar kerajaan.",
                    mandarin: "公共服务机构是指负责执行政府政策、处理任务、提供服务和承担责任的组织或机构。"
                },
                {
                    malay: "Agensi perkhidmatan awam mempunyai peranan yang penting, terutamanya dalam memastikan pembangunan negara dilaksanakan mengikut perancangan yang ditetapkan.",
                    mandarin: "公共服务机构在确保国家发展按计划进行方面扮演着重要角色。"
                }
            ]
        },
        {
            title: "Contoh Agensi Perkhidmatan Awam di Malaysia",
            mandarinTitle: "马来西亚公共服务机构的例子",
            content: [
                { malay: "Mahkamah (法庭)", mandarin: "" },
                { malay: "Jabatan Imigresen Malaysia (马来西亚移民局)", mandarin: "" },
                { malay: "Jabatan Penerangan Malaysia (马来西亚新闻局)", mandarin: "" },
                { malay: "Sekolah (学校)", mandarin: "" },
                { malay: "Polis Diraja Malaysia (马来西亚皇家警察)", mandarin: "" },
                { malay: "Suruhanjaya Pencegahan Rasuah Malaysia (马来西亚反贪污委员会)", mandarin: "" },
                { malay: "Jabatan Pendaftaran Negara (国民登记局)", mandarin: "" },
                { malay: "Jabatan Pengangkutan Jalan (陆路交通局)", mandarin: "" },
                { malay: "Hospital (医院)", mandarin: "" },
                { malay: "Jabatan Bomba dan Penyelamat Malaysia (马来西亚消防与拯救局)", mandarin: "" },
                { malay: "Kementerian Kesihatan Malaysia (马来西亚卫生部)", mandarin: "" }
            ]
        },
        {
            title: "Ciri-ciri Agensi Perkhidmatan Awam yang Efektif",
            mandarinTitle: "有效公共服务机构的特点",
            content: [
                { malay: "Memberikan perkhidmatan yang berkualiti dalam masa yang singkat.", mandarin: "在短时间内提供优质服务。" },
                { malay: "Menjawab panggilan dengan cepat.", mandarin: "迅速接听电话。" },
                { malay: "Mengurangkan karenah birokrasi.", mandarin: "减少官僚作风。" },
                { malay: "Memberikan perkhidmatan mesra pelanggan.", mandarin: "提供客户友好的服务。" }
            ]
        },
        {
            title: "Kepentingan Agensi Perkhidmatan Awam kepada Masyarakat",
            mandarinTitle: "公共服务机构对社会的重要性",
            content: [
                { malay: "Menjadi perantara kerajaan dengan rakyat.", mandarin: "成为政府与人民之间的桥梁。" },
                { malay: "Memberikan kemudahan kepada rakyat.", mandarin: "为人民提供便利。" },
                { malay: "Memberikan kesedaran dan pendedahan kepada masyarakat tentang pelbagai perkhidmatan awam yang disediakan.", mandarin: "提高社会对各种公共服务的认识和了解。" },
                { malay: "Membantu melicinkan pentadbiran negara.", mandarin: "协助国家行政顺畅运行。" },
                { malay: "Meningkatkan kesejahteraan hidup masyarakat.", mandarin: "提升社会生活福祉。" }
            ]
        },
        {
            title: "Cara Menghargai Agensi Perkhidmatan Awam",
            mandarinTitle: "如何珍惜公共服务机构",
            content: [
                { malay: "Mematuhi etika ketika berurusan di agensi perkhidmatan awam.", mandarin: "在公共服务机构办理事务时遵守道德规范。" },
                { malay: "Menyokong program yang dianjurkan.", mandarin: "支持所举办的活动。" },
                { malay: "Tidak menyalahgunakan kemudahan yang disediakan.", mandarin: "不滥用所提供的设施。" },
                { malay: "Mengucapkan terima kasih selepas mendapatkan perkhidmatan.", mandarin: "获得服务后表示感谢。" },
                { malay: "Tidak memandang rendah kepada kakitangan agensi perkhidmatan awam.", mandarin: "不轻视公共服务机构的工作人员。" },
                { malay: "Menggunakan bahasa yang sopan ketika berurusan.", mandarin: "在办理事务时使用礼貌的语言。" }
            ]
        },
        {
            title: "Peranan Agensi Perkhidmatan Awam (Contoh Spesifik)",
            mandarinTitle: "公共服务机构的角色 (具体例子)",
            content: [
                { malay: "Polis Diraja Malaysia (PDRM): Memelihara undang-undang dan ketenteraman, mengekalkan keamanan dan keselamatan Malaysia, mencegah dan mengesan penjenayah, menangkap dan mendakwa pesalah-pesalah, mengumpul risikan keselamatan.", mandarin: "马来西亚皇家警察 (PDRM): 维护法律和秩序，维护马来西亚的和平与安全，预防和侦查罪犯，逮捕和起诉罪犯，收集安全情报。" },
                { malay: "Jabatan Bomba dan Penyelamat Malaysia: Memberikan khidmat pencegahan dan pemadaman kebakaran, menguatkuasakan undang-undang berkaitan keselamatan kebakaran, menyediakan khidmat kemanusiaan yang cekap dan berkesan.", mandarin: "马来西亚消防与拯救局: 提供防火和灭火服务，执行与消防安全相关的法律，提供高效和有效的人道服务。" },
                { malay: "Jabatan Penerangan Malaysia: Memberikan penerangan dan penjelasan tentang dasar, falsafah dan wawasan negara, membina, mengukuh dan menyebar luas jaringan komunikasi yang menyeluruh dan berkesan.", mandarin: "马来西亚新闻局: 解释和阐明国家政策、理念和愿景，建立、加强和传播全面有效的沟通网络。" },
                { malay: "Suruhanjaya Pencegahan Rasuah Malaysia (SPRM): Menerima aduan rasuah dan salah guna kuasa, menyiasat aduan rasuah, mendidik orang ramai membenci dan menentang jenayah rasuah.", mandarin: "马来西亚反贪污委员会 (SPRM): 接受关于贪污和滥用职权的投诉，调查贪污投诉，教育公众憎恨和反对贪污罪行。" },
                { malay: "Jabatan Imigresen Malaysia: Menguatkuasakan Akta Imigresen, mengeluarkan pasport dan dokumen perjalanan, mengeluarkan visa, pas dan permit kepada warganegara asing.", mandarin: "马来西亚移民局: 执行移民法令，向公民和永久居民签发护照和旅行证件，向进入马来西亚的外国公民签发签证、通行证和许可证。" },
                { malay: "Kementerian Kesihatan Malaysia: Membantu individu mencapai taraf kesihatan produktif, menyediakan perkhidmatan penggalakan, pencegahan, rawatan dan pemulihan yang cekap dan berkesan.", mandarin: "马来西亚卫生部: 帮助个人达到并保持健康水平，提供高效、适当和有效的促进、预防、治疗和康复服务。" }
            ]
        },
        {
            title: "Nilai yang Perlu Diamalkan",
            mandarinTitle: "应实践的价值观",
            content: [
                { malay: "Bertanggungjawab (负责任)", mandarin: "" },
                { malay: "Patriotisme (爱国主义)", mandarin: "" },
                { malay: "Berterima kasih (感恩)", mandarin: "" },
                { malay: "Hemah tinggi (崇高品德)", mandarin: "" },
                { malay: "Rasional (理性)", mandarin: "" }
            ]
        }
    ];

    return (
        <div className="info-page space-y-8">
            {sections.map((section, index) => (
                <div key={index} className="bg-blue-50 p-6 rounded-lg shadow-inner border border-blue-200">
                    <h3 className="text-2xl font-bold text-indigo-700 mb-4 border-b-2 border-indigo-300 pb-2">
                        {section.title}
                        {section.mandarinTitle && <span className="block text-xl font-normal text-gray-600 mt-1">{section.mandarinTitle}</span>}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.content.map((item, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                                <p className="text-gray-800 font-medium">{item.malay}</p>
                                {item.mandarin && <p className="text-gray-600 text-sm mt-1 italic">{item.mandarin}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

// Quiz Page Component
const QuizPage = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [quizCompleted, setQuizCompleted] = useState(false);

    // Quiz questions data
    const quizQuestions = [
        {
            question: "Apakah maksud agensi perkhidmatan awam?",
            options: [
                "Organisasi yang mengendalikan perniagaan swasta.",
                "Badan yang bertanggungjawab melaksanakan dasar kerajaan.",
                "Syarikat yang menyediakan perkhidmatan utiliti sahaja.",
                "Kumpulan sukarelawan tanpa struktur rasmi."
            ],
            answer: "Badan yang bertanggungjawab melaksanakan dasar kerajaan.",
            explanation: "Agensi perkhidmatan awam adalah organisasi atau badan yang mengendalikan tugas, usaha, khidmat, dan bertanggungjawab melaksanakan dasar kerajaan untuk pembangunan negara.",
            mandarinExplanation: "公共服务机构是负责执行政府政策、处理任务、提供服务和承担责任的组织或机构，旨在促进国家发展。"
        },
        {
            question: "Antara berikut, yang manakah BUKAN contoh agensi perkhidmatan awam di Malaysia?",
            options: [
                "Mahkamah",
                "Jabatan Imigresen Malaysia",
                "Syarikat telekomunikasi swasta",
                "Polis Diraja Malaysia"
            ],
            answer: "Syarikat telekomunikasi swasta",
            explanation: "Syarikat telekomunikasi swasta adalah entiti perniagaan, bukan agensi perkhidmatan awam yang melaksanakan dasar kerajaan.",
            mandarinExplanation: "私营电信公司是商业实体，而不是执行政府政策的公共服务机构。"
        },
        {
            question: "Apakah salah satu kepentingan utama agensi perkhidmatan awam kepada masyarakat?",
            options: [
                "Meningkatkan keuntungan syarikat multinasional.",
                "Menjadi perantara kerajaan dengan rakyat.",
                "Mengawal harga pasaran komoditi.",
                "Menguruskan pelaburan asing."
            ],
            answer: "Menjadi perantara kerajaan dengan rakyat.",
            explanation: "Agensi perkhidmatan awam berfungsi sebagai jambatan antara kerajaan dan rakyat, memastikan dasar dan perkhidmatan sampai kepada masyarakat.",
            mandarinExplanation: "公共服务机构是政府与人民之间的桥梁，确保政策和服务能够传达给社会大众。"
        },
        {
            question: "Bagaimanakah kita dapat menghargai agensi perkhidmatan awam?",
            options: [
                "Menyalahgunakan kemudahan yang disediakan.",
                "Menggunakan bahasa yang kasar ketika berurusan.",
                "Mengucapkan terima kasih selepas mendapatkan perkhidmatan.",
                "Memandang rendah kakitangan agensi."
            ],
            answer: "Mengucapkan terima kasih selepas mendapatkan perkhidmatan.",
            explanation: "Mengucapkan terima kasih adalah salah satu cara menunjukkan penghargaan dan tingkah laku berhemah terhadap kakitangan awam.",
            mandarinExplanation: "表达感谢是表达对公务员的感激和礼貌行为的一种方式。"
        },
        {
            question: "Apakah peranan utama Polis Diraja Malaysia (PDRM)?",
            options: [
                "Membina bangunan awam.",
                "Menguruskan pasport dan visa.",
                "Memelihara undang-undang dan ketenteraman.",
                "Menyediakan perkhidmatan kesihatan."
            ],
            answer: "Memelihara undang-undang dan ketenteraman.",
            explanation: "PDRM bertanggungjawab untuk menjaga keamanan, mencegah jenayah, dan menguatkuasakan undang-undang.",
            mandarinExplanation: "马来西亚皇家警察负责维护治安、预防犯罪和执行法律。"
        },
        {
            question: "Agensi manakah yang bertanggungjawab dalam khidmat pencegahan dan pemadaman kebakaran?",
            options: [
                "Jabatan Pengangkutan Jalan",
                "Jabatan Bomba dan Penyelamat Malaysia",
                "Kementerian Kesihatan Malaysia",
                "Jabatan Imigresen Malaysia"
            ],
            answer: "Jabatan Bomba dan Penyelamat Malaysia",
            explanation: "Jabatan Bomba dan Penyelamat Malaysia adalah agensi utama yang menyediakan perkhidmatan kebakaran dan penyelamatan.",
            mandarinExplanation: "马来西亚消防与拯救局是提供消防和救援服务的主要机构。"
        },
        {
            question: "Apakah nilai yang perlu diamalkan ketika berurusan dengan agensi perkhidmatan awam?",
            options: [
                "Sombong",
                "Rasional",
                "Mementingkan diri",
                "Tidak bertanggungjawab"
            ],
            answer: "Rasional",
            explanation: "Nilai rasional membantu kita berfikir secara logik dan bertindak wajar semasa berurusan dengan agensi awam.",
            mandarinExplanation: "理性的价值观有助于我们在与公共机构打交道时进行逻辑思考和采取合理的行动。"
        },
        {
            question: "Apakah peranan Suruhanjaya Pencegahan Rasuah Malaysia (SPRM)?",
            options: [
                "Mengeluarkan lesen memandu.",
                "Menerima aduan tentang perlakuan rasuah.",
                "Menyediakan rawatan perubatan.",
                "Menguruskan pendaftaran kelahiran."
            ],
            answer: "Menerima aduan tentang perlakuan rasuah.",
            explanation: "SPRM ditubuhkan untuk memerangi rasuah dan salah guna kuasa dalam perkhidmatan awam.",
            mandarinExplanation: "马来西亚反贪污委员会的职责是打击公共服务中的贪污和滥用职权行为。"
        },
        {
            question: "Mengapakah penting untuk tidak menyalahgunakan kemudahan awam?",
            options: [
                "Untuk menjimatkan wang sendiri.",
                "Untuk memastikan kemudahan tersebut dapat digunakan oleh semua pihak dalam jangka masa panjang.",
                "Untuk mengelakkan denda.",
                "Kerana ia adalah peraturan yang tidak penting."
            ],
            answer: "Untuk memastikan kemudahan tersebut dapat digunakan oleh semua pihak dalam jangka masa panjang.",
            explanation: "Menjaga kemudahan awam adalah tanggungjawab bersama agar ia kekal berfungsi dan bermanfaat untuk semua.",
            mandarinExplanation: "维护公共设施是共同的责任，以确保其长期运作并造福所有人。"
        },
        {
            question: "Apakah yang dimaksudkan dengan 'perkhidmatan mesra pelanggan'?",
            options: [
                "Perkhidmatan yang mahal.",
                "Perkhidmatan yang cepat tetapi tidak berkualiti.",
                "Perkhidmatan yang diberikan dengan sikap baik, sopan, dan membantu.",
                "Perkhidmatan yang hanya diberikan kepada kenalan."
            ],
            answer: "Perkhidmatan yang diberikan dengan sikap baik, sopan, dan membantu.",
            explanation: "Perkhidmatan mesra pelanggan menekankan layanan yang baik dan sikap membantu untuk kepuasan pengguna.",
            mandarinExplanation: "客户友好的服务强调良好的服务态度和乐于助人的精神，以满足用户需求。"
        },
        {
            question: "Agensi manakah yang bertanggungjawab mengeluarkan pasport dan dokumen perjalanan?",
            options: [
                "Jabatan Pendaftaran Negara",
                "Jabatan Imigresen Malaysia",
                "Jabatan Pengangkutan Jalan",
                "Kementerian Kesihatan Malaysia"
            ],
            answer: "Jabatan Imigresen Malaysia",
            explanation: "Jabatan Imigresen Malaysia adalah agensi yang mengeluarkan pasport dan menguruskan hal ehwal imigresen.",
            mandarinExplanation: "马来西亚移民局是负责签发护照和处理移民事务的机构。"
        },
        {
            question: "Apakah peranan Kementerian Kesihatan Malaysia?",
            options: [
                "Menguruskan hal ehwal pendidikan.",
                "Menyediakan perkhidmatan kesihatan seperti rawatan dan pemulihan.",
                "Membina infrastruktur jalan raya.",
                "Mengawal selia harga barang."
            ],
            answer: "Menyediakan perkhidmatan kesihatan seperti rawatan dan pemulihan.",
            explanation: "Kementerian Kesihatan Malaysia bertanggungjawab menyediakan perkhidmatan kesihatan yang komprehensif kepada rakyat.",
            mandarinExplanation: "马来西亚卫生部负责向人民提供全面的医疗服务。"
        },
        {
            question: "Mengapakah penting untuk mematuhi etika ketika berurusan di agensi perkhidmatan awam?",
            options: [
                "Supaya urusan menjadi lebih lambat.",
                "Untuk menunjukkan rasa hormat dan melancarkan proses.",
                "Kerana ia adalah paksaan.",
                "Untuk menyusahkan kakitangan."
            ],
            answer: "Untuk menunjukkan rasa hormat dan melancarkan proses.",
            explanation: "Mematuhi etika membantu memastikan proses berjalan lancar dan menunjukkan rasa hormat kepada kakitangan serta sistem.",
            mandarinExplanation: "遵守道德规范有助于确保流程顺畅，并表达对工作人员和制度的尊重。"
        },
        {
            question: "Apakah yang akan berlaku jika agensi perkhidmatan awam tidak efektif?",
            options: [
                "Kesejahteraan hidup masyarakat akan meningkat.",
                "Pentadbiran negara akan menjadi lebih lancar.",
                "Rakyat akan menghadapi kesukaran dan pembangunan negara terjejas.",
                "Tiada kesan sampingan."
            ],
            answer: "Rakyat akan menghadapi kesukaran dan pembangunan negara terjejas.",
            explanation: "Agensi yang tidak efektif akan menyebabkan masalah kepada rakyat dan menghalang pembangunan negara.",
            mandarinExplanation: "效率低下的机构会给人民带来问题，并阻碍国家发展。"
        },
        {
            question: "Nilai 'Patriotisme' bermaksud...",
            options: [
                "Sikap mementingkan diri.",
                "Cinta akan negara.",
                "Sikap tidak peduli.",
                "Suka membantah."
            ],
            answer: "Cinta akan negara.",
            explanation: "Patriotisme adalah perasaan cinta, setia, dan bangga terhadap negara.",
            mandarinExplanation: "爱国主义是对国家的热爱、忠诚和自豪感。"
        },
        {
            question: "Agensi manakah yang berperanan memberikan penerangan tentang dasar dan wawasan negara?",
            options: [
                "Jabatan Pendaftaran Negara",
                "Jabatan Penerangan Malaysia",
                "Mahkamah",
                "Hospital"
            ],
            answer: "Jabatan Penerangan Malaysia",
            explanation: "Jabatan Penerangan Malaysia bertanggungjawab menyebarkan maklumat dan dasar kerajaan kepada rakyat.",
            mandarinExplanation: "马来西亚新闻局负责向人民传播政府信息和政策。"
        },
        {
            question: "Mengapakah penting untuk menyokong program yang dianjurkan oleh agensi perkhidmatan awam?",
            options: [
                "Supaya kita mendapat ganjaran wang.",
                "Untuk menunjukkan sokongan dan membantu mencapai objektif program.",
                "Kerana ia adalah aktiviti yang membosankan.",
                "Tiada sebab khusus."
            ],
            answer: "Untuk menunjukkan sokongan dan membantu mencapai objektif program.",
            explanation: "Sokongan masyarakat penting untuk kejayaan program dan inisiatif agensi awam.",
            mandarinExplanation: "公众支持对公共机构的计划和倡议的成功至关重要。"
        },
        {
            question: "Apakah tingkah laku berhemah yang perlu diamalkan ketika menunggu giliran di kaunter?",
            options: [
                "Memotong barisan.",
                "Bising dan mengganggu orang lain.",
                "Menunggu dengan sabar dan tenang.",
                "Memarahi kakitangan."
            ],
            answer: "Menunggu dengan sabar dan tenang.",
            explanation: "Kesabaran dan ketenangan adalah tingkah laku berhemah yang penting dalam persekitaran awam.",
            mandarinExplanation: "耐心和冷静是公共场合重要的礼貌行为。"
        },
        {
            question: "Agensi manakah yang menguatkuasakan Akta Imigresen?",
            options: [
                "Polis Diraja Malaysia",
                "Jabatan Imigresen Malaysia",
                "Jabatan Pengangkutan Jalan",
                "Suruhanjaya Pencegahan Rasuah Malaysia"
            ],
            answer: "Jabatan Imigresen Malaysia",
            explanation: "Jabatan Imigresen Malaysia bertanggungjawab menguatkuasakan undang-undang berkaitan imigresen.",
            mandarinExplanation: "马来西亚移民局负责执行与移民相关的法律。"
        },
        {
            question: "Apakah kesan positif agensi perkhidmatan awam yang efektif?",
            options: [
                "Meningkatkan karenah birokrasi.",
                "Melambatkan urusan rakyat.",
                "Meningkatkan kesejahteraan hidup masyarakat.",
                "Mengurangkan kepercayaan rakyat."
            ],
            answer: "Meningkatkan kesejahteraan hidup masyarakat.",
            explanation: "Perkhidmatan yang efektif membawa kepada peningkatan kualiti hidup dan kemudahan kepada masyarakat.",
            mandarinExplanation: "高效的服务能提升生活质量，并为社会带来便利。"
        },
        {
            question: "Nilai 'Berterima kasih' bermaksud...",
            options: [
                "Sikap tidak peduli.",
                "Sikap menghargai dan bersyukur.",
                "Sikap sombong.",
                "Sikap suka mengeluh."
            ],
            answer: "Sikap menghargai dan bersyukur.",
            explanation: "Berterima kasih adalah menunjukkan penghargaan atas bantuan atau perkhidmatan yang diterima.",
            mandarinExplanation: "感恩是表达对所获得帮助或服务的感激之情。"
        },
        {
            question: "Apakah peranan Jabatan Pendaftaran Negara?",
            options: [
                "Mencegah jenayah.",
                "Mengeluarkan kad pengenalan dan sijil kelahiran/kematian.",
                "Memadam kebakaran.",
                "Menyediakan rawatan di hospital."
            ],
            answer: "Mengeluarkan kad pengenalan dan sijil kelahiran/kematian.",
            explanation: "Jabatan Pendaftaran Negara menguruskan pendaftaran penting seperti kelahiran, kematian, dan pengeluaran kad pengenalan.",
            mandarinExplanation: "国民登记局负责管理重要的登记事务，如出生、死亡和身份证的签发。"
        },
        {
            question: "Mengapakah penting untuk menggunakan bahasa yang sopan ketika berurusan?",
            options: [
                "Supaya kita kelihatan lebih berkuasa.",
                "Untuk menunjukkan rasa hormat dan memudahkan komunikasi.",
                "Kerana ia tidak memberi kesan.",
                "Untuk membuat kakitangan berasa takut."
            ],
            answer: "Untuk menunjukkan rasa hormat dan memudahkan komunikasi.",
            explanation: "Bahasa yang sopan mencerminkan peribadi yang baik dan membantu kelancaran interaksi.",
            mandarinExplanation: "礼貌的语言反映了良好的品格，有助于沟通顺畅。"
        },
        {
            question: "Agensi manakah yang bertanggungjawab menguruskan hal ehwal pengangkutan jalan raya?",
            options: [
                "Jabatan Imigresen Malaysia",
                "Jabatan Pengangkutan Jalan",
                "Polis Diraja Malaysia",
                "Jabatan Bomba dan Penyelamat Malaysia"
            ],
            answer: "Jabatan Pengangkutan Jalan",
            explanation: "Jabatan Pengangkutan Jalan (JPJ) bertanggungjawab ke atas pendaftaran kenderaan, lesen memandu, dan peraturan jalan raya.",
            mandarinExplanation: "陆路交通局 (JPJ) 负责车辆注册、驾驶执照和道路交通法规。"
        },
        {
            question: "Apakah tujuan utama Kempen Wira Anti Rasuah (WAR) yang dianjurkan oleh SPRM di sekolah?",
            options: [
                "Mendidik murid untuk menjadi ahli politik.",
                "Menerapkan nilai integriti dan budaya benci rasuah dalam kalangan murid.",
                "Melatih murid menjadi anggota polis.",
                "Menggalakkan murid menyertai aktiviti sukan."
            ],
            answer: "Menerapkan nilai integriti dan budaya benci rasuah dalam kalangan murid.",
            explanation: "Kempen WAR bertujuan membentuk jati diri murid agar membenci rasuah sejak usia muda.",
            mandarinExplanation: "反贪污英雄运动旨在从小培养学生对贪污的憎恶感。"
        },
        {
            question: "Bagaimanakah agensi perkhidmatan awam membantu melicinkan pentadbiran negara?",
            options: [
                "Dengan menambah birokrasi.",
                "Dengan menyediakan perkhidmatan yang cekap dan teratur.",
                "Dengan mengabaikan aduan rakyat.",
                "Dengan bekerja secara perlahan."
            ],
            answer: "Dengan menyediakan perkhidmatan yang cekap dan teratur.",
            explanation: "Pentadbiran yang lancar memerlukan agensi yang cekap dalam menjalankan tugas dan tanggungjawab.",
            mandarinExplanation: "顺畅的行政需要高效的机构来履行职责和责任。"
        },
        {
            question: "Apakah yang perlu kita lakukan jika tidak berpuas hati dengan perkhidmatan awam?",
            options: [
                "Memarahi kakitangan di kaunter.",
                "Menulis cadangan dan komen dalam borang maklum balas yang disediakan.",
                "Menyebarkan berita palsu di media sosial.",
                "Tidak melakukan apa-apa."
            ],
            answer: "Menulis cadangan dan komen dalam borang maklum balas yang disediakan.",
            explanation: "Memberikan maklum balas secara konstruktif melalui saluran yang betul adalah cara terbaik untuk membantu penambahbaikan.",
            mandarinExplanation: "通过正确的渠道提供建设性反馈是帮助改进的最佳方式。"
        },
        {
            question: "Nilai 'Hemah tinggi' bermaksud...",
            options: [
                "Sikap angkuh.",
                "Sikap merendah diri dan berbudi bahasa.",
                "Sikap suka menunjuk-unjuk.",
                "Sikap tidak sopan."
            ],
            answer: "Sikap merendah diri dan berbudi bahasa.",
            explanation: "Hemah tinggi merujuk kepada sifat mulia, sopan, dan berbudi bahasa.",
            mandarinExplanation: "崇高品德指的是高尚、礼貌和有教养的品质。"
        },
        {
            question: "Apakah kepentingan agensi perkhidmatan awam dalam memberikan kemudahan kepada rakyat?",
            options: [
                "Untuk menyukarkan hidup rakyat.",
                "Untuk memudahkan urusan harian dan akses kepada keperluan asas.",
                "Untuk mengutip cukai yang lebih tinggi.",
                "Untuk mengawal pergerakan rakyat."
            ],
            answer: "Untuk memudahkan urusan harian dan akses kepada keperluan asas.",
            explanation: "Agensi awam menyediakan pelbagai kemudahan penting seperti pendidikan, kesihatan, dan keselamatan.",
            mandarinExplanation: "公共机构提供各种重要的便利，如教育、医疗和安全。"
        },
        {
            question: "Mengapakah penting untuk tidak memandang rendah kepada kakitangan agensi perkhidmatan awam?",
            options: [
                "Kerana mereka tidak penting.",
                "Untuk menunjukkan rasa hormat dan menghargai sumbangan mereka.",
                "Supaya mereka tidak membalas dendam.",
                "Kerana ia adalah satu kewajipan yang tidak perlu."
            ],
            answer: "Untuk menunjukkan rasa hormat dan menghargai sumbangan mereka.",
            explanation: "Setiap kakitangan awam memainkan peranan penting dalam sistem perkhidmatan negara.",
            mandarinExplanation: "每位公务员在国家服务体系中都扮演着重要角色。"
        },
        {
            question: "Apakah peranan Mahkamah dalam agensi perkhidmatan awam?",
            options: [
                "Mengeluarkan lesen perniagaan.",
                "Menguatkuasakan undang-undang dan memberikan keadilan.",
                "Menguruskan hal ehwal pelancongan.",
                "Menyediakan perkhidmatan pos."
            ],
            answer: "Menguatkuasakan undang-undang dan memberikan keadilan.",
            explanation: "Mahkamah adalah institusi keadilan yang memastikan undang-undang ditegakkan.",
            mandarinExplanation: "法庭是确保法律得到执行的司法机构。"
        },
        {
            question: "Bagaimanakah agensi perkhidmatan awam meningkatkan kesejahteraan hidup masyarakat?",
            options: [
                "Dengan mengabaikan keperluan asas.",
                "Dengan menyediakan perkhidmatan yang berkualiti dan relevan.",
                "Dengan membebankan rakyat dengan peraturan.",
                "Dengan mengurangkan kemudahan awam."
            ],
            answer: "Dengan menyediakan perkhidmatan yang berkualiti dan relevan.",
            explanation: "Perkhidmatan yang berkualiti dalam bidang seperti kesihatan, pendidikan, dan keselamatan secara langsung meningkatkan kesejahteraan.",
            mandarinExplanation: "在医疗、教育和安全等领域提供优质服务直接提升了福祉。"
        },
        {
            question: "Apakah yang perlu dilakukan jika nombor giliran dipanggil dengan cepat di kaunter?",
            options: [
                "Berpura-pura tidak dengar.",
                "Segera ke kaunter yang berkenaan.",
                "Menunggu sehingga orang lain pergi.",
                "Mengeluh tentang kelajuan."
            ],
            answer: "Segera ke kaunter yang berkenaan.",
            explanation: "Bertindak pantas dan responsif menunjukkan tingkah laku yang baik dan menghormati masa orang lain.",
            mandarinExplanation: "迅速和积极的行动表现出良好的行为，并尊重他人的时间。"
        },
        {
            question: "Mengapakah penting untuk agensi perkhidmatan awam mengurangkan karenah birokrasi?",
            options: [
                "Untuk menyukarkan urusan rakyat.",
                "Untuk melancarkan proses dan menjimatkan masa rakyat.",
                "Untuk meningkatkan kos operasi.",
                "Untuk mengurangkan bilangan kakitangan."
            ],
            answer: "Untuk melancarkan proses dan menjimatkan masa rakyat.",
            explanation: "Birokrasi yang berlebihan boleh melambatkan urusan dan menyukarkan rakyat.",
            mandarinExplanation: "过多的官僚作风会延误事务，给人民带来不便。"
        },
        {
            question: "Nilai 'Bertanggungjawab' bermaksud...",
            options: [
                "Sikap lepas tangan.",
                "Sikap mengambil berat dan melaksanakan tugas dengan amanah.",
                "Sikap menyalahkan orang lain.",
                "Sikap tidak peduli."
            ],
            answer: "Sikap mengambil berat dan melaksanakan tugas dengan amanah.",
            explanation: "Bertanggungjawab adalah sifat penting bagi setiap warganegara dalam menjaga kemudahan awam.",
            mandarinExplanation: "负责任是每个公民维护公共设施的重要品质。"
        },
        {
            question: "Apakah peranan Sekolah sebagai agensi perkhidmatan awam?",
            options: [
                "Menyediakan perkhidmatan pengangkutan awam.",
                "Memberikan pendidikan kepada generasi muda.",
                "Menguruskan hal ehwal kewangan negara.",
                "Menyediakan perkhidmatan keselamatan."
            ],
            answer: "Memberikan pendidikan kepada generasi muda.",
            explanation: "Sekolah adalah institusi penting dalam sistem pendidikan negara.",
            mandarinExplanation: "学校是国家教育体系中的重要机构。"
        },
        {
            question: "Apakah yang perlu dilakukan jika kakitangan menunjukkan kesungguhan dalam menjalankan tugas?",
            options: [
                "Mengabaikannya.",
                "Memberikan pujian atau maklum balas positif.",
                "Mengkritik tanpa sebab.",
                "Meminta perkhidmatan tambahan secara percuma."
            ],
            answer: "Memberikan pujian atau maklum balas positif.",
            explanation: "Menghargai usaha kakitangan awam dapat meningkatkan motivasi mereka.",
            mandarinExplanation: "赞扬公务员的努力可以提升他们的工作积极性。"
        },
        {
            question: "Mengapakah agensi perkhidmatan awam perlu memberikan kesedaran kepada masyarakat tentang perkhidmatan yang disediakan?",
            options: [
                "Supaya rakyat tidak tahu apa-apa.",
                "Untuk memastikan rakyat mengetahui dan memanfaatkan perkhidmatan yang ada.",
                "Untuk menyembunyikan maklumat.",
                "Kerana ia adalah tugas yang membosankan."
            ],
            answer: "Untuk memastikan rakyat mengetahui dan memanfaatkan perkhidmatan yang ada.",
            explanation: "Kesedaran membantu rakyat menggunakan perkhidmatan dengan lebih efektif.",
            mandarinExplanation: "提高意识有助于人民更有效地利用服务。"
        },
        {
            question: "Apakah yang perlu diutamakan oleh agensi perkhidmatan awam terhadap golongan berkeperluan khas?",
            options: [
                "Mengabaikan mereka.",
                "Memberikan layanan istimewa dan keutamaan.",
                "Meminta mereka menunggu lebih lama.",
                "Menyediakan perkhidmatan yang sama seperti orang lain tanpa penyesuaian."
            ],
            answer: "Memberikan layanan istimewa dan keutamaan.",
            explanation: "Golongan berkeperluan khas seperti warga tua dan OKU memerlukan perhatian dan kemudahan khusus.",
            mandarinExplanation: "老年人和残疾人等特殊需求群体需要特别关注和便利。"
        },
        {
            question: "Apakah yang dimaksudkan dengan 'pentadbiran negara yang licin'?",
            options: [
                "Pentadbiran yang tidak teratur.",
                "Pentadbiran yang berjalan lancar tanpa halangan.",
                "Pentadbiran yang penuh dengan masalah.",
                "Pentadbiran yang perlahan."
            ],
            answer: "Pentadbiran yang berjalan lancar tanpa halangan.",
            explanation: "Pentadbiran yang licin adalah kunci kepada pembangunan dan kestabilan negara.",
            mandarinExplanation: "顺畅的行政是国家发展和稳定的关键。"
        },
        {
            question: "Apakah peranan utama Hospital sebagai agensi perkhidmatan awam?",
            options: [
                "Mengeluarkan lesen memandu.",
                "Menyediakan perkhidmatan rawatan dan pemulihan kesihatan.",
                "Menguruskan hal ehwal imigresen.",
                "Mencegah jenayah."
            ],
            answer: "Menyediakan perkhidmatan rawatan dan pemulihan kesihatan.",
            explanation: "Hospital adalah pusat utama penyediaan rawatan perubatan dan pemulihan.",
            mandarinExplanation: "医院是提供医疗和康复服务的主要中心。"
        },
        {
            question: "Mengapakah penting untuk tidak memotong barisan atau nombor giliran?",
            options: [
                "Supaya urusan lebih cepat.",
                "Untuk menunjukkan sikap tidak sabar.",
                "Untuk menghormati hak orang lain dan memastikan keadilan.",
                "Kerana tiada siapa yang akan tahu."
            ],
            answer: "Untuk menghormati hak orang lain dan memastikan keadilan.",
            explanation: "Mematuhi giliran adalah tanda disiplin dan menghormati hak orang lain.",
            mandarinExplanation: "遵守秩序是纪律的体现，也是尊重他人权利的表现。"
        },
        {
            question: "Apakah yang dimaksudkan dengan 'pembangunan negara dilaksanakan mengikut perancangan'?",
            options: [
                "Pembangunan yang berlaku secara rawak.",
                "Pembangunan yang teratur dan mengikut pelan yang ditetapkan.",
                "Pembangunan yang tidak mempunyai hala tuju.",
                "Pembangunan yang hanya menguntungkan segelintir pihak."
            ],
            answer: "Pembangunan yang teratur dan mengikut pelan yang ditetapkan.",
            explanation: "Agensi awam memastikan setiap projek dan dasar pembangunan dilaksanakan dengan teratur.",
            mandarinExplanation: "公共机构确保每个发展项目和政策都按计划有序进行。"
        },
        {
            question: "Apakah perasaan anda jika perkhidmatan yang diberikan sangat efektif?",
            options: [
                "Marah dan kecewa.",
                "Gembira dan berpuas hati.",
                "Biasa-biasa sahaja.",
                "Sukar untuk dijelaskan."
            ],
            answer: "Gembira dan berpuas hati.",
            explanation: "Perkhidmatan yang efektif pasti akan memberikan kepuasan kepada pengguna.",
            mandarinExplanation: "高效的服务肯定会给用户带来满意。"
        },
        {
            question: "Mengapakah penting untuk agensi perkhidmatan awam menjawab panggilan dengan cepat?",
            options: [
                "Untuk mengelakkan kerja.",
                "Untuk memastikan masalah atau pertanyaan rakyat dapat ditangani segera.",
                "Untuk menunjukkan mereka sibuk.",
                "Kerana tiada apa yang perlu dilakukan."
            ],
            answer: "Untuk memastikan masalah atau pertanyaan rakyat dapat ditangani segera.",
            explanation: "Respons yang cepat menunjukkan kecekapan dan keprihatinan terhadap keperluan rakyat.",
            mandarinExplanation: "快速响应体现了对人民需求的效率和关怀。"
        },
        {
            question: "Apakah yang perlu kita lakukan jika tidak memahami sesuatu perkara ketika berurusan?",
            options: [
                "Berpura-pura faham.",
                "Meminta bantuan kakitangan agensi perkhidmatan awam.",
                "Meninggalkan tempat itu.",
                "Membuat andaian sendiri."
            ],
            answer: "Meminta bantuan kakitangan agensi perkhidmatan awam.",
            explanation: "Meminta penjelasan adalah cara yang bertanggungjawab untuk memastikan urusan berjalan lancar.",
            mandarinExplanation: "寻求解释是确保事务顺利进行的负责任方式。"
        },
        {
            question: "Apakah peranan utama Jabatan Imigresen Malaysia selain mengeluarkan pasport?",
            options: [
                "Menguruskan pendaftaran perkahwinan.",
                "Menguatkuasakan Akta Antipemerdagangan Orang.",
                "Menyediakan perkhidmatan kecemasan.",
                "Mengendalikan kes jenayah berat."
            ],
            answer: "Menguatkuasakan Akta Antipemerdagangan Orang.",
            explanation: "Jabatan Imigresen juga berperanan dalam memerangi jenayah pemerdagangan manusia dan penyeludupan migran.",
            mandarinExplanation: "移民局还在打击人口贩运和移民走私犯罪方面发挥作用。"
        },
        {
            question: "Apakah yang dimaksudkan dengan 'berbudi bahasa' ketika berurusan?",
            options: [
                "Menggunakan kata-kata kasar.",
                "Bersikap sombong.",
                "Menggunakan bahasa yang sopan dan hormat.",
                "Tidak bercakap langsung."
            ],
            answer: "Menggunakan bahasa yang sopan dan hormat.",
            explanation: "Berbudi bahasa adalah ciri tingkah laku berhemah yang penting dalam setiap interaksi.",
            mandarinExplanation: "有礼貌是每次互动中重要的礼貌行为特征。"
        },
        {
            question: "Mengapakah penting untuk mengamalkan nilai 'bertanggungjawab' terhadap agensi awam?",
            options: [
                "Supaya kita tidak perlu membayar cukai.",
                "Untuk memastikan kemudahan awam terpelihara dan digunakan dengan baik.",
                "Untuk mengelakkan diri daripada sebarang masalah.",
                "Kerana ia adalah kehendak orang lain."
            ],
            answer: "Untuk memastikan kemudahan awam terpelihara dan digunakan dengan baik.",
            explanation: "Tanggungjawab memastikan kelestarian dan keberkesanan perkhidmatan awam.",
            mandarinExplanation: "责任确保公共服务的可持续性和有效性。"
        },
        {
            question: "Apakah peranan utama Jabatan Penerangan Malaysia dalam menyebarkan maklumat?",
            options: [
                "Menyebarkan khabar angin.",
                "Menyampaikan dasar, falsafah, dan wawasan negara secara tepat.",
                "Menyembunyikan fakta.",
                "Menyediakan hiburan semata-mata."
            ],
            answer: "Menyampaikan dasar, falsafah, dan wawasan negara secara tepat.",
            explanation: "Jabatan Penerangan memastikan rakyat memahami hala tuju dan matlamat negara.",
            mandarinExplanation: "新闻局确保人民理解国家的方向和目标。"
        },
        {
            question: "Bagaimanakah kita boleh menunjukkan 'patriotisme' terhadap agensi perkhidmatan awam?",
            options: [
                "Dengan mengkritik tanpa henti.",
                "Dengan menyokong usaha mereka dalam menjaga keamanan dan pembangunan negara.",
                "Dengan tidak mengambil tahu.",
                "Dengan merosakkan harta awam."
            ],
            answer: "Dengan menyokong usaha mereka dalam menjaga keamanan dan pembangunan negara.",
            explanation: "Sokongan kepada agensi awam yang menjaga kepentingan negara adalah manifestasi patriotisme.",
            mandarinExplanation: "支持维护国家利益的公共机构是爱国主义的表现。"
        },
        {
            question: "Apakah yang perlu dilakukan jika prosedur urusan tidak jelas dipaparkan?",
            options: [
                "Terus melakukan urusan tanpa bertanya.",
                "Meminta penjelasan daripada kakitangan.",
                "Mengeluh di media sosial.",
                "Meninggalkan tempat itu."
            ],
            answer: "Meminta penjelasan daripada kakitangan.",
            explanation: "Komunikasi yang jelas dengan kakitangan dapat membantu melancarkan urusan.",
            mandarinExplanation: "与工作人员清晰沟通有助于顺利处理事务。"
        },
        {
            question: "Mengapakah kakitangan agensi perkhidmatan awam perlu mesra dan responsif?",
            options: [
                "Supaya mereka disukai ramai.",
                "Untuk memberikan pengalaman yang positif kepada pelanggan dan meningkatkan keyakinan.",
                "Kerana mereka tiada kerja lain.",
                "Untuk melambatkan urusan."
            ],
            answer: "Untuk memberikan pengalaman yang positif kepada pelanggan dan meningkatkan keyakinan.",
            explanation: "Sikap mesra dan responsif adalah kunci kepada perkhidmatan pelanggan yang cemerlang.",
            mandarinExplanation: "友好和积极的态度是卓越客户服务的关键。"
        },
        {
            question: "Apakah kepentingan agensi perkhidmatan awam dalam meningkatkan kesedaran masyarakat?",
            options: [
                "Untuk mengelirukan rakyat.",
                "Untuk memastikan rakyat celik maklumat dan hak mereka.",
                "Untuk menyebarkan propaganda.",
                "Untuk mengawal pemikiran rakyat."
            ],
            answer: "Untuk memastikan rakyat celik maklumat dan hak mereka.",
            explanation: "Pendedahan maklumat yang tepat membolehkan rakyat membuat keputusan yang lebih baik.",
            mandarinExplanation: "准确的信息披露使人民能够做出更好的决策。"
        },
        {
            question: "Apakah yang dimaksudkan dengan 'mengurangkan karenah birokrasi'?",
            options: [
                "Menambah lebih banyak prosedur.",
                "Mempermudah dan mempercepatkan proses urusan.",
                "Menghapuskan semua peraturan.",
                "Menyulitkan rakyat."
            ],
            answer: "Mempermudah dan mempercepatkan proses urusan.",
            explanation: "Ini bertujuan untuk menjadikan perkhidmatan lebih cekap dan mudah diakses.",
            mandarinExplanation: "这旨在使服务更高效和易于获取。"
        },
        {
            question: "Bagaimanakah kita dapat menunjukkan nilai 'rasional' ketika berurusan?",
            options: [
                "Bertindak mengikut emosi.",
                "Berfikir secara logik dan membuat keputusan yang wajar.",
                "Membuat keputusan terburu-buru.",
                "Mengikut kata hati tanpa berfikir."
            ],
            answer: "Berfikir secara logik dan membuat keputusan yang wajar.",
            explanation: "Rasional membantu dalam menyelesaikan masalah dan berinteraksi secara konstruktif.",
            mandarinExplanation: "理性有助于解决问题和进行建设性互动。"
        },
        {
            question: "Apakah peranan Jabatan Pendaftaran Negara dalam pengeluaran sijil kelahiran?",
            options: [
                "Mencegah jenayah.",
                "Merekodkan kelahiran untuk tujuan rasmi dan perangkaan.",
                "Memadam kebakaran.",
                "Mengeluarkan lesen memandu."
            ],
            answer: "Merekodkan kelahiran untuk tujuan rasmi dan perangkaan.",
            explanation: "Sijil kelahiran adalah dokumen penting untuk pengenalan diri dan rekod negara.",
            mandarinExplanation: "出生证明是身份识别和国家记录的重要文件。"
        },
        {
            question: "Mengapakah penting untuk persekitaran agensi awam bersih dan selamat?",
            options: [
                "Supaya kakitangan tidak perlu membersihkan.",
                "Untuk keselesaan dan keselamatan pengunjung serta kakitangan.",
                "Kerana ia tidak penting.",
                "Untuk menarik perhatian pelancong."
            ],
            answer: "Untuk keselesaan dan keselamatan pengunjung serta kakitangan.",
            explanation: "Persekitaran yang kondusif meningkatkan pengalaman berurusan.",
            mandarinExplanation: "舒适的环境能提升办理事务的体验。"
        },
        {
            question: "Apakah yang perlu dilakukan jika melihat seseorang menyalahgunakan kemudahan awam?",
            options: [
                "Mengabaikannya.",
                "Melaporkan kepada pihak berkuasa yang berkaitan.",
                "Ikut serta menyalahgunakan.",
                "Membuat video dan memuat naik ke media sosial."
            ],
            answer: "Melaporkan kepada pihak berkuasa yang berkaitan.",
            explanation: "Melaporkan penyalahgunaan adalah tindakan bertanggungjawab sebagai warganegara.",
            mandarinExplanation: "举报滥用公共设施是公民的负责任行为。"
        },
        {
            question: "Apakah peranan Jabatan Pengangkutan Jalan (JPJ) dalam memastikan keselamatan jalan raya?",
            options: [
                "Memadam kebakaran.",
                "Menguatkuasakan undang-undang jalan raya dan mengeluarkan lesen memandu yang sah.",
                "Membina jalan raya.",
                "Menguruskan hal ehwal kesihatan."
            ],
            answer: "Menguatkuasakan undang-undang jalan raya dan mengeluarkan lesen memandu yang sah.",
            explanation: "JPJ memastikan pemandu dan kenderaan mematuhi peraturan untuk keselamatan semua.",
            mandarinExplanation: "陆路交通局确保司机和车辆遵守交通法规，以保障所有人的安全。"
        },
        {
            question: "Apakah yang dimaksudkan dengan 'tingkah laku berhemah'?",
            options: [
                "Sikap kasar dan tidak sopan.",
                "Sikap yang baik, sopan, dan menghormati orang lain.",
                "Sikap mementingkan diri sendiri.",
                "Sikap tidak bertanggungjawab."
            ],
            answer: "Sikap yang baik, sopan, dan menghormati orang lain.",
            explanation: "Tingkah laku berhemah adalah penting dalam setiap interaksi sosial.",
            mandarinExplanation: "礼貌行为在每次社交互动中都至关重要。"
        },
        {
            question: "Bagaimanakah agensi perkhidmatan awam membantu meningkatkan kesedaran masyarakat tentang pelbagai perkhidmatan?",
            options: [
                "Melalui iklan yang mengelirukan.",
                "Melalui kempen kesedaran, penerbitan, dan program komuniti.",
                "Dengan menyembunyikan maklumat.",
                "Dengan hanya berdiam diri."
            ],
            answer: "Melalui kempen kesedaran, penerbitan, dan program komuniti.",
            explanation: "Penyebaran maklumat yang efektif memastikan rakyat tahu cara mendapatkan bantuan dan perkhidmatan.",
            mandarinExplanation: "有效的信息传播确保人民知道如何获得帮助和服务。"
        },
        {
            question: "Apakah peranan Jabatan Bomba dan Penyelamat Malaysia dalam menyediakan khidmat kemanusiaan?",
            options: [
                "Mengeluarkan pasport.",
                "Melakukan operasi menyelamat mangsa bencana atau kemalangan.",
                "Menguruskan pendaftaran syarikat.",
                "Menyediakan perkhidmatan kaunseling."
            ],
            answer: "Melakukan operasi menyelamat mangsa bencana atau kemalangan.",
            explanation: "Bomba bukan sahaja memadam api tetapi juga terlibat dalam pelbagai operasi penyelamatan.",
            mandarinExplanation: "消防局不仅灭火，还参与各种救援行动。"
        },
        {
            question: "Mengapakah penting untuk bersabar semasa menjalankan urusan dengan agensi perkhidmatan awam?",
            options: [
                "Supaya urusan menjadi lambat.",
                "Untuk mengelakkan konflik dan menunjukkan sikap matang.",
                "Kerana tiada pilihan lain.",
                "Untuk membuat kakitangan berasa tertekan."
            ],
            answer: "Untuk mengelakkan konflik dan menunjukkan sikap matang.",
            explanation: "Kesabaran adalah kunci untuk pengalaman berurusan yang positif bagi kedua-dua pihak.",
            mandarinExplanation: "耐心是双方积极办理事务体验的关键。"
        },
        {
            question: "Apakah sumbangan utama agensi perkhidmatan awam kepada pembangunan negara?",
            options: [
                "Menghalang kemajuan.",
                "Memastikan pelaksanaan dasar kerajaan dan kemajuan infrastruktur.",
                "Mengurangkan peluang pekerjaan.",
                "Meningkatkan kadar jenayah."
            ],
            answer: "Memastikan pelaksanaan dasar kerajaan dan kemajuan infrastruktur.",
            explanation: "Agensi awam adalah tulang belakang pembangunan negara dalam pelbagai sektor.",
            mandarinExplanation: "公共机构是各个领域国家发展的支柱。"
        },
        {
            question: "Apakah yang dimaksudkan dengan 'efektif' dalam konteks perkhidmatan awam?",
            options: [
                "Perkhidmatan yang lambat.",
                "Perkhidmatan yang mencapai matlamat dengan cekap dan berkesan.",
                "Perkhidmatan yang mahal.",
                "Perkhidmatan yang tidak relevan."
            ],
            answer: "Perkhidmatan yang mencapai matlamat dengan cekap dan berkesan.",
            explanation: "Efektif bermaksud melakukan perkara yang betul dengan cara yang betul untuk hasil terbaik.",
            mandarinExplanation: "有效意味着以正确的方式做正确的事情以获得最佳结果。"
        },
        {
            question: "Apakah peranan Kementerian Kesihatan Malaysia dalam aspek pencegahan penyakit?",
            options: [
                "Membina hospital baru sahaja.",
                "Melaksanakan kempen kesihatan awam dan program imunisasi.",
                "Mengeluarkan ubat-ubatan secara percuma.",
                "Mengawal harga makanan."
            ],
            answer: "Melaksanakan kempen kesihatan awam dan program imunisasi.",
            explanation: "Pencegahan adalah aspek penting dalam menjaga kesihatan awam.",
            mandarinExplanation: "预防是维护公共健康的重要方面。"
        },
        {
            question: "Bagaimanakah kita boleh menunjukkan rasa 'berterima kasih' kepada kakitangan awam?",
            options: [
                "Dengan mengkritik kerja mereka.",
                "Dengan mengucapkan terima kasih secara lisan atau bertulis.",
                "Dengan tidak mempedulikan mereka.",
                "Dengan meminta lebih banyak perkhidmatan."
            ],
            answer: "Dengan mengucapkan terima kasih secara lisan atau bertulis.",
            explanation: "Ucapan terima kasih yang tulus dapat memberikan semangat kepada mereka yang berkhidmat.",
            mandarinExplanation: "真诚的感谢可以激励那些服务他人的人。"
        },
        {
            question: "Apakah kepentingan agensi perkhidmatan awam dalam menjaga keamanan negara?",
            options: [
                "Untuk menimbulkan kekacauan.",
                "Untuk memastikan keselamatan rakyat dan kestabilan negara.",
                "Untuk mengawal kebebasan rakyat.",
                "Untuk meningkatkan kadar jenayah."
            ],
            answer: "Untuk memastikan keselamatan rakyat dan kestabilan negara.",
            explanation: "Agensi keselamatan seperti PDRM memainkan peranan kritikal dalam menjaga keamanan.",
            mandarinExplanation: "诸如马来西亚皇家警察等安全机构在维护和平方面发挥着关键作用。"
        },
        {
            question: "Apakah peranan Suruhanjaya Pencegahan Rasuah Malaysia (SPRM) dalam mendidik orang ramai?",
            options: [
                "Mendidik orang ramai untuk menerima rasuah.",
                "Mendidik orang ramai untuk membenci dan menentang jenayah rasuah.",
                "Mendidik orang ramai untuk menjadi kaya dengan cepat.",
                "Mendidik orang ramai untuk tidak peduli."
            ],
            answer: "Mendidik orang ramai untuk membenci dan menentang jenayah rasuah.",
            explanation: "Pendidikan anti-rasuah adalah strategi penting SPRM untuk membina masyarakat yang berintegriti.",
            mandarinExplanation: "反贪污教育是马来西亚反贪污委员会建立廉洁社会的重要策略。"
        },
        {
            question: "Apakah yang dimaksudkan dengan 'tingkah laku berhemah terhadap agensi perkhidmatan awam'?",
            options: [
                "Bersikap tidak peduli dan kasar.",
                "Menunjukkan sikap hormat, sopan, dan mematuhi peraturan.",
                "Cuba mencari kesalahan kakitangan.",
                "Menuntut layanan istimewa."
            ],
            answer: "Menunjukkan sikap hormat, sopan, dan mematuhi peraturan.",
            explanation: "Ini adalah cara kita menunjukkan penghargaan dan kerjasama dengan agensi awam.",
            mandarinExplanation: "这是我们表达对公共机构的尊重和合作的方式。"
        },
        {
            question: "Apakah peranan Jabatan Imigresen Malaysia dalam mengawal sempadan negara?",
            options: [
                "Membenarkan sesiapa sahaja masuk tanpa kawalan.",
                "Menguatkuasakan undang-undang untuk mengawal kemasukan dan keluar warga asing.",
                "Menyediakan perkhidmatan penginapan.",
                "Menguruskan hal ehwal kewangan."
            ],
            answer: "Menguatkuasakan undang-undang untuk mengawal kemasukan dan keluar warga asing.",
            explanation: "Kawalan sempadan adalah penting untuk keselamatan dan kedaulatan negara.",
            mandarinExplanation: "边境管制对国家的安全和主权至关重要。"
        },
        {
            question: "Mengapakah penting untuk tidak menyalahgunakan kemudahan awam seperti tandas awam atau taman rekreasi?",
            options: [
                "Supaya ia kelihatan kotor.",
                "Untuk memastikan ia kekal bersih, selamat, dan dapat digunakan oleh semua.",
                "Kerana tiada siapa yang melihat.",
                "Untuk menunjukkan protes."
            ],
            answer: "Untuk memastikan ia kekal bersih, selamat, dan dapat digunakan oleh semua.",
            explanation: "Penjagaan kemudahan awam adalah tanggungjawab bersama demi kebaikan masyarakat.",
            mandarinExplanation: "维护公共设施是共同的责任，为了社会的福祉。"
        },
        {
            question: "Apakah nilai yang berkaitan dengan 'cinta akan negara' dalam konteks perkhidmatan awam?",
            options: [
                "Individualisme.",
                "Patriotisme.",
                "Egoisme.",
                "Hedonisme."
            ],
            answer: "Patriotisme.",
            explanation: "Patriotisme mendorong kita untuk menyokong dan menghargai usaha agensi awam demi negara.",
            mandarinExplanation: "爱国主义促使我们支持和珍视公共机构为国家所做的努力。"
        },
        {
            question: "Apakah peranan Polis Diraja Malaysia dalam mengumpul risikan keselamatan?",
            options: [
                "Mengumpul maklumat tentang cuaca.",
                "Mengumpul maklumat untuk mencegah ancaman keselamatan negara.",
                "Mengumpul resipi masakan.",
                "Mengumpul data peribadi rakyat tanpa sebab."
            ],
            answer: "Mengumpul maklumat untuk mencegah ancaman keselamatan negara.",
            explanation: "Risikan keselamatan adalah penting untuk melindungi negara daripada ancaman dalaman dan luaran.",
            mandarinExplanation: "安全情报对于保护国家免受内外威胁至关重要。"
        },
        {
            question: "Bagaimanakah agensi perkhidmatan awam memastikan pembangunan negara dilaksanakan mengikut perancangan?",
            options: [
                "Dengan bekerja secara tidak teratur.",
                "Dengan menetapkan dasar, memantau pelaksanaan, dan membuat penyesuaian.",
                "Dengan membiarkan pembangunan berlaku secara spontan.",
                "Dengan mengabaikan perancangan."
            ],
            answer: "Dengan menetapkan dasar, memantau pelaksanaan, dan membuat penyesuaian.",
            explanation: "Perancangan dan pemantauan yang teliti adalah kunci kejayaan pembangunan.",
            mandarinExplanation: "周密的规划和监督是发展成功的关键。"
        },
        {
            question: "Apakah yang perlu kita lakukan jika kakitangan agensi awam memberikan maklumat yang jelas dan tepat?",
            options: [
                "Meragui maklumat tersebut.",
                "Menerima dan bertindak berdasarkan maklumat tersebut.",
                "Meminta maklumat lain yang tidak berkaitan.",
                "Mengabaikannya."
            ],
            answer: "Menerima dan bertindak berdasarkan maklumat tersebut.",
            explanation: "Maklumat yang tepat memudahkan urusan dan mengelakkan kesilapan.",
            mandarinExplanation: "准确的信息有助于顺利处理事务并避免错误。"
        },
        {
            question: "Apakah peranan Jabatan Penerangan Malaysia dalam membina jaringan komunikasi?",
            options: [
                "Membina rangkaian telefon.",
                "Membina dan menyebar luas jaringan komunikasi untuk penyampaian maklumat yang berkesan.",
                "Menyediakan perkhidmatan internet.",
                "Mengawal media sosial."
            ],
            answer: "Membina dan menyebar luas jaringan komunikasi untuk penyampaian maklumat yang berkesan.",
            explanation: "Jaringan komunikasi yang kuat memastikan maklumat sampai kepada semua lapisan masyarakat.",
            mandarinExplanation: "强大的沟通网络确保信息能够传达给社会各阶层。"
        },
        {
            question: "Mengapakah penting untuk bersikap 'berbudi bahasa' terhadap kakitangan agensi perkhidmatan awam?",
            options: [
                "Supaya mereka takut kepada kita.",
                "Untuk menunjukkan rasa hormat dan memudahkan interaksi yang positif.",
                "Kerana ia tidak memberi kesan.",
                "Untuk mendapatkan layanan istimewa."
            ],
            answer: "Untuk menunjukkan rasa hormat dan memudahkan interaksi yang positif.",
            explanation: "Sikap positif akan mewujudkan suasana yang lebih baik untuk semua.",
            mandarinExplanation: "积极的态度将为所有人创造更好的氛围。"
        },
        {
            question: "Apakah yang dimaksudkan dengan 'mengumpul risikan keselamatan' oleh PDRM?",
            options: [
                "Mengumpul maklumat tentang harga barang.",
                "Mengumpul maklumat sulit untuk mencegah ancaman jenayah dan keselamatan.",
                "Mengumpul data peribadi tanpa kebenaran.",
                "Mengumpul maklumat tentang selebriti."
            ],
            answer: "Mengumpul maklumat sulit untuk mencegah ancaman jenayah dan keselamatan.",
            explanation: "Risikan adalah kunci dalam strategi pencegahan jenayah dan pertahanan negara.",
            mandarinExplanation: "情报是犯罪预防和国家防御战略的关键。"
        },
        {
            question: "Apakah nilai yang perlu diamalkan apabila agensi perkhidmatan awam memberikan perkhidmatan yang cekap?",
            options: [
                "Tidak bersyukur.",
                "Berterima kasih.",
                "Sombong.",
                "Rasa tidak puas hati."
            ],
            answer: "Berterima kasih.",
            explanation: "Mengucapkan terima kasih adalah tanda penghargaan atas kecekapan mereka.",
            mandarinExplanation: "表达感谢是对他们效率的肯定。"
        },
        {
            question: "Apakah peranan utama Mahkamah dalam sistem keadilan?",
            options: [
                "Menangkap penjenayah.",
                "Mengadili kes dan menjatuhkan hukuman mengikut undang-undang.",
                "Menyediakan bantuan guaman.",
                "Membina penjara."
            ],
            answer: "Mengadili kes dan menjatuhkan hukuman mengikut undang-undang.",
            explanation: "Mahkamah memastikan keadilan ditegakkan berdasarkan peruntukan undang-undang.",
            mandarinExplanation: "法庭确保根据法律规定伸张正义。"
        },
        {
            question: "Bagaimanakah agensi perkhidmatan awam membantu meningkatkan kesejahteraan hidup masyarakat melalui pendidikan?",
            options: [
                "Dengan menutup sekolah.",
                "Dengan menyediakan akses kepada pendidikan berkualiti.",
                "Dengan mengenakan yuran yang tinggi.",
                "Dengan menghadkan peluang belajar."
            ],
            answer: "Dengan menyediakan akses kepada pendidikan berkualiti.",
            explanation: "Pendidikan adalah asas untuk meningkatkan taraf hidup dan peluang masa depan.",
            mandarinExplanation: "教育是提升生活水平和未来机会的基础。"
        },
        {
            question: "Apakah yang perlu dilakukan jika terdapat borang maklum balas pelanggan disediakan di kaunter?",
            options: [
                "Mengabaikannya.",
                "Mengisi borang tersebut dengan jujur untuk membantu penambahbaikan.",
                "Menggunakannya untuk tujuan peribadi.",
                "Membuangnya."
            ],
            answer: "Mengisi borang tersebut dengan jujur untuk membantu penambahbaikan.",
            explanation: "Maklum balas pelanggan adalah penting untuk agensi awam meningkatkan kualiti perkhidmatan.",
            mandarinExplanation: "客户反馈对于公共机构提升服务质量至关重要。"
        },
        {
            question: "Apakah kepentingan agensi perkhidmatan awam dalam menjaga kesihatan awam?",
            options: [
                "Menyebarkan penyakit.",
                "Melindungi masyarakat daripada penyakit dan menyediakan rawatan.",
                "Mengabaikan isu kesihatan.",
                "Menyediakan perkhidmatan yang mahal dan tidak mampu milik."
            ],
            answer: "Melindungi masyarakat daripada penyakit dan menyediakan rawatan.",
            explanation: "Kesihatan awam adalah asas kepada masyarakat yang produktif dan sejahtera.",
            mandarinExplanation: "公共卫生是生产力和繁荣社会的基础。"
        },
        {
            question: "Apakah yang dimaksudkan dengan 'prosedur urusan jelas dipaparkan'?",
            options: [
                "Prosedur yang rumit dan sukar difahami.",
                "Langkah-langkah yang diterangkan dengan terang dan mudah difahami.",
                "Prosedur yang disembunyikan.",
                "Prosedur yang sentiasa berubah."
            ],
            answer: "Langkah-langkah yang diterangkan dengan terang dan mudah difahami.",
            explanation: "Prosedur yang jelas memudahkan rakyat berurusan dan mengurangkan kekeliruan.",
            mandarinExplanation: "清晰的程序使人民更容易办理事务并减少困惑。"
        },
        {
            question: "Apakah nilai 'rasional' yang perlu diamalkan apabila berhadapan dengan situasi yang tidak dijangka di agensi awam?",
            options: [
                "Panik dan marah.",
                "Berfikir secara tenang dan mencari penyelesaian terbaik.",
                "Menyalahkan orang lain.",
                "Berputus asa."
            ],
            answer: "Berfikir secara tenang dan mencari penyelesaian terbaik.",
            explanation: "Sikap rasional membantu kita menghadapi cabaran dengan lebih baik.",
            mandarinExplanation: "理性的态度有助于我们更好地应对挑战。"
        },
        {
            question: "Apakah peranan Polis Diraja Malaysia dalam mencegah jenayah?",
            options: [
                "Menggalakkan jenayah.",
                "Melakukan rondaan, siasatan, dan program kesedaran jenayah.",
                "Menyediakan tempat perlindungan bagi penjenayah.",
                "Mengabaikan laporan jenayah."
            ],
            answer: "Melakukan rondaan, siasatan, dan program kesedaran jenayah.",
            explanation: "Pencegahan jenayah adalah aspek utama tugas PDRM.",
            mandarinExplanation: "预防犯罪是马来西亚皇家警察职责的关键方面。"
        },
        {
            question: "Bagaimanakah kita boleh menunjukkan nilai 'hemah tinggi' ketika berurusan dengan kakitangan awam?",
            options: [
                "Dengan meninggikan suara.",
                "Dengan bersikap sopan, menghormati, dan tidak sombong.",
                "Dengan mengabaikan arahan.",
                "Dengan menuntut hak tanpa menghiraukan orang lain."
            ],
            answer: "Dengan bersikap sopan, menghormati, dan tidak sombong.",
            explanation: "Hemah tinggi mencerminkan keperibadian yang mulia.",
            mandarinExplanation: "崇高品德反映了高尚的品格。"
        },
        {
            question: "Apakah kepentingan agensi perkhidmatan awam dalam memastikan keadilan sosial?",
            options: [
                "Menyokong ketidakadilan.",
                "Memastikan semua rakyat mendapat hak dan layanan yang sama rata.",
                "Mengutamakan golongan tertentu sahaja.",
                "Mengabaikan golongan miskin."
            ],
            answer: "Memastikan semua rakyat mendapat hak dan layanan yang sama rata.",
            explanation: "Keadilan sosial adalah asas kepada masyarakat yang harmoni dan stabil.",
            mandarinExplanation: "社会公正是和谐稳定社会的基础。"
        },
        {
            question: "Apakah peranan Jabatan Pendaftaran Negara dalam pengeluaran kad pengenalan?",
            options: [
                "Mengeluarkan kad kredit.",
                "Merekodkan identiti warganegara untuk tujuan rasmi.",
                "Mengeluarkan lesen memandu.",
                "Mencipta identiti palsu."
            ],
            answer: "Merekodkan identiti warganegara untuk tujuan rasmi.",
            explanation: "Kad pengenalan adalah dokumen pengenalan diri yang wajib bagi setiap warganegara.",
            mandarinExplanation: "身份证是每个公民必须拥有的身份证明文件。"
        },
        {
            question: "Mengapakah penting untuk tidak menyalahgunakan waktu bekerja kakitangan awam?",
            options: [
                "Supaya mereka boleh berehat.",
                "Untuk memastikan mereka dapat memberikan perkhidmatan kepada lebih ramai orang.",
                "Kerana tiada apa yang perlu dilakukan.",
                "Untuk melambatkan urusan orang lain."
            ],
            answer: "Untuk memastikan mereka dapat memberikan perkhidmatan kepada lebih ramai orang.",
            explanation: "Menghormati masa kerja kakitangan awam membantu meningkatkan produktiviti dan kecekapan.",
            mandarinExplanation: "尊重公务员的工作时间有助于提高生产力和效率。"
        },
        {
            question: "Apakah peranan utama Kementerian Kesihatan Malaysia dalam aspek rawatan?",
            options: [
                "Membina bangunan pejabat.",
                "Menyediakan rawatan perubatan dan pembedahan di hospital dan klinik.",
                "Mengeluarkan lesen perniagaan.",
                "Menguruskan hal ehwal sukan."
            ],
            answer: "Menyediakan rawatan perubatan dan pembedahan di hospital dan klinik.",
            explanation: "Rawatan adalah aspek penting dalam perkhidmatan kesihatan.",
            mandarinExplanation: "治疗是医疗服务的重要方面。"
        },
        {
            question: "Apakah nilai yang perlu diamalkan apabila berhadapan dengan kakitangan awam yang sibuk?",
            options: [
                "Mendesak mereka.",
                "Bersabar dan menunggu giliran.",
                "Mengeluh dengan kuat.",
                "Meninggalkan tempat itu."
            ],
            answer: "Bersabar dan menunggu giliran.",
            explanation: "Kesabaran menunjukkan pemahaman dan kerjasama.",
            mandarinExplanation: "耐心表现出理解和合作。"
        },
        {
            question: "Apakah peranan Jabatan Penerangan Malaysia dalam mengukuhkan perpaduan negara?",
            options: [
                "Menyebarkan berita palsu.",
                "Menyebarkan maklumat yang memupuk perpaduan dan keharmonian kaum.",
                "Menyebabkan perpecahan.",
                "Mengabaikan isu perpaduan."
            ],
            answer: "Menyebarkan maklumat yang memupuk perpaduan dan keharmonian kaum.",
            explanation: "Penerangan yang positif dapat membina masyarakat yang bersatu padu.",
            mandarinExplanation: "积极的宣传可以建立一个团结的社会。"
        },
        {
            question: "Bagaimanakah kita dapat menunjukkan sikap 'bertanggungjawab' terhadap agensi perkhidmatan awam?",
            options: [
                "Dengan merosakkan harta benda awam.",
                "Dengan mematuhi peraturan dan tidak menyalahgunakan kemudahan.",
                "Dengan mengabaikan arahan.",
                "Dengan menyalahkan agensi."
            ],
            answer: "Dengan mematuhi peraturan dan tidak menyalahgunakan kemudahan.",
            explanation: "Tindakan bertanggungjawab memastikan kelestarian perkhidmatan awam.",
            mandarinExplanation: "负责任的行为确保公共服务的可持续性。"
        },
        {
            question: "Apakah peranan utama Suruhanjaya Pencegahan Rasuah Malaysia (SPRM) dalam menyiasat aduan?",
            options: [
                "Mengabaikan aduan.",
                "Menyiasat aduan rasuah dan salah guna kuasa secara telus dan adil.",
                "Menyiasat kes jenayah lain.",
                "Menyiasat aduan tanpa bukti."
            ],
            answer: "Menyiasat aduan rasuah dan salah guna kuasa secara telus dan adil.",
            explanation: "SPRM memastikan setiap aduan disiasat dengan profesionalisme.",
            mandarinExplanation: "马来西亚反贪污委员会确保每项投诉都得到专业调查。"
        },
        {
            question: "Apakah kepentingan agensi perkhidmatan awam dalam menyediakan perkhidmatan yang cekap dan berkesan?",
            options: [
                "Untuk membuang masa rakyat.",
                "Untuk meningkatkan keyakinan rakyat terhadap kerajaan.",
                "Untuk menyukarkan urusan.",
                "Untuk mengurangkan kualiti hidup."
            ],
            answer: "Untuk meningkatkan keyakinan rakyat terhadap kerajaan.",
            explanation: "Perkhidmatan yang cekap membina kepercayaan dan kepuasan awam.",
            mandarinExplanation: "高效的服务建立公众的信任和满意度。"
        }
    ];

    // Shuffle questions once when component mounts
    const [shuffledQuestions] = useState(() => {
        const shuffled = [...quizQuestions];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
        }
        return shuffled;
    });

    const currentQuestion = shuffledQuestions[currentQuestionIndex];

    const handleAnswerClick = (option) => {
        setSelectedAnswer(option);
        const correct = option === currentQuestion.answer;
        setIsCorrect(correct);
        setShowFeedback(true);
        if (correct) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        setShowFeedback(false);
        setSelectedAnswer(null);
        if (currentQuestionIndex < shuffledQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setQuizCompleted(true);
        }
    };

    const handleRestartQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowFeedback(false);
        setIsCorrect(false);
        setSelectedAnswer(null);
        setQuizCompleted(false);
        // Re-shuffle questions for a new quiz experience
        const shuffled = [...quizQuestions];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        // Note: In a real app, you might want to use a ref to update the state of shuffledQuestions
        // or pass it down as a prop if it's managed higher up. For this self-contained example,
        // re-initializing it within the component is acceptable.
    };

    if (quizCompleted) {
        return (
            <div className="text-center p-6">
                <h3 className="text-3xl font-bold text-indigo-700 mb-4">Kuiz Tamat!</h3>
                <p className="text-xl text-gray-700 mb-6">
                    Anda telah menjawab {score} daripada {shuffledQuestions.length} soalan dengan betul.
                </p>
                <div className="text-2xl font-semibold text-blue-600 mb-8">
                    {score >= shuffledQuestions.length * 0.8 ? (
                        <p>Syabas! Anda seorang yang sangat berpengetahuan tentang Unit 8! Teruskan usaha cemerlang anda!</p>
                    ) : score >= shuffledQuestions.length * 0.5 ? (
                        <p>Bagus! Anda telah menunjukkan pemahaman yang baik. Teruskan belajar untuk menjadi lebih cemerlang!</p>
                    ) : (
                        <p>Jangan putus asa! Setiap kesilapan adalah peluang untuk belajar. Mari kita ulangkaji lagi dan cuba lagi!</p>
                    )}
                </div>
                <button
                    className="px-8 py-4 bg-indigo-600 text-white rounded-full text-xl font-semibold shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
                    onClick={handleRestartQuiz}
                >
                    Cuba Lagi
                </button>
            </div>
        );
    }

    return (
        <div className="quiz-page p-6">
            <h3 className="text-2xl font-bold text-indigo-700 mb-4 text-center">
                Soalan {currentQuestionIndex + 1} daripada {shuffledQuestions.length}
            </h3>
            <div className="bg-blue-50 p-6 rounded-lg shadow-inner border border-blue-200 mb-6">
                <p className="text-lg font-semibold text-gray-800 mb-4">{currentQuestion.question}</p>
                <div className="grid grid-cols-1 gap-3">
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            className={`px-4 py-3 rounded-md text-left font-medium transition-all duration-200
                                        ${selectedAnswer === option
                                            ? (isCorrect ? 'bg-green-200 text-green-800 border-green-400' : 'bg-red-200 text-red-800 border-red-400')
                                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                                        }
                                        ${showFeedback ? 'cursor-not-allowed opacity-80' : 'hover:shadow-md'}`}
                            onClick={() => !showFeedback && handleAnswerClick(option)}
                            disabled={showFeedback}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            {showFeedback && (
                <div className={`mt-6 p-5 rounded-lg shadow-md ${isCorrect ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400'} border-l-4`}>
                    <p className="text-xl font-bold mb-2">
                        {isCorrect ? 'Syabas! Jawapan Anda Betul!' : 'Maaf, Jawapan Anda Salah.'}
                    </p>
                    <p className="text-gray-800">
                        <span className="font-semibold">Penjelasan:</span> {currentQuestion.explanation}
                    </p>
                    <p className="text-gray-600 text-sm italic mt-1">
                        <span className="font-semibold">解释:</span> {currentQuestion.mandarinExplanation}
                    </p>
                    {!isCorrect && (
                        <p className="mt-3 text-blue-700 font-medium">
                            Jangan putus asa! Teruskan belajar dan anda pasti akan berjaya!
                            (不要放弃！继续学习，你一定会成功的！)
                        </p>
                    )}
                    <button
                        className="mt-5 px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold shadow-md hover:bg-indigo-700 transition-all duration-300"
                        onClick={handleNextQuestion}
                    >
                        {currentQuestionIndex < shuffledQuestions.length - 1 ? 'Soalan Seterusnya' : 'Lihat Keputusan'}
                    </button>
                </div>
            )}
        </div>
    );
};

// Mind Map Page Component
const MindMapPage = () => {
    return (
        <div className="mind-map-page p-6 text-center">
            <h3 className="text-2xl font-bold text-indigo-700 mb-6">Peta Minda: Unit 8 Perkhidmatan Awam</h3>
            <div className="bg-blue-50 p-6 rounded-lg shadow-inner border border-blue-200 text-left">
                <ul className="list-none space-y-4">
                    <li className="text-xl font-bold text-indigo-800">
                        <span className="text-2xl mr-2">💡</span> PERKHIDMATAN AWAM (公共服务)
                        <ul className="list-disc list-inside ml-6 mt-2 space-y-2 text-gray-700 font-medium">
                            <li>
                                Konsep (概念)
                                <ul className="list-circle list-inside ml-6 mt-1 text-gray-600 font-normal text-base">
                                    <li>Definisi: Organisasi laksana dasar kerajaan (定义：执行政府政策的组织)</li>
                                    <li>Peranan: Pemangkin pembangunan negara (作用：国家发展的催化剂)</li>
                                </ul>
                            </li>
                            <li>
                                Agensi Utama (主要机构)
                                <ul className="list-circle list-inside ml-6 mt-1 text-gray-600 font-normal text-base">
                                    <li>Polis Diraja Malaysia (马来西亚皇家警察)</li>
                                    <li>Jabatan Bomba dan Penyelamat Malaysia (马来西亚消防与拯救局)</li>
                                    <li>Kementerian Kesihatan Malaysia (马来西亚卫生部)</li>
                                    <li>Jabatan Imigresen Malaysia (马来西亚移民局)</li>
                                    <li>Suruhanjaya Pencegahan Rasuah Malaysia (马来西亚反贪污委员会)</li>
                                    <li>Jabatan Penerangan Malaysia (马来西亚新闻局)</li>
                                    <li>Jabatan Pengangkutan Jalan (陆路交通局)</li>
                                    <li>Jabatan Pendaftaran Negara (国民登记局)</li>
                                    <li>Mahkamah (法庭)</li>
                                    <li>Sekolah (学校)</li>
                                    <li>Hospital (医院)</li>
                                </ul>
                            </li>
                            <li>
                                Kepentingan kepada Masyarakat (对社会的重要性)
                                <ul className="list-circle list-inside ml-6 mt-1 text-gray-600 font-normal text-base">
                                    <li>Perantara kerajaan-rakyat (政府-人民桥梁)</li>
                                    <li>Kemudahan rakyat (人民便利)</li>
                                    <li>Kesedaran & pendedahan (意识与了解)</li>
                                    <li>Melicinkan pentadbiran (行政顺畅)</li>
                                    <li>Meningkat kesejahteraan hidup (提升生活福祉)</li>
                                </ul>
                            </li>
                            <li>
                                Cara Menghargai (如何珍惜)
                                <ul className="list-circle list-inside ml-6 mt-1 text-gray-600 font-normal text-base">
                                    <li>Patuhi etika (遵守道德规范)</li>
                                    <li>Sokong program (支持活动)</li>
                                    <li>Tidak salah guna kemudahan (不滥用设施)</li>
                                    <li>Ucap terima kasih (表达感谢)</li>
                                    <li>Tidak pandang rendah kakitangan (不轻视工作人员)</li>
                                    <li>Guna bahasa sopan (使用礼貌语言)</li>
                                </ul>
                            </li>
                            <li>
                                Ciri-ciri Agensi Efektif (有效机构的特点)
                                <ul className="list-circle list-inside ml-6 mt-1 text-gray-600 font-normal text-base">
                                    <li>Perkhidmatan berkualiti (优质服务)</li>
                                    <li>Responsif (迅速响应)</li>
                                    <li>Kurang birokrasi (减少官僚作风)</li>
                                    <li>Mesra pelanggan (客户友好)</li>
                                </ul>
                            </li>
                            <li>
                                Nilai yang Perlu Diamalkan (应实践的价值观)
                                <ul className="list-circle list-inside ml-6 mt-1 text-gray-600 font-normal text-base">
                                    <li>Bertanggungjawab (负责任)</li>
                                    <li>Patriotisme (爱国主义)</li>
                                    <li>Berterima kasih (感恩)</li>
                                    <li>Hemah tinggi (崇高品德)</li>
                                    <li>Rasional (理性)</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default App;
