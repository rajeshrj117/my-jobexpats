import { useState } from 'react'

const jobs = [
  { t: 'Tool & Die Maker', ty: 'Part Time', loc: 'Sungai Jawi', c: 'Tooling', n: 1, d: 'Tool & die design and development, tool fabrication, assembly and maintenance, process optimisation, costing and planning, cross-functional collaboration.' },
  { t: 'Die Casting', ty: 'Full Time', loc: 'Sungai Jawi', c: 'Die Casting', n: 1, d: 'Interpret drawings and specs, set up CNC Swiss lathe/turn-mill, produce First Article parts, run Continuous Improvement Plans, inspect and troubleshoot.' },
  { t: 'CNC Lathe Machinist', ty: 'Part Time', loc: 'Penang', c: 'Machining', n: 1, d: 'Operate and set up CNC lathes (Fanuc, G & M code), check tolerances, tool changes and offsets, read drawings, work in a team.' },
  { t: 'PLC Programmer', ty: 'Part Time', loc: 'Penang', c: 'Automation', n: 0, d: 'Design, test and debug PLC software (ladder logic, structured text), configure hardware, troubleshoot control systems, write documentation.' },
  { t: 'QC', ty: 'Part Time', loc: 'Penang', c: 'Quality', n: 0, d: 'Inspect samples against standards, verify blueprints, record inspection results, train production on quality control, propose improvements.' },
  { t: 'CNC Programmer', ty: 'Full Time', loc: 'Penang', c: 'Machining', n: 1, d: 'CNC programming for 3-axis/horizontal milling, maintain CAM files, verify dimensions, run CIP to cut cycle time, support mass production.' },
  { t: 'QA Engineer', ty: 'Part Time', loc: 'Penang', c: 'Quality', n: 0, d: 'Process quality assurance, rejection data and reports, defect analysis with Pareto charts, APQP, PPAP, FMEA, SPC, CPK, 8D reports.' },
  { t: 'Spray Paint / Treatment Engineer', ty: 'Part Time', loc: 'Penang', c: 'Engineering', n: 0, d: 'Posted via MQC.' },
  { t: 'QA Manager (Mechanical / Tool & Die)', ty: 'Part Time', loc: 'Penang', c: 'Quality', n: 0, d: 'Posted via MQC.' },
  { t: 'Welding Engineer (Manual / Robotic)', ty: 'Part Time', loc: 'Penang', c: 'Engineering', n: 0, d: 'Posted via MQC.' },
]
const roles = ['CNC Programmer', 'CNC Machinist (Milling)', 'CNC Machinist (Lathe)', 'CNC Machinist (Wire-Cut EDM)', 'Conventional Machinist', 'Tool Maker (Press Tool)', 'Mould Maker (Plastic)', 'Project Manager', 'Tooling Manager', 'Tooling Engineer']
const rights = [['Employment Pass', 'Work-permit category for skilled expatriates.'], ['Employment Act 1955', 'Core Malaysian labour law on wages, hours and leave.'], ['Immigration Act', 'Entry, stay and compliance rules.'], ['Income Tax for Skilled Expatriates', 'Tax obligations for foreign workers.'], ['E-migrant', "India's emigration clearance portal."], ['India High Commission KL', 'Guidance for Indian nationals in Malaysia.']]
const tests = [['Prabhu', "I thought it was another scam. After checking the consultant, interviews and offer, I'm now in a comfortable company in Malaysia."], ['Prakash V.', 'After a trade test and two interviews I was offered a job and paid only a reasonable professional fee.']]
const tabs = [['home', '🏠', 'Home'], ['jobs', '💼', 'Jobs'], ['check', '✅', 'Eligibility'], ['rights', '⚖️', 'Rights'], ['contact', '📞', 'Contact']]

function Home({ go, msg, dark, setDark }) {
  const tiles = [
    ['💼', 'Vacancy & Apply', () => go('jobs')], ['📘', 'Career Advice', () => go('rights')],
    ['💬', 'Testimonials', () => document.getElementById('ts')?.scrollIntoView({ behavior: 'smooth' })],
    ['🇲🇾', 'Malaysia Updates', () => msg('Malaysia updates', 'Latest updates for jobseekers and clients will appear here.')],
    ['🎓', 'HRD Corp', () => msg('HRD Corp', 'HRD Corp programmes for jobseekers and clients.')],
    ['🏅', 'Mediator', () => msg('National Community Mediator', 'Appointed by the Ministry of Unity to mediate and resolve public issues.')],
  ]
  return (<>
    <div className="hero">
      <img src="logo.png" alt="" style={{ height: 64, background: '#fff', borderRadius: 12, padding: 4, marginBottom: 10 }} />
      <h1>Malaysia — your career begins here</h1>
      <p>Technical jobs in tooling, metal stamping, machining, injection moulding, die casting and automation.</p>
      <button className="btn w" onClick={() => go('jobs')}>View vacancies</button>
    </div>
    <div className="stats"><div><b>{jobs.length}</b><small>Jobs found</small></div><div><b>54</b><small>Members</small></div><div><b>39</b><small>Categories</small></div></div>
    <div className="grid">{tiles.map(([i, t, f]) => <div key={t} className="card" onClick={f}><div className="ic">{i}</div><h3>{t}</h3></div>)}</div>
    <div className="card" id="ts"><h3>Testimonials</h3>{tests.map(([n, t]) => <p key={n}><b>{n}:</b> “{t}”</p>)}</div>
    <div className="card"><h3>Awareness for Malaysian companies</h3><p>Many agents in India forward resumes as “free” but charge jobseekers RM 11,000–16,500. Direct recruitment or a proper Malaysian consultant avoids fake certificates and missing medical/police checks.</p><p><i>— Dr. Kalidas Ramasamy, National Mediator (Ministry of Unity)</i></p></div>
    <p style={{ textAlign: 'center' }}><button className="btn o" onClick={() => setDark(!dark)}>Toggle dark mode</button></p>
  </>)
}

function Jobs({ applied, open }) {
  const [f, setF] = useState('All')
  const cats = ['All', ...new Set(jobs.map(j => j.c))]
  const list = jobs.map((j, i) => ({ ...j, i })).filter(j => f === 'All' || j.c === f)
  return (<>
    <h2>{list.length} Jobs Found</h2>
    <div className="chips">{cats.map(c => <button key={c} className={'chip' + (c === f ? ' on' : '')} onClick={() => setF(c)}>{c}</button>)}</div>
    {list.map(j => (
      <div key={j.i} className="card" onClick={() => open(j.i)}>
        <div className="row"><h3>{j.t}</h3>{j.n ? <span className="tag new">New</span> : null}</div>
        <span className="tag">{j.ty}</span><span className="tag">📍 {j.loc}</span>
        {applied.includes(j.i) && <span className="ok"> ✓ Applied</span>}
        <p>{j.d.slice(0, 90)}…</p>
      </div>))}
  </>)
}

function Check() {
  const [v, setV] = useState({ age: '', exp: '', q: 0, en: 0, med: 0, cr: 0 })
  const [res, setRes] = useState(null)
  const set = k => e => setV({ ...v, [k]: e.target.value })
  const run = () => {
    const a = +v.age, y = +v.exp
    setRes([[a >= 27 && a <= 40, 'Age 27–40'], [y >= 5, '5+ years experience'], [+v.q === 0, 'Diploma or Degree'], [+v.en === 0, 'Fluent English'], [+v.med === 0, 'Good medical status'], [+v.cr === 0, 'Clean police record']])
  }
  const Sel = ({ k, label, opts }) => <label>{label}<select value={v[k]} onChange={set(k)}>{opts.map((o, i) => <option key={o} value={i}>{o}</option>)}</select></label>
  return (<>
    <h2>Eligibility Checker</h2>
    <div className="card">
      <p>Skill-knowledgeable jobseekers from India relocating to Malaysia.</p>
      <label>Age<input type="number" placeholder="27–40" value={v.age} onChange={set('age')} /></label>
      <label>Years of hands-on experience<input type="number" placeholder="5+" value={v.exp} onChange={set('exp')} /></label>
      <Sel k="q" label="Qualification" opts={['Diploma or Degree', 'Other']} />
      <Sel k="en" label="English communication" opts={['Well versed', 'Basic']} />
      <Sel k="med" label="Medical history" opts={['Good (no surgery history)', 'Surgery history']} />
      <Sel k="cr" label="Criminal record" opts={['None', 'Has record']} />
      <p style={{ marginTop: 12 }}><button className="btn" onClick={run}>Check</button></p>
      {res && <div>{res.map(([ok, t]) => <p key={t} className={ok ? 'ok' : 'no'}>{ok ? '✓' : '✗'} {t}</p>)}
        <p><b>{res.every(r => r[0]) ? 'You meet the criteria — apply from the Jobs tab!' : 'Some criteria are not met.'}</b></p></div>}
    </div>
    <h2 style={{ marginTop: 16 }}>Positions open</h2>
    <div className="chips">{roles.map(r => <span key={r} className="chip">{r}</span>)}</div>
  </>)
}

const Rights = () => (<>
  <h2>Know Your Rights</h2>
  {rights.map(([t, d]) => <div key={t} className="card"><h3>{t}</h3><p>{d}</p></div>)}
  <div className="card"><h3>MyJobstek perks</h3><p>• Guidance on all employment matters in Malaysia<br />• Free personal accident policy for the 1st year of employment</p></div>
</>)

const Contact = ({ msg }) => (<>
  <h2>Contact</h2>
  <div className="card"><p>🌐 <a href="https://myjobstekexpats.com" target="_blank" rel="noopener noreferrer">www.myjobstekexpats.com</a></p><p>☎️ <a href="tel:045820380">04-5820380</a> (Call)</p><p>💬 <a href="https://wa.me/60164295146">60164295146</a> (WhatsApp)</p><p>✉️ myjobstek.malaysia@yahoo.com.my</p><p>📘 Myjobstek Career Quest</p></div>
  <div className="card"><h3>How to apply</h3><p>1. Visit the website 2. Log in 3. Browse vacancies 4. Apply and attend the trade test & interviews.</p></div>
  <div className="card"><h3>Send a message</h3><input placeholder="Name" /><input placeholder="Email" /><textarea rows="3" placeholder="Message" /><p><button className="btn" onClick={() => msg('Message sent', 'Demo only — nothing was submitted.')}>Submit</button></p></div>
</>)

export default function App() {
  const [tab, setTab] = useState('home')
  const [applied, setApplied] = useState([])
  const [sheet, setSheet] = useState(null)
  const [dark, setDark] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', exp: '' })
  const go = t => { setTab(t); document.querySelector('main').scrollTop = 0 }
  const msg = (t, b) => setSheet({ type: 'msg', t, b })
  const open = i => { setForm({ name: '', email: '', exp: '' }); setSheet({ type: 'job', i }) }
  const apply = i => {
    if (!form.name || !form.email) return alert('Please enter name and email')
    setApplied([...applied, i]); msg('Application sent ✓', `Thanks ${form.name}! (Demo only — nothing was submitted.)`)
  }
  if (typeof document !== 'undefined') document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  const j = sheet?.type === 'job' ? jobs[sheet.i] : null
  return (<>
    <header><img className="logo" src="logo.png" alt="MyJobstek logo" /><div><b>MyJobstek</b><small>Malaysia's No.1 Recruitment & Immigration Consultant</small></div></header>
    <main>
      {tab === 'home' && <Home go={go} msg={msg} dark={dark} setDark={setDark} />}
      {tab === 'jobs' && <Jobs applied={applied} open={open} />}
      {tab === 'check' && <Check />}
      {tab === 'rights' && <Rights />}
      {tab === 'contact' && <Contact msg={msg} />}
    </main>
    <nav>{tabs.map(([k, i, l]) => <button key={k} className={tab === k ? 'on' : ''} onClick={() => go(k)}><span>{i}</span>{l}</button>)}</nav>
    {sheet && <div className="modal s" onClick={e => e.target === e.currentTarget && setSheet(null)}><div className="sheet">
      {j ? (<>
        <h2>{j.t}</h2><span className="tag">{j.ty}</span><span className="tag">📍 {j.loc}</span>
        <p style={{ color: 'var(--mut)', fontSize: 14 }}>{j.d}</p>
        <input placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <textarea rows="3" placeholder="Experience summary" value={form.exp} onChange={e => setForm({ ...form, exp: e.target.value })} />
        <div className="row" style={{ marginTop: 12 }}><button className="btn o" onClick={() => setSheet(null)}>Close</button><button className="btn" onClick={() => apply(sheet.i)}>Apply now</button></div>
      </>) : (<><h2>{sheet.t}</h2><p style={{ color: 'var(--mut)' }}>{sheet.b}</p><button className="btn" onClick={() => setSheet(null)}>OK</button></>)}
    </div></div>}
  </>)
}
