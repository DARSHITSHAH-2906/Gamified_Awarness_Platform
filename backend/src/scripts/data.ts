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
                challenges: [
                    {
                        order: 1,
                        type: "story",
                        gameType: "story_video",
                        lawId: "law_rti",
                        title: "Meet Your Guide Character",
                        xp: 5,
                        videoScript: {
                            title: "Introduction to RTI",
                            duration: 60,
                            voiceOver: "Indian English - Female",
                            content: [
                                { timing: "0-5s", visual: "Animated girl (age 12) with question mark above head", script: "Hi! I'm Priya. Have you ever wondered... why does the government do what it does?" },
                                { timing: "5-15s", visual: "Scenes of government buildings, people voting, schools", script: "Like, why does MY school's lunch menu change? Or where does the city's money go? Well, there's a LAW for that." },
                                { timing: "15-25s", visual: "Animated document flying onto screen with glowing effect", script: "It's called the RIGHT TO INFORMATION - or RTI. And guess what? YOU can use it. Even at your age!" },
                                { timing: "25-40s", visual: "Priya pointing at 3 animated steps: Write → Send → Wait → Get Answer", script: "Here's how it works: You write a question, send it to the government, wait 30 days, and they MUST tell you!" },
                                { timing: "40-55s", visual: "Priya winking, animated badge appearing", script: "In this quest, you'll become an RTI expert just like me. You'll learn how to ask BIG questions about your city." },
                                { timing: "55-60s", visual: "Animated RTI badge, Priya smiling", script: "Ready to be a change-maker? Let's go!" }
                            ]
                        },
                        videoGeneration: {
                            tool: "Krikey AI",
                            character: "Priya (age 12, brown skin, Indian features, friendly)",
                            background: "Bright classroom with posters",
                            music: "Upbeat educational soundtrack",
                            subtitles: true,
                            textSize: "large",
                            colorScheme: "#3b82f6"
                        },
                        challenge: {
                            instruction: "Watch Priya's story about RTI. Then answer: What is RTI used for?",
                            options: [
                                { text: "To get information from the government", isCorrect: true, xp: 5 },
                                { text: "To change laws", isCorrect: false, xp: 1, feedback: "RTI isn't for changing laws - it's for transparency!" },
                                { text: "To complain to the government", isCorrect: false, xp: 1, feedback: "That's different. RTI is specifically for asking questions about public information." }
                            ]
                        },
                        reward: {
                            unlocks: "Priya as your guide character",
                            badge: "RTI Listener"
                        }
                    },
                    {
                        type: "drag_and_match",
                        gameType: "drag",
                        lawId: "law_rti",
                        title: "RTI Process: Put in Order",
                        order: 2,
                        difficulty: "easy",
                        xp: 8,
                        instruction: "Drag the steps in the RIGHT order to file an RTI",
                        items: [
                            { id: "drag_1", label: "I write my question on paper", correctPosition: 1, hint: "Start here: What do you want to know?", description: "You write clearly what information you need from which government office" },
                            { id: "drag_2", label: "I send it to the right office", correctPosition: 2, hint: "Now where does it go?", description: "Send your letter to the PUBLIC INFORMATION OFFICER of that office (usually via post or hand-delivery)" },
                            { id: "drag_3", label: "I wait for 30 days", correctPosition: 3, hint: "Be patient!", description: "The law gives the government 30 days maximum to give you the answer (45 days for very complex requests)" },
                            { id: "drag_4", label: "I get the information!", correctPosition: 4, hint: "Success!", description: "The office MUST give you the information or explain why they can't (for privacy/security reasons)" }
                        ],
                        rules: { allowRetries: true, showHintAfterSeconds: 30, shuffleOptions: true, showFeedback: "after_each_drop" },
                        feedback: {
                            allCorrect: "Perfect! You're an RTI process expert! 🎉 The key is: WRITE → SEND → WAIT → RECEIVE",
                            partiallyCorrect: "You're close! Let me help you think about the right order...",
                            incorrect: "Not quite! Remember: You first write what you want, then send it, wait, then get your answer. Try again!"
                        },
                        educationalContent: {
                            legalBasis: "RTI Act 2005, Section 6 - Filing of Request",
                            realWorldExample: "Priya wanted to know why her school's lunch supplier changed. She followed these exact steps and GOT the answer in 28 days!",
                            keyTakeaway: "The process is SIMPLE - anyone can do it!"
                        },
                        reward: { badge: "RTI Process Master", unlocksNextChallenge: true }
                    },
                    {
                        type: "scenario_choice",
                        gameType: "situation",
                        lawId: "law_rti",
                        title: "Can You Use RTI Here?",
                        order: 3,
                        difficulty: "medium",
                        xp: 10,
                        scenario: {
                            setup: "Your school principal says: 'I won't tell you how much money the school spent on the new computer lab. It's none of your business!'",
                            context: "This is a government school in your city",
                            question: "Can you file an RTI to get this information?",
                            character: "Priya (your guide)"
                        },
                        choices: [
                            {
                                id: "choice_yes",
                                answer: "YES! File RTI for the lab budget details",
                                isCorrect: true,
                                xp: 10,
                                feedback: {
                                    title: "🎉 Excellent Decision!",
                                    explanation: "Government schools receive PUBLIC money and are PUBLIC AUTHORITIES. School budgets are public information under RTI!",
                                    whyCorrect: "The Right to Information Act covers ALL government offices, including schools. Your tax money (through your parents) pays for the school, so you have the right to know how it's spent.",
                                    realWorldExample: "A girl in Delhi used RTI to find out her school was paying 3x normal price for books - and it got fixed!"
                                },
                                legalBasis: {
                                    act: "Right to Information Act, 2005",
                                    section: "Section 2(a) - Definition of 'Public Authority'",
                                    quote: "A public authority includes any government institution or body substantially financed by government",
                                    relevance: "Schools get government funding, so they're public authorities and subject to RTI"
                                },
                                nextStep: "Go ahead and draft your RTI letter! Would you like help writing it?"
                            },
                            {
                                id: "choice_no_private",
                                answer: "NO - schools are private so I can't ask",
                                isCorrect: false,
                                xp: 2,
                                feedback: {
                                    title: "Not quite right!",
                                    explanation: "Even though schools might FEEL private, government schools are actually public authorities because they use government money and resources.",
                                    whyIncorrect: "There's a difference between PRIVATE schools (only for rich kids) and GOVERNMENT schools (for everyone). Government schools belong to everyone, so you can ask questions about them!",
                                    learnMore: "If it was a private school, you'd be right. But government schools? They're public!"
                                }
                            },
                            {
                                id: "choice_only_adults",
                                answer: "NO - only adults can file RTI",
                                isCorrect: false,
                                xp: 1,
                                feedback: {
                                    title: "Actually, you CAN!",
                                    explanation: "The law says 'ANY CITIZEN' can file RTI. That includes kids!",
                                    whyIncorrect: "Most kids file RTI through their parents/guardians (since they're legally responsible), but the right belongs to everyone over 18, and even younger kids can participate with guardian help.",
                                    historical: "Many kids have successfully used RTI - like students who discovered their school's free meal scheme was being misused!"
                                }
                            },
                            {
                                id: "choice_costs_money",
                                answer: "NO - filing RTI costs money and my family can't afford it",
                                isCorrect: false,
                                xp: 1,
                                feedback: {
                                    title: "Great news - it's FREE!",
                                    explanation: "RTI is a FUNDAMENTAL RIGHT. It costs nothing to file!",
                                    whyIncorrect: "The government made RTI free on purpose - so everyone (even poor families) can ask for transparency.",
                                    bonus: "If they delay responding, that's illegal and you can file a complaint for FREE too!"
                                }
                            }
                        ],
                        reward: { badge: "RTI Scenario Expert", progressBar: "40% Complete - Great job!" },
                        followUp: {
                            ifCorrect: "Ready to write an actual RTI letter? Let's practice in the next challenge!",
                            ifIncorrect: "Let's dive deeper into RTI rules in the next challenge!"
                        }
                    },
                    {
                        type: "true_false_quiz",
                        gameType: "tap",
                        lawId: "law_rti",
                        title: "RTI Knowledge Check",
                        order: 4,
                        difficulty: "easy",
                        xp: 15, // Base XP
                        rules: { timePerQuestion: 20, totalDuration: 100, showScore: true, allowRetakes: true, passingScore: 75 },
                        questions: [
                            {
                                id: "q1",
                                question: "I can ask the government for ANY information I want, even if it's about someone else's private life",
                                correctAnswer: false,
                                correctXP: 3, incorrectXP: 1,
                                explanation: {
                                    ifTrue: "Almost! But there ARE limits. RTI doesn't cover PRIVATE information about specific people, only PUBLIC information about government work.",
                                    ifFalse: "Correct! RTI has limits. Information about: • Private details of citizens • National security secrets • Medical records of people • Trade secrets of businesses ...are NOT available through RTI",
                                    realExample: "You CAN ask 'How many people are in school X?' but you CANNOT ask 'What are Raj's grades?'"
                                }
                            },
                            {
                                id: "q2",
                                question: "The government MUST give me the information within 30 days or they break the law",
                                correctAnswer: true,
                                correctXP: 3, incorrectXP: 1,
                                explanation: {
                                    ifTrue: "YES! This is the LAW. If they delay, you can file a complaint and they get fined!",
                                    ifFalse: "Actually, they must! The 30-day deadline is in the RTI law. If they don't respond in time, that's illegal!",
                                    realExample: "If government takes 40 days to respond to your RTI without permission, you can complain to the INFORMATION COMMISSION"
                                }
                            },
                            {
                                id: "q3",
                                question: "Filing an RTI application needs to be in a special government form with fancy language",
                                correctAnswer: false,
                                correctXP: 3, incorrectXP: 1,
                                explanation: {
                                    ifTrue: "No way! RTI is supposed to be SIMPLE. You can write a simple letter in normal language!",
                                    ifFalse: "Correct! The whole point of RTI is that ANYONE can use it. You just need: • Your name • What you want to know (clearly) • Which office to send it to • That's it! No special form needed!",
                                    template: "Example: 'I want to know how many students attended my school in 2024 and what was spent on uniforms.'"
                                }
                            },
                            {
                                id: "q4",
                                question: "RTI helps stop corruption by making government work TRANSPARENT",
                                correctAnswer: true,
                                correctXP: 3, incorrectXP: 1,
                                explanation: {
                                    ifTrue: "EXACTLY! When people can ASK questions and GET answers, officials can't hide mistakes or theft!",
                                    ifFalse: "Actually it does! The whole idea of RTI is transparency = honesty. If officials know people can ask about their work, they're more careful and honest.",
                                    impact: "Studies show RTI has helped catch: fake billing, teacher absence fraud, stolen supplies, and more!"
                                }
                            },
                            {
                                id: "q5",
                                question: "You need to be rich or have connections to use RTI successfully",
                                correctAnswer: false,
                                correctXP: 3, incorrectXP: 1,
                                explanation: {
                                    ifTrue: "Absolutely not! RTI is for EVERYONE equally. Poor families use it just as much as rich ones!",
                                    ifFalse: "Correct! RTI is the GREAT EQUALIZER. A poor farmer can file the same RTI as a businessman. The law is fair to all!",
                                    proof: "Millions of Indians across all classes use RTI - farmers, students, homemakers, everyone!"
                                }
                            }
                        ],
                        scoring: {
                            perfect: { xp: 15, message: "Outstanding! You're an RTI expert! 🏆", badge: "RTI Knowledge Master" },
                            good: { xp: 10, message: "Great job! You understand RTI well!", badge: "RTI Apprentice" },
                            passing: { xp: 5, message: "Good start! Review the answers and try again if you'd like.", retakeOption: true },
                            failing: { xp: 2, message: "Let's review this together!", reviewOption: true }
                        },
                        reward: { nextChallenge: "Now practice writing a real RTI letter!" }
                    },
                    {
                        type: "reflection_story",
                        gameType: "story",
                        lawId: "law_rti",
                        title: "YOUR RTI Story",
                        order: 5,
                        difficulty: "medium",
                        xp: 7,
                        prompt: {
                            main: "Think about something in YOUR life (school, neighborhood, city) that you'd like to know more about. Write a SHORT story about how you'd use RTI to find answers.",
                            minWords: 100, maxWords: 300, timeLimit: 600
                        },
                        examples: {
                            title: "Ideas to get you started:",
                            ideas: [
                                { scenario: "School Mystery", prompt: "Why does your school spend 50% more on sports than studies? File RTI to find out!", ageGroup: "8-10" },
                                { scenario: "City Problem", prompt: "Your neighborhood roads are always broken. Use RTI to find out where maintenance money goes!", ageGroup: "10-13" },
                                { scenario: "Environmental Concern", prompt: "A nearby factory is causing air pollution. Use RTI to get their environmental reports!", ageGroup: "13-16" }
                            ]
                        },
                        submissionGuidelines: {
                            include: ["What do you want to know?", "Why is it important to YOU?", "How would you use RTI to find the answer?", "What would you do with the information?"]
                        },
                        evaluation: {
                            criteria: [
                                { name: "Clarity", points: 3, description: "Is your question clear and specific?" },
                                { name: "Relevance", points: 3, description: "Does it show understanding of RTI?" },
                                { name: "Creativity", points: 2, description: "Did you think of something interesting?" },
                                { name: "Length", points: 2, description: "100-300 words as requested?" }
                            ],
                            totalPoints: 10
                        },
                        bonusXP: {
                            bonus1: "+5 XP if you share your story with 3 friends",
                            bonus2: "+10 XP if you actually file the RTI later!",
                            bonus3: "+15 XP if you tell us what information you got back"
                        },
                        reward: { badge: "RTI Storyteller", progressUpdate: "70% - Almost there!" },
                        nextStep: {
                            title: "Ready to Level Up?",
                            message: "You've completed the RTI basics! Now try the practice challenge where you'll write an ACTUAL RTI letter!"
                        }
                    }
                ]
            }
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
            { title: "Water Crisis", x: 45, y: 10, games: {} }
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
            { title: "Voice Up", x: 70, y: 10, games: {} }
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
            { title: "Who Am I?", x: 20, y: 10, games: {} }
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
            { title: "Family Tree", x: 70, y: 10, games: {} }
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
            { title: "Checkup", x: 40, y: 10, games: {} }
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
            { title: "School Day", x: 30, y: 10, games: {} }
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
            { title: "Fair Play", x: 50, y: 10, games: {} }
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
            { title: "My Diary", x: 75, y: 10, games: {} }
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
                title: "Safe Circle",
                x: 30, y: 10,
                games: {
                    drag: [
                        { q: "Drag people who keep you safe", options: ["Parent", "Teacher", "Police", "Stranger"], a: ["Parent", "Teacher", "Police"], xp: 10 },
                        { q: "Drag first helpers when scared", options: ["Parent", "Friend", "Stranger", "Teacher"], a: ["Parent", "Teacher"], xp: 10 }
                    ],
                    situation: [
                        { q: "Stranger offers gift to go with him", a: "Say no, tell adult", xp: 15 },
                        { q: "Neighbor asks you to hide a secret", a: "Tell a trusted adult", xp: 15 }
                    ],
                    tap: [
                        { q: "Who should you trust?", a: "Teacher", xp: 5 },
                        { q: "Best person to tell about danger?", a: "Parent", xp: 5 }
                    ],
                    story: [
                        { q: "Riya scared walking home", a: "Call trusted adult", xp: 20 },
                        { q: "Child feels followed", a: "Go to safe place, call adult", xp: 20 }
                    ],
                    time: [
                        { q: "Tap safe choices", a: ["Parents", "Friends", "Teacher"], xp: 25 },
                        { q: "Tap danger actions", a: ["Block stranger", "Go to crowd"], xp: 25 }
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
                title: "Calm Mind",
                x: 60, y: 10,
                games: {
                    drag: [
                        { q: "Calm", a: ["Breathe", "Count"], xp: 10 },
                        { q: "Relax", a: ["Walk away"], xp: 10 }
                    ],
                    situation: [
                        { q: "Angry", a: "Deep breaths", xp: 15 },
                        { q: "Upset", a: "Talk calmly", xp: 15 }
                    ],
                    tap: [
                        { q: "Best calm?", a: "Breathe", xp: 5 },
                        { q: "Anger control?", a: "Count to 10", xp: 5 }
                    ],
                    story: [
                        { q: "Angry in class", a: "Calm down", xp: 20 },
                        { q: "Frustrated", a: "Take break", xp: 20 }
                    ],
                    time: [
                        { q: "Tap calm", a: ["Breathe", "Sit"], xp: 25 },
                        { q: "Tap relax", a: ["Walk", "Drink water"], xp: 25 }
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
                title: "The Rules",
                x: 40, y: 10,
                games: {
                    drag: [
                        { q: "Fair", a: ["Wait"], xp: 10 },
                        { q: "Unfair", a: ["Cheat"], xp: 10 }
                    ],
                    situation: [
                        { q: "Rule broken", a: "Tell teacher", xp: 15 },
                        { q: "Cheating", a: "Report", xp: 15 }
                    ],
                    tap: [
                        { q: "Rules for?", a: "Safety", xp: 5 },
                        { q: "Why rules?", a: "Fairness", xp: 5 }
                    ],
                    story: [
                        { q: "Class rules", a: "Follow", xp: 20 },
                        { q: "New rule", a: "Respect", xp: 20 }
                    ],
                    time: [
                        { q: "Tap fair", a: ["Share"], xp: 25 },
                        { q: "Tap right", a: ["Wait turn"], xp: 25 }
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
                title: "My Hope",
                x: 25, y: 10,
                games: {
                    drag: [
                        { q: "Dreams", a: ["Teacher"], xp: 10 },
                        { q: "Goals", a: ["Doctor"], xp: 10 }
                    ],
                    situation: [
                        { q: "Wants future", a: "Study", xp: 15 },
                        { q: "Big dream", a: "Practice", xp: 15 }
                    ],
                    tap: [
                        { q: "Best support?", a: "Education", xp: 5 },
                        { q: "Grow dream?", a: "Learn", xp: 5 }
                    ],
                    story: [
                        { q: "Child dreams", a: "Keeps learning", xp: 20 },
                        { q: "Fails once", a: "Tries again", xp: 20 }
                    ],
                    time: [
                        { q: "Tap dream", a: ["Study"], xp: 25 },
                        { q: "Tap hope", a: ["Practice"], xp: 25 }
                    ]
                }
            }
        ]
    }
];