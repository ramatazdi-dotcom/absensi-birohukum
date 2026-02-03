<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Absensi Apel Pagi - Biro Hukum Riau</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .glass-effect {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        
        @keyframes toastIn {
            from { transform: translate(-50%, 100%); opacity: 0; }
            to { transform: translate(-50%, 0); opacity: 1; }
        }
        .animate-toast { animation: toastIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
    </style>
</head>
<body class="bg-slate-50 text-slate-900 selection:bg-blue-100">
    <div id="root"></div>

    <script type="text/babel">
        const { useState, useMemo, useEffect } = React;

        // Custom SVG Icons
        const Icons = {
            Check: () => (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            ),
            Search: () => (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            ),
            Users: () => (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            ),
            Success: () => (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            )
        };

        const App = () => {
            const [activeTab, setActiveTab] = useState('absensi');
            const [searchTerm, setSearchTerm] = useState('');
            const [attendance, setAttendance] = useState({});
            const [toast, setToast] = useState(null);
            
            const [employees] = useState([
                { id: '1', name: 'Dr. H. Elly Wardhani, SH., MH', nip: '19700101 199603 2 003', rank: 'Pembina Utama Madya (IV/d)' },
                { id: '2', name: 'Arman, SH', nip: '19750505 200003 1 002', rank: 'Pembina Utama Muda (IV/c)' },
                { id: '3', name: 'Yuliana, SH., MH', nip: '19801010 200501 2 001', rank: 'Pembina (IV/a)' }
            ]);

            const filteredEmployees = useMemo(() => 
                employees.filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase())),
                [employees, searchTerm]
            );

            const toggleAttendance = (id) => {
                setAttendance(prev => ({ ...prev, [id]: !prev[id] }));
            };

            const handleSave = () => {
                const count = Object.values(attendance).filter(v => v).length;
                if (count === 0) {
                    showToast("Pilih minimal satu pegawai");
                    return;
                }
                
                // Simulasi Simpan
                showToast(`Berhasil menyimpan ${count} absensi`);
                
                // Reset setelah 2 detik
                setTimeout(() => {
                    setAttendance({});
                }, 1000);
            };

            const showToast = (msg) => {
                setToast(msg);
                setTimeout(() => setToast(null), 3000);
            };

            return (
                <div className="min-h-screen pb-32">
                    {/* Header Premium */}
                    <header className="bg-[#0f172a] text-white py-8 px-4 text-center shadow-2xl sticky top-0 z-50">
                        <h1 className="font-extrabold text-[10px] uppercase tracking-[0.4em] leading-tight text-blue-400 mb-1">Pemerintah Provinsi Riau</h1>
                        <h2 className="font-black text-xs uppercase tracking-[0.2em]">Biro Hukum Setda Provinsi Riau</h2>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
                    </header>

                    <main className="max-w-2xl mx-auto p-6 animate-fade-in">
                        {/* Navigation Tabs */}
                        <nav className="flex glass-effect rounded-2xl shadow-xl border border-white/50 p-1.5 mb-8 sticky top-24 z-40">
                            {['absensi', 'pegawai', 'arsip'].map(t => (
                                <button 
                                    key={t} 
                                    onClick={() => setActiveTab(t)} 
                                    className={`flex-1 py-3.5 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition-all duration-300 ${activeTab === t ? 'bg-blue-600 text-white shadow-lg scale-[1.02]' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    {t === 'absensi' ? 'Ceklis Apel' : t === 'pegawai' ? 'Data Pegawai' : 'Arsip Laporan'}
                                </button>
                            ))}
                        </nav>

                        {activeTab === 'absensi' && (
                            <div className="space-y-6">
                                {/* Search Bar */}
                                <div className="relative group">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 transition-transform group-focus-within:scale-110">
                                        <Icons.Search />
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="Cari Nama Pegawai..." 
                                        className="w-full pl-14 pr-6 py-5 bg-white border-0 rounded-3xl font-bold text-sm shadow-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-300"
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                
                                {/* Employee List Container */}
                                <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-xl shadow-slate-200/50 divide-y divide-slate-50">
                                    {filteredEmployees.length > 0 ? filteredEmployees.map((emp, index) => (
                                        <div 
                                            key={emp.id}
                                            onClick={() => toggleAttendance(emp.id)}
                                            className={`flex items-center justify-between p-5 cursor-pointer transition-all duration-300 group ${attendance[emp.id] ? 'bg-blue-50/50' : 'hover:bg-slate-50'}`}
                                            style={{ animationDelay: `${index * 50}ms` }}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-extrabold text-sm transition-all duration-300 ${attendance[emp.id] ? 'bg-blue-600 text-white rotate-6' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
                                                    {emp.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className={`text-sm font-extrabold tracking-tight transition-colors ${attendance[emp.id] ? 'text-blue-900' : 'text-slate-800'}`}>{emp.name}</p>
                                                    <div className="flex items-center gap-2 mt-0.5">
                                                        <span className="text-[9px] font-bold text-slate-400 uppercase bg-slate-100 px-1.5 py-0.5 rounded-md tracking-tighter">{emp.rank}</span>
                                                        <span className="text-[9px] font-medium text-slate-300">NIP.{emp.nip}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all duration-500 ${attendance[emp.id] ? 'bg-blue-600 border-blue-600 text-white rotate-0' : 'border-slate-200 rotate-45 group-hover:rotate-0'}`}>
                                                {attendance[emp.id] && <Icons.Check />}
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="py-20 text-center">
                                            <p className="text-slate-300 font-bold text-xs uppercase tracking-widest">Data tidak ditemukan</p>
                                        </div>
                                    )}
                                </div>

                                {/* Main Action Button */}
                                <div className="fixed bottom-10 left-0 right-0 px-6 z-50">
                                    <button 
                                        onClick={handleSave}
                                        className="max-w-2xl mx-auto w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/40 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
                                    >
                                        Simpan Laporan Apel
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'pegawai' && (
                            <div className="bg-white p-8 rounded-[2rem] border shadow-xl text-center space-y-4">
                                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-2">
                                    <Icons.Users />
                                </div>
                                <h3 className="font-black text-sm uppercase tracking-widest text-slate-800">Manajemen Pegawai</h3>
                                <p className="text-xs text-slate-400 font-medium">Modul ini sedang disiapkan untuk sinkronisasi database Firestore.</p>
                            </div>
                        )}

                        {activeTab === 'arsip' && (
                            <div className="bg-white p-8 rounded-[2rem] border shadow-xl text-center">
                                <p className="text-slate-300 font-black text-[10px] uppercase tracking-[0.3em]">Arsip Laporan Digital</p>
                            </div>
                        )}
                    </main>

                    {/* Toast Notification */}
                    {toast && (
                        <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[100] w-full max-w-xs px-4 animate-toast">
                            <div className="bg-slate-900 text-white px-6 py-4 rounded-3xl shadow-2xl flex items-center gap-3 border border-slate-800">
                                <Icons.Success />
                                <span className="text-[10px] font-black uppercase tracking-widest">{toast}</span>
                            </div>
                        </div>
                    )}

                    <footer className="mt-10 py-8 text-center opacity-30">
                        <div className="text-[9px] font-black uppercase text-slate-500 tracking-[0.5em] flex flex-col gap-2">
                            <span>© 2026 RAMA TAZDI</span>
                            <span className="text-blue-600">SETDA PROVINSI RIAU</span>
                        </div>
                    </footer>
                </div>
            );
        };

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    </script>
</body>
</html>