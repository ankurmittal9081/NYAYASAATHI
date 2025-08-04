// // // Updated AdminPanelPage with Light Theme applied (based on your dark theme logic)

// // import React, { useState, useEffect } from 'react';
// // import apiClient from '../api/axiosConfig';
// // import Spinner from '../components/Spinner';
// // import { Plus, Edit, Users, FileText, Home, LineChart, PieChart, Trash2 } from 'lucide-react';
// // import { Line, Doughnut } from 'react-chartjs-2';
// // import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
// // import toast from 'react-hot-toast';

// // import AddKioskModal from '../components/AddKioskModal.jsx';
// // import AddSubscriptionModal from '../components/AddSubscriptionModal.jsx';
// // import GenericEditModal from '../components/GenericEditModal.jsx';

// // ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

// // const columnsConfig = {
// //   users: [
// //     { header: 'Full Name', accessor: 'fullName' },
// //     { header: 'Email', accessor: 'email' },
// //     { header: 'Role', accessor: 'role' },
// //     { header: 'Phone', accessor: 'phoneNumber' },
// //   ],
// //   admins: [
// //     { header: 'Name', accessor: (item) => item.user?.fullName || 'N/A' },
// //     { header: 'Email', accessor: (item) => item.user?.email || 'N/A' },
// //     { header: 'Admin Role', accessor: 'adminRole' },
// //     { header: 'Status', accessor: 'status' },
// //   ],
// //   employees: [
// //     { header: 'Name', accessor: (item) => item.user?.fullName || 'N/A' },
// //     { header: 'Email', accessor: (item) => item.user?.email || 'N/A' },
// //     { header: 'Department', accessor: 'department' },
// //     { header: 'Designation', accessor: 'designation' },
// //   ],
// //   paralegals: [
// //     { header: 'Name', accessor: (item) => item.user?.fullName || 'N/A' },
// //     { header: 'Email', accessor: (item) => item.user?.email || 'N/A' },
// //     { header: 'Active', accessor: 'active' },
// //     { header: 'Rating', accessor: 'rating' },
// //   ],
// //   kiosks: [
// //     { header: 'Location', accessor: 'location' },
// //     { header: 'Village', accessor: 'village' },
// //     { header: 'Operator', accessor: 'operatorName' },
// //     { header: 'Organization', accessor: 'organizationType' },
// //     { header: 'Active', accessor: 'isActive' },
// //   ],
// //   subscriptions: [
// //     { header: 'Org Type', accessor: 'organizationType' },
// //     { header: 'Plan', accessor: 'plan' },
// //     { header: 'Status', accessor: 'paymentStatus' },
// //     { header: 'Expires On', accessor: (item) => new Date(item.expiryDate).toLocaleDateString() },
// //   ],
// //   issues: [
// //     { header: 'Issue Type', accessor: 'issueType' },
// //     { header: 'Status', accessor: 'status' },
// //     { header: 'User ID', accessor: 'userId' },
// //     { header: 'Description', accessor: 'description' },
// //   ],
// //   documents: [
// //     { header: 'Doc Type', accessor: 'documentType' },
// //     { header: 'Status', accessor: 'submissionStatus' },
// //     { header: 'User ID', accessor: 'userId' },
// //     { header: 'Issue ID', accessor: 'issueId' },
// //   ],
// //   voicequeries: [
// //     { header: 'Language', accessor: 'language' },
// //     { header: 'User ID', accessor: 'userId' },
// //     { header: 'Issue ID', accessor: 'issueId' },
// //     { header: 'Text', accessor: 'transcribedText' },
// //   ],
// // };

// // const getNestedValue = (obj, path) => path.split('.').reduce((o, i) => o?.[i], obj);

// // const StatCard = ({ icon, title, value, color }) => (
// //   <div className="bg-white p-6 rounded-xl border border-slate-200 flex items-center gap-4 shadow-sm">
// //     <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>{icon}</div>
// //     <div>
// //       <p className="text-slate-500 text-sm">{title}</p>
// //       <p className="text-2xl font-bold text-slate-900">{value}</p>
// //     </div>
// //   </div>
// // );

// // const AdminOverview = () => {
// //   const [stats, setStats] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');

// //   useEffect(() => {
// //     const fetchStats = async () => {
// //       try {
// //         const response = await apiClient.get('/admins/stats');
// //         setStats(response.data);
// //       } catch (err) {
// //         setError(err.message || 'Failed to fetch statistics.');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchStats();
// //   }, []);

// //   if (loading) return <Spinner />;
// //   if (error) return <div className="text-red-600 p-4 bg-red-50 rounded-lg">{error}</div>;
// //   if (!stats) return <div>No stats available.</div>;

// //   const lineChartData = {
// //     labels: stats.issuesLast30Days.map(d => new Date(d._id).toLocaleDateString()),
// //     datasets: [{
// //       label: 'Issues Created',
// //       data: stats.issuesLast30Days.map(d => d.count),
// //       borderColor: '#06b6d4', backgroundColor: 'rgba(6, 182, 212, 0.1)', fill: true, tension: 0.3
// //     }]
// //   };

// //   const doughnutChartData = {
// //     labels: stats.issueTypeDistribution.map(d => d._id),
// //     datasets: [{
// //       label: 'Issue Types',
// //       data: stats.issueTypeDistribution.map(d => d.count),
// //       backgroundColor: ['#06b6d4', '#ec4899', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444', '#64748b'],
// //       borderColor: '#ffffff', borderWidth: 2
// //     }]
// //   };

// //   return (
// //     <div className="space-y-8">
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //         <StatCard icon={<Users size={24} />} title="Total Users" value={stats.keyMetrics.totalUsers} color="bg-cyan-100 text-cyan-600" />
// //         <StatCard icon={<FileText size={24} />} title="Total Legal Issues" value={stats.keyMetrics.totalIssues} color="bg-pink-100 text-pink-600" />
// //         <StatCard icon={<Home size={24} />} title="Total Kiosks" value={stats.keyMetrics.totalKiosks} color="bg-purple-100 text-purple-600" />
// //       </div>
// //       <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
// //         <div className="lg:col-span-3 bg-white p-6 rounded-xl border border-slate-200">
// //           <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><LineChart size={20}/>Issues Created (Last 30 Days)</h3>
// //           <div className="h-64"><Line data={lineChartData} options={{ maintainAspectRatio: false, responsive: true }} /></div>
// //         </div>
// //         <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200">
// //           <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><PieChart size={20}/>Issue Type Distribution</h3>
// //           <div className="h-64"><Doughnut data={doughnutChartData} options={{ maintainAspectRatio: false, responsive: true }} /></div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const AdminPanelPage = () => {
// //   const [activeTab, setActiveTab] = useState('overview');
// //   const [editingItem, setEditingItem] = useState(null);
// //   const [isAddKioskModalOpen, setAddKioskModalOpen] = useState(false);
// //   const [isAddSubModalOpen, setAddSubModalOpen] = useState(false);
// //   const [isEditModalOpen, setEditModalOpen] = useState(false);

// //   const tabs = ['overview', ...Object.keys(columnsConfig)];
// //   const tabName = (tab) => tab.charAt(0).toUpperCase() + tab.slice(1);
// //   const canCreate = ['kiosks', 'subscriptions'].includes(activeTab);
// //   const canEdit = !['subscriptions', 'voicequeries', 'overview'].includes(activeTab);

// //   const handleCreateClick = () => {
// //     if (activeTab === 'kiosks') setAddKioskModalOpen(true);
// //     if (activeTab === 'subscriptions') setAddSubModalOpen(true);
// //   };

// //   const handleEditClick = (item) => {
// //     setEditingItem(item);
// //     setEditModalOpen(true);
// //   };

// //   const forceRerender = (tab) => {
// //     setActiveTab('');
// //     setTimeout(() => setActiveTab(tab), 50);
// //   };

// //   return (
// //     <>
// //       <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
// //         <div className="flex flex-wrap justify-between items-center gap-4">
// //           <h1 className="text-4xl font-bold text-slate-900">Admin Panel</h1>
// //           {canCreate && (
// //             <button onClick={handleCreateClick} className="btn-primary w-auto flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded-lg">
// //               <Plus size={16} /> Create New {tabName(activeTab).slice(0, -1)}
// //             </button>
// //           )}
// //         </div>

// //         <div className="flex flex-wrap gap-2 border-b border-slate-200">
// //           {tabs.map(tab => (
// //             <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'text-cyan-600 border-cyan-600' : 'text-slate-500 border-transparent hover:text-slate-800 hover:border-slate-300'}`}>
// //               {tabName(tab)}
// //             </button>
// //           ))}
// //         </div>

// //         <div>
// //           {activeTab === 'overview' ? (
// //             <AdminOverview />
// //           ) : (
// //             <DataTable
// //               endpoint={`/${activeTab}`}
// //               title={tabName(activeTab)}
// //               columns={columnsConfig[activeTab]}
// //               onEdit={canEdit ? handleEditClick : null}
// //               key={activeTab}
// //             />
// //           )}
// //         </div>
// //       </div>

// //       <AddKioskModal isOpen={isAddKioskModalOpen} onClose={() => setAddKioskModalOpen(false)} onSuccess={() => forceRerender('kiosks')} />
// //       <AddSubscriptionModal isOpen={isAddSubModalOpen} onClose={() => setAddSubModalOpen(false)} onSuccess={() => forceRerender('subscriptions')} />
// //       <GenericEditModal
// //         isOpen={isEditModalOpen}
// //         onClose={() => setEditModalOpen(false)}
// //         onSuccess={() => forceRerender(activeTab)}
// //         itemData={editingItem}
// //         columns={columnsConfig[activeTab] || []}
// //         endpoint={`/${activeTab}`}
// //         title={`Edit ${tabName(activeTab).slice(0, -1)}`}
// //       />
// //     </>
// //   );
// // };

// // const DataTable = ({ endpoint, title, columns, onEdit }) => {
// //   const [data, setData] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       setLoading(true);
// //       try {
// //         const response = await apiClient.get(endpoint);
// //         setData(Array.isArray(response.data) ? response.data : (response.data?.data || []));
// //       } catch (err) {
// //         setError(err.message || `Failed to fetch ${title}.`);
// //         setData([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchData();
// //   }, [endpoint, title]);

// //   const handleDelete = async (id) => {
// //     if (window.confirm(`Are you sure you want to delete this ${title.slice(0, -1)}? This action cannot be undone.`)) {
// //       try {
// //         await apiClient.delete(`${endpoint}/${id}`);
// //         setData(prevData => prevData.filter(item => item._id !== id));
// //         toast.success(`${title.slice(0, -1)} deleted successfully.`);
// //       } catch (err) {
// //         toast.error(`Failed to delete: ${err.message}`);
// //       }
// //     }
// //   };

// //   if (loading) return <Spinner />;
// //   if (error) return <div className="text-red-600 p-4 bg-red-50 rounded-lg">{error}</div>;
// //   if (data.length === 0) return <div className="text-center text-slate-500 p-8 bg-slate-50 rounded-lg">No {title} found.</div>;

// //   return (
// //     <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
// //       <div className="overflow-x-auto">
// //         <table className="min-w-full divide-y divide-slate-200">
// //           <thead className="bg-slate-50">
// //             <tr>
// //               {columns.map(col => <th key={col.header} className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">{col.header}</th>)}
// //               <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody className="bg-white divide-y divide-slate-200">
// //             {data.map(item => (
// //               <tr key={item._id} className="hover:bg-slate-50 transition-colors">
// //                 {columns.map(col => (
// //                   <td key={`${item._id}-${col.header}`} className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
// //                     {typeof col.accessor === 'function' ? col.accessor(item) : (getNestedValue(item, col.accessor) || 'N/A')}
// //                   </td>
// //                 ))}
// //                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex items-center justify-end gap-4">
// //                   {onEdit && <button onClick={() => onEdit(item)} className="text-cyan-600 hover:text-cyan-800 flex items-center gap-1"><Edit size={14}/> Edit</button>}
// //                   <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-800">Delete</button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminPanelPage;
// // Updated AdminPanelPage with two critical fixes.

// import React, { useState, useEffect } from 'react';
// import apiClient from '../api/axiosConfig';
// import Spinner from '../components/Spinner';
// import { Plus, Edit, Users, FileText, Home, LineChart, PieChart } from 'lucide-react';
// import { Line, Doughnut } from 'react-chartjs-2';
// // --- FIX #1: Import the 'Filler' plugin for charts ---
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler } from 'chart.js';
// import toast from 'react-hot-toast';

// import AddKioskModal from '../components/AddKioskModal.jsx';
// import AddSubscriptionModal from '../components/AddSubscriptionModal.jsx';
// import GenericEditModal from '../components/GenericEditModal.jsx';

// // --- FIX #1 (cont.): Register the 'Filler' plugin ---
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler);

// const columnsConfig = {
//   users: [
//     { header: 'Full Name', accessor: 'fullName' },
//     { header: 'Email', accessor: 'email' },
//     { header: 'Role', accessor: 'role' },
//     { header: 'Phone', accessor: 'phoneNumber' },
//   ],
//   admins: [
//     { header: 'Name', accessor: (item) => item.user?.fullName || 'N/A' },
//     { header: 'Email', accessor: (item) => item.user?.email || 'N/A' },
//     { header: 'Admin Role', accessor: 'adminRole' },
//     { header: 'Status', accessor: 'status' },
//   ],
//   employees: [
//     { header: 'Name', accessor: (item) => item.user?.fullName || 'N/A' },
//     { header: 'Email', accessor: (item) => item.user?.email || 'N/A' },
//     { header: 'Department', accessor: 'department' },
//     { header: 'Designation', accessor: 'designation' },
//   ],
//   paralegals: [
//     { header: 'Name', accessor: (item) => item.user?.fullName || 'N/A' },
//     { header: 'Email', accessor: (item) => item.user?.email || 'N/A' },
//     { header: 'Active', accessor: 'active' },
//     { header: 'Rating', accessor: 'rating' },
//   ],
//   kiosks: [
//     { header: 'Location', accessor: 'location' },
//     { header: 'Village', accessor: 'village' },
//     { header: 'Operator', accessor: 'operatorName' },
//     { header: 'Organization', accessor: 'organizationType' },
//     { header: 'Active', accessor: 'isActive' },
//   ],
//   subscriptions: [
//     { header: 'Org Type', accessor: 'organizationType' },
//     { header: 'Plan', accessor: 'plan' },
//     { header: 'Status', accessor: 'paymentStatus' },
//     { header: 'Expires On', accessor: (item) => new Date(item.expiryDate).toLocaleDateString() },
//   ],
//   issues: [
//     { header: 'Issue Type', accessor: 'issueType' },
//     { header: 'Status', accessor: 'status' },
//     // --- FIX #2: Access the user's name from the populated object ---
//     // Instead of rendering the whole 'userId' object, we specify 'userId.fullName'.
//     { header: 'User', accessor: 'userId.fullName' },
//     { header: 'Description', accessor: 'description' },
//   ],
//   documents: [
//     { header: 'Doc Type', accessor: 'documentType' },
//     { header: 'Status', accessor: 'submissionStatus' },
//     { header: 'User ID', accessor: 'userId' },
//     { header: 'Issue ID', accessor: 'issueId' },
//   ],
//   voicequeries: [
//     { header: 'Language', accessor: 'language' },
//     { header: 'User ID', accessor: 'userId' },
//     { header: 'Issue ID', accessor: 'issueId' },
//     { header: 'Text', accessor: 'transcribedText' },
//   ],
// };

// // This helper function correctly handles nested paths like 'userId.fullName'
// const getNestedValue = (obj, path) => {
//     if (!path) return 'N/A';
//     return path.split('.').reduce((o, i) => o?.[i], obj);
// }

// const StatCard = ({ icon, title, value, color }) => (
//   <div className="bg-white p-6 rounded-xl border border-slate-200 flex items-center gap-4 shadow-sm">
//     <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>{icon}</div>
//     <div>
//       <p className="text-slate-500 text-sm">{title}</p>
//       <p className="text-2xl font-bold text-slate-900">{value}</p>
//     </div>
//   </div>
// );

// const AdminOverview = () => {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const response = await apiClient.get('/admins/stats');
//         setStats(response.data);
//       } catch (err) {
//         setError(err.message || 'Failed to fetch statistics.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStats();
//   }, []);

//   if (loading) return <Spinner />;
//   if (error) return <div className="text-red-600 p-4 bg-red-50 rounded-lg">{error}</div>;
//   if (!stats) return <div>No stats available.</div>;

//   const lineChartData = {
//     labels: stats.issuesLast30Days.map(d => new Date(d._id).toLocaleDateString()),
//     datasets: [{
//       label: 'Issues Created',
//       data: stats.issuesLast30Days.map(d => d.count),
//       borderColor: '#06b6d4', backgroundColor: 'rgba(6, 182, 212, 0.1)', fill: true, tension: 0.3
//     }]
//   };

//   const doughnutChartData = {
//     labels: stats.issueTypeDistribution.map(d => d._id),
//     datasets: [{
//       label: 'Issue Types',
//       data: stats.issueTypeDistribution.map(d => d.count),
//       backgroundColor: ['#06b6d4', '#ec4899', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444', '#64748b'],
//       borderColor: '#ffffff', borderWidth: 2
//     }]
//   };

//   return (
//     <div className="space-y-8">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <StatCard icon={<Users size={24} />} title="Total Users" value={stats.keyMetrics.totalUsers} color="bg-cyan-100 text-cyan-600" />
//         <StatCard icon={<FileText size={24} />} title="Total Legal Issues" value={stats.keyMetrics.totalIssues} color="bg-pink-100 text-pink-600" />
//         <StatCard icon={<Home size={24} />} title="Total Kiosks" value={stats.keyMetrics.totalKiosks} color="bg-purple-100 text-purple-600" />
//       </div>
//       <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
//         <div className="lg:col-span-3 bg-white p-6 rounded-xl border border-slate-200">
//           <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><LineChart size={20}/>Issues Created (Last 30 Days)</h3>
//           <div className="h-64"><Line data={lineChartData} options={{ maintainAspectRatio: false, responsive: true }} /></div>
//         </div>
//         <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200">
//           <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><PieChart size={20}/>Issue Type Distribution</h3>
//           <div className="h-64"><Doughnut data={doughnutChartData} options={{ maintainAspectRatio: false, responsive: true }} /></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const AdminPanelPage = () => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [editingItem, setEditingItem] = useState(null);
//   const [isAddKioskModalOpen, setAddKioskModalOpen] = useState(false);
//   const [isAddSubModalOpen, setAddSubModalOpen] = useState(false);
//   const [isEditModalOpen, setEditModalOpen] = useState(false);

//   const tabs = ['overview', ...Object.keys(columnsConfig)];
//   const tabName = (tab) => tab.charAt(0).toUpperCase() + tab.slice(1);
//   const canCreate = ['kiosks', 'subscriptions'].includes(activeTab);
//   const canEdit = !['subscriptions', 'voicequeries', 'overview'].includes(activeTab);

//   const handleCreateClick = () => {
//     if (activeTab === 'kiosks') setAddKioskModalOpen(true);
//     if (activeTab === 'subscriptions') setAddSubModalOpen(true);
//   };

//   const handleEditClick = (item) => {
//     setEditingItem(item);
//     setEditModalOpen(true);
//   };

//   const forceRerender = (tab) => {
//     // This is a simple trick to force the DataTable component to remount and refetch data
//     setActiveTab('');
//     setTimeout(() => setActiveTab(tab), 50);
//   };

//   return (
//     <>
//       <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
//         <div className="flex flex-wrap justify-between items-center gap-4">
//           <h1 className="text-4xl font-bold text-slate-900">Admin Panel</h1>
//           {canCreate && (
//             <button onClick={handleCreateClick} className="btn-primary w-auto">
//               <Plus size={16} /> Create New {tabName(activeTab).slice(0, -1)}
//             </button>
//           )}
//         </div>

//         <div className="flex flex-wrap gap-2 border-b border-slate-200">
//           {tabs.map(tab => (
//             <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'text-cyan-600 border-cyan-600' : 'text-slate-500 border-transparent hover:text-slate-800 hover:border-slate-300'}`}>
//               {tabName(tab)}
//             </button>
//           ))}
//         </div>

//         <div className="pt-4">
//           {activeTab === 'overview' ? (
//             <AdminOverview />
//           ) : (
//             <DataTable
//               endpoint={`/api/${activeTab}`}
//               title={tabName(activeTab)}
//               columns={columnsConfig[activeTab]}
//               onEdit={canEdit ? handleEditClick : null}
//               key={activeTab} // Using key to force remount on tab change
//             />
//           )}
//         </div>
//       </div>

//       <AddKioskModal isOpen={isAddKioskModalOpen} onClose={() => setAddKioskModalOpen(false)} onSuccess={() => forceRerender('kiosks')} />
//       <AddSubscriptionModal isOpen={isAddSubModalOpen} onClose={() => setAddSubModalOpen(false)} onSuccess={() => forceRerender('subscriptions')} />
//       {editingItem && (
//           <GenericEditModal
//             isOpen={isEditModalOpen}
//             onClose={() => setEditModalOpen(false)}
//             onSuccess={() => forceRerender(activeTab)}
//             itemData={editingItem}
//             columns={columnsConfig[activeTab] || []}
//             endpoint={`/api/${activeTab}`}
//             title={`Edit ${tabName(activeTab).slice(0, -1)}`}
//           />
//       )}
//     </>
//   );
// };

// const DataTable = ({ endpoint, title, columns, onEdit }) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError('');
//       try {
//         const response = await apiClient.get(endpoint);
//         setData(Array.isArray(response.data) ? response.data : (response.data?.data || []));
//       } catch (err) {
//         setError(err.response?.data?.message || err.message || `Failed to fetch ${title}.`);
//         setData([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [endpoint, title]);

//   const handleDelete = async (id) => {
//     if (window.confirm(`Are you sure you want to delete this ${title.slice(0, -1)}?`)) {
//       try {
//         await apiClient.delete(`${endpoint}/${id}`);
//         setData(prevData => prevData.filter(item => item._id !== id));
//         toast.success(`${title.slice(0, -1)} deleted successfully.`);
//       } catch (err) {
//         toast.error(`Failed to delete: ${err.response?.data?.message || err.message}`);
//       }
//     }
//   };

//   if (loading) return <div className="text-center p-8"><Spinner /></div>;
//   if (error) return <div className="text-red-600 p-4 bg-red-50 rounded-lg">{error}</div>;
//   if (data.length === 0) return <div className="text-center text-slate-500 p-8 bg-slate-50 rounded-lg">No {title} found.</div>;

//   return (
//     <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-slate-200">
//           <thead className="bg-slate-50">
//             <tr>
//               {columns.map(col => <th key={col.header} className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">{col.header}</th>)}
//               <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-slate-200">
//             {data.map(item => (
//               <tr key={item._id} className="hover:bg-slate-50 transition-colors">
//                 {columns.map(col => (
//                   <td key={`${item._id}-${col.header}`} className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
//                     {typeof col.accessor === 'function' 
//                         ? col.accessor(item) 
//                         : (getNestedValue(item, col.accessor) ?? 'N/A')}
//                   </td>
//                 ))}
//                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex items-center justify-end gap-4">
//                   {onEdit && <button onClick={() => onEdit(item)} className="text-cyan-600 hover:text-cyan-800 flex items-center gap-1"><Edit size={14}/> Edit</button>}
//                   <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-800 flex items-center gap-1">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminPanelPage;
// Final Corrected AdminPanelPage.jsx

import React, { useState, useEffect } from 'react';
import apiClient from '../api/axiosConfig';
import Spinner from '../components/Spinner';
import { Plus, Edit, Users, FileText, Home, LineChart, PieChart } from 'lucide-react';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler } from 'chart.js';
import toast from 'react-hot-toast';

import AddKioskModal from '../components/AddKioskModal.jsx';
import AddSubscriptionModal from '../components/AddSubscriptionModal.jsx';
import GenericEditModal from '../components/GenericEditModal.jsx';

// Register the Filler plugin to prevent chart warnings and enable area fills
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler);

const columnsConfig = {
    users: [
      { header: 'Full Name', accessor: 'fullName' },
      { header: 'Email', accessor: 'email' },
      { header: 'Role', accessor: 'role' },
    ],
    admins: [
      { header: 'Name', accessor: (item) => item.user?.fullName || 'N/A' },
      { header: 'Email', accessor: (item) => item.user?.email || 'N/A' },
      { header: 'Admin Role', accessor: 'adminRole' },
    ],
    employees: [
      { header: 'Name', accessor: (item) => item.user?.fullName || 'N/A' },
      { header: 'Email', accessor: (item) => item.user?.email || 'N/A' },
      { header: 'Designation', accessor: 'designation' },
    ],
    paralegals: [
      { header: 'Name', accessor: (item) => item.user?.fullName || 'N/A' },
      { header: 'Email', accessor: (item) => item.user?.email || 'N/A' },
      { header: 'Rating', accessor: 'rating' },
    ],
    kiosks: [
      { header: 'Location', accessor: 'location' },
      { header: 'Village', accessor: 'village' },
      { header: 'Operator', accessor: 'operatorName' },
      { header: 'Active', accessor: (item) => String(item.isActive) },
    ],
    subscriptions: [
      { header: 'Org Type', accessor: 'organizationType' },
      { header: 'Plan', accessor: 'plan' },
      { header: 'Expires On', accessor: (item) => new Date(item.expiryDate).toLocaleDateString() },
    ],
    issues: [
      { header: 'Issue Type', accessor: 'issueType' },
      { header: 'Status', accessor: 'status' },
      { header: 'User', accessor: 'userId.fullName' },
    ],
    documents: [
      { header: 'Doc Type', accessor: 'documentType' },
      { header: 'Status', accessor: 'submissionStatus' },
      { header: 'User ID', accessor: 'userId' },
    ],
    voicequeries: [
      { header: 'Language', accessor: 'language' },
      { header: 'User ID', accessor: 'userId' },
      { header: 'Text', accessor: 'transcribedText' },
    ],
};

const getNestedValue = (obj, path) => {
    if (!path) return 'N/A';
    return path.split('.').reduce((o, i) => o?.[i], obj);
}

const StatCard = ({ icon, title, value, color }) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 flex items-center gap-4 shadow-sm">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>{icon}</div>
      <div>
        <p className="text-slate-500 text-sm">{title}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
);
  
const AdminOverview = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    useEffect(() => {
      const fetchStats = async () => {
        try {
          const response = await apiClient.get('/admins/stats');
          setStats(response.data);
        } catch (err) {
          setError(err.message || 'Failed to fetch statistics.');
        } finally {
          setLoading(false);
        }
      };
      fetchStats();
    }, []);
  
    if (loading) return <Spinner />;
    if (error) return <div className="text-red-600 p-4 bg-red-50 rounded-lg">{error}</div>;
    if (!stats) return <div>No stats available.</div>;
  
    const lineChartData = {
      labels: stats.issuesLast30Days.map(d => new Date(d._id).toLocaleDateString()),
      datasets: [{
        label: 'Issues Created',
        data: stats.issuesLast30Days.map(d => d.count),
        borderColor: '#06b6d4', backgroundColor: 'rgba(6, 182, 212, 0.1)', fill: true, tension: 0.3
      }]
    };
  
    const doughnutChartData = {
      labels: stats.issueTypeDistribution.map(d => d._id),
      datasets: [{
        data: stats.issueTypeDistribution.map(d => d.count),
        backgroundColor: ['#06b6d4', '#ec4899', '#8b5cf6', '#f59e0b', '#10b981'],
        borderColor: '#ffffff', borderWidth: 2
      }]
    };
  
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard icon={<Users size={24} />} title="Total Users" value={stats.keyMetrics.totalUsers} color="bg-cyan-100 text-cyan-600" />
          <StatCard icon={<FileText size={24} />} title="Total Legal Issues" value={stats.keyMetrics.totalIssues} color="bg-pink-100 text-pink-600" />
          <StatCard icon={<Home size={24} />} title="Total Kiosks" value={stats.keyMetrics.totalKiosks} color="bg-purple-100 text-purple-600" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 bg-white p-6 rounded-xl border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Issues (Last 30 Days)</h3>
            <div className="h-64"><Line data={lineChartData} options={{ maintainAspectRatio: false, responsive: true }} /></div>
          </div>
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Issue Types</h3>
            <div className="h-64"><Doughnut data={doughnutChartData} options={{ maintainAspectRatio: false, responsive: true }} /></div>
          </div>
        </div>
      </div>
    );
};

const AdminPanelPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [editingItem, setEditingItem] = useState(null);
  const [isAddKioskModalOpen, setAddKioskModalOpen] = useState(false);
  const [isAddSubModalOpen, setAddSubModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const tabs = ['overview', ...Object.keys(columnsConfig)];
  const tabName = (tab) => tab.charAt(0).toUpperCase() + tab.slice(1);
  const canCreate = ['kiosks', 'subscriptions'].includes(activeTab);
  const canEdit = !['subscriptions', 'voicequeries', 'overview'].includes(activeTab);

  const handleCreateClick = () => {
    if (activeTab === 'kiosks') setAddKioskModalOpen(true);
    if (activeTab === 'subscriptions') setAddSubModalOpen(true);
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setEditModalOpen(true);
  };

  const forceRerender = (tab) => {
    setActiveTab('');
    setTimeout(() => setActiveTab(tab), 50);
  };

  return (
    <>
      <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <h1 className="text-4xl font-bold text-slate-900">Admin Panel</h1>
          {canCreate && (
            <button onClick={handleCreateClick} className="btn-primary w-auto">
              <Plus size={16} /> Create New {tabName(activeTab).slice(0, -1)}
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 border-b border-slate-200">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'text-cyan-600 border-cyan-600' : 'text-slate-500 border-transparent hover:text-slate-800 hover:border-slate-300'}`}>
              {tabName(tab)}
            </button>
          ))}
        </div>

        <div className="pt-4">
          {activeTab === 'overview' ? (
            <AdminOverview />
          ) : (
            <DataTable
              // --- THIS IS THE FIX ---
              // The endpoint is just the relative path. Axios prepends the baseURL.
              endpoint={`/${activeTab}`}
              title={tabName(activeTab)}
              columns={columnsConfig[activeTab]}
              onEdit={canEdit ? handleEditClick : null}
              key={activeTab}
            />
          )}
        </div>
      </div>

      <AddKioskModal isOpen={isAddKioskModalOpen} onClose={() => setAddKioskModalOpen(false)} onSuccess={() => forceRerender('kiosks')} />
      <AddSubscriptionModal isOpen={isAddSubModalOpen} onClose={() => setAddSubModalOpen(false)} onSuccess={() => forceRerender('subscriptions')} />
      {editingItem && (
          <GenericEditModal
            isOpen={isEditModalOpen}
            onClose={() => setEditModalOpen(false)}
            onSuccess={() => forceRerender(activeTab)}
            itemData={editingItem}
            columns={columnsConfig[activeTab] || []}
            // --- ALSO FIXING IT HERE ---
            endpoint={`/${activeTab}`}
            title={`Edit ${tabName(activeTab).slice(0, -1)}`}
          />
      )}
    </>
  );
};

const DataTable = ({ endpoint, title, columns, onEdit }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        setError('');
        try {
          const response = await apiClient.get(endpoint);
          setData(Array.isArray(response.data) ? response.data : (response.data?.data || []));
        } catch (err) {
          setError(err.response?.data?.message || err.message || `Failed to fetch ${title}.`);
          setData([]);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [endpoint, title]);
  
    const handleDelete = async (id) => {
      if (window.confirm(`Are you sure you want to delete this ${title.slice(0, -1)}?`)) {
        try {
          await apiClient.delete(`${endpoint}/${id}`);
          setData(prevData => prevData.filter(item => item._id !== id));
          toast.success(`${title.slice(0, -1)} deleted successfully.`);
        } catch (err) {
          toast.error(`Failed to delete: ${err.response?.data?.message || err.message}`);
        }
      }
    };
  
    if (loading) return <div className="text-center p-8"><Spinner /></div>;
    if (error) return <div className="text-red-600 p-4 bg-red-50 rounded-lg">{error}</div>;
    if (data.length === 0) return <div className="text-center text-slate-500 p-8 bg-slate-50 rounded-lg">No {title} found.</div>;
  
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                {columns.map(col => <th key={col.header} className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">{col.header}</th>)}
                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {data.map(item => (
                <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                  {columns.map(col => (
                    <td key={`${item._id}-${col.header}`} className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                      {typeof col.accessor === 'function' 
                          ? col.accessor(item) 
                          : (getNestedValue(item, col.accessor) ?? 'N/A')}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex items-center justify-end gap-4">
                    {onEdit && <button onClick={() => onEdit(item)} className="text-cyan-600 hover:text-cyan-800"><Edit size={14}/></button>}
                    <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-800">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default AdminPanelPage;