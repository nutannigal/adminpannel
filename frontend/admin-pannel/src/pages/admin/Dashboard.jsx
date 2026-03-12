import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { token, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('services');
  const navigate = useNavigate();

  // Services
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ title: '', description: '', icon: '' });
  const [editingService, setEditingService] = useState(null);

  // Jobs
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({ title: '', location: '', description: '' });
  const [editingJob, setEditingJob] = useState(null);

  // Contacts
  const [contacts, setContacts] = useState([]);

  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: { 'x-auth-token': token }
  });

  useEffect(() => {
    if (activeTab === 'services') fetchServices();
    if (activeTab === 'jobs') fetchJobs();
    if (activeTab === 'contacts') fetchContacts();
  }, [activeTab]);

  const fetchServices = async () => {
    try {
      const res = await api.get('/services');
      setServices(res.data);
    } catch (err) {
      console.log('error fetch services:', err);
    }
  };

  const fetchJobs = async () => {
    try {
      const res = await api.get('/jobs');
      setJobs(res.data);
    } catch (err) {
      console.log('error fetch jobs:', err);
    }
  };

  const fetchContacts = async () => {
    try {
      const res = await api.get('/contacts');
      setContacts(res.data);
    } catch (err) {
      console.log('error fetch contacts:', err);
    }
  };

  // Service handlers
  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/services', newService);
      setServices([...services, res.data]);
      setNewService({ title: '', description: '', icon: '' });
    } catch (err) {
      console.error('error add service:', err);
    }
  };

  const handleUpdateService = async (id) => {
    try {
      const res = await api.put(`/services/${id}`, editingService);
      setServices(services.map(s => (s._id === id ? res.data : s)));
      setEditingService(null);
    } catch (err) {
      console.error('error updating service:', err);
    }
  };

  const handleDeleteService = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await api.delete(`/services/${id}`);
        setServices(services.filter(s => s._id !== id));
      } catch (err) {
        console.error('error deleting service:', err);
      }
    }
  };

  // Job handlers
  const handleAddJob = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/jobs', newJob);
      setJobs([...jobs, res.data]);
      setNewJob({ title: '', location: '', description: '' });
    } catch (err) {
      console.error('error add job:', err);
    }
  };

  const handleUpdateJob = async (id) => {
    try {
      const res = await api.put(`/jobs/${id}`, editingJob);
      setJobs(jobs.map(j => (j._id === id ? res.data : j)));
      setEditingJob(null);
    } catch (err) {
      console.error('error updating job:', err);
    }
  };

  const handleDeleteJob = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await api.delete(`/jobs/${id}`);
        setJobs(jobs.filter(j => j._id !== id));
      } catch (err) {
        console.error('error deleting job:', err);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <nav className="col-md-2 d-md-block bg-light sidebar vh-100">
          <div className="position-sticky pt-3">
            <h5 className="px-3">Admin Panel</h5>
            <ul className="nav flex-column">
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link ${activeTab === 'services' ? 'active' : ''}`}
                  onClick={() => setActiveTab('services')}
                >
                  Services
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link ${activeTab === 'jobs' ? 'active' : ''}`}
                  onClick={() => setActiveTab('jobs')}
                >
                  Jobs
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link ${activeTab === 'contacts' ? 'active' : ''}`}
                  onClick={() => setActiveTab('contacts')}
                >
                  Contacts
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link text-danger" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main content */}
        <main className="col-md-10 ms-sm-auto px-md-4">
          {/* Services Tab */}
          {activeTab === 'services' && (
            <div className="mt-4">
              <h2>Manage Services</h2>
              <form onSubmit={handleAddService} className="mb-4">
                <div className="row">
                  <div className="col-md-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Title"
                      value={newService.title}
                      onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Description"
                      value={newService.description}
                      onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Icon class"
                      value={newService.icon}
                      onChange={(e) => setNewService({ ...newService, icon: e.target.value })}
                    />
                  </div>
                  <div className="col-md-2">
                    <button type="submit" className="btn btn-primary w-100">Add</button>
                  </div>
                </div>
              </form>

              <table className="table">
                <thead>
                  <tr><th>Title</th><th>Description</th><th>Icon</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {services.map(service => (
                    <tr key={service._id}>
                      {editingService && editingService._id === service._id ? (
                        <>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              value={editingService.title}
                              onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              value={editingService.description}
                              onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              value={editingService.icon}
                              onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                            />
                          </td>
                          <td>
                            <button className="btn btn-success btn-sm me-2" onClick={() => handleUpdateService(service._id)}>Save</button>
                            <button className="btn btn-secondary btn-sm" onClick={() => setEditingService(null)}>Cancel</button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{service.title}</td>
                          <td>{service.description}</td>
                          <td>{service.icon}</td>
                          <td>
                            <button className="btn btn-warning btn-sm me-2" onClick={() => setEditingService(service)}>Edit</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteService(service._id)}>Delete</button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Jobs Tab */}
          {activeTab === 'jobs' && (
            <div className="mt-4">
              <h2>Manage Jobs</h2>
              <form onSubmit={handleAddJob} className="mb-4">
                <div className="row">
                  <div className="col-md-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Title"
                      value={newJob.title}
                      onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Location"
                      value={newJob.location}
                      onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Description"
                      value={newJob.description}
                      onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-2">
                    <button type="submit" className="btn btn-primary w-100">Add</button>
                  </div>
                </div>
              </form>

              <table className="table">
                <thead>
                  <tr><th>Title</th><th>Location</th><th>Description</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {jobs.map(job => (
                    <tr key={job._id}>
                      {editingJob && editingJob._id === job._id ? (
                        <>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              value={editingJob.title}
                              onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              value={editingJob.location}
                              onChange={(e) => setEditingJob({ ...editingJob, location: e.target.value })}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              value={editingJob.description}
                              onChange={(e) => setEditingJob({ ...editingJob, description: e.target.value })}
                            />
                          </td>
                          <td>
                            <button className="btn btn-success btn-sm me-2" onClick={() => handleUpdateJob(job._id)}>Save</button>
                            <button className="btn btn-secondary btn-sm" onClick={() => setEditingJob(null)}>Cancel</button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{job.title}</td>
                          <td>{job.location}</td>
                          <td>{job.description}</td>
                          <td>
                            <button className="btn btn-warning btn-sm me-2" onClick={() => setEditingJob(job)}>Edit</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteJob(job._id)}>Delete</button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Contacts Tab */}
          {activeTab === 'contacts' && (
            <div className="mt-4">
              <h2>Contact Messages</h2>
              <table className="table">
                <thead>
                  <tr><th>Name</th><th>Email</th><th>Message</th><th>Date</th></tr>
                </thead>
                <tbody>
                  {contacts.map(contact => (
                    <tr key={contact._id}>
                      <td>{contact.name}</td>
                      <td>{contact.email}</td>
                      <td>{contact.message}</td>
                      <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}