import { useNavigate } from 'react-router-dom'
import './Hero.css'

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className="hero">
      {/* Badge */}
      <div className="hero__badge">
        <span className="hero__badge-dot" />
        AI-Powered Data Analysis
      </div>

      {/* Headline */}
      <h1 className="hero__headline">
        Your data, <span className="hero__headline-accent">analyzed</span>
        <br />
        instantly.
      </h1>

      {/* Subtext */}
      <p className="hero__subtext">
        Upload any CSV or Excel file, ask questions in plain English,
        <br />
        and get instant insights powered by GPT-4o.
      </p>

      {/* CTAs */}
      <div className="hero__ctas">
        <button className="hero__btn-primary" onClick={() => navigate('/chat')}>
          Try the Agent →
        </button>
        <button className="hero__btn-secondary">
          See Demo
        </button>
      </div>

      {/* Trust signals */}
      <div className="hero__trust">
        <span>No code required</span>
        <span className="hero__trust-dot">·</span>
        <span>Powered by GPT-4o-mini</span>
        <span className="hero__trust-dot">·</span>
        <span>CSV &amp; Excel supported</span>
      </div>

      {/* Mock demo card */}
      <div className="hero__demo">
        <div className="demo__topbar">
          <div className="demo__file-pill">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            employee_data.xlsx
          </div>
          <div className="demo__status">
            <span className="demo__status-dot" />
            Live
          </div>
        </div>

        <div className="demo__messages">
          {/* User message */}
          <div className="demo__msg demo__msg--user">
            What's the average salary by department?
          </div>

          {/* AI response */}
          <div className="demo__msg demo__msg--ai">
            <p className="demo__ai-intro">Here's the breakdown across all departments:</p>
            <table className="demo__table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Avg Salary</th>
                  <th>Employees</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Engineering</td>
                  <td className="demo__table-highlight">$95,400</td>
                  <td>42</td>
                </tr>
                <tr>
                  <td>Marketing</td>
                  <td>$72,800</td>
                  <td>18</td>
                </tr>
                <tr>
                  <td>Sales</td>
                  <td>$68,200</td>
                  <td>31</td>
                </tr>
              </tbody>
            </table>
            <p className="demo__ai-note">
              Engineering leads with the highest average salary — 31% above the company mean.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
