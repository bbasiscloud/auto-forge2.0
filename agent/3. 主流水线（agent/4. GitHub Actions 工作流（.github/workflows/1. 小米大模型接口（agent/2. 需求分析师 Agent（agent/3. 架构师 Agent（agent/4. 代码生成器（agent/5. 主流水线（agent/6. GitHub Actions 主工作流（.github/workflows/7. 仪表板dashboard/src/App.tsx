import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export default function Dashboard() {
  const [stats, setStats] = useState({ tokensUsed: 0, appsGenerated: 0, issuesFixed: 0 });

  useEffect(() => {
    fetch('/data/stats.json').then(res => res.json()).then(setStats);
  }, []);

  return (
    <div>
      <h1>AutoForge 运营仪表板</h1>
      <div>累计 Token 消耗：{stats.tokensUsed.toLocaleString()}</div>
      <div>生成应用数：{stats.appsGenerated}</div>
      <div>自动修复 Issue 数：{stats.issuesFixed}</div>
      <BarChart width={600} height={300} data={/* 每日Token用量 */[]}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="tokens" fill="#8884d8" />
      </BarChart>
    </div>
  );
}
