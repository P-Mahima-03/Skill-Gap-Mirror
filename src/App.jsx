import { useState } from 'react'
import './App.css'

const topicSuggestions = {
  'Java Basics': 'Revise variables, data types, and Java syntax.',
  'Data Types': 'Practice primitive data types and type casting.',
  'OOP': 'Learn inheritance, encapsulation, abstraction, and polymorphism.',
  'Strings': 'Practice String methods and StringBuilder.',
  'Loops': 'Solve problems using for, while, and do-while loops.',
  'Collections': 'Study ArrayList, HashSet, and HashMap.',
  'Exception Handling': 'Practice try, catch, finally, and exceptions.',
  'Operators': 'Revise arithmetic, relational, and logical operators.'
}

function DailyLearningStreak() {
  const getDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [activeDays, setActiveDays] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("skillGapActiveDays")
      ) || [];
    } catch {
      return [];
    }
  });

  const today = new Date();
  const todayKey = getDateKey(today);
  const completedToday = activeDays.includes(todayKey);

  function completeLearning() {
    if (completedToday) return;

    const updatedDays = [...new Set([...activeDays, todayKey])];
    setActiveDays(updatedDays);
    localStorage.setItem(
      "skillGapActiveDays",
      JSON.stringify(updatedDays)
    );
  }

  const sortedDays = [...new Set(activeDays)].sort();
  let streak = 0;
  const checkDate = new Date(today);

  if (!completedToday) {
    checkDate.setDate(checkDate.getDate() - 1);
  }

  while (sortedDays.includes(getDateKey(checkDate))) {
    streak++;
    checkDate.setDate(checkDate.getDate() - 1);
  }

  const monday = new Date(today);
  const day = monday.getDay();
  monday.setDate(monday.getDate() - (day === 0 ? 6 : day - 1));

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  
  return (
    <section className="dashboard-section">
      <h2>🔥 Daily Streak</h2>
      <p>🔥 {streak} day streak</p>
      <p>
        {completedToday
          ? "Today's learning completed! 🎉"
          : "Have you learned today?"}
      </p>
      <button
  className="start-btn"
  onClick={completeLearning}
  disabled={completedToday}
>
  {completedToday
    ? "✓ Completed for Today"
    : "I Completed Today's Learning"}
</button>
    </section>
  );
}

const questions = [
  { topic: 'Java Basics', question: 'Which keyword is used to create a class in Java?', options: ['function', 'class', 'define', 'struct'], answer: 1 },
  { topic: 'Data Types', question: 'Which of these is a primitive data type in Java?', options: ['String', 'Integer', 'boolean', 'ArrayList'], answer: 2 },
  { topic: 'OOP', question: 'Which concept allows a class to acquire properties of another class?', options: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction'], answer: 1 },
  { topic: 'Strings', question: 'Which method is used to find the length of a String?', options: ['size()', 'count()', 'length()', 'length'], answer: 2 },
  { topic: 'Loops', question: 'Which loop executes its body at least once?', options: ['for', 'while', 'do-while', 'enhanced for'], answer: 2 },
  { topic: 'Collections', question: 'Which collection stores unique elements?', options: ['ArrayList', 'HashSet', 'LinkedList', 'Array'], answer: 1 },
  { topic: 'Exception Handling', question: 'Which block is generally used to handle an exception?', options: ['try-catch', 'if-else', 'for-while', 'switch-case'], answer: 0 },
  { topic: 'OOP', question: 'What is the process of hiding internal implementation details called?', options: ['Inheritance', 'Compilation', 'Abstraction', 'Iteration'], answer: 2 },
  { topic: 'Java Basics', question: 'Which method is the usual entry point of a Java application?', options: ['start()', 'run()', 'main()', 'init()'], answer: 2 },
  { topic: 'Operators', question: 'What is the result of 10 % 3 in Java?', options: ['3', '1', '0', '3.33'], answer: 1 },
]

const topicRoadmaps = {
  'Java Basics': [
    'Revise variables and Java syntax',
    'Practice data types and operators',
    'Solve 5 beginner Java questions'
  ],
  'Data Types': [
    'Learn primitive and non-primitive types',
    'Practice type casting',
    'Write small programs using different data types'
  ],
  'OOP': [
    'Understand classes and objects',
    'Practice inheritance and encapsulation',
    'Learn abstraction and polymorphism'
  ],
  'Strings': [
    'Learn common String methods',
    'Practice StringBuilder',
    'Solve 5 string coding problems'
  ],
  'Loops': [
    'Revise for, while and do-while loops',
    'Practice nested loops',
    'Solve pattern-printing problems'
  ],
  'Collections': [
    'Learn ArrayList and LinkedList',
    'Understand HashSet and HashMap',
    'Practice collection-based problems'
  ],
  'Exception Handling': [
    'Understand try and catch',
    'Learn finally and throw/throws',
    'Practice exception-handling programs'
  ],
  'Operators': [
    'Revise arithmetic and relational operators',
    'Practice logical operators',
    'Solve expression-based Java questions'
  ]
};


function App() {
  const [page, setPage] = useState('home')
  const [targetRole, setTargetRole] = useState('Java Developer')
  const [accountType, setAccountType] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [score, setScore] = useState(0)
  
const [completedSteps, setCompletedSteps] = useState({});


  function openAuth(type) {
    setAccountType(type)
    setShowPassword(false)
    setPage('auth')
  }

  function startAssessment() {
    setCurrent(0)
    setAnswers({})
    setPage('assessment')
  }

  function submitAssessment() {
    const result = questions.reduce(
      (total, q, index) => total + (answers[index] === q.answer ? 1 : 0), 0
    )
    setScore(result)
    setPage('results')
  }

  function handleAuth(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const password = form.get('password')
    if (accountType === 'register' && password !== form.get('confirmPassword')) {
      alert('Passwords do not match. Please try again.')
      return
    }
    setName(accountType === 'register' ? form.get('fullName') : form.get('email').split('@')[0])
    alert('Frontend demo only. Real account authentication will be added with the backend.')
  }

  if (page === 'auth') {
    return (
      <div className="auth-page">
        <nav className="navbar">
          <h2 className="brand" onClick={() => setPage('home')}>SkillGap<span>Mirror</span></h2>
          <button className="back-btn" onClick={() => setPage('home')}>← Home</button>
        </nav>
        <main className="auth-layout">
          <section className="auth-intro">
            <p className="tag">YOUR SKILLS. YOUR FUTURE.</p>
            <h1>Your next chapter <span>starts here.</span></h1>
            <p>Discover your strengths, understand your skill gaps, and move closer to your dream career.</p>
            <div className="auth-benefit">✦ Track your skills and progress</div>
            <div className="auth-benefit">✦ Find topics to improve</div>
            <div className="auth-benefit">✦ Build your learning roadmap</div>
          </section>
          <section className="auth-card">
            <div className="auth-tabs">
              <button className={accountType === 'login' ? 'active' : ''} onClick={() => openAuth('login')}>Login</button>
              <button className={accountType === 'register' ? 'active' : ''} onClick={() => openAuth('register')}>Register</button>
            </div>
            <h2>{accountType === 'login' ? 'Welcome back!' : 'Create your account'}</h2>
            <p className="auth-subtitle">Continue your learning journey.</p>
            <form onSubmit={handleAuth}>
              {accountType === 'register' && (
                <label>Full Name<input name="fullName" placeholder="Enter your full name" required /></label>
              )}
              <label>Email Address<input name="email" type="email" placeholder="you@example.com" required /></label>
              <label>Password
                <div className="password-field">
                  <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Enter password" minLength={6} required />
                  <button type="button" className="show-password" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</button>
                </div>
              </label>
              {accountType === 'register' && (
                <label>Confirm Password<input name="confirmPassword" type="password" placeholder="Re-enter password" minLength={6} required /></label>
              )}
              <button className="start-btn auth-submit" type="submit">{accountType === 'login' ? 'Login →' : 'Create Account →'}</button>
            </form>
            <p className="auth-switch">
              {accountType === 'login' ? 'New here? ' : 'Already registered? '}
              <button onClick={() => openAuth(accountType === 'login' ? 'register' : 'login')}>{accountType === 'login' ? 'Register' : 'Login'}</button>
            </p>
            <p className="demo-note">Frontend demo. Accounts are not stored yet.</p>
          </section>
        </main>
      </div>
    )
  }

  if (page === 'assessment') {
    const q = questions[current]
    const chosen = answers[current]
    return (
      <div className="assessment-page">
        <nav className="navbar">
          <h2 className="brand" onClick={() => setPage('home')}>SkillGap<span>Mirror</span></h2>
          <button className="back-btn" onClick={() => setPage('home')}>Exit Assessment</button>
        </nav>
        <main className="quiz-wrap">
          <div className="quiz-top">
            <div><p className="tag">SKILL ASSESSMENT</p><h1>Java Fundamentals</h1></div>
            <span className="question-count">Question {current + 1} of {questions.length}</span>
          </div>
          <div className="quiz-progress"><div style={{ width: `${((current + 1) / questions.length) * 100}%` }} /></div>
          <section className="quiz-card">
            <span className="topic-pill">{q.topic}</span>
            <h2>{q.question}</h2>
            <p className="quiz-hint">Choose one correct answer.</p>
            <div className="options-list">
              {q.options.map((option, index) => (
                <button key={option} className={`option ${chosen === index ? 'selected' : ''}`} onClick={() => setAnswers({ ...answers, [current]: index })}>
                  <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                  <span>{option}</span>
                  {chosen === index && <span className="option-check">✓</span>}
                </button>
              ))}
            </div>
            <div className="quiz-actions">
              <button className="back-btn" disabled={current === 0} onClick={() => setCurrent(current - 1)}>← Previous</button>
              {current < questions.length - 1 ? (
                <button className="start-btn" onClick={() => setCurrent(current + 1)}>Next Question →</button>
              ) : (
                <button className="start-btn" onClick={submitAssessment}>Submit Assessment ✓</button>
              )}
            </div>
          </section>
          <p className="quiz-footnote">Your answers are held in this page until you submit. Database storage will be added later.</p>
        </main>
      </div>
    )
  }
  if (page === 'dashboard') {
    
const weakTopics = [
  ...new Set(
    questions
      .filter((q, i) => answers[i] !== q.answer)
      .map(q => q.topic)
  )
];

const totalRoadmapSteps = weakTopics.reduce(
  (total, topic) =>
    total + (topicRoadmaps[topic] || [
      'Revise this topic',
      'Practise related questions',
      'Test your knowledge again'
    ]).length,
  0
);

const completedRoadmapSteps = weakTopics.reduce(
  (total, topic) => {
    const steps = topicRoadmaps[topic] || [
      'Revise this topic',
      'Practise related questions',
      'Test your knowledge again'
    ];

    return total + steps.filter(
      (_, index) => completedSteps[`${topic}-${index}`]
    ).length;
  },
  0
);

const overallProgress = totalRoadmapSteps > 0
  ? Math.round(
      (completedRoadmapSteps / totalRoadmapSteps) * 100
    )
  : 0;

    return (
      <div className="assessment-page">
        <h1>My Skill Gap Dashboard</h1>
        <h2>Welcome, {name || 'Learner'}!</h2>
      

        <div className="dashboard-grid">
  <div className="dashboard-card">
    <span>Assessment Score</span>
    <h2>{score * 10}%</h2>
    <p>Your Java fundamentals score</p>
  </div>
  

  <div className="dashboard-card">
    <span>Correct Answers</span>
    <h2>{score}/10</h2>
    <p>Correct answers in your assessment</p>
  </div>

  <div className="dashboard-card">
    <span>Target Career</span>
    <h2>{targetRole}</h2>
    <p>Your career goal</p>
  </div>
</div>
<DailyLearningStreak />


<section className="dashboard-section">
  <h2>🎯 Your Skill Gap Analysis</h2>
  <p>
    Review your assessment performance and identify topics to improve.
  </p>

  {[
    ...new Set(
      questions
        .filter((q, i) => answers[i] !== q.answer)
        .map(q => q.topic)
    )
  ].length > 0 ? (
    <div className="topic-chips">
      {[
        ...new Set(
          questions
            .filter((q, i) => answers[i] !== q.answer)
            .map(q => q.topic)
        )
      ].map(topic => (
        <span key={topic}>{topic}</span>
      ))}
    </div>
  ) : (
    <p>Excellent! No skill gaps were found in this assessment.</p>
  )}
  
<h3>📚 Improve Your Weak Topics</h3>

{[
  ...new Set(
    questions
      .filter((q, i) => answers[i] !== q.answer)
      .map(q => q.topic)
  )
].map(topic => (
  <div className="suggestion-card" key={topic}>
    <h4>{topic}</h4>
    <p>
      {topicSuggestions[topic] ||
        'Revise this topic and practise related questions.'}
    </p>
  </div>
))}

<h3>🗺️ Your Learning Roadmap</h3>
<p>Complete each step and track your learning progress.</p>

{[
  ...new Set(
    questions
      .filter((q, i) => answers[i] !== q.answer)
      .map(q => q.topic)
  )
].map(topic => {
  const steps = topicRoadmaps[topic] || [
    'Revise this topic',
    'Practise related questions',
    'Test your knowledge again'
  ];

  const completed = steps.filter(
    (_, index) => completedSteps[`${topic}-${index}`]
  ).length;
  const isCompleted = completed === steps.length;

  return (
    <div className="suggestion-card" key={topic}>
      
<h4>
  🎯 {topic}
  {isCompleted && (
    <span className="completed-badge">Completed 🎉</span>
  )}
</h4>

     
<div className="roadmap-progress-info">
  <span>{completed} of {steps.length} steps completed</span>
  <strong>
    {Math.round((completed / steps.length) * 100)}%
  </strong>
</div>


      <div className="roadmap-progress">
        <div
          style={{
            width: `${(completed / steps.length) * 100}%`
          }}
        />
      </div>

      <ol>
        {steps.map((step, index) => {
          const stepKey = `${topic}-${index}`;

          return (
            <li key={stepKey}>
              <label className="roadmap-step">
                <input
                  type="checkbox"
                  checked={!!completedSteps[stepKey]}
                  onChange={e =>
                    setCompletedSteps(previous => ({
                      ...previous,
                      [stepKey]: e.target.checked
                    }))
                  }
                />
                <span>{step}</span>
              </label>
            </li>
          );
        })}
      </ol>
    </div>
  );
})}




  <h3>Recommended Next Step</h3>
  <p>
    Revise the topics listed above and practise more Java questions
    to strengthen your fundamentals.
  </p>
  


</section>


        <button
    className="back-btn"
    onClick={() => setPage('home')}
  >
    ← Back to Home
  </button>

  <button
    className="start-btn"
    onClick={startAssessment}
  >
    Retake Assessment ↻
  </button>
        
      </div>
    )
  }
  if (page === 'results') {
    const percentage = score * 10
    const level = percentage >= 80 ? 'Strong foundation' : percentage >= 50 ? 'Developing skills' : 'Beginner'
    const incorrectTopics = [...new Set(questions.filter((q, i) => answers[i] !== q.answer).map(q => q.topic))]
    return (
      <div className="assessment-page">
        <nav className="navbar">
          <h2 className="brand" onClick={() => setPage('home')}>SkillGap<span>Mirror</span></h2>
          <button className="back-btn" onClick={() => setPage('home')}>Home</button>
        </nav>
        <main className="results-wrap">
          <p className="tag">ASSESSMENT COMPLETED</p>
          <h1>Your Java Skill Report</h1>
          <p className="results-subtitle">Nice work{name ? `, ${name}` : ''}! Every assessment is a chance to learn.</p>
          <section className="result-score">
            <div className="score-circle"><strong>{percentage}%</strong><span>Score</span></div>
            <div><span className="topic-pill">{level}</span><h2>{score} out of {questions.length} correct</h2><p>Use this result to decide what to practise next.</p></div>
          </section>
          <section className="recommendations">
            <h2>Your improvement plan</h2>
            {incorrectTopics.length ? (
              <>
                <p>Focus on these topics based on the answers you missed:</p>
                <div className="topic-chips">{incorrectTopics.map(topic => <span key={topic}>{topic}</span>)}</div>
              </>
            ) : <p>Excellent! You answered all questions correctly. Try a more advanced Java assessment next.</p>}
            <button className="start-btn" onClick={startAssessment}>Retake Assessment ↻</button>
            <button
            className="start-btn"
            onClick={() => setPage('dashboard')}
>
            View My Dashboard →
            </button>
            <button className="back-btn result-home" onClick={() => setPage('home')}>Back to Home</button>
          </section>
          <p className="demo-note">This is an introductory demo assessment, not a formal certification.</p>
        </main>
      </div>
    )
  }

  return (
    <div className="app">
      <nav className="navbar">
        <h2 className="brand">SkillGap<span>Mirror</span></h2>
        <div className="nav-links">
          <a href="#features">Features</a><a href="#about">About</a>
          <button className="login-btn" onClick={() => openAuth('login')}>Login</button>
          <button className="start-btn nav-register" onClick={() => openAuth('register')}>Get Started</button>
        </div>
      </nav>
      <main className="hero">
        <div className="hero-content">
          <p className="tag">YOUR SKILLS. YOUR FUTURE.</p>
          <h1>Discover Your Skill Gaps.<br /><span>Build Your Future.</span></h1>
          <p className="description">Assess your current skills, discover what you need to improve, and follow a personalized roadmap to reach your career goals.</p>
          <button className="start-btn" onClick={startAssessment}>Start Your Assessment →</button>
          <p className="note">Learn smarter. Grow faster. Achieve more.</p>
        </div>
        <div className="hero-card">
          <div className="card-heading"><span>My Skill Overview</span><span className="status">● Beginner</span></div>
          <div className="skill"><div className="skill-info"><span>Java</span><span>65%</span></div><div className="progress"><div style={{ width: '65%' }} /></div></div>
          <div className="skill"><div className="skill-info"><span>SQL</span><span>45%</span></div><div className="progress"><div style={{ width: '45%' }} /></div></div>
          <div className="skill"><div className="skill-info"><span>Problem Solving</span><span>30%</span></div><div className="progress"><div style={{ width: '30%' }} /></div></div>
          <div className="roadmap"><span>✦</span><div><strong>Your next step</strong><p>Practice Java fundamentals</p></div></div>
          <p className="sample">Sample data for preview</p>
        </div>
      </main>
      <section className="features" id="features">
        <h2>Your growth, one step at a time.</h2><p>Everything you need to understand and improve your skills.</p>
        <div className="feature-grid">
          <article><span>📊</span><h3>Skill Assessment</h3><p>Test your knowledge and understand your current skill level.</p></article>
          <article><span>🎯</span><h3>Gap Analysis</h3><p>Identify the skills you need to improve for your target role.</p></article>
          <article id="about"><span>🚀</span><h3>Learning Roadmap</h3><p>Follow clear steps to move closer to your career goals.</p></article>
        </div>
      </section>
    </div>
  )
}

export default App