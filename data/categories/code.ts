import type { Category } from '../schema'

export const codeCategory: Category = {
  id: 'code',
  label: 'Coding & development',
  icon: 'ti-code',
  questions: [
    {
      id: 'q1',
      num: 1,
      title: 'What best describes how you code?',
      subtitle: 'This sets the type of tool we recommend',
      weightLabel: 'High weight ×3',
      options: [
        { id: 'fullApp',   label: 'Build full apps end-to-end', desc: 'Zero to deployment, multi-file architecture',
          effects: [{ kind: 'numeric', field: 'fullApp', weight: 3 }] },
        { id: 'scripting', label: 'Write scripts & automation', desc: 'Standalone scripts, bots, workflows',
          effects: [{ kind: 'numeric', field: 'scripting', weight: 3 }] },
        { id: 'debugging', label: 'Debug & fix existing code',  desc: 'Trace bugs, read errors, patch issues',
          effects: [{ kind: 'numeric', field: 'debugging', weight: 3 }] },
        { id: 'learning',  label: 'Learning to code',           desc: 'Small projects, building foundations',
          effects: [{ kind: 'numeric', field: 'learning', weight: 3 }] }
      ]
    },
    {
      id: 'q2',
      num: 2,
      title: 'Where do you write your code?',
      subtitle: 'Environment defines which tools are compatible',
      weightLabel: 'High weight ×3',
      options: [
        { id: 'vscode',    label: 'VS Code',                  desc: 'Copilot, Cursor, Windsurf all native here',
          effects: [{ kind: 'boolean', field: 'vscode', value: 30 }] },
        { id: 'jetbrains', label: 'JetBrains (IntelliJ, PyCharm)', desc: 'Claude Code, Copilot have JetBrains plugins',
          effects: [{ kind: 'boolean', field: 'jetbrains', value: 30 }] },
        { id: 'terminal',  label: 'Terminal / CLI only',      desc: 'Claude Code, Gemini CLI excel here',
          effects: [{ kind: 'boolean', field: 'terminal', value: 30 }] },
        { id: 'browser',   label: 'Browser-based / no setup', desc: 'Replit, ChatGPT — no local install needed',
          effects: [{ kind: 'boolean', field: 'browser', value: 30 }] }
      ]
    },
    {
      id: 'q3',
      num: 3,
      title: 'What language or stack do you mainly use?',
      subtitle: 'Different tools shine in different ecosystems',
      weightLabel: 'High weight ×2',
      options: [
        { id: 'python',     label: 'Python',                desc: 'Data, automation, backend, scripting',
          effects: [{ kind: 'numeric', field: 'python', weight: 2 }] },
        { id: 'javascript', label: 'JavaScript / TypeScript', desc: 'React, Node, Vue, Nuxt — full-stack JS',
          effects: [{ kind: 'numeric', field: 'javascript', weight: 2 }] },
        { id: 'polyglot',   label: 'Multiple languages',    desc: 'Switch by project — polyglot by nature',
          effects: [{ kind: 'numeric', field: 'polyglot', weight: 2 }] },
        { id: 'unsure',     label: "I'm not sure yet",      desc: 'Early on, haven\'t committed to a stack',
          effects: [] }
      ]
    },
    {
      id: 'q4',
      num: 4,
      title: 'How much of your codebase does the AI need to understand?',
      subtitle: 'Context size separates agents from chat tools',
      weightLabel: 'High weight ×2',
      options: [
        { id: 'largeContext', label: 'My entire large project',   desc: 'Hundreds of files, cross-file reasoning',
          effects: [{ kind: 'numeric', field: 'largeContext', weight: 2 }] },
        { id: 'multiFile',    label: 'Several files at once',     desc: 'Features spanning a handful of files',
          effects: [{ kind: 'numeric', field: 'multiFile', weight: 2 }] },
        { id: 'singleFile',   label: "Just the file I'm on",      desc: 'Help in the current file is enough',
          effects: [{ kind: 'numeric', field: 'singleFile', weight: 2 }] },
        { id: 'small',        label: 'Small standalone scripts',  desc: 'Short, self-contained pieces',
          effects: [{ kind: 'numeric', field: 'small', weight: 2 }] }
      ]
    },
    {
      id: 'q5',
      num: 5,
      title: 'Should the AI directly read and edit files on your computer?',
      subtitle: 'Eliminates tools that cannot do this',
      weightLabel: 'Hard filter',
      options: [
        { id: 'editAuto',    label: 'Yes — edit & save automatically', desc: 'AI makes local changes without copy-paste',
          effects: [{ kind: 'hardFilter', field: 'canEditFiles', expect: true, penalty: 50, reason: 'Cannot edit local files' }] },
        { id: 'reviewFirst', label: "Yes — I'll review every change", desc: 'Show me a diff, I approve before write',
          effects: [{ kind: 'hardFilter', field: 'canReviewBeforeEdit', expect: true, penalty: 50, reason: 'No diff-review workflow' }] },
        { id: 'copyPaste',   label: "No — I'll copy-paste myself",   desc: 'Manual paste from chat into my editor',
          effects: [] },
        { id: 'cloud',       label: 'Cloud environment — no local files', desc: 'Everything runs in an online sandbox',
          effects: [{ kind: 'hardFilter', field: 'cloudEnv', expect: true, penalty: 30, reason: 'No cloud sandbox' }] }
      ]
    },
    {
      id: 'q6',
      num: 6,
      title: 'What is your budget?',
      subtitle: "Eliminates tools that don't fit",
      weightLabel: 'Hard filter',
      options: [
        { id: 'free',    label: 'Free only',         desc: 'Useful free tier, no card',
          effects: [{ kind: 'hardFilter', field: 'hasFree', expect: true, penalty: 50, reason: 'No free tier' }] },
        { id: 'under20', label: 'Under €20/month',   desc: 'Solid affordable plan',
          effects: [{ kind: 'priceFilter', max: 20, penalty: 50, reason: '€{price}/mo exceeds €20 budget' }] },
        { id: 'under50', label: 'Under €50/month',   desc: 'Pro tool if the gain is worth it',
          effects: [{ kind: 'priceFilter', max: 50, penalty: 50, reason: '€{price}/mo exceeds €50 budget' }] },
        { id: 'noLimit', label: 'No limit',          desc: 'Best tool regardless of cost',
          effects: [] }
      ]
    }
  ],
  tools: [
    { id: 'claude-code',    name: 'Claude Code',    maker: 'Anthropic', icon: 'ti-terminal-2',     color: 'primary', affiliateUrl: 'https://claude.com/claude-code',
      fullApp: 10, scripting: 9, debugging: 8, learning: 3, vscode: true, jetbrains: true, terminal: true, browser: false,
      python: 10, javascript: 8, polyglot: 9, largeContext: 10, multiFile: 9, singleFile: 7, small: 6,
      canEditFiles: true, canReviewBeforeEdit: true, cloudEnv: false, hasFree: false, price: 20 },
    { id: 'cursor',         name: 'Cursor',         maker: 'Anysphere', icon: 'ti-code',           color: 'match',   affiliateUrl: 'https://cursor.com',
      fullApp: 10, scripting: 7, debugging: 9, learning: 5, vscode: true, jetbrains: false, terminal: false, browser: false,
      python: 9, javascript: 10, polyglot: 9, largeContext: 8, multiFile: 10, singleFile: 8, small: 6,
      canEditFiles: true, canReviewBeforeEdit: true, cloudEnv: false, hasFree: true, price: 20 },
    { id: 'github-copilot', name: 'GitHub Copilot', maker: 'GitHub',   icon: 'ti-brand-github',    color: 'accent',  affiliateUrl: 'https://github.com/features/copilot',
      fullApp: 6, scripting: 7, debugging: 8, learning: 7, vscode: true, jetbrains: true, terminal: true, browser: false,
      python: 8, javascript: 10, polyglot: 9, largeContext: 5, multiFile: 7, singleFile: 10, small: 9,
      canEditFiles: true, canReviewBeforeEdit: true, cloudEnv: false, hasFree: true, price: 10 },
    { id: 'chatgpt',        name: 'ChatGPT',        maker: 'OpenAI',   icon: 'ti-message-chatbot', color: 'primary', affiliateUrl: 'https://chatgpt.com',
      fullApp: 7, scripting: 9, debugging: 10, learning: 10, vscode: false, jetbrains: false, terminal: false, browser: true,
      python: 10, javascript: 9, polyglot: 10, largeContext: 6, multiFile: 6, singleFile: 8, small: 10,
      canEditFiles: false, canReviewBeforeEdit: false, cloudEnv: true, hasFree: true, price: 20 },
    { id: 'grok',           name: 'Grok',           maker: 'xAI',      icon: 'ti-ghost',           color: 'match',   affiliateUrl: 'https://grok.com',
      fullApp: 6, scripting: 7, debugging: 8, learning: 7, vscode: false, jetbrains: false, terminal: false, browser: true,
      python: 8, javascript: 8, polyglot: 8, largeContext: 5, multiFile: 5, singleFile: 7, small: 8,
      canEditFiles: false, canReviewBeforeEdit: false, cloudEnv: true, hasFree: true, price: 20 },
    { id: 'windsurf',       name: 'Windsurf',       maker: 'Codeium',  icon: 'ti-wind',           color: 'accent',  affiliateUrl: 'https://windsurf.com',
      fullApp: 9, scripting: 7, debugging: 8, learning: 5, vscode: true, jetbrains: false, terminal: false, browser: false,
      python: 8, javascript: 9, polyglot: 8, largeContext: 7, multiFile: 9, singleFile: 8, small: 6,
      canEditFiles: true, canReviewBeforeEdit: true, cloudEnv: false, hasFree: true, price: 15 },
    { id: 'replit',         name: 'Replit AI',      maker: 'Replit',   icon: 'ti-cloud-code',     color: 'primary', affiliateUrl: 'https://replit.com/refer/tryaimatch',
      fullApp: 6, scripting: 6, debugging: 7, learning: 10, vscode: false, jetbrains: false, terminal: false, browser: true,
      python: 7, javascript: 8, polyglot: 7, largeContext: 4, multiFile: 5, singleFile: 7, small: 9,
      canEditFiles: false, canReviewBeforeEdit: true, cloudEnv: true, hasFree: true, price: 20 },
    { id: 'gemini-cli',     name: 'Gemini CLI',     maker: 'Google',   icon: 'ti-terminal',       color: 'match',   affiliateUrl: 'https://github.com/google-gemini/gemini-cli',
      fullApp: 7, scripting: 9, debugging: 7, learning: 4, vscode: false, jetbrains: false, terminal: true, browser: false,
      python: 8, javascript: 7, polyglot: 8, largeContext: 10, multiFile: 8, singleFile: 6, small: 7,
      canEditFiles: true, canReviewBeforeEdit: false, cloudEnv: false, hasFree: true, price: 0 }
  ]
}
