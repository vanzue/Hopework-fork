import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginRegister from './components/LoginRegister';
// import CreateTask from './components/CreateTask';
// import BulkUploadTask from './components/BulkUploadTask';
import CompanyTaskManagement from './components/CompanyTaskManagement';
import CompanyTaskDetail from './components/CompanyTaskDetail';
import CompanyAcceptanceReview from './components/CompanyAcceptanceReview';
// import PaymentManagement from './components/PaymentManagement';
// import PaymentDetail from './components/PaymentDetail';
import UserTaskList from './components/UserTaskList';
import UserMyTasks from './components/UserMyTasks';
import UserTaskDetail from './components/UserTaskDetail';
import UserTaskOperation from './components/UserTaskOperation';
import UserTaskfeedback from './components/UserTaskfeedback';
import UserRewardSettlement from './components/UserRewardSettlement';
import UserWithdrawalStatus from './components/UserWithdrawalStatus';
// import ImageClassificationTask from './components/ImageClassificationTask';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />

        {/* Company page */}
        <Route path="/company/tasks" element={<CompanyTaskManagement />} />
        <Route path="/company/task/:id" element={<CompanyTaskDetail />} />
        <Route path="/company/acceptance/:id" element={<CompanyAcceptanceReview />} />
        {/* 
        <Route path="/company/payments" element={<PaymentManagement />} />
        <Route path="/company/payment/:id" element={<PaymentDetail />} />
        <Route path="/company/create-task" element={<CreateTask />} />
        <Route path="/company/bulk-upload" element={<BulkUploadTask />} />
        */}
        
        {/* Refugee page */}
        <Route path="/user/tasks" element={<UserTaskList />} />
        <Route path="/user/task/:id" element={<UserTaskDetail />} />
        <Route path="/user/my-tasks" element={<UserMyTasks />} />
        <Route path="/user/task-operation/:id" element={<UserTaskOperation />} />
        <Route path="/user/task-feedback/:id" element={<UserTaskfeedback />} />
        <Route path="/user/reward-settlement" element={<UserRewardSettlement />} />
        <Route path="/user/withdrawal-status" element={<UserWithdrawalStatus />} />
        {/* <Route path="/user/task/image-classification/:id" element={<ImageClassificationTask />} /> */}
      </Routes>
    </Router>
  );
}

export default App;