const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Problem = require('./src/models/problem');
const User = require('./src/models/user');

dotenv.config();

const problems = [
    // --- EASY PROBLEMS ---
    {
        title: "Contains Duplicate",
        description: "Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.\n\n**Input Format**\nLine 1: An integer `n`.\nLine 2: `n` space-separated integers.\n\n**Output Format**\nPrint `true` or `false`.",
        difficulty: "easy",
        tags: "array",
        visibleTestCases: [
            { input: "4\n1 2 3 1", output: "true", explanation: "1 appears twice." },
            { input: "4\n1 2 3 4", output: "false", explanation: "All elements are distinct." }
        ],
        hiddenTestCases: [
            { input: "10\n1 1 1 3 3 4 3 2 4 2", output: "true" },
            { input: "5\n10 20 30 40 50", output: "false" },
            { input: "2\n1 1", output: "true" },
            { input: "1\n5", output: "false" }
        ],
        startCode: [
            { language: "C++", initialCode: "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}" },
            { language: "Java", initialCode: "import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n    }\n}" },
            { language: "JavaScript", initialCode: "const fs = require('fs');\nconst input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split('\\n');\n" }
        ],
        referenceSolution: [
            { language: "C++", completeCode: "#include <iostream>\n#include <vector>\n#include <unordered_set>\nusing namespace std;\nint main() {\n    int n; if(!(cin>>n)) return 0;\n    unordered_set<int> s;\n    for(int i=0; i<n; i++) {\n        int val; cin>>val;\n        if(s.count(val)) { cout << \"true\\n\"; return 0; }\n        s.insert(val);\n    }\n    cout << \"false\\n\";\n    return 0;\n}" },
            { language: "Java", completeCode: "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        HashSet<Integer> set = new HashSet<>();\n        for(int i=0; i<n; i++) {\n            int val = sc.nextInt();\n            if(set.contains(val)) { System.out.println(\"true\"); return; }\n            set.add(val);\n        }\n        System.out.println(\"false\");\n    }\n}" },
            { language: "JavaScript", completeCode: "const fs = require('fs');\nconst input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split('\\n');\nif(input.length<2) return;\nconst nums = input[1].trim().split(' ').map(Number);\nconst set = new Set(nums);\nconsole.log(set.size !== nums.length ? 'true' : 'false');" }
        ]
    },
    {
        title: "Missing Number",
        description: "Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.\n\n**Input Format**\nLine 1: An integer `n`.\nLine 2: `n` space-separated integers.\n\n**Output Format**\nA single integer representing the missing number.",
        difficulty: "easy",
        tags: "array",
        visibleTestCases: [
            { input: "3\n3 0 1", output: "2", explanation: "n = 3, range [0,3]. 2 is missing." },
            { input: "2\n0 1", output: "2", explanation: "n = 2, range [0,2]. 2 is missing." }
        ],
        hiddenTestCases: [
            { input: "9\n9 6 4 2 3 5 7 0 1", output: "8" },
            { input: "1\n0", output: "1" },
            { input: "4\n1 2 3 4", output: "0" },
            { input: "5\n0 2 3 4 5", output: "1" }
        ],
        startCode: [
            { language: "C++", initialCode: "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}" },
            { language: "Java", initialCode: "import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n    }\n}" },
            { language: "JavaScript", initialCode: "const fs = require('fs');\nconst input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split('\\n');\n" }
        ],
        referenceSolution: [
            { language: "C++", completeCode: "#include <iostream>\nusing namespace std;\nint main() {\n    long long n; if(!(cin>>n)) return 0;\n    long long sum = 0;\n    for(int i=0; i<n; i++) {\n        long long val; cin>>val; sum+=val;\n    }\n    cout << (n*(n+1)/2) - sum << \"\\n\";\n    return 0;\n}" },
            { language: "Java", completeCode: "import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextLong()) return;\n        long n = sc.nextLong();\n        long sum = 0;\n        for(int i=0; i<n; i++) sum += sc.nextLong();\n        System.out.println((n*(n+1)/2) - sum);\n    }\n}" },
            { language: "JavaScript", completeCode: "const fs = require('fs');\nconst input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split('\\n');\nif(input.length<2) return;\nconst n = parseInt(input[0]);\nconst nums = input[1].trim().split(' ').map(Number);\nconst expected = (n * (n + 1)) / 2;\nconst actual = nums.reduce((a, b) => a + b, 0);\nconsole.log(expected - actual);" }
        ]
    },
    {
        title: "Single Number",
        description: "Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one.\nYou must implement a solution with a linear runtime complexity and use only constant extra space.\n\n**Input Format**\nLine 1: An integer `n`.\nLine 2: `n` space-separated integers.\n\n**Output Format**\nA single integer.",
        difficulty: "easy",
        tags: "array",
        visibleTestCases: [
            { input: "3\n2 2 1", output: "1", explanation: "1 appears only once." },
            { input: "5\n4 1 2 1 2", output: "4", explanation: "4 appears only once." }
        ],
        hiddenTestCases: [
            { input: "1\n1", output: "1" },
            { input: "7\n0 1 0 1 99 2 2", output: "99" },
            { input: "9\n-1 -1 -2 -2 -3 -3 -4 -5 -4", output: "-5" }
        ],
        startCode: [
            { language: "C++", initialCode: "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}" },
            { language: "Java", initialCode: "import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n    }\n}" },
            { language: "JavaScript", initialCode: "const fs = require('fs');\nconst input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split('\\n');\n" }
        ],
        referenceSolution: [
            { language: "C++", completeCode: "#include <iostream>\nusing namespace std;\nint main() {\n    int n; if(!(cin>>n)) return 0;\n    int res = 0;\n    for(int i=0; i<n; i++) {\n        int val; cin>>val; res ^= val;\n    }\n    cout << res << \"\\n\";\n    return 0;\n}" },
            { language: "Java", completeCode: "import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int res = 0;\n        for(int i=0; i<n; i++) res ^= sc.nextInt();\n        System.out.println(res);\n    }\n}" },
            { language: "JavaScript", completeCode: "const fs = require('fs');\nconst input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split('\\n');\nif(input.length<2) return;\nconst nums = input[1].trim().split(' ').map(Number);\nconsole.log(nums.reduce((a,b)=>a^b, 0));" }
        ]
    },

    // --- MEDIUM PROBLEMS ---
    {
        title: "Product of Array Except Self",
        description: "Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.\n\nThe product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.\n\nYou must write an algorithm that runs in `O(n)` time and without using the division operation.\n\n**Input Format**\nLine 1: An integer `n`.\nLine 2: `n` space-separated integers.\n\n**Output Format**\nSpace-separated integers.",
        difficulty: "medium",
        tags: "array",
        visibleTestCases: [
            { input: "4\n1 2 3 4", output: "24 12 8 6", explanation: "Output is [24, 12, 8, 6]." },
            { input: "5\n-1 1 0 -3 3", output: "0 0 9 0 0", explanation: "Output is [0, 0, 9, 0, 0]." }
        ],
        hiddenTestCases: [
            { input: "2\n2 3", output: "3 2" },
            { input: "3\n0 0 0", output: "0 0 0" },
            { input: "6\n1 2 3 4 5 6", output: "720 360 240 180 144 120" },
            { input: "4\n-1 -1 -1 -1", output: "-1 -1 -1 -1" }
        ],
        startCode: [
            { language: "C++", initialCode: "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}" },
            { language: "Java", initialCode: "import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n    }\n}" },
            { language: "JavaScript", initialCode: "const fs = require('fs');\nconst input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split('\\n');\n" }
        ],
        referenceSolution: [
            { language: "C++", completeCode: "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n; if(!(cin>>n)) return 0;\n    vector<int> nums(n), ans(n, 1);\n    for(int i=0; i<n; i++) cin >> nums[i];\n    int pref = 1; for(int i=0; i<n; i++) { ans[i] *= pref; pref *= nums[i]; }\n    int suff = 1; for(int i=n-1; i>=0; i--) { ans[i] *= suff; suff *= nums[i]; }\n    for(int i=0; i<n; i++) cout << ans[i] << (i==n-1?\"\":\" \");\n    cout << \"\\n\";\n    return 0;\n}" },
            { language: "Java", completeCode: "import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        int[] ans = new int[n];\n        for(int i=0; i<n; i++) { nums[i] = sc.nextInt(); ans[i] = 1; }\n        int pref = 1; for(int i=0; i<n; i++) { ans[i] *= pref; pref *= nums[i]; }\n        int suff = 1; for(int i=n-1; i>=0; i--) { ans[i] *= suff; suff *= nums[i]; }\n        for(int i=0; i<n; i++) System.out.print(ans[i] + (i==n-1?\"\":\" \"));\n        System.out.println();\n    }\n}" },
            { language: "JavaScript", completeCode: "const fs = require('fs');\nconst input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split('\\n');\nif(input.length<2) return;\nconst n = parseInt(input[0]);\nconst nums = input[1].trim().split(' ').map(Number);\nconst ans = new Array(n).fill(1);\nlet pref = 1; for(let i=0; i<n; i++){ ans[i]*=pref; pref*=nums[i]; }\nlet suff = 1; for(let i=n-1; i>=0; i--){ ans[i]*=suff; suff*=nums[i]; }\nconsole.log(ans.join(' '));" }
        ]
    },
    {
        title: "Jump Game",
        description: "You are given an integer array `nums`. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.\n\nReturn `true` if you can reach the last index, or `false` otherwise.\n\n**Input Format**\nLine 1: An integer `n`.\nLine 2: `n` space-separated integers.\n\n**Output Format**\n`true` or `false`.",
        difficulty: "medium",
        tags: "dp",
        visibleTestCases: [
            { input: "5\n2 3 1 1 4", output: "true", explanation: "Jump 1 step from index 0 to 1, then 3 steps to the last index." },
            { input: "5\n3 2 1 0 4", output: "false", explanation: "You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index." }
        ],
        hiddenTestCases: [
            { input: "1\n0", output: "true" },
            { input: "2\n2 0", output: "true" },
            { input: "4\n1 0 1 0", output: "false" },
            { input: "6\n2 5 0 0 0 0", output: "true" }
        ],
        startCode: [
            { language: "C++", initialCode: "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}" },
            { language: "Java", initialCode: "import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n    }\n}" },
            { language: "JavaScript", initialCode: "const fs = require('fs');\nconst input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split('\\n');\n" }
        ],
        referenceSolution: [
            { language: "C++", completeCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n; if(!(cin>>n)) return 0;\n    int maxReach = 0;\n    for(int i=0; i<n; i++) {\n        int val; cin>>val;\n        if(i > maxReach) { cout << \"false\\n\"; return 0; }\n        maxReach = max(maxReach, i + val);\n    }\n    cout << \"true\\n\"; return 0;\n}" },
            { language: "Java", completeCode: "import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int maxReach = 0;\n        for(int i=0; i<n; i++) {\n            int val = sc.nextInt();\n            if(i > maxReach) { System.out.println(\"false\"); return; }\n            maxReach = Math.max(maxReach, i + val);\n        }\n        System.out.println(\"true\");\n    }\n}" },
            { language: "JavaScript", completeCode: "const fs = require('fs');\nconst input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split('\\n');\nif(input.length<2) return;\nconst n = parseInt(input[0]);\nconst nums = input[1].trim().split(' ').map(Number);\nlet maxReach = 0;\nfor(let i=0; i<n; i++) {\n    if(i > maxReach) { console.log(\"false\"); return; }\n    maxReach = Math.max(maxReach, i + nums[i]);\n}\nconsole.log(\"true\");" }
        ]
    },
    {
        title: "Coin Change",
        description: "You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`.\n\nYou may assume that you have an infinite number of each kind of coin.\n\n**Input Format**\nLine 1: An integer `n`.\nLine 2: `n` space-separated integers representing `coins`.\nLine 3: An integer `amount`.\n\n**Output Format**\nA single integer.",
        difficulty: "medium",
        tags: "dp",
        visibleTestCases: [
            { input: "3\n1 2 5\n11", output: "3", explanation: "11 = 5 + 5 + 1" },
            { input: "1\n2\n3", output: "-1", explanation: "3 cannot be made up." }
        ],
        hiddenTestCases: [
            { input: "1\n1\n0", output: "0" },
            { input: "4\n186 419 83 408\n6249", output: "20" },
            { input: "3\n10 20 50\n60", output: "2" },
            { input: "2\n2 5\n11", output: "3" }
        ],
        startCode: [
            { language: "C++", initialCode: "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}" },
            { language: "Java", initialCode: "import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n    }\n}" },
            { language: "JavaScript", initialCode: "const fs = require('fs');\nconst input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split('\\n');\n" }
        ],
        referenceSolution: [
            { language: "C++", completeCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n; if(!(cin>>n)) return 0;\n    vector<int> coins(n); for(int i=0; i<n; i++) cin>>coins[i];\n    int amount; cin>>amount;\n    vector<int> dp(amount+1, amount+1);\n    dp[0] = 0;\n    for(int i=1; i<=amount; i++) {\n        for(int coin : coins) {\n            if(i - coin >= 0) dp[i] = min(dp[i], dp[i - coin] + 1);\n        }\n    }\n    cout << (dp[amount] > amount ? -1 : dp[amount]) << \"\\n\";\n    return 0;\n}" },
            { language: "Java", completeCode: "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] coins = new int[n];\n        for(int i=0; i<n; i++) coins[i] = sc.nextInt();\n        int amount = sc.nextInt();\n        int[] dp = new int[amount+1];\n        Arrays.fill(dp, amount+1);\n        dp[0] = 0;\n        for(int i=1; i<=amount; i++) {\n            for(int coin : coins) {\n                if(i - coin >= 0) dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n            }\n        }\n        System.out.println(dp[amount] > amount ? -1 : dp[amount]);\n    }\n}" },
            { language: "JavaScript", completeCode: "const fs = require('fs');\nconst input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split('\\n');\nif(input.length<3) return;\nconst n = parseInt(input[0]);\nconst coins = input[1].trim().split(' ').map(Number);\nconst amount = parseInt(input[2]);\nconst dp = new Array(amount + 1).fill(amount + 1);\ndp[0] = 0;\nfor (let i = 1; i <= amount; i++) {\n    for (let coin of coins) {\n        if (i - coin >= 0) dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n    }\n}\nconsole.log(dp[amount] > amount ? -1 : dp[amount]);" }
        ]
    },
    {
        title: "Longest Increasing Subsequence",
        description: "Given an integer array `nums`, return the length of the longest strictly increasing subsequence.\n\n**Input Format**\nLine 1: An integer `n`.\nLine 2: `n` space-separated integers.\n\n**Output Format**\nA single integer.",
        difficulty: "medium",
        tags: "dp",
        visibleTestCases: [
            { input: "8\n10 9 2 5 3 7 101 18", output: "4", explanation: "The longest increasing subsequence is [2,3,7,101], therefore the length is 4." },
            { input: "6\n0 1 0 3 2 3", output: "4", explanation: "The longest increasing subsequence is [0,1,2,3]." }
        ],
        hiddenTestCases: [
            { input: "7\n7 7 7 7 7 7 7", output: "1" },
            { input: "1\n100", output: "1" },
            { input: "5\n5 4 3 2 1", output: "1" },
            { input: "5\n1 2 3 4 5", output: "5" }
        ],
        startCode: [
            { language: "C++", initialCode: "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}" },
            { language: "Java", initialCode: "import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n    }\n}" },
            { language: "JavaScript", initialCode: "const fs = require('fs');\nconst input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split('\\n');\n" }
        ],
        referenceSolution: [
            { language: "C++", completeCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n; if(!(cin>>n)) return 0;\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin>>nums[i];\n    vector<int> sub;\n    for(int x : nums) {\n        auto it = lower_bound(sub.begin(), sub.end(), x);\n        if(it == sub.end()) sub.push_back(x);\n        else *it = x;\n    }\n    cout << sub.size() << \"\\n\";\n    return 0;\n}" },
            { language: "Java", completeCode: "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] dp = new int[n];\n        int len = 0;\n        for(int i=0; i<n; i++) {\n            int x = sc.nextInt();\n            int j = Arrays.binarySearch(dp, 0, len, x);\n            if(j < 0) j = -(j + 1);\n            dp[j] = x;\n            if(j == len) len++;\n        }\n        System.out.println(len);\n    }\n}" },
            { language: "JavaScript", completeCode: "const fs = require('fs');\nconst input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split('\\n');\nif(input.length<2) return;\nconst n = parseInt(input[0]);\nconst nums = input[1].trim().split(' ').map(Number);\nconst sub = [];\nfor(let x of nums) {\n    let left = 0, right = sub.length;\n    while(left < right) {\n        let mid = (left + right) >> 1;\n        if(sub[mid] < x) left = mid + 1;\n        else right = mid;\n    }\n    if(left >= sub.length) sub.push(x);\n    else sub[left] = x;\n}\nconsole.log(sub.length);" }
        ]
    },

    // --- HARD PROBLEMS ---
    {
        title: "Trapping Rain Water",
        description: "Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.\n\n**Input Format**\nLine 1: An integer `n`.\nLine 2: `n` space-separated integers.\n\n**Output Format**\nA single integer.",
        difficulty: "hard",
        tags: "array",
        visibleTestCases: [
            { input: "12\n0 1 0 2 1 0 1 3 2 1 2 1", output: "6", explanation: "6 units of rain water are trapped." },
            { input: "6\n4 2 0 3 2 5", output: "9", explanation: "9 units of rain water are trapped." }
        ],
        hiddenTestCases: [
            { input: "0", output: "0" },
            { input: "3\n2 0 2", output: "2" },
            { input: "5\n5 4 3 2 1", output: "0" },
            { input: "10\n4 1 2 1 5 1 2 1 4 0", output: "16" }
        ],
        startCode: [
            { language: "C++", initialCode: "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}" },
            { language: "Java", initialCode: "import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n    }\n}" },
            { language: "JavaScript", initialCode: "const fs = require('fs');\nconst input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split('\\n');\n" }
        ],
        referenceSolution: [
            { language: "C++", completeCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n; if(!(cin>>n)) return 0;\n    if(n==0) { cout<<0<<\"\\n\"; return 0; }\n    vector<int> h(n); for(int i=0; i<n; i++) cin>>h[i];\n    int l = 0, r = n - 1, res = 0, maxL = 0, maxR = 0;\n    while(l <= r) {\n        if(maxL <= maxR) {\n            if(h[l] >= maxL) maxL = h[l];\n            else res += maxL - h[l];\n            l++;\n        } else {\n            if(h[r] >= maxR) maxR = h[r];\n            else res += maxR - h[r];\n            r--;\n        }\n    }\n    cout << res << \"\\n\";\n    return 0;\n}" },
            { language: "Java", completeCode: "import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        if(n==0) { System.out.println(0); return; }\n        int[] h = new int[n];\n        for(int i=0; i<n; i++) h[i] = sc.nextInt();\n        int l = 0, r = n - 1, res = 0, maxL = 0, maxR = 0;\n        while(l <= r) {\n            if(maxL <= maxR) {\n                if(h[l] >= maxL) maxL = h[l]; else res += maxL - h[l];\n                l++;\n            } else {\n                if(h[r] >= maxR) maxR = h[r]; else res += maxR - h[r];\n                r--;\n            }\n        }\n        System.out.println(res);\n    }\n}" },
            { language: "JavaScript", completeCode: "const fs = require('fs');\nconst input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split('\\n');\nif(!input[0]) return;\nconst n = parseInt(input[0]);\nif(n===0) { console.log(0); return; }\nconst h = input[1].trim().split(' ').map(Number);\nlet l = 0, r = n - 1, res = 0, maxL = 0, maxR = 0;\nwhile(l <= r) {\n    if(maxL <= maxR) {\n        if(h[l] >= maxL) maxL = h[l]; else res += maxL - h[l];\n        l++;\n    } else {\n        if(h[r] >= maxR) maxR = h[r]; else res += maxR - h[r];\n        r--;\n    }\n}\nconsole.log(res);" }
        ]
    },
    {
        title: "Edit Distance",
        description: "Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2`.\n\nYou have the following three operations permitted on a word:\n1. Insert a character\n2. Delete a character\n3. Replace a character\n\n**Input Format**\nLine 1: `word1`\nLine 2: `word2`\n\n**Output Format**\nA single integer.",
        difficulty: "hard",
        tags: "dp",
        visibleTestCases: [
            { input: "horse\nros", output: "3", explanation: "horse -> rorse (replace 'h' with 'r')\nrorse -> rose (remove 'r')\nrose -> ros (remove 'e')" },
            { input: "intention\nexecution", output: "5", explanation: "intention -> inention (remove 't')\ninention -> enention (replace 'i' with 'e')\nenention -> exention (replace 'n' with 'x')\nexention -> exection (replace 'n' with 'c')\nexection -> execution (insert 'u')" }
        ],
        hiddenTestCases: [
            { input: "\na", output: "1" },
            { input: "abc\n", output: "3" },
            { input: "same\nsame", output: "0" },
            { input: "algorithm\naltruistic", output: "6" }
        ],
        startCode: [
            { language: "C++", initialCode: "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}" },
            { language: "Java", initialCode: "import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n    }\n}" },
            { language: "JavaScript", initialCode: "const fs = require('fs');\nconst input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split('\\n');\n" }
        ],
        referenceSolution: [
            { language: "C++", completeCode: "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\nint main() {\n    string w1, w2;\n    getline(cin, w1); getline(cin, w2);\n    int m = w1.size(), n = w2.size();\n    vector<vector<int>> dp(m+1, vector<int>(n+1));\n    for(int i=0; i<=m; i++) dp[i][0] = i;\n    for(int j=0; j<=n; j++) dp[0][j] = j;\n    for(int i=1; i<=m; i++) {\n        for(int j=1; j<=n; j++) {\n            if(w1[i-1] == w2[j-1]) dp[i][j] = dp[i-1][j-1];\n            else dp[i][j] = min({dp[i-1][j-1], dp[i-1][j], dp[i][j-1]}) + 1;\n        }\n    }\n    cout << dp[m][n] << \"\\n\";\n    return 0;\n}" },
            { language: "Java", completeCode: "import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String w1 = sc.hasNextLine() ? sc.nextLine() : \"\";\n        String w2 = sc.hasNextLine() ? sc.nextLine() : \"\";\n        int m = w1.length(), n = w2.length();\n        int[][] dp = new int[m+1][n+1];\n        for(int i=0; i<=m; i++) dp[i][0] = i;\n        for(int j=0; j<=n; j++) dp[0][j] = j;\n        for(int i=1; i<=m; i++) {\n            for(int j=1; j<=n; j++) {\n                if(w1.charAt(i-1) == w2.charAt(j-1)) dp[i][j] = dp[i-1][j-1];\n                else dp[i][j] = Math.min(dp[i-1][j-1], Math.min(dp[i-1][j], dp[i][j-1])) + 1;\n            }\n        }\n        System.out.println(dp[m][n]);\n    }\n}" },
            { language: "JavaScript", completeCode: "const fs = require('fs');\nlet input = fs.readFileSync('/dev/stdin', 'utf-8').split('\\n');\nlet w1 = input[0] ? input[0].replace(/\\r/g, '') : \"\";\nlet w2 = input[1] ? input[1].replace(/\\r/g, '') : \"\";\nlet m = w1.length, n = w2.length;\nlet dp = Array.from({length: m+1}, () => Array(n+1).fill(0));\nfor(let i=0; i<=m; i++) dp[i][0] = i;\nfor(let j=0; j<=n; j++) dp[0][j] = j;\nfor(let i=1; i<=m; i++) {\n    for(let j=1; j<=n; j++) {\n        if(w1[i-1] === w2[j-1]) dp[i][j] = dp[i-1][j-1];\n        else dp[i][j] = Math.min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1]) + 1;\n    }\n}\nconsole.log(dp[m][n]);" }
        ]
    },
    {
        title: "First Missing Positive",
        description: "Given an unsorted integer array `nums`, return the smallest missing positive integer.\n\nYou must implement an algorithm that runs in `O(n)` time and uses constant extra space.\n\n**Input Format**\nLine 1: An integer `n`.\nLine 2: `n` space-separated integers.\n\n**Output Format**\nA single integer.",
        difficulty: "hard",
        tags: "array",
        visibleTestCases: [
            { input: "3\n1 2 0", output: "3", explanation: "The numbers in the range [1,2] are all in the array." },
            { input: "4\n3 4 -1 1", output: "2", explanation: "1 is in the array but 2 is missing." }
        ],
        hiddenTestCases: [
            { input: "5\n7 8 9 11 12", output: "1" },
            { input: "1\n1", output: "2" },
            { input: "5\n1 2 3 4 5", output: "6" },
            { input: "4\n-5 -6 -7 0", output: "1" }
        ],
        startCode: [
            { language: "C++", initialCode: "#include <iostream>\nusing namespace std;\nint main() {\n    return 0;\n}" },
            { language: "Java", initialCode: "import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n    }\n}" },
            { language: "JavaScript", initialCode: "const fs = require('fs');\nconst input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split('\\n');\n" }
        ],
        referenceSolution: [
            { language: "C++", completeCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n; if(!(cin>>n)) return 0;\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin>>nums[i];\n    for(int i=0; i<n; i++) {\n        while(nums[i] > 0 && nums[i] <= n && nums[nums[i]-1] != nums[i]) {\n            swap(nums[i], nums[nums[i]-1]);\n        }\n    }\n    for(int i=0; i<n; i++) {\n        if(nums[i] != i+1) { cout << i+1 << \"\\n\"; return 0; }\n    }\n    cout << n+1 << \"\\n\";\n    return 0;\n}" },
            { language: "Java", completeCode: "import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i=0; i<n; i++) nums[i] = sc.nextInt();\n        for(int i=0; i<n; i++) {\n            while(nums[i] > 0 && nums[i] <= n && nums[nums[i]-1] != nums[i]) {\n                int temp = nums[nums[i]-1];\n                nums[nums[i]-1] = nums[i];\n                nums[i] = temp;\n            }\n        }\n        for(int i=0; i<n; i++) {\n            if(nums[i] != i+1) { System.out.println(i+1); return; }\n        }\n        System.out.println(n+1);\n    }\n}" },
            { language: "JavaScript", completeCode: "const fs = require('fs');\nconst input = fs.readFileSync('/dev/stdin', 'utf-8').trim().split('\\n');\nif(input.length<2) return;\nconst n = parseInt(input[0]);\nconst nums = input[1].trim().split(' ').map(Number);\nfor(let i=0; i<n; i++) {\n    while(nums[i] > 0 && nums[i] <= n && nums[nums[i]-1] !== nums[i]) {\n        let temp = nums[nums[i]-1];\n        nums[nums[i]-1] = nums[i];\n        nums[i] = temp;\n    }\n}\nfor(let i=0; i<n; i++) {\n    if(nums[i] !== i+1) { console.log(i+1); return; }\n}\nconsole.log(n+1);" }
        ]
    }
];

const seedProblems = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT_STRING);
        console.log("Connected to MongoDB");

        let creator = await User.findOne({ role: 'admin' });
        if (!creator) creator = await User.findOne({});
        if (!creator) {
            console.error("No users found. Please register a user first.");
            process.exit(1);
        }

        const problemsWithCreator = problems.map(p => ({ ...p, problemCreator: creator._id }));
        
        await Problem.insertMany(problemsWithCreator);
        console.log(`Successfully seeded ${problems.length} problems with comprehensive test cases!`);
        
    } catch (err) {
        console.error("Error seeding problems:", err);
    } finally {
        mongoose.connection.close();
    }
};

seedProblems();
