import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginRegister from './components/LoginRegister';
import TaskManagement from './components/TaskManagement';
import CreateTask from './components/CreateTask';
import TaskDetail from './components/TaskDetail';
import BulkUploadTask from './components/BulkUploadTask';
import AcceptanceReview from './components/AcceptanceReview';
import PaymentManagement from './components/PaymentManagement';
import PaymentDetail from './components/PaymentDetail';
import UserTaskList from './components/UserTaskList';
import UserMyTasks from './components/UserMyTasks';
import UserTaskDetail from './components/UserTaskDetail';
import ImageClassificationTask from './components/ImageClassificationTask';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />

        {/* Company page */}
        <Route path="/company/tasks" element={<TaskManagement />} />
        <Route path="/company/task/:id" element={<TaskDetail />} />
        
        <Route path="/company/acceptance/:id" element={<AcceptanceReview />} />
        <Route path="/company/payments" element={<PaymentManagement />} />
        <Route path="/company/payment/:id" element={<PaymentDetail />} />

        {/* <Route path="/company/create-task" element={<CreateTask />} />
        <Route path="/company/bulk-upload" element={<BulkUploadTask />} /> */}
        
        {/* Refugee page */}
        <Route path="/user/tasks" element={<UserTaskList />} />

        <Route path="/user/my-tasks" element={<UserMyTasks />} />
        <Route path="/user/task/:id" element={<UserTaskDetail />} />
        <Route path="/user/task/image-classification/:id" element={<ImageClassificationTask />} />
      </Routes>
    </Router>
  );
}

export default App;