import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { AgentsList } from './pages/Agents/AgentsList';
import { AgentNew } from './pages/Agents/AgentNew';
import { AgentDetail } from './pages/Agents/AgentDetail';
import { Templates } from './pages/Templates';
import { TemplateDetail } from './pages/TemplateDetail';
import { Skills } from './pages/Skills';
import { SkillDetail } from './pages/SkillDetail';
import { Tools } from './pages/Tools';
import { Playground } from './pages/Playground';
import { Audit } from './pages/Audit';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="agents" element={<AgentsList />} />
        <Route path="agents/new" element={<AgentNew />} />
        <Route path="agents/:agentId" element={<AgentDetail />} />
        <Route path="templates" element={<Templates />} />
        <Route path="templates/:templateId" element={<TemplateDetail />} />
        <Route path="skills" element={<Skills />} />
        <Route path="skills/:skillId" element={<SkillDetail />} />
        <Route path="tools" element={<Tools />} />
        <Route path="playground" element={<Playground />} />
        <Route path="audit" element={<Audit />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
