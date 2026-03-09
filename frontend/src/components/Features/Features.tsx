import { useState } from 'react'
import './Features.css'

const TABS = ['Ask Anything', 'Full Report', 'Live Analysis'] as const
type Tab = typeof TABS[number]

function AskAnythingMockup() {
  return (
    <div className="mockup">
      <div className="mockup__bar">
        <div className="mockup__dots">
          <span /><span /><span />
        </div>
        <div className="mockup__file-chip">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          employee_data.xlsx
        </div>
      </div>
      <div className="mockup__body">
        <div className="mockup__msg mockup__msg--user">
          What is the average salary per department?
        </div>
        <div className="mockup__msg mockup__msg--ai">
          <p className="mockup__ai-label">Here's the breakdown:</p>
          <table className="mockup__table">
            <thead>
              <tr><th>Department</th><th>Avg Salary</th><th>Headcount</th></tr>
            </thead>
            <tbody>
              <tr><td>Engineering</td><td className="mockup__green">$95,400</td><td>42</td></tr>
              <tr><td>Marketing</td><td>$72,800</td><td>18</td></tr>
              <tr><td>Sales</td><td>$68,200</td><td>31</td></tr>
              <tr><td>Operations</td><td>$61,500</td><td>24</td></tr>
            </tbody>
          </table>
          <p className="mockup__ai-note">Engineering earns 31% above the company average of $72,900.</p>
        </div>
      </div>
    </div>
  )
}

function FullReportMockup() {
  return (
    <div className="mockup">
      <div className="mockup__bar">
        <div className="mockup__dots"><span /><span /><span /></div>
        <div className="mockup__file-chip">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          sales_q4_2025.xlsx — Report
        </div>
        <div className="mockup__download-btn">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Download PDF
        </div>
      </div>
      <div className="mockup__body mockup__body--report">
        <p className="mockup__report-title">Sales Q4 2025 — Analysis Report</p>
        <div className="mockup__report-section">
          <p className="mockup__report-heading">Dataset Overview</p>
          <div className="mockup__report-stats">
            <div className="mockup__stat"><span className="mockup__stat-val">1,240</span><span className="mockup__stat-label">Rows</span></div>
            <div className="mockup__stat"><span className="mockup__stat-val">8</span><span className="mockup__stat-label">Columns</span></div>
            <div className="mockup__stat"><span className="mockup__stat-val">0</span><span className="mockup__stat-label">Missing</span></div>
          </div>
        </div>
        <div className="mockup__report-section">
          <p className="mockup__report-heading">Key Insights</p>
          <ul className="mockup__report-list">
            <li>Revenue peaked in November at <strong>$2.4M</strong>, up 18% MoM</li>
            <li>Top region: <strong>North America</strong> (42% of total revenue)</li>
            <li>Churn rate dropped from 6.2% → <strong>4.8%</strong> in December</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function LiveAnalysisMockup() {
  return (
    <div className="mockup">
      <div className="mockup__bar">
        <div className="mockup__dots"><span /><span /><span /></div>
        <div className="mockup__file-chip">
          <span className="mockup__live-dot" /> Analysing...
        </div>
      </div>
      <div className="mockup__body">
        <div className="mockup__msg mockup__msg--user">
          Find outliers in the revenue column and explain them.
        </div>
        <div className="mockup__msg mockup__msg--ai">
          <div className="mockup__tool-call">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Running <code>execute_code</code>
          </div>
          <p className="mockup__streaming">
            Found <strong className="mockup__green">3 outliers</strong> in the revenue column using IQR method:
          </p>
          <table className="mockup__table">
            <thead><tr><th>Row</th><th>Revenue</th><th>Z-Score</th></tr></thead>
            <tbody>
              <tr><td>#142</td><td className="mockup__red">$0</td><td>-3.2</td></tr>
              <tr><td>#891</td><td className="mockup__green">$98,400</td><td>+4.1</td></tr>
              <tr><td>#1033</td><td className="mockup__red">-$2,100</td><td>-3.8</td></tr>
            </tbody>
          </table>
          <p className="mockup__streaming-cursor">Row #891 likely reflects a one-time enterprise deal▋</p>
        </div>
      </div>
    </div>
  )
}

const MOCKUPS: Record<Tab, React.ReactNode> = {
  'Ask Anything':   <AskAnythingMockup />,
  'Full Report':    <FullReportMockup />,
  'Live Analysis':  <LiveAnalysisMockup />,
}

const SUPPORTING = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'CSV & Excel Support',
    desc: 'Drop in any .csv, .xlsx or .xls file and start asking questions immediately.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Smart Routing',
    desc: 'Automatically detects whether you need a quick stat, focused insight, or full EDA report.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Real-time Streaming',
    desc: 'See the AI think live — results stream token by token as the analysis runs.',
  },
]

export default function Features() {
  const [activeTab, setActiveTab] = useState<Tab>('Ask Anything')

  return (
    <section className="features">
      <div className="features__header">
        <span className="features__label">Capabilities</span>
        <h2 className="features__title">
          What you can do <span className="features__title-accent">with it</span>
        </h2>
        <p className="features__subtitle">
          From a single question to a full analyst report — DataMind handles it all.
        </p>
      </div>

      {/* Tabbed showcase */}
      <div className="features__showcase">
        <div className="showcase__tabs">
          {TABS.map(tab => (
            <button
              key={tab}
              className={`showcase__tab ${activeTab === tab ? 'showcase__tab--active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="showcase__window">
          {MOCKUPS[activeTab]}
        </div>
      </div>

      {/* Supporting 3-card grid */}
      <div className="features__grid">
        {SUPPORTING.map(f => (
          <div key={f.title} className="feat-card">
            <div className="feat-card__icon">{f.icon}</div>
            <h3 className="feat-card__title">{f.title}</h3>
            <p className="feat-card__desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
