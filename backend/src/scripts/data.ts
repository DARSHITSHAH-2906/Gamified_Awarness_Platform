export default [
    {
        id: 'rti',
        title: "Right to Information",
        description: "Learn how to access public information.",
        themeColor: "#3b82f6",
        bgGradient: "from-blue-50/50 to-blue-100/30",
        order: 1,
        levels: [
            {
                levelId: "101",
                title: "Quest Begins",
                x: 50, y: 10,
                games: {
                    drag: [
                        { q: "Full Form", options: ["Right to Information", "Right to Internet", "Right to Income"], a: ["Right to Information"] },
                        { q: "Who asks?", options: ["Citizen", "President", "Alien"], a: ["Citizen"] }
                    ],
                    situation: [
                        { q: "Denied info?", a: "It is your right" },
                        { q: "Why RTI?", a: "To know truth" }
                    ],
                    tap: [
                        { q: "Is RTI a law?", a: "Yes" },
                        { q: "Who owns info?", a: "Public" }
                    ],
                    story: [
                        { q: "Ravi asks question", a: "Files RTI" },
                        { q: "Wants transparency", a: "Uses Right" }
                    ],
                    time: [
                        { q: "Tap RTI terms", a: ["Transparency", "Accountability", "Citizen"] },
                        { q: "Tap goals", a: ["Truth", "Justice"] }
                    ]
                }
            },
            {
                levelId: "102",
                title: "The Filing",
                x: 25, y: 30,
                games: {
                    drag: [
                        { q: "Application to", options: ["Public Info Officer", "Police", "Judge"], a: ["Public Info Officer"] },
                        { q: "Fee", options: ["Nominal Amount", "One Million", "Free"], a: ["Nominal Amount"] }
                    ],
                    situation: [
                        { q: "No form found", a: "Use plain paper" },
                        { q: "Officer refuses", a: "Send by post" }
                    ],
                    tap: [
                        { q: "Time limit?", a: "30 Days" },
                        { q: "Life & Liberty?", a: "48 Hours" }
                    ],
                    story: [
                        { q: "Anita writes letter", a: "Submits RTI" },
                        { q: "Pays fee", a: "Gets receipt" }
                    ],
                    time: [
                        { q: "Tap process", a: ["Draft", "Pay Fee", "Submit"] },
                        { q: "Tap essentials", a: ["Name", "Address", "Details"] }
                    ]
                }
            },
            {
                levelId: "103",
                title: "Bureaucracy",
                x: 75, y: 50,
                games: {
                    drag: [
                        { q: "No reply?", options: ["First Appeal", "Cry", "Forget it"], a: ["First Appeal"] },
                        { q: "Authority", options: ["Senior Officer", "Clerk", "Peon"], a: ["Senior Officer"] }
                    ],
                    situation: [
                        { q: "Rejected wrongly", a: "File Appeal" },
                        { q: "Delay tactics", a: "Complain" }
                    ],
                    tap: [
                        { q: "Appeal time?", a: "30 Days" },
                        { q: "Can they hide info?", a: "Only exceptions" }
                    ],
                    story: [
                        { q: "Files disappear", a: "Demand inquiry" },
                        { q: "Officer sleeps", a: "Wake up call (Appeal)" }
                    ],
                    time: [
                        { q: "Tap actions", a: ["Appeal", "Complain", "Remind"] },
                        { q: "Tap hierarchy", a: ["PIO", "First Appellate", "Commission"] }
                    ]
                }
            },
            {
                levelId: "104",
                title: "Transparency",
                x: 35, y: 70,
                games: {
                    drag: [
                        { q: "Records", options: ["Open to Public", "Top Secret", "Burned"], a: ["Open to Public"] },
                        { q: "Corruption", options: ["Exposed", "Hidden", "Ignored"], a: ["Exposed"] }
                    ],
                    situation: [
                        { q: "Road funds", a: "Check Tender" },
                        { q: "School lunch", a: "Check Menu" }
                    ],
                    tap: [
                        { q: "Is secrecy good?", a: "No" },
                        { q: "Helps democracy?", a: "Yes" }
                    ],
                    story: [
                        { q: "Village checks logs", a: "Finds ghost workers" },
                        { q: "Student asks marks", a: "Gets copy" }
                    ],
                    time: [
                        { q: "Tap benefits", a: ["Honesty", "Trust", "Efficiency"] },
                        { q: "Tap tools", a: ["File Inspection", "Certified Copy"] }
                    ]
                }
            },
            {
                levelId: "105",
                title: "Knowledge Power",
                x: 65, y: 90,
                games: {
                    drag: [
                        { q: "Information is", options: ["Power", "Weakness", "Noise"], a: ["Power"] },
                        { q: "Citizen is", options: ["King", "Slave", "Servant"], a: ["King"] }
                    ],
                    situation: [
                        { q: "Ration stopped", a: "RTI fixed it" },
                        { q: "Pension delayed", a: "RTI tracking" }
                    ],
                    tap: [
                        { q: "Changed lives?", a: "Many" },
                        { q: "Your duty?", a: "Stay informed" }
                    ],
                    story: [
                        { q: "Community unites", a: "Files joint RTI" },
                        { q: "Govt responds", a: "Fixes issue" }
                    ],
                    time: [
                        { q: "Tap results", a: ["Action", "Justice", "Equality"] },
                        { q: "Tap values", a: ["Truth", "Rights", "Freedom"] }
                    ]
                }
            },
        ]
    },
    {
        id: 'rtbn',
        title: "Right to Basic Needs",
        description: "Understand the fundamental rights to survival.",
        themeColor: "#10b981",
        bgGradient: "from-emerald-50/50 to-emerald-100/30",
        order: 2,
        levels: [
            { levelId: "201", title: "Water Crisis", x: 45, y: 10 },
            { levelId: "202", title: "Food Security", x: 80, y: 30 },
            { levelId: "203", title: "Shelter", x: 20, y: 50 },
            { levelId: "204", title: "Healthcare", x: 60, y: 70 },
            { levelId: "205", title: "Dignity", x: 40, y: 90 },
        ]
    },
    {
        id: 'rts',
        title: "Right to Speak",
        description: "Explore freedom of speech and expression.",
        themeColor: "#f59e0b",
        bgGradient: "from-amber-50/50 to-amber-100/30",
        order: 3,
        levels: [
            { levelId: "301", title: "Voice Up", x: 70, y: 10 },
            { levelId: "302", title: "Debate", x: 30, y: 30 },
            { levelId: "303", title: "Expression", x: 85, y: 50 },
            { levelId: "304", title: "The Press", x: 15, y: 70 },
            { levelId: "305", title: "Freedom", x: 50, y: 90 },
        ]
    },
    {
        id: 'identity-island',
        title: "Identity Island",
        description: "Discover the importance of your name and nationality.",
        themeColor: "#0ea5e9", // Sky Blue
        bgGradient: "from-sky-50/50 to-sky-100/30",
        order: 4,
        levels: [
            { levelId: "401", title: "Who Am I?", x: 20, y: 10 },
            { levelId: "402", title: "My Name", x: 60, y: 30 },
            { levelId: "403", title: "Citizenship", x: 85, y: 50 },
            { levelId: "404", title: "Belonging", x: 40, y: 70 },
            { levelId: "405", title: "My Roots", x: 15, y: 90 },
        ]
    },
    {
        id: 'family-forest',
        title: "Family Forest",
        description: "Grow in a loving and supportive environment.",
        themeColor: "#22c55e", // Green
        bgGradient: "from-green-50/50 to-green-100/30",
        order: 5,
        levels: [
            { levelId: "501", title: "Family Tree", x: 70, y: 10 },
            { levelId: "502", title: "Care & Love", x: 30, y: 30 },
            { levelId: "503", title: "Reunion", x: 10, y: 50 },
            { levelId: "504", title: "Support", x: 50, y: 70 },
            { levelId: "505", title: "Harmony", x: 80, y: 90 },
        ]
    },
    {
        id: 'health-haven',
        title: "Health Haven",
        description: "Learn about wellness, nutrition, and healthcare.",
        themeColor: "#ef4444", // Red
        bgGradient: "from-red-50/50 to-red-100/30",
        order: 6,
        levels: [
            { levelId: "601", title: "Checkup", x: 40, y: 10 },
            { levelId: "602", title: "Nutrition", x: 80, y: 30 },
            { levelId: "603", title: "Hygiene", x: 50, y: 50 },
            { levelId: "604", title: "Exercise", x: 20, y: 70 },
            { levelId: "605", title: "Wellbeing", x: 60, y: 90 },
        ]
    },
    {
        id: 'education-empire',
        title: "Education Empire",
        description: "Build your future through learning and school.",
        themeColor: "#eab308", // Yellow
        bgGradient: "from-yellow-50/50 to-yellow-100/30",
        order: 7,
        levels: [
            { levelId: "701", title: "School Day", x: 30, y: 10 },
            { levelId: "702", title: "Teachers", x: 70, y: 30 },
            { levelId: "703", title: "Library", x: 20, y: 50 },
            { levelId: "704", title: "Science Lab", x: 60, y: 70 },
            { levelId: "705", title: "Graduation", x: 90, y: 90 },
        ]
    },
    {
        id: 'equality-expanse',
        title: "Equality Expanse",
        description: "Understand fairness and non-discrimination.",
        themeColor: "#a855f7", // Purple
        bgGradient: "from-purple-50/50 to-purple-100/30",
        order: 8,
        levels: [
            { levelId: "801", title: "Fair Play", x: 50, y: 10 },
            { levelId: "802", title: "No Bullying", x: 20, y: 30 },
            { levelId: "803", title: "Inclusion", x: 80, y: 50 },
            { levelId: "804", title: "Respect", x: 40, y: 70 },
            { levelId: "805", title: "Unity", x: 60, y: 90 },
        ]
    },
    {
        id: 'privacy-peak',
        title: "Privacy Peak",
        description: "Protect your personal space and information.",
        themeColor: "#6366f1", // Indigo
        bgGradient: "from-indigo-50/50 to-indigo-100/30",
        order: 9,
        levels: [
            { levelId: "901", title: "My Diary", x: 75, y: 10 },
            { levelId: "902", title: "Online Safety", x: 35, y: 30 },
            { levelId: "903", title: "Secrets", x: 65, y: 50 },
            { levelId: "904", title: "Boundaries", x: 20, y: 70 },
            { levelId: "905", title: "Security", x: 50, y: 90 },
        ]
    },
    {
        id: "protection-paladin",
        title: "Protection Paladin",
        description: "Learn about safety from harm and exploitation.",
        themeColor: "#64748b",
        bgGradient: "from-slate-50/50 to-slate-100/30",
        order: 10,
        levels: [
            {
                levelId: "1001",
                title: "Safe Circle",
                x: 30, y: 10,
                games: {
                    drag: [
                        { q: "Drag people who keep you safe", options: ["Parent", "Teacher", "Police", "Stranger"], a: ["Parent", "Teacher", "Police"] },
                        { q: "Drag first helpers when scared", options: ["Parent", "Friend", "Stranger", "Teacher"], a: ["Parent", "Teacher"] }
                    ],
                    situation: [
                        { q: "Stranger offers gift to go with him", a: "Say no, tell adult" },
                        { q: "Neighbor asks you to hide a secret", a: "Tell a trusted adult" }
                    ],
                    tap: [
                        { q: "Who should you trust?", a: "Teacher" },
                        { q: "Best person to tell about danger?", a: "Parent" }
                    ],
                    story: [
                        { q: "Riya scared walking home", a: "Call trusted adult" },
                        { q: "Child feels followed", a: "Go to safe place, call adult" }
                    ],
                    time: [
                        { q: "Tap safe choices", a: ["Parents", "Friends", "Teacher"] },
                        { q: "Tap danger actions", a: ["Block stranger", "Go to crowd"] }
                    ]
                }
            },
            {
                levelId: "1002",
                title: "Say No",
                x: 70, y: 30,
                games: {
                    drag: [
                        { q: "Courage actions", a: ["Say No", "Tell teacher"] },
                        { q: "Safe reactions", a: ["Walk away", "Speak up"] }
                    ],
                    situation: [
                        { q: "Touched without permission", a: "Move away, tell adult" },
                        { q: "Forced to hug", a: "Say no, inform parent" }
                    ],
                    tap: [
                        { q: "Okay to say no to elders?", a: "Yes" },
                        { q: "Can you refuse if scared?", a: "Yes" }
                    ],
                    story: [
                        { q: "Cousin hugs forcefully", a: "Say no, inform" },
                        { q: "Friend pressures you", a: "Set boundary, tell adult" }
                    ],
                    time: [
                        { q: "Tap safety", a: ["Say No", "Walk away", "Tell adult"] },
                        { q: "Tap courage", a: ["Speak up", "Get help"] }
                    ]
                }
            },
            {
                levelId: "1003",
                title: "Help Line",
                x: 40, y: 50,
                games: {
                    drag: [
                        { q: "Match help", a: { Unsafe: "1098", Bullying: "Teacher" } },
                        { q: "Match threat", a: { "Online threat": "Parent", Lost: "Police" } }
                    ],
                    situation: [
                        { q: "Unsafe at home", a: "Call 1098" },
                        { q: "No adult nearby", a: "Call emergency help" }
                    ],
                    tap: [
                        { q: "Child danger number?", a: "1098" },
                        { q: "First help call?", a: "Parent/Teacher" }
                    ],
                    story: [
                        { q: "Alone and scared", a: "Call 1098" },
                        { q: "Hurt and locked", a: "Call helpline" }
                    ],
                    time: [
                        { q: "Tap support", a: ["1098", "Parent", "Teacher"] },
                        { q: "Tap emergency", a: ["Police", "Helpline"] }
                    ]
                }
            },
            {
                levelId: "1004",
                title: "Guardian",
                x: 80, y: 70,
                games: {
                    drag: [
                        { q: "Protectors", a: ["Parent", "Police", "Counselor"] },
                        { q: "School helpers", a: ["Teacher", "Principal"] }
                    ],
                    situation: [
                        { q: "Friend bullied", a: "Tell trusted adult" },
                        { q: "Online threat", a: "Report to adult" }
                    ],
                    tap: [
                        { q: "Guardian at school?", a: "Teacher" },
                        { q: "Who protects children?", a: "Police" }
                    ],
                    story: [
                        { q: "Rahul hides problem", a: "Speak to teacher" },
                        { q: "Child afraid", a: "Talk to counselor" }
                    ],
                    time: [
                        { q: "Tap helpers", a: ["Parents", "Teachers", "Police"] },
                        { q: "Tap protectors", a: ["Counselor", "Principal"] }
                    ]
                }
            },
            {
                levelId: "1005",
                title: "Shield",
                x: 50, y: 90,
                games: {
                    drag: [
                        { q: "Unsafe online", a: ["Share password"] },
                        { q: "Safe action", a: ["Block stranger"] }
                    ],
                    situation: [
                        { q: "Asked for photo", a: "Don’t send, tell adult" },
                        { q: "Unknown link", a: "Don’t click, report" }
                    ],
                    tap: [
                        { q: "Share passwords?", a: "No" },
                        { q: "Click unknown links?", a: "No" }
                    ],
                    story: [
                        { q: "Strange messages", a: "Block, report" },
                        { q: "Threat online", a: "Tell parent" }
                    ],
                    time: [
                        { q: "Tap cyber-safe", a: ["Block", "Report", "Tell parents"] },
                        { q: "Tap danger", a: ["Ignore message", "Log out"] }
                    ]
                }
            }
        ]
    },

    {
        id: "peace-pavilion",
        title: "Peace Pavilion",
        description: "Promote harmony and conflict resolution.",
        themeColor: "#0ea5e9",
        bgGradient: "from-cyan-50/50 to-cyan-100/30",
        order: 11,
        levels: [
            {
                levelId: "1101",
                title: "Calm Mind",
                x: 60, y: 10,
                games: {
                    drag: [
                        { q: "Calm", a: ["Breathe", "Count"] },
                        { q: "Relax", a: ["Walk away"] }
                    ],
                    situation: [
                        { q: "Angry", a: "Deep breaths" },
                        { q: "Upset", a: "Talk calmly" }
                    ],
                    tap: [
                        { q: "Best calm?", a: "Breathe" },
                        { q: "Anger control?", a: "Count to 10" }
                    ],
                    story: [
                        { q: "Angry in class", a: "Calm down" },
                        { q: "Frustrated", a: "Take break" }
                    ],
                    time: [
                        { q: "Tap calm", a: ["Breathe", "Sit"] },
                        { q: "Tap relax", a: ["Walk", "Drink water"] }
                    ]
                }
            },
            {
                levelId: "1102",
                title: "Dialogue",
                x: 20, y: 30,
                games: {
                    drag: [
                        { q: "Good talk", a: ["Listen", "Speak"] },
                        { q: "Respect", a: ["Polite words"] }
                    ],
                    situation: [
                        { q: "Pencil taken", a: "Talk calmly" },
                        { q: "Misunderstanding", a: "Explain" }
                    ],
                    tap: [
                        { q: "Best solution?", a: "Talk" },
                        { q: "Solve fight?", a: "Discuss" }
                    ],
                    story: [
                        { q: "Friends argue", a: "Talk" },
                        { q: "Team conflict", a: "Share views" }
                    ],
                    time: [
                        { q: "Tap peace", a: ["Talk", "Smile"] },
                        { q: "Tap calm", a: ["Listen"] }
                    ]
                }
            },
            {
                levelId: "1103",
                title: "Friendship",
                x: 80, y: 50,
                games: {
                    drag: [
                        { q: "Friendly", a: ["Share", "Help"] },
                        { q: "Kind", a: ["Support"] }
                    ],
                    situation: [
                        { q: "New student", a: "Sit with" },
                        { q: "Lonely", a: "Invite" }
                    ],
                    tap: [
                        { q: "Builds friendship?", a: "Kind words" },
                        { q: "Best friend act?", a: "Help" }
                    ],
                    story: [
                        { q: "Child lonely", a: "Include" },
                        { q: "Left out", a: "Support" }
                    ],
                    time: [
                        { q: "Tap kindness", a: ["Share"] },
                        { q: "Tap care", a: ["Help"] }
                    ]
                }
            },
            {
                levelId: "1104",
                title: "Tolerance",
                x: 40, y: 70,
                games: {
                    drag: [
                        { q: "Respect", a: ["Welcome"] },
                        { q: "Accept", a: ["Listen"] }
                    ],
                    situation: [
                        { q: "Different language", a: "Be kind" },
                        { q: "New culture", a: "Learn" }
                    ],
                    tap: [
                        { q: "Best reaction?", a: "Respect" },
                        { q: "Fair choice?", a: "Accept" }
                    ],
                    story: [
                        { q: "New culture", a: "Learn" },
                        { q: "Different habits", a: "Respect" }
                    ],
                    time: [
                        { q: "Tap respect", a: ["Welcome"] },
                        { q: "Tap tolerance", a: ["Listen"] }
                    ]
                }
            },
            {
                levelId: "1105",
                title: "Harmony",
                x: 70, y: 90,
                games: {
                    drag: [
                        { q: "Teamwork", a: ["Share"] },
                        { q: "Cooperation", a: ["Help"] }
                    ],
                    situation: [
                        { q: "Teams fight", a: "Take turns" },
                        { q: "Game clash", a: "Share time" }
                    ],
                    tap: [
                        { q: "Best solution?", a: "Share" },
                        { q: "Peace option?", a: "Compromise" }
                    ],
                    story: [
                        { q: "Playground issue", a: "Agree" },
                        { q: "Group fight", a: "Resolve" }
                    ],
                    time: [
                        { q: "Tap harmony", a: ["Share"] },
                        { q: "Tap teamwork", a: ["Help"] }
                    ]
                }
            }
        ]
    },

    {
        id: "justice-jungle",
        title: "Justice Jungle",
        description: "Stand up for what is right and fair.",
        themeColor: "#f97316",
        bgGradient: "from-orange-50/50 to-orange-100/30",
        order: 12,
        levels: [
            {
                levelId: "1201",
                title: "The Rules",
                x: 40, y: 10,
                games: {
                    drag: [
                        { q: "Fair", a: ["Wait"] },
                        { q: "Unfair", a: ["Cheat"] }
                    ],
                    situation: [
                        { q: "Rule broken", a: "Tell teacher" },
                        { q: "Cheating", a: "Report" }
                    ],
                    tap: [
                        { q: "Rules for?", a: "Safety" },
                        { q: "Why rules?", a: "Fairness" }
                    ],
                    story: [
                        { q: "Class rules", a: "Follow" },
                        { q: "New rule", a: "Respect" }
                    ],
                    time: [
                        { q: "Tap fair", a: ["Share"] },
                        { q: "Tap right", a: ["Wait turn"] }
                    ]
                }
            },
            {
                levelId: "1202",
                title: "Fair Trial",
                x: 80, y: 30,
                games: {
                    drag: [
                        { q: "Steps", a: ["Listen"] },
                        { q: "Process", a: ["Hear both"] }
                    ],
                    situation: [
                        { q: "Argument", a: "Listen both" },
                        { q: "Blame", a: "Check facts" }
                    ],
                    tap: [
                        { q: "First step?", a: "Listen" },
                        { q: "Fair start?", a: "Hear sides" }
                    ],
                    story: [
                        { q: "Broken window", a: "Teacher listens" },
                        { q: "Fight", a: "Judge fairly" }
                    ],
                    time: [
                        { q: "Tap fair", a: ["Listen"] },
                        { q: "Tap justice", a: ["Decide calmly"] }
                    ]
                }
            },
            {
                levelId: "1203",
                title: "Advocacy",
                x: 30, y: 50,
                games: {
                    drag: [
                        { q: "Brave", a: ["Speak up"] },
                        { q: "Support", a: ["Help friend"] }
                    ],
                    situation: [
                        { q: "Friend blamed", a: "Tell teacher" },
                        { q: "Bullying", a: "Report" }
                    ],
                    tap: [
                        { q: "Should you speak?", a: "Yes" },
                        { q: "Stay silent?", a: "No" }
                    ],
                    story: [
                        { q: "Treated unfairly", a: "Support" },
                        { q: "Wrong blame", a: "Speak" }
                    ],
                    time: [
                        { q: "Tap courage", a: ["Speak"] },
                        { q: "Tap help", a: ["Assist"] }
                    ]
                }
            },
            {
                levelId: "1204",
                title: "Rights",
                x: 70, y: 70,
                games: {
                    drag: [
                        { q: "Rights", a: ["Education"] },
                        { q: "Safety", a: ["Protection"] }
                    ],
                    situation: [
                        { q: "Forced work", a: "Report" },
                        { q: "Denied school", a: "Tell adult" }
                    ],
                    tap: [
                        { q: "Which is right?", a: "Education" },
                        { q: "Child needs?", a: "Safety" }
                    ],
                    story: [
                        { q: "Girl wants school", a: "Law helps" },
                        { q: "Child unsafe", a: "Rights apply" }
                    ],
                    time: [
                        { q: "Tap rights", a: ["School"] },
                        { q: "Tap safety", a: ["Protection"] }
                    ]
                }
            },
            {
                levelId: "1205",
                title: "Verdict",
                x: 50, y: 90,
                games: {
                    drag: [
                        { q: "Fair outcome", a: ["Guide"] },
                        { q: "Justice", a: ["Explain"] }
                    ],
                    situation: [
                        { q: "Mistake", a: "Explain" },
                        { q: "Accident", a: "Forgive & teach" }
                    ],
                    tap: [
                        { q: "Best justice?", a: "Fairness" },
                        { q: "Right action?", a: "Help learn" }
                    ],
                    story: [
                        { q: "Child errs", a: "Teacher guides" },
                        { q: "Wrong done", a: "Correct gently" }
                    ],
                    time: [
                        { q: "Tap fair", a: ["Explain"] },
                        { q: "Tap kind", a: ["Help"] }
                    ]
                }
            }
        ]
    },

    {
        id: "dream-domain",
        title: "Dream Domain",
        description: "Imagine a better future for every child.",
        themeColor: "#ec4899",
        bgGradient: "from-pink-50/50 to-pink-100/30",
        order: 13,
        levels: [
            {
                levelId: "1301",
                title: "My Hope",
                x: 25, y: 10,
                games: {
                    drag: [
                        { q: "Dreams", a: ["Teacher"] },
                        { q: "Goals", a: ["Doctor"] }
                    ],
                    situation: [
                        { q: "Wants future", a: "Study" },
                        { q: "Big dream", a: "Practice" }
                    ],
                    tap: [
                        { q: "Best support?", a: "Education" },
                        { q: "Grow dream?", a: "Learn" }
                    ],
                    story: [
                        { q: "Child dreams", a: "Keeps learning" },
                        { q: "Fails once", a: "Tries again" }
                    ],
                    time: [
                        { q: "Tap dream", a: ["Study"] },
                        { q: "Tap hope", a: ["Practice"] }
                    ]
                }
            },
            {
                levelId: "1302",
                title: "Innovation",
                x: 65, y: 30,
                games: {
                    drag: [
                        { q: "Ideas", a: ["Clean water"] },
                        { q: "Solutions", a: ["Recycle"] }
                    ],
                    situation: [
                        { q: "School problem", a: "Suggest" },
                        { q: "Dirty class", a: "Organize" }
                    ],
                    tap: [
                        { q: "Best action?", a: "Think & act" },
                        { q: "Solve issue?", a: "Plan" }
                    ],
                    story: [
                        { q: "Dirty class", a: "Cleanup" },
                        { q: "Broken tap", a: "Fix idea" }
                    ],
                    time: [
                        { q: "Tap innovation", a: ["Suggest"] },
                        { q: "Tap solution", a: ["Build"] }
                    ]
                }
            },
            {
                levelId: "1303",
                title: "Leadership",
                x: 90, y: 50,
                games: {
                    drag: [
                        { q: "Traits", a: ["Help"] },
                        { q: "Values", a: ["Listen"] }
                    ],
                    situation: [
                        { q: "Leader needed", a: "Be fair" },
                        { q: "Conflict", a: "Guide" }
                    ],
                    tap: [
                        { q: "Good leader?", a: "Serve" },
                        { q: "Real leader?", a: "Helps" }
                    ],
                    story: [
                        { q: "Monitor helps", a: "Happy class" },
                        { q: "Team lost", a: "Encourages" }
                    ],
                    time: [
                        { q: "Tap leader", a: ["Help"] },
                        { q: "Tap guide", a: ["Support"] }
                    ]
                }
            },
            {
                levelId: "1304",
                title: "Change",
                x: 35, y: 70,
                games: {
                    drag: [
                        { q: "Good change", a: ["Plant trees"] },
                        { q: "Clean", a: ["Pick litter"] }
                    ],
                    situation: [
                        { q: "Litter", a: "Clean" },
                        { q: "Waste", a: "Reduce" }
                    ],
                    tap: [
                        { q: "Best choice?", a: "Act kindly" },
                        { q: "Create change?", a: "Help" }
                    ],
                    story: [
                        { q: "Clean drive", a: "Others join" },
                        { q: "Save park", a: "Volunteers" }
                    ],
                    time: [
                        { q: "Tap change", a: ["Clean"] },
                        { q: "Tap good", a: ["Help"] }
                    ]
                }
            },
            {
                levelId: "1305",
                title: "Future",
                x: 75, y: 90,
                games: {
                    drag: [
                        { q: "Future habits", a: ["Save water"] },
                        { q: "Green", a: ["Recycle"] }
                    ],
                    situation: [
                        { q: "Food waste", a: "Share" },
                        { q: "Power waste", a: "Switch off" }
                    ],
                    tap: [
                        { q: "Best habit?", a: "Save resources" },
                        { q: "Future care?", a: "Protect" }
                    ],
                    story: [
                        { q: "Green city", a: "Children act" },
                        { q: "Clean earth", a: "Everyone helps" }
                    ],
                    time: [
                        { q: "Tap future", a: ["Save"] },
                        { q: "Tap protect", "a": ["Recycle"] }
                    ]
                }
            }
        ]
    }
];