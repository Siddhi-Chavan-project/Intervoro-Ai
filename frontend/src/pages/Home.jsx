
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
    const navigate = useNavigate();
    const resumeInputRef = useRef(null);

    const [jobRole, setJobRole] = useState("");
    const [loadingResume, setLoadingResume] = useState(false);
    const [resumeAnalysis, setResumeAnalysis] = useState(null);
    const [resumeError, setResumeError] = useState("");

    const features = [
        {
            icon: "🤖",
            title: "AI Mock Interviews",
            desc: "Practice AI-generated interviews tailored to your role.",
            action: () => navigate("/create-interview"),
        },
        {
            icon: "📄",
            title: "Resume Analyzer",
            desc: "Analyze your resume with ATS scoring and recommendations.",
           
        },
        {
            icon: "📊",
            title: "Performance Dashboard",
            desc: "Track your interview scores and improvements.",
          
        },
        {
            icon: "🎤",
            title: "Interview Categories",
            desc: "Explore interview topics and categories.",
       
        },
        {
            icon: "🧠",
            title: "AI Feedback",
            desc: "Receive technical and communication feedback.",
           
        },
        {
            icon: "📈",
            title: "Progress Tracking",
            desc: "Monitor your progress and interview history.",
            action: () => navigate("/interview-history"),
        },
    ];

    const categories = [
     "Frontend", "Backend", "Full Stack", "Java", "Python", "C++",
"React", "Node.js", "MongoDB", "SQL", "React", "C",
"DevOps", "Cloud", "Machine Learning", "Data Science",
"Cyber Security", "UI/UX", "JavaScript", "PHP",
    ];

    const handleResumeSelection = async (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        setResumeError("");
        setResumeAnalysis(null);

        const allowedExtensions = /\.(pdf|docx)$/i;

        if (!allowedExtensions.test(file.name)) {
            setResumeError("Please select a PDF or DOCX resume.");
            event.target.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setResumeError("Your resume must be 5 MB or smaller.");
            event.target.value = "";
            return;
        }

        setLoadingResume(true);

        try {
            const formData = new FormData();

            formData.append("file", file);
            formData.append("job_role", jobRole);

            const response = await fetch(
                "http://127.0.0.1:8000/api/resume/analyze",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.detail || "Resume analysis failed. Please try again."
                );
            }

            if (!data.analysis) {
                throw new Error("The server returned no analysis results.");
            }

            setResumeAnalysis(data.analysis);
        } catch (error) {
            console.error("Resume analysis error:", error);

            setResumeError(
                error.message ||
                "Unable to connect to the backend. Check that FastAPI is running."
            );
        } finally {
            setLoadingResume(false);
            event.target.value = "";
        }
    };
/*

 */

const bars = [38, 55, 48, 70, 86];

const steps = [
    {
        title: "Create account",
        desc: "Register in seconds and set up your profile.",
        art: (
            <div className="hiw-glass hiw-form">
                <div className="hiw-avatar">👤</div>
                <div className="hiw-line w70" />
                <div className="hiw-line w50" />
                <div className="hiw-pill">Sign up</div>
            </div>
        ),
    },
    {
        title: "Generate questions",
        desc: "Pick a role or category and get questions written for it.",
        art: (
            <div className="hiw-stack">
                <div className="hiw-glass hiw-chip active">⚛️ React Developer</div>
                <div className="hiw-glass hiw-chip">💻 Full Stack</div>
                <div className="hiw-glass hiw-chip">🧠 Behavioral</div>
            </div>
        ),
    },
    {
        title: "Answer questions",
        desc: "Practice technical and HR questions in your own words.",
        art: (
            <div className="hiw-glass hiw-answer">
                <span className="hiw-live">● Live</span>
                <div className="hiw-q">Explain the Virtual DOM…</div>
                <div className="hiw-wave">
                    {[10, 22, 14, 28, 18, 30, 12, 24, 16].map((h, i) => (
                        <i key={i} style={{ height: h }} />
                    ))}
                </div>
            </div>
        ),
    },
    {
        title: "Receive feedback",
        desc: "Get a score and clear notes on every answer.",
        art: (
            <div className="hiw-glass hiw-feedback">
                <div className="hiw-ring">
                    <b>84</b>
                    <small>/100</small>
                </div>
                <ul>
                    <li>✓ Relevance</li>
                    <li>✓ Structure</li>
                    <li>✓ Specificity</li>
                </ul>
            </div>
        ),
    },
    {
        title: "Track progress",
        desc: "View reports and watch your scores.",
        art: (
            <div className="hiw-glass hiw-chart">
                <div className="hiw-bars">
                    {bars.map((h, i) => (
                        <i key={i} style={{ height: `${h}%` }} />
                    ))}
                </div>
                <span className="hiw-trend"></span>
            </div>
        ),
    },
    {
    title: "Master Weak Concepts",
    desc: "Understand missed concepts, practise targeted questions, and apply your knowledge to new scenarios.",
    art: (
        <div className="hiw-glass hiw-answer">
            <span className="hiw-live">AI Practice</span>
            <div className="hiw-q">
                🧠 Concept Identified
            </div>
            <div style={{ fontSize: "13px", color: "#c4b5fd", marginBottom: "12px" }}>
                SQL Joins
            </div>
            <div className="hiw-pill">
                Practice New Scenario →
            </div>
        </div>
    ),
},
];


const CSS = `
.hiw { padding: 80px 6%; background: #080f1e; color: #f8fafc; }
.hiw-inner { max-width: 1200px; margin: 0 auto; }
.hiw-eyebrow { margin: 0 0 12px; color: #60a5fa; font-size: 15px; font-weight: 600; }
.hiw-title { margin: 0 0 48px; max-width: 560px; font-size: clamp(32px, 4.4vw, 52px);
  font-weight: 500; line-height: 1.12; text-align: left; }
 
.hiw-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 36px 28px; }
.hiw-step { grid-column: span 2; }
.hiw-step:nth-child(4) { grid-column: 2 / span 2; }
.hiw-step:nth-child(5) { grid-column: 4 / span 2; }
 
.hiw-art { position: relative; height: 230px; border-radius: 24px; overflow: hidden;
  display: grid; place-items: center;
  background: radial-gradient(120% 120% at 20% 0%, #2f3fa8 0%, #1c2266 42%, #0c1230 100%);
  border: 1px solid #263b54; box-shadow: 0 24px 40px -24px rgba(0,0,0,.8); }
.hiw-art::before { content: ""; position: absolute; width: 220px; height: 220px; right: -60px;
  bottom: -90px; border-radius: 50%; background: rgba(128,56,236,.40); filter: blur(50px); }
 
.hiw-head { display: flex; align-items: center; gap: 12px; margin: 22px 0 8px; }
.hiw-num { flex: none; width: 30px; height: 30px; border-radius: 50%; display: grid;
  place-items: center; background: linear-gradient(135deg, #315efb, #8038ec); color: #ffffff; font-size: 14px; font-weight: 700; }
.hiw-head h3 { margin: 0; font-size: 21px; font-weight: 500; text-align: left; }
.hiw-desc { margin: 0; color: #a8b6cc; font-size: 15px; line-height: 1.65; text-align: left; }
 
/* glass mock UI */
.hiw-glass { position: relative; z-index: 1; border-radius: 16px; padding: 14px 16px;
  background: rgba(255,255,255,.10); border: 1px solid rgba(255,255,255,.18);
  backdrop-filter: blur(8px); color: #fff; font-size: 14px; }
.hiw-line { height: 8px; border-radius: 6px; background: rgba(255,255,255,.28); margin: 8px 0; }
.w70 { width: 70%; } .w50 { width: 50%; }
 
.hiw-form { width: 190px; text-align: center; }
.hiw-form .hiw-line { margin-left: auto; margin-right: auto; }
.hiw-avatar { width: 44px; height: 44px; margin: 0 auto 6px; border-radius: 50%;
  display: grid; place-items: center; background: linear-gradient(135deg, #315efb, #8038ec); font-size: 20px; }
.hiw-pill { margin-top: 12px; padding: 7px; border-radius: 999px; background: linear-gradient(110deg, #315efb, #8038ec);
  color: #ffffff; font-weight: 700; font-size: 13px; }
 
.hiw-stack { position: relative; z-index: 1; display: grid; gap: 10px; width: 220px; }
.hiw-chip { padding: 12px 16px; font-weight: 600; }
.hiw-chip.active { background: rgba(128,56,236,.35); border-color: #a78bfa; }
 
.hiw-answer { width: 230px; }
.hiw-live { display: inline-block; margin-bottom: 8px; padding: 2px 8px; border-radius: 999px;
  background: #16a34a; font-size: 11px; font-weight: 700; }
.hiw-q { font-weight: 600; margin-bottom: 12px; }
.hiw-wave { display: flex; align-items: center; gap: 5px; height: 34px; }
.hiw-wave i { width: 5px; border-radius: 4px; background: #a78bfa; }
 
.hiw-feedback { display: flex; align-items: center; gap: 18px; }
.hiw-ring { width: 82px; height: 82px; border-radius: 50%; display: grid;
  place-content: center; text-align: center;
  background: radial-gradient(#0f1840 58%, transparent 60%),
              conic-gradient(#22c55e 84%, rgba(255,255,255,.15) 0); }
.hiw-ring b { font-size: 24px; line-height: 1; }
.hiw-ring small { font-size: 10px; color: #b8c2d8; }
.hiw-feedback ul { margin: 0; padding: 0; list-style: none; display: grid; gap: 6px;
  font-weight: 600; font-size: 13px; text-align: left; }
.hiw-feedback li { color: #86efac; }
 
.hiw-chart { width: 230px; }
.hiw-bars { display: flex; align-items: flex-end; gap: 10px; height: 84px; }
.hiw-bars i { flex: 1; border-radius: 6px 6px 2px 2px;
  background: linear-gradient(#60a5fa, #8038ec); }
.hiw-trend { display: block; margin-top: 10px; color: #86efac; font-weight: 600; font-size: 13px; }
 
.hiw-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 36px 28px;
}

.hiw-step,
.hiw-step:nth-child(4),
.hiw-step:nth-child(5) {
    grid-column: auto;
}
@media (max-width: 620px) {
  .hiw { padding: 56px 20px; }
  .hiw-grid { grid-template-columns: 1fr; }
}
`;


    return (
        <>
            <section className="hero" id="home">
                <div className="hero-left">
                    <h1>
                        Ace Your <span>AI Interview</span>
                    </h1>

                    <p>
                        Practice AI-powered interviews, analyze your resume,
                        improve communication skills and get instant feedback
                        to crack your dream job.
                    </p>

                   <button
    className="start-btn"
    onClick={() => {
        const token = localStorage.getItem("token");

        if (token) {
            navigate("/dashboard");
        } else {
            navigate("/register");
        }
    }}
>
    Get Started
</button>
                </div>
            </section>

            <section className="features" id="features">
                <h2>Why Choose AI Interview Bot?</h2>

                <div className="feature-grid">
                    {features.map((feature) => (
                        <button
                            type="button"
                            key={feature.title}
                            className="feature-card"
                            onClick={feature.action}
                            aria-label={`Open ${feature.title}`}
                        >
                            <div className="feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.desc}</p>
                        </button>
                    ))}
                </div>
            </section>

            <section className="resume-section" id="resume-analyzer">
                <div className="resume-left">
                    <h2>AI Resume Analyzer</h2>

                    <p>
                        Upload your resume and receive an AI-generated
                        ATS-style score with intelligent suggestions to
                        improve your chances of getting shortlisted.
                    </p>

                    <ul>
                        <li>✔ ATS-style Resume Score</li>
                        <li>✔ Potential Missing Skills</li>
                        <li>✔ Formatting Feedback</li>
                        <li>✔ Keyword Matching</li>
                        <li>✔ Resume Summary</li>
                    </ul>

                    <label htmlFor="resume-job-role">
                        Target Job Role (optional)
                    </label>

                    <input
                        id="resume-job-role"
                        type="text"
                        value={jobRole}
                        onChange={(event) => setJobRole(event.target.value)}
                        placeholder="e.g. React Developer"
                        className="resume-role-input"
                    />

                    <input
                        ref={resumeInputRef}
                        type="file"
                        accept=".pdf,.docx"
                        onChange={handleResumeSelection}
                        hidden
                    />

                    <button
                        type="button"
                        className="upload-btn"
                        disabled={loadingResume}
                        onClick={() => resumeInputRef.current?.click()}
                    >
                        {loadingResume
                            ? "Analyzing Resume..."
                            : "Upload Resume"}
                    </button>

                    {loadingResume && (
                        <p role="status">
                            Uploading your resume and getting AI feedback.
                            Please wait...
                        </p>
                    )}

                    {resumeError && (
                        <p
                            role="alert"
                            style={{
                                color: "#ff6b6b",
                                overflowWrap: "anywhere",
                            }}
                        >
                            {resumeError}
                        </p>
                    )}
                </div>

                <div className="resume-right">
                    <div className="resume-card">
                        <h3>ATS Resume Score</h3>

                        <div className="score-circle">
                            {resumeAnalysis
                                ? `${resumeAnalysis.ats_score}%`
                                : "--"}
                        </div>

                        <p>
                            {resumeAnalysis
                                ? "AI-generated ATS-style estimate"
                                : "Upload your resume to see your score"}
                        </p>

                        {resumeAnalysis && (
                            <div className="resume-results">
                                <h3>Resume Summary</h3>
                                <p>{resumeAnalysis.resume_summary}</p>

                                <h3>Strengths</h3>
                                <ul>
                                    {resumeAnalysis.strengths.map(
                                        (item, index) => (
                                            <li key={index}>{item}</li>
                                        )
                                    )}
                                </ul>

                                <h3>Potential Skill Gaps</h3>
                                <ul>
                                    {resumeAnalysis.missing_skills.map(
                                        (item, index) => (
                                            <li key={index}>{item}</li>
                                        )
                                    )}
                                </ul>

                                <h3>Suggested Improvements</h3>
                                <ul>
                                    {resumeAnalysis.improvements.map(
                                        (item, index) => (
                                            <li key={index}>{item}</li>
                                        )
                                    )}
                                </ul>

                                <h3>Matched Keywords</h3>
                                <ul>
                                    {resumeAnalysis.keyword_match.map(
                                        (item, index) => (
                                            <li key={index}>{item}</li>
                                        )
                                    )}
                                </ul>

                                <h3>Formatting Feedback</h3>
                                <p>{resumeAnalysis.formatting_feedback}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="hiw" id="how-it-works">
            <style>{CSS}</style>

            <div className="hiw-inner">
                <p className="hiw-eyebrow">How it works</p>
                <h2 className="hiw-title">How an AI mock interview works</h2>

                <div className="hiw-grid">
                    {steps.map((step, index) => (
                        <article className="hiw-step" key={step.title}>
                            <div className="hiw-art">{step.art}</div>

                            <div className="hiw-head">
                                <span className="hiw-num">{index + 1}</span>
                                <h3>{step.title}</h3>
                            </div>

                            <p className="hiw-desc">{step.desc}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>



            <section className="categories" id="categories">
                <h2>Interview Categories</h2>

                <div className="category-grid">
                    {categories.map((item) => (
                        <button
                            type="button"
                            className="category-card"
                            key={item}
                            onClick={() =>
                                navigate("/create-interview", {
                                    state: { category: item },
                                })
                            }
                            title={`Practice ${item} interview questions`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </section>
 <section className="dashboard-preview" id="dashboard-preview">
                <h2>Progress Dashboard Preview</h2>

                <div className="dashboard-grid">
                    {[
                        ["15", "Interviews Completed"],
                        ["89%", "Average Score"],
                        ["12", "Current Streak"],
                        ["Sample", "Resume Score"],
                        ["React", "Best Skill"],
                        ["SQL", "Needs Improvement"],
                    ].map(([value, label]) => (
                        <button
                            type="button"
                            className="dashboard-card"
                            key={label}
                            onClick={() => navigate("/dashboard")}
                        >
                            <h3>{value}</h3>
                            <p>{label}</p>
                        </button>
                    ))}
                </div>
            </section>

            <section className="feedback-preview" id="feedback">
                <h2>AI Feedback Preview</h2>

                <div className="feedback-container">
                    <div className="question-box">
                        <h3>Interview Question</h3>
                        <p>Explain the Virtual DOM in React.</p>
                    </div>

                    <div className="answer-box">
                        <h3>Your Answer</h3>
                        <p>
                            Virtual DOM is a lightweight copy of the real DOM
                            that React uses to efficiently update changed elements.
                        </p>
                    </div>

                    <div className="feedback-box">
                        <h3>Sample AI Feedback</h3>
                        <p>
                            Excellent explanation. Try adding examples for
                            better clarity.
                        </p>

                        <div className="score-list">
                            <div>Technical <span>92%</span></div>
                            <div>Communication <span>88%</span></div>
                            <div>Confidence <span>90%</span></div>
                            <div>Overall <span>90%</span></div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
   
export default Home;
