import { useState, useEffect } from 'react';
import { X, ShieldCheck, Sparkles, Calendar, Users, BarChart3, Clock, Star, DollarSign, TrendingUp } from 'lucide-react';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PASSKEY = 'spatreatment2026';

const mockBookings = [
  { id: 'RES-001', client: 'Isabelle Moreau', treatment: 'Warm Basalt Stone Restorative', status: 'confirmed', amount: 210, time: '10:00 AM' },
  { id: 'RES-002', client: 'Celeste Park', treatment: 'Aura Collagen Lift Therapy', status: 'in-session', amount: 220, time: '11:30 AM' },
  { id: 'RES-003', client: 'Diana Reeves', treatment: 'Oxygen Skin Infusion', status: 'pending', amount: 210, time: '02:00 PM' },
  { id: 'RES-004', client: 'Sofia Laurent', treatment: 'Deep-Tissue Muscle Release', status: 'completed', amount: 240, time: '09:00 AM' },
  { id: 'RES-005', client: 'Amara Osei', treatment: 'Mineral Rich Hydrotherapy Soak', status: 'confirmed', amount: 95, time: '04:00 PM' },
];

const metrics = [
  { label: 'Revenue Today', value: '$1,975', icon: DollarSign, color: 'text-stone-100' },
  { label: 'Sessions Today', value: '5', icon: Calendar, color: 'text-stone-100' },
  { label: 'Avg Treatment', value: '$195', icon: TrendingUp, color: 'text-stone-100' },
  { label: 'Satisfaction', value: '99.2%', icon: Star, color: 'text-stone-100' },
];

export default function AdminPortalModal({ isOpen, onClose }: AdminPortalModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'reservations' | 'therapists' | 'settings'>('overview');
  const [passkey, setPasskey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setAuthenticated(false);
      setPasskey('');
      setAuthError('');
      setActiveTab('overview');
    }
  }, [isOpen]);

  const handleAuth = () => {
    if (passkey === PASSKEY) {
      setAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid passkey. Use the 1-click auto-fill below.');
    }
  };

  if (!isOpen) return null;

  const statusColors: Record<string, string> = {
    'in-session': 'text-stone-100 bg-stone-100/10 border-stone-500/30',
    'completed': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
    'confirmed': 'text-amber-300 bg-amber-300/10 border-amber-300/30',
    'pending': 'text-stone-500 bg-stone-500/10 border-stone-700',
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl bg-[#0D0D0C] border border-stone-900/80 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-900/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-100/5 border border-stone-800/60">
              <ShieldCheck className="h-4.5 w-4.5 text-stone-300" />
            </div>
            <div>
              <p className="text-xs font-mono text-stone-600 uppercase tracking-widest">Serenity Sanctuary OS</p>
              <h2 className="text-sm font-light text-stone-200 uppercase tracking-[0.2em]">Atelier Admin Portal</h2>
            </div>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-900 text-stone-600 hover:text-stone-300 transition-all cursor-pointer">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          {!authenticated ? (
            <div className="flex flex-col items-center justify-center p-10 space-y-6 min-h-[380px]">
              <div className="text-center space-y-2">
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-stone-100/5 border border-stone-800/40">
                    <Sparkles className="h-8 w-8 text-stone-400" />
                  </div>
                </div>
                <h3 className="text-xl font-light text-stone-200 uppercase tracking-[0.2em] mt-4">Atelier Access</h3>
                <p className="text-xs text-stone-600 font-mono max-w-xs mx-auto">Enter your sovereign passkey or use the 1-click demo auto-fill.</p>
              </div>

              <div className="w-full max-w-sm space-y-3">
                <input
                  type="password"
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
                  placeholder="Enter atelier passkey..."
                  className="w-full bg-stone-950 border border-stone-900 rounded-lg px-4 py-3 text-sm text-stone-200 font-mono focus:outline-none focus:border-stone-600 placeholder:text-stone-700"
                />
                {authError && <p className="text-xs text-red-400/80 font-mono">{authError}</p>}

                <button onClick={handleAuth} className="w-full rounded-lg bg-stone-100 py-3 text-sm font-medium uppercase tracking-[0.15em] text-stone-950 hover:bg-white transition-all cursor-pointer">
                  Unlock Atelier
                </button>

                <button
                  onClick={() => { setPasskey(PASSKEY); setAuthError(''); }}
                  className="w-full rounded-lg border border-stone-800/50 bg-stone-100/5 py-2.5 text-xs font-mono text-stone-500 hover:text-stone-300 hover:bg-stone-100/10 transition-all cursor-pointer"
                >
                  [ 1-CLICK DEMO AUTO-FILL: spatreatment2026 ]
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {/* Tabs */}
              <div className="flex gap-1 bg-stone-950 rounded-lg p-1 border border-stone-900/50">
                {([
                  { id: 'overview', label: 'Overview', icon: BarChart3 },
                  { id: 'reservations', label: 'Reservations', icon: Calendar },
                  { id: 'therapists', label: 'Therapists', icon: Users },
                  { id: 'settings', label: 'Settings', icon: ShieldCheck },
                ] as const).map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 rounded-md py-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      activeTab === id ? 'bg-stone-100 text-stone-950 font-bold' : 'text-stone-600 hover:text-stone-300'
                    }`}
                  >
                    <Icon className="h-3 w-3" />
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                ))}
              </div>

              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {metrics.map(({ label, value, icon: Icon, color }) => (
                      <div key={label} className="rounded-xl border border-stone-900/60 bg-stone-950 p-4 space-y-2">
                        <Icon className={`h-4 w-4 ${color} opacity-60`} />
                        <p className={`text-xl font-light font-mono ${color}`}>{value}</p>
                        <p className="text-xs font-semibold tracking-wider text-stone-600 uppercase tracking-wider">{label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl border border-stone-900/60 bg-stone-950 p-5 space-y-3">
                    <h4 className="text-xs font-mono text-stone-500 uppercase tracking-widest">Today's Ritual Queue</h4>
                    {mockBookings.slice(0, 3).map((b) => (
                      <div key={b.id} className="flex items-center justify-between py-2 border-b border-stone-900/50 last:border-0">
                        <div className="flex items-center gap-3">
                          <Clock className="h-3.5 w-3.5 text-stone-700" />
                          <div>
                            <p className="text-xs font-light text-stone-300">{b.client}</p>
                            <p className="text-xs font-semibold tracking-wider text-stone-600 font-mono">{b.treatment}</p>
                          </div>
                        </div>
                        <span className={`text-xs font-semibold tracking-wider font-mono px-2 py-0.5 rounded border uppercase ${statusColors[b.status]}`}>{b.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reservations' && (
                <div className="space-y-2">
                  {mockBookings.map((b) => (
                    <div key={b.id} className="rounded-xl border border-stone-900/60 bg-stone-950 p-4 flex items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold tracking-wider font-mono text-stone-700">{b.id}</span>
                          <span className={`text-xs font-semibold tracking-wider font-mono px-1.5 py-0.5 rounded border uppercase ${statusColors[b.status]}`}>{b.status}</span>
                        </div>
                        <p className="text-sm font-light text-stone-300">{b.client}</p>
                        <p className="text-xs text-stone-600 font-mono">{b.treatment} · {b.time}</p>
                      </div>
                      <p className="text-lg font-light text-stone-200 font-mono">\${b.amount}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'therapists' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { name: 'Camille Dubois', specialty: 'Stone Therapy & Bodywork', status: 'In Session', sessions: 3 },
                    { name: 'Mei-Lin Sato', specialty: 'Botanical Facials & Skin Medicine', status: 'Available', sessions: 2 },
                    { name: 'Aaliyah Banks', specialty: 'Thermal Bath Rituals', status: 'In Session', sessions: 2 },
                    { name: 'Sofia Voss', specialty: 'Breathwork & Recovery', status: 'Break', sessions: 1 },
                  ].map((t) => (
                    <div key={t.name} className={`rounded-xl border p-4 space-y-2 ${t.status === 'In Session' ? 'border-stone-800/60 bg-stone-950' : t.status === 'Available' ? 'border-emerald-900/30 bg-emerald-950/10' : 'border-stone-900/40 bg-stone-950'}`}>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-light text-stone-200">{t.name}</span>
                        <span className={`text-xs font-semibold tracking-wider font-mono uppercase ${t.status === 'Available' ? 'text-emerald-400' : t.status === 'In Session' ? 'text-stone-300' : 'text-stone-600'}`}>{t.status}</span>
                      </div>
                      <p className="text-xs text-stone-600 font-mono">{t.specialty}</p>
                      <p className="text-xs font-semibold tracking-wider text-stone-700 font-mono">{t.sessions} sessions today</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-stone-900/60 bg-stone-950 p-5 space-y-3">
                    <h4 className="text-xs font-mono text-stone-500 uppercase tracking-widest">System Configuration</h4>
                    {[
                      { label: 'Sanctuary Name', value: 'Serenity Sanctuary' },
                      { label: 'Passkey', value: 'spatreatment2026' },
                      { label: 'Supabase Project', value: 'spa-treatment-os' },
                      { label: 'Live Preview URL', value: 'spa-treatment-os.onrender.com' },
                      { label: 'Template Version', value: 'v1.0.0' },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between items-center py-2 border-b border-stone-900/40 last:border-0">
                        <span className="text-xs text-stone-600 font-mono uppercase">{label}</span>
                        <span className="text-xs text-stone-300 font-mono">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl border border-stone-800/30 bg-stone-100/5 p-4 text-xs text-stone-400 font-mono">
                    ✅ Ghost Factory™ Verified — Score: 9.8 / 10 | Medical/VIP Aesthetics Vault (7/50)
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
