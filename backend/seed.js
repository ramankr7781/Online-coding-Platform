const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Problem = require('./src/models/problem');
const User = require('./src/models/user');

dotenv.config();

const seedProblems = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT_STRING);
        console.log("Connected to MongoDB");

        // Find an admin user to assign as the creator
        let creator = await User.findOne({ role: 'admin' });
        
        // If no admin exists, just find any user
        if (!creator) {
            creator = await User.findOne({});
        }

        if (!creator) {
            console.error("No users found in the database. Please register at least one user before seeding.");
            process.exit(1);
        }

        const problems = [
            {
                title: "Two Sum",
                description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.\n\n**Input Format**\nThe first line contains an integer `n` (the size of the array).\nThe second line contains `n` space-separated integers representing the array `nums`.\nThe third line contains the integer `target`.\n\n**Output Format**\nPrint two space-separated integers representing the indices.",
                difficulty: "easy",
                tags: "array",
                visibleTestCases: [
                    {
                        input: "4\n2 7 11 15\n9",
                        output: "0 1",
                        explanation: "Because nums[0] + nums[1] == 9, we return 0 1."
                    },
                    {
                        input: "3\n3 2 4\n6",
                        output: "1 2",
                        explanation: "Because nums[1] + nums[2] == 6, we return 1 2."
                    }
                ],
                hiddenTestCases: [
                    {
                        input: "2\n3 3\n6",
                        output: "0 1"
                    },
                    {
                        input: "5\n-1 -2 -3 -4 -5\n-8",
                        output: "2 4"
                    }
                ],
                startCode: [
                    {
                        language: "C++",
                        initialCode: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    // Write your C++ code here\n    \n    return 0;\n}"
                    },
                    {
                        language: "Java",
                        initialCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Write your Java code here\n        \n    }\n}"
                    },
                    {
                        language: "JavaScript",
                        initialCode: "const fs = require('fs');\nconst input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split('\\n');\n\n// Write your JavaScript code here\n"
                    }
                ],
                referenceSolution: [
                    {
                        language: "C++",
                        completeCode: "#include <iostream>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n    int n, target;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    cin >> target;\n    \n    unordered_map<int, int> mp;\n    for (int i = 0; i < n; i++) {\n        if (mp.count(target - nums[i])) {\n            cout << mp[target - nums[i]] << \" \" << i << endl;\n            return 0;\n        }\n        mp[nums[i]] = i;\n    }\n    return 0;\n}"
                    },
                    {
                        language: "Java",
                        completeCode: "import java.util.Scanner;\nimport java.util.HashMap;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        int target = sc.nextInt();\n        \n        HashMap<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < n; i++) {\n            if (map.containsKey(target - nums[i])) {\n                System.out.println(map.get(target - nums[i]) + \" \" + i);\n                return;\n            }\n            map.put(nums[i], i);\n        }\n    }\n}"
                    },
                    {
                        language: "JavaScript",
                        completeCode: "const fs = require('fs');\nconst input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split('\\n');\nif (input.length < 3) return;\nconst n = parseInt(input[0]);\nconst nums = input[1].trim().split(' ').map(Number);\nconst target = parseInt(input[2]);\n\nconst map = new Map();\nfor (let i = 0; i < n; i++) {\n    if (map.has(target - nums[i])) {\n        console.log(`${map.get(target - nums[i])} ${i}`);\n        break;\n    }\n    map.set(nums[i], i);\n}"
                    }
                ]
            },
            {
                title: "Climbing Stairs",
                description: "You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?\n\n**Input Format**\nA single integer `n`.\n\n**Output Format**\nA single integer representing the number of distinct ways.",
                difficulty: "easy",
                tags: "dp",
                visibleTestCases: [
                    {
                        input: "2",
                        output: "2",
                        explanation: "There are two ways to climb to the top:\n1. 1 step + 1 step\n2. 2 steps"
                    },
                    {
                        input: "3",
                        output: "3",
                        explanation: "There are three ways to climb to the top:\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step"
                    }
                ],
                hiddenTestCases: [
                    {
                        input: "4",
                        output: "5"
                    },
                    {
                        input: "5",
                        output: "8"
                    },
                    {
                        input: "45",
                        output: "1836311903"
                    }
                ],
                startCode: [
                    {
                        language: "C++",
                        initialCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your C++ code here\n    \n    return 0;\n}"
                    },
                    {
                        language: "Java",
                        initialCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Write your Java code here\n        \n    }\n}"
                    },
                    {
                        language: "JavaScript",
                        initialCode: "const fs = require('fs');\nconst input = fs.readFileSync('/dev/stdin', 'utf-8').trim();\n\n// Write your JavaScript code here\n"
                    }
                ],
                referenceSolution: [
                    {
                        language: "C++",
                        completeCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    if (n <= 2) {\n        cout << n << endl;\n        return 0;\n    }\n    int a = 1, b = 2, c;\n    for (int i = 3; i <= n; i++) {\n        c = a + b;\n        a = b;\n        b = c;\n    }\n    cout << b << endl;\n    return 0;\n}"
                    },
                    {
                        language: "Java",
                        completeCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        if (n <= 2) {\n            System.out.println(n);\n            return;\n        }\n        int a = 1, b = 2, c;\n        for (int i = 3; i <= n; i++) {\n            c = a + b;\n            a = b;\n            b = c;\n        }\n        System.out.println(b);\n    }\n}"
                    },
                    {
                        language: "JavaScript",
                        completeCode: "const fs = require('fs');\nconst input = fs.readFileSync('/dev/stdin', 'utf-8').trim();\nif (!input) return;\nconst n = parseInt(input);\nif (n <= 2) {\n    console.log(n);\n    return;\n}\nlet a = 1, b = 2, c;\nfor (let i = 3; i <= n; i++) {\n    c = a + b;\n    a = b;\n    b = c;\n}\nconsole.log(b);"
                    }
                ]
            },
            {
                title: "Maximum Subarray",
                description: "Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.\n\n**Input Format**\nThe first line contains an integer `n` (the size of the array).\nThe second line contains `n` space-separated integers representing the array `nums`.\n\n**Output Format**\nA single integer representing the maximum subarray sum.",
                difficulty: "medium",
                tags: "array",
                visibleTestCases: [
                    {
                        input: "9\n-2 1 -3 4 -1 2 1 -5 4",
                        output: "6",
                        explanation: "The contiguous subarray [4,-1,2,1] has the largest sum = 6."
                    },
                    {
                        input: "1\n1",
                        output: "1",
                        explanation: "The contiguous subarray [1] has the largest sum = 1."
                    }
                ],
                hiddenTestCases: [
                    {
                        input: "5\n5 4 -1 7 8",
                        output: "23"
                    },
                    {
                        input: "4\n-1 -2 -3 -4",
                        output: "-1"
                    }
                ],
                startCode: [
                    {
                        language: "C++",
                        initialCode: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    // Write your C++ code here\n    \n    return 0;\n}"
                    },
                    {
                        language: "Java",
                        initialCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Write your Java code here\n        \n    }\n}"
                    },
                    {
                        language: "JavaScript",
                        initialCode: "const fs = require('fs');\nconst input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split('\\n');\n\n// Write your JavaScript code here\n"
                    }
                ],
                referenceSolution: [
                    {
                        language: "C++",
                        completeCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    \n    int max_sum = nums[0];\n    int current_sum = nums[0];\n    for (int i = 1; i < n; i++) {\n        current_sum = max(nums[i], current_sum + nums[i]);\n        max_sum = max(max_sum, current_sum);\n    }\n    cout << max_sum << endl;\n    return 0;\n}"
                    },
                    {
                        language: "Java",
                        completeCode: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        \n        int maxSum = nums[0];\n        int currentSum = nums[0];\n        for (int i = 1; i < n; i++) {\n            currentSum = Math.max(nums[i], currentSum + nums[i]);\n            maxSum = Math.max(maxSum, currentSum);\n        }\n        System.out.println(maxSum);\n    }\n}"
                    },
                    {
                        language: "JavaScript",
                        completeCode: "const fs = require('fs');\nconst input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split('\\n');\nif (input.length < 2) return;\nconst n = parseInt(input[0]);\nconst nums = input[1].trim().split(' ').map(Number);\n\nlet maxSum = nums[0];\nlet currentSum = nums[0];\nfor (let i = 1; i < n; i++) {\n    currentSum = Math.max(nums[i], currentSum + nums[i]);\n    maxSum = Math.max(maxSum, currentSum);\n}\nconsole.log(maxSum);"
                    }
                ]
            }
        ];

        // Ensure creator exists
        const problemsWithCreator = problems.map(p => ({ ...p, problemCreator: creator._id }));
        
        await Problem.insertMany(problemsWithCreator);
        console.log(`Successfully seeded ${problems.length} problems!`);
        
    } catch (err) {
        console.error("Error seeding problems:", err);
    } finally {
        mongoose.connection.close();
    }
};

seedProblems();
