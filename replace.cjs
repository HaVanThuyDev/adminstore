const fs = require('fs');

const files = [
  'd:\\React\\adminstore\\src\\pages\\public\\HomePage.tsx',
  'd:\\React\\adminstore\\src\\pages\\public\\ProductsPage.tsx',
  'd:\\React\\adminstore\\src\\pages\\public\\ProductDetailPage.tsx',
  'd:\\React\\adminstore\\src\\pages\\admin\\AdminDashboardPage.tsx'
];

const replacements = [
  { from: /#080D19/g, to: '#FFFFFF' },
  { from: /#0E1628/g, to: '#F8FAFC' },
  { from: /#0B1222/g, to: '#F1F5F9' },
  { from: /#060A14/g, to: '#F8FAFC' },
  { from: /bg-slate-900\/80/g, to: 'bg-white' },
  { from: /bg-slate-900\/60/g, to: 'bg-slate-50' },
  { from: /bg-slate-900/g, to: 'bg-white' },
  { from: /bg-slate-800\/80/g, to: 'bg-slate-100' },
  { from: /bg-slate-800\/60/g, to: 'bg-slate-100' },
  { from: /bg-slate-800/g, to: 'bg-slate-100' },
  { from: /border-slate-800\/80/g, to: 'border-slate-200' },
  { from: /border-slate-800/g, to: 'border-slate-200' },
  { from: /border-slate-700/g, to: 'border-slate-300' },
  { from: /hover:text-white/g, to: 'hover:text-slate-900' },
  { from: /text-white/g, to: 'text-slate-900' },
  { from: /text-slate-100/g, to: 'text-slate-800' },
  { from: /text-slate-200/g, to: 'text-slate-700' },
  { from: /text-slate-300/g, to: 'text-slate-600' },
  { from: /text-slate-400/g, to: 'text-slate-500' },
  { from: /hover:bg-slate-800\/60/g, to: 'hover:bg-slate-100' },
  { from: /hover:bg-slate-800/g, to: 'hover:bg-slate-100' },
  { from: /hover:bg-slate-700/g, to: 'hover:bg-slate-200' },
  { from: /shadow-black\/30/g, to: 'shadow-slate-200/50' }
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  for (const { from, to } of replacements) {
    content = content.replace(from, to);
  }
  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
}
