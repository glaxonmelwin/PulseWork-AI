import { useMemo, useState } from "react";
import {
  Activity,
  LayoutDashboard,
  ClipboardList,
  Users,
  CalendarDays,
  ChartNoAxesCombined,
  Settings,
  Bell,
  Search,
  Plus,
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  CircleAlert,
  CirclePlus,
  Pencil,
  Trash2,
  MoreHorizontal,
  ShieldCheck,
  LogOut,
  Filter,
  Download,
  BriefcaseBusiness,
  TrendingUp,
  Zap,
  Target,
  UserRound,
  Check,
  CircleDot,
} from "lucide-react";

import "./Dashboard.css";

const employees = [
  "Alex Morgan",
  "Taylor Smith",
  "Casey Wilson",
  "Riley Johnson",
  "Jordan Lee",
  "Morgan Davis",
];

const initialTasks = [
  {
    id: 1,
    title: "Security Audit",
    description: "Review application security and identify vulnerabilities.",
    assignedTo: "Alex Morgan",
    priority: "High",
    status: "In Progress",
    dueDate: "2026-12-02",
    createdAt: "2026-11-27",
  },
  {
    id: 2,
    title: "API Documentation",
    description: "Prepare API documentation for the development team.",
    assignedTo: "Taylor Smith",
    priority: "Medium",
    status: "Pending",
    dueDate: "2026-12-04",
    createdAt: "2026-11-27",
  },
  {
    id: 3,
    title: "Database Optimization",
    description: "Improve database query performance.",
    assignedTo: "Casey Wilson",
    priority: "High",
    status: "Completed",
    dueDate: "2026-11-25",
    createdAt: "2026-11-24",
  },
  {
    id: 4,
    title: "UI Testing",
    description: "Test responsive layouts and user interactions.",
    assignedTo: "Riley Johnson",
    priority: "Low",
    status: "In Progress",
    dueDate: "2026-12-06",
    createdAt: "2026-11-27",
  },
];

const navItems = [
  { name: "Overview", icon: LayoutDashboard },
  { name: "My Tasks", icon: ClipboardList },
  { name: "Team Members", icon: Users },
  { name: "Calendar", icon: CalendarDays },
  { name: "Analytics", icon: ChartNoAxesCombined },
];

const emptyForm = {
  title: "",
  description: "",
  assignedTo: "",
  priority: "Medium",
  status: "Pending",
  dueDate: "",
};

export default function ManagerDashboard() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("pulseworkTasks");
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [activePage, setActivePage] = useState("Overview");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState("");

  const [form, setForm] = useState(emptyForm);

  const userEmail =
    sessionStorage.getItem("pulseworkUser") || "manager@demo.com";

  const managerName = userEmail
    .split("@")[0]
    .replace(/[._-]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const saveTasks = (updatedTasks) => {
    setTasks(updatedTasks);
    localStorage.setItem("pulseworkTasks", JSON.stringify(updatedTasks));
  };

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  };

  const stats = useMemo(() => {
    const completed = tasks.filter((t) => t.status === "Completed").length;
    const pending = tasks.filter((t) => t.status === "Pending").length;
    const progress = tasks.filter((t) => t.status === "In Progress").length;
    const overdue = tasks.filter(
      (t) =>
        t.status !== "Completed" &&
        t.dueDate &&
        new Date(t.dueDate + "T23:59:59") < new Date(),
    ).length;

    return {
      total: tasks.length,
      completed,
      pending,
      progress,
      overdue,
      rate: tasks.length ? Math.round((completed / tasks.length) * 100) : 0,
    };
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.assignedTo.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = filter === "All" || task.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [tasks, search, filter]);

  const openCreateModal = () => {
    setEditingTask(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setForm({
      title: task.title || "",
      description: task.description || "",
      assignedTo: task.assignedTo || "",
      priority: task.priority || "Medium",
      status: task.status || "Pending",
      dueDate: task.dueDate || "",
    });
    setShowModal(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.title.trim() || !form.assignedTo || !form.dueDate) {
      showToast("Please complete all required fields.");
      return;
    }

    if (editingTask) {
      const updated = tasks.map((task) =>
        task.id === editingTask.id ? { ...task, ...form } : task,
      );
      saveTasks(updated);
      showToast("Task updated successfully!");
    } else {
      const newTask = {
        ...form,
        id: Date.now(),
        createdAt: new Date().toISOString().slice(0, 10),
      };
      saveTasks([newTask, ...tasks]);
      showToast("New task created successfully!");
    }

    setShowModal(false);
    setEditingTask(null);
    setForm(emptyForm);
  };

  const deleteTask = (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    saveTasks(tasks.filter((task) => task.id !== id));
    showToast("Task deleted successfully.");
  };

  const updateStatus = (id, status) => {
    saveTasks(
      tasks.map((task) => (task.id === id ? { ...task, status } : task)),
    );
    showToast("Task status updated.");
  };

  const logout = () => {
    sessionStorage.removeItem("pulseworkLoggedIn");
    sessionStorage.removeItem("pulseworkUser");
    sessionStorage.removeItem("pulseworkRole");
    window.location.href = "/login";
  };

  const formatDate = (date) => {
    if (!date) return "No deadline";
    return new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const statusStyle = (status) => {
    if (status === "Completed") return "status-completed";
    if (status === "In Progress") return "status-progress";
    return "status-pending";
  };

  const priorityStyle = (priority) => {
    if (priority === "High") return "priority-high";
    if (priority === "Medium") return "priority-medium";
    return "priority-low";
  };
  // Calendar states
  const [calendarMonth, setCalendarMonth] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );

  const [calendarSelectedDate, setCalendarSelectedDate] = useState(() =>
    new Date().toLocaleDateString("en-CA"),
  );

  const [calendarEvents, setCalendarEvents] = useState(() => {
    return JSON.parse(localStorage.getItem("pulseworkCalendarEvents") || "[]");
  });

  const [showCalendarForm, setShowCalendarForm] = useState(false);
  const [editingCalendarEvent, setEditingCalendarEvent] = useState(null);

  const [calendarForm, setCalendarForm] = useState({
    title: "",
    description: "",
    color: "olive",
  });

  const getCalendarDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const changeCalendarMonth = (amount) => {
    setCalendarMonth(
      (previous) =>
        new Date(previous.getFullYear(), previous.getMonth() + amount, 1),
    );
  };

  const saveCalendarEvents = (updatedEvents) => {
    setCalendarEvents(updatedEvents);
    localStorage.setItem(
      "pulseworkCalendarEvents",
      JSON.stringify(updatedEvents),
    );
  };

  const openCalendarForm = (event = null) => {
    setEditingCalendarEvent(event);

    setCalendarForm({
      title: event?.title || "",
      description: event?.description || "",
      color: event?.color || "olive",
    });

    setShowCalendarForm(true);
  };

  const handleCalendarEventSave = (e) => {
    e.preventDefault();

    if (!calendarForm.title.trim()) return;

    let updatedEvents;

    if (editingCalendarEvent) {
      updatedEvents = calendarEvents.map((event) =>
        event.id === editingCalendarEvent.id
          ? {
              ...event,
              ...calendarForm,
            }
          : event,
      );
    } else {
      updatedEvents = [
        ...calendarEvents,
        {
          id: Date.now(),
          date: calendarSelectedDate,
          ...calendarForm,
        },
      ];
    }

    saveCalendarEvents(updatedEvents);
    setShowCalendarForm(false);
    setEditingCalendarEvent(null);
  };

  const deleteCalendarEvent = (eventId) => {
    const updatedEvents = calendarEvents.filter(
      (event) => event.id !== eventId,
    );

    saveCalendarEvents(updatedEvents);
  };

  const firstDayOfMonth = new Date(
    calendarMonth.getFullYear(),
    calendarMonth.getMonth(),
    1,
  ).getDay();

  const daysInMonth = new Date(
    calendarMonth.getFullYear(),
    calendarMonth.getMonth() + 1,
    0,
  ).getDate();

  const calendarDays = [
    ...Array(firstDayOfMonth).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  const selectedDateTasks = tasks.filter(
    (task) => task.dueDate === calendarSelectedDate,
  );

  const selectedDateEvents = calendarEvents.filter(
    (event) => event.date === calendarSelectedDate,
  );

  const isToday = (dateKey) => dateKey === getCalendarDateKey(new Date());

  return (
    <div className="dashboard-shell">
      {/* SIDEBAR */}
      <aside
        className={`dashboard-sidebar ${sidebarOpen ? "sidebar-open" : ""}`}
      >
        <div className="sidebar-brand">
          <div>
            <h2>PulseWork AI</h2>
            <p>INTELLIGENCE IN MOTION</p>
          </div>
          <button
            className="mobile-close"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-workspace">
          <div className="workspace-avatar">P</div>
          <div>
            <h4>PulseWork Workspace</h4>
            <p>Manager Account</p>
          </div>
          <ChevronDown size={15} />
        </div>

        <p className="sidebar-label">WORKSPACE</p>

        <nav className="sidebar-navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => {
                  setActivePage(item.name);
                  setSidebarOpen(false);
                }}
                className={`sidebar-link ${activePage === item.name ? "sidebar-link-active" : ""}`}
              >
                <Icon size={19} />
                <span>{item.name}</span>
                {item.name === "My Tasks" && (
                  <span className="sidebar-count">{tasks.length}</span>
                )}
              </button>
            );
          })}
        </nav>

        <p className="sidebar-label sidebar-tools-label">PREFERENCES</p>

        <button
          className="sidebar-link"
          onClick={() => setActivePage("Settings")}
        >
          <Settings size={19} />
          <span>Settings</span>
        </button>

        <div className="sidebar-bottom">
          <div className="sidebar-help">
            <div className="help-icon">
              <Zap size={18} />
            </div>
            <h4>Need assistance?</h4>
            <p>Manage your workspace with PulseWork AI.</p>
            <button onClick={() => showToast("Help center coming soon!")}>
              Explore Help <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="sidebar-profile">
            <div className="profile-avatar">{managerName.charAt(0) || "M"}</div>
            <div className="profile-info">
              <h4>{managerName}</h4>
              <p>Workspace Manager</p>
            </div>
            <button onClick={logout} title="Logout">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <main className="dashboard-main">
        {/* TOPBAR */}
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <button
              className="mobile-menu"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>

            <div>
              <p className="breadcrumb">Workspace / {activePage}</p>
              <h2>{activePage}</h2>
            </div>
          </div>

          <div className="topbar-actions">
            <div className="topbar-search">
              <Search size={17} />
              <input
                placeholder="Search tasks or employees..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <kbd>⌘ K</kbd>
            </div>

            <div className="notification-wrapper">
              <button
                className="notification-button"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={19} />
                <span />
              </button>

              {showNotifications && (
                <div className="notification-panel">
                  <div className="flex justify-between items-center">
                    <h3>Notifications</h3>
                    <button onClick={() => setShowNotifications(false)}>
                      <X size={16} />
                    </button>
                  </div>
                  <div className="notification-item">
                    <CheckCircle2 size={18} />
                    <div>
                      <b>{stats.completed} tasks completed</b>
                      <p>Your team's completed work.</p>
                    </div>
                  </div>
                  <div className="notification-item">
                    <CircleAlert size={18} />
                    <div>
                      <b>{stats.overdue} overdue tasks</b>
                      <p>Review tasks past their deadlines.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="topbar-user">
              <div className="profile-avatar">
                {managerName.charAt(0) || "M"}
              </div>
              <div>
                <h4>{managerName}</h4>
                <p>Administrator</p>
              </div>
              <ChevronDown size={15} />
            </div>
          </div>
        </header>

        {/* PAGE BODY */}
        <div className="dashboard-content">
          {/* WELCOME */}
          <section className="welcome-section">
            <div>
              <div className="welcome-tag">
                <Activity size={14} /> WORKSPACE OVERVIEW
              </div>
              <h1>
                Good morning, {managerName.split(" ")[0]} <span>✦</span>
              </h1>
              <p>Here's what's happening with your team today.</p>
            </div>

            <button className="create-task-button" onClick={openCreateModal}>
              <Plus size={19} /> Create New Task
            </button>
          </section>

          {/* STATS */}
          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-top">
                <span>Total Tasks</span>
                <div className="stat-icon olive">
                  <ClipboardList size={20} />
                </div>
              </div>
              <h2>{stats.total}</h2>
              <p>
                <TrendingUp size={14} /> All assigned tasks
              </p>
              <div className="stat-decoration"></div>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span>Completed</span>
                <div className="stat-icon green">
                  <CheckCircle2 size={20} />
                </div>
              </div>
              <h2>{stats.completed}</h2>
              <p>
                <Check size={14} /> Successfully finished
              </p>
              <div className="stat-decoration"></div>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span>In Progress</span>
                <div className="stat-icon blue">
                  <Clock size={20} />
                </div>
              </div>
              <h2>{stats.progress}</h2>
              <p>
                <Activity size={14} /> Currently being worked on
              </p>
              <div className="stat-decoration"></div>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span>Overdue Tasks</span>
                <div className="stat-icon red">
                  <CircleAlert size={20} />
                </div>
              </div>
              <h2>{stats.overdue}</h2>
              <p>
                <CircleDot size={14} /> Requires attention
              </p>
              <div className="stat-decoration"></div>
            </div>
          </section>

          {/* MAIN GRID */}
          {activePage === "Overview" || activePage === "My Tasks" ? (
            <div className="dashboard-grid">
              {/* TASK TABLE */}
              <section className="dashboard-panel tasks-panel">
                <div className="panel-heading">
                  <div>
                    <h3>Task Management</h3>
                    <p>Monitor and manage your team's assignments.</p>
                  </div>

                  <button
                    className="panel-create-button"
                    onClick={openCreateModal}
                  >
                    <Plus size={16} /> New Task
                  </button>
                </div>

                <div className="task-toolbar">
                  <div className="task-filters">
                    {["All", "Pending", "In Progress", "Completed"].map(
                      (item) => (
                        <button
                          key={item}
                          onClick={() => setFilter(item)}
                          className={filter === item ? "filter-active" : ""}
                        >
                          {item}
                        </button>
                      ),
                    )}
                  </div>
                  <button
                    className="filter-icon-button"
                    onClick={() => {
                      setFilter("All");
                      setSearch("");
                    }}
                    title="Clear filters"
                  >
                    <Filter size={16} />
                  </button>
                </div>

                <div className="task-list">
                  {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                      <article className="task-row" key={task.id}>
                        <div className="task-main">
                          <div className="task-title-line">
                            <h4>{task.title}</h4>
                            <span
                              className={`priority-badge ${priorityStyle(task.priority)}`}
                            >
                              {task.priority}
                            </span>
                          </div>
                          <p>{task.description}</p>
                          <div className="task-meta">
                            <span>
                              <UserRound size={14} /> {task.assignedTo}
                            </span>
                            <span>
                              <CalendarDays size={14} />{" "}
                              {formatDate(task.dueDate)}
                            </span>
                          </div>
                        </div>

                        <div className="task-row-actions">
                          <select
                            value={task.status}
                            onChange={(e) =>
                              updateStatus(task.id, e.target.value)
                            }
                            className={`task-status-select ${statusStyle(task.status)}`}
                          >
                            <option>Pending</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                          </select>

                          <button
                            onClick={() => openEditModal(task)}
                            title="Edit"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => deleteTask(task.id)}
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </article>
                    ))
                  ) : (
                    <div className="empty-tasks">
                      <ClipboardList size={38} />
                      <h4>No tasks found</h4>
                      <p>Try another filter or create a new task.</p>
                      <button onClick={openCreateModal}>Create Task</button>
                    </div>
                  )}
                </div>

                <div className="task-list-footer">
                  Showing {filteredTasks.length} of {tasks.length} tasks
                </div>
              </section>

              {/* RIGHT COLUMN */}
              <div className="dashboard-right-column">
                {/* PRODUCTIVITY */}
                <section className="dashboard-panel productivity-panel">
                  <div className="panel-heading">
                    <div>
                      <h3>Productivity</h3>
                      <p>Team completion overview</p>
                    </div>
                    <ChartNoAxesCombined size={20} />
                  </div>

                  <div className="productivity-circle">
                    <div className="circle-inner">
                      <h2>{stats.rate}%</h2>
                      <p>Completed</p>
                    </div>
                  </div>

                  <div className="productivity-legend">
                    <div>
                      <span className="legend-dot completed-dot"></span>{" "}
                      Completed <b>{stats.completed}</b>
                    </div>
                    <div>
                      <span className="legend-dot progress-dot"></span> In
                      Progress <b>{stats.progress}</b>
                    </div>
                    <div>
                      <span className="legend-dot pending-dot"></span> Pending{" "}
                      <b>{stats.pending}</b>
                    </div>
                  </div>
                </section>

                {/* TEAM */}
                <section className="dashboard-panel team-panel">
                  <div className="panel-heading">
                    <div>
                      <h3>Team Members</h3>
                      <p>Assignment overview</p>
                    </div>
                    <button onClick={() => setActivePage("Team Members")}>
                      View all <ArrowUpRight size={15} />
                    </button>
                  </div>

                  {employees.slice(0, 4).map((employee, index) => {
                    const assigned = tasks.filter(
                      (t) => t.assignedTo === employee,
                    );
                    const finished = assigned.filter(
                      (t) => t.status === "Completed",
                    ).length;
                    return (
                      <div className="team-member" key={employee}>
                        <div className={`team-avatar avatar-${index + 1}`}>
                          {employee
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="team-member-info">
                          <h4>{employee}</h4>
                          <p>{assigned.length} assigned tasks</p>
                        </div>
                        <span>
                          {assigned.length
                            ? Math.round((finished / assigned.length) * 100)
                            : 0}
                          %
                        </span>
                      </div>
                    );
                  })}
                </section>
              </div>
            </div>
          ) : activePage === "Team Members" ? (
            <section className="dashboard-panel alternate-panel">
              <div className="panel-heading">
                <div>
                  <h3>Team Directory</h3>
                  <p>Employees in your workspace</p>
                </div>
              </div>
              <div className="employee-grid">
                {employees.map((employee, index) => {
                  const assigned = tasks.filter(
                    (t) => t.assignedTo === employee,
                  );
                  return (
                    <div className="employee-card" key={employee}>
                      <div className={`team-avatar avatar-${index + 1}`}>
                        {employee
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <h3>{employee}</h3>
                      <p>Team Member</p>
                      <div>{assigned.length} assigned tasks</div>
                      <button
                        onClick={() => {
                          setSearch(employee);
                          setActivePage("My Tasks");
                        }}
                      >
                        View Tasks <ArrowUpRight size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          ) : activePage === "Calendar" ? (
            <section className="dashboard-panel attractive-calendar">
              <div className="calendar-main-heading">
                <div>
                  <h3>My Calendar</h3>
                  <p>Plan your schedule and manage important events</p>
                </div>

                <button
                  className="calendar-add-button"
                  onClick={() => openCalendarForm()}
                >
                  + Add Event
                </button>
              </div>

              <div className="calendar-layout">
                {/* MONTHLY CALENDAR */}
                <div className="calendar-month-card">
                  <div className="calendar-month-header">
                    <button onClick={() => changeCalendarMonth(-1)}>‹</button>

                    <h2>
                      {calendarMonth.toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </h2>

                    <button onClick={() => changeCalendarMonth(1)}>›</button>
                  </div>

                  <div className="calendar-weekdays">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day) => (
                        <div key={day}>{day}</div>
                      ),
                    )}
                  </div>

                  <div className="calendar-grid">
                    {calendarDays.map((day, index) => {
                      if (!day) {
                        return (
                          <div
                            className="calendar-empty-day"
                            key={`empty-${index}`}
                          />
                        );
                      }

                      const currentDate = new Date(
                        calendarMonth.getFullYear(),
                        calendarMonth.getMonth(),
                        day,
                      );

                      const dateKey = getCalendarDateKey(currentDate);

                      const hasTask = tasks.some(
                        (task) => task.dueDate === dateKey,
                      );

                      const dayEvents = calendarEvents.filter(
                        (event) => event.date === dateKey,
                      );

                      const isSelected = calendarSelectedDate === dateKey;

                      return (
                        <button
                          key={dateKey}
                          className={`calendar-day
                  ${isToday(dateKey) ? "today" : ""}
                  ${isSelected ? "selected" : ""}
                `}
                          onClick={() => setCalendarSelectedDate(dateKey)}
                        >
                          <span>{day}</span>

                          <div className="calendar-day-dots">
                            {hasTask && (
                              <span className="calendar-dot task-dot" />
                            )}

                            {dayEvents.slice(0, 3).map((event) => (
                              <span
                                key={event.id}
                                className={`calendar-dot ${event.color}-dot`}
                              />
                            ))}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="calendar-legend">
                    <span>
                      <i className="task-dot" /> Task deadline
                    </span>
                    <span>
                      <i className="olive-dot" /> Event
                    </span>
                    <span>
                      <i className="blue-dot" /> Important
                    </span>
                    <span>
                      <i className="pink-dot" /> Personal
                    </span>
                  </div>
                </div>

                {/* SELECTED DATE DETAILS */}
                <div className="calendar-details-card">
                  <div className="calendar-details-heading">
                    <div>
                      <span className="calendar-small-label">
                        SELECTED DATE
                      </span>

                      <h3>
                        {new Date(
                          calendarSelectedDate + "T00:00:00",
                        ).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </h3>
                    </div>

                    <CalendarDays size={25} />
                  </div>

                  <button
                    className="calendar-detail-add"
                    onClick={() => openCalendarForm()}
                  >
                    + Create event for this date
                  </button>

                  <div className="calendar-events-list">
                    <h4>Events</h4>

                    {selectedDateEvents.length === 0 ? (
                      <p className="calendar-no-events">
                        No events scheduled for this date.
                      </p>
                    ) : (
                      selectedDateEvents.map((event) => (
                        <div className="calendar-event-item" key={event.id}>
                          <div className={`event-color-line ${event.color}`} />

                          <div className="calendar-event-content">
                            <h5>{event.title}</h5>

                            {event.description && <p>{event.description}</p>}

                            <span>Personal event</span>
                          </div>

                          <div className="calendar-event-actions">
                            <button
                              onClick={() => openCalendarForm(event)}
                              title="Edit event"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => deleteCalendarEvent(event.id)}
                              title="Delete event"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))
                    )}

                    <h4 className="calendar-task-heading">Task Deadlines</h4>

                    {selectedDateTasks.length === 0 ? (
                      <p className="calendar-no-events">
                        No task deadlines for this date.
                      </p>
                    ) : (
                      selectedDateTasks.map((task) => (
                        <div className="calendar-event-item" key={task.id}>
                          <div className="event-color-line task-line" />

                          <div className="calendar-event-content">
                            <h5>{task.title}</h5>
                            <p>Assigned to {task.assignedTo}</p>

                            <span
                              className={`priority-badge ${priorityStyle(task.priority)}`}
                            >
                              {task.priority}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* ADD / EDIT EVENT FORM */}
              {showCalendarForm && (
                <div className="calendar-modal-overlay">
                  <form
                    className="calendar-event-modal"
                    onSubmit={handleCalendarEventSave}
                  >
                    <div className="calendar-modal-heading">
                      <div>
                        <h3>
                          {editingCalendarEvent ? "Edit Event" : "Create Event"}
                        </h3>
                        <p>
                          {editingCalendarEvent
                            ? "Update your event details"
                            : "Add something important to your calendar"}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowCalendarForm(false)}
                      >
                        ×
                      </button>
                    </div>

                    <label>Event Name</label>
                    <input
                      type="text"
                      placeholder="Enter event name"
                      value={calendarForm.title}
                      onChange={(e) =>
                        setCalendarForm({
                          ...calendarForm,
                          title: e.target.value,
                        })
                      }
                      required
                    />

                    <label>Description</label>
                    <textarea
                      placeholder="Add event details..."
                      value={calendarForm.description}
                      onChange={(e) =>
                        setCalendarForm({
                          ...calendarForm,
                          description: e.target.value,
                        })
                      }
                    />

                    <label>Event Category</label>
                    <select
                      value={calendarForm.color}
                      onChange={(e) =>
                        setCalendarForm({
                          ...calendarForm,
                          color: e.target.value,
                        })
                      }
                    >
                      <option value="olive">General</option>
                      <option value="blue">Important</option>
                      <option value="pink">Personal</option>
                    </select>

                    <div className="calendar-modal-actions">
                      <button
                        type="button"
                        className="calendar-cancel-button"
                        onClick={() => setShowCalendarForm(false)}
                      >
                        Cancel
                      </button>

                      <button type="submit" className="calendar-save-button">
                        {editingCalendarEvent ? "Update Event" : "Save Event"}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </section>
          ) : activePage === "Analytics" ? (
            <section className="analytics-grid">
              <div className="dashboard-panel analytics-card">
                <ChartNoAxesCombined size={26} />
                <h3>{stats.rate}%</h3>
                <p>Overall completion rate</p>
              </div>
              <div className="dashboard-panel analytics-card">
                <Target size={26} />
                <h3>{stats.completed}</h3>
                <p>Completed tasks</p>
              </div>
              <div className="dashboard-panel analytics-card">
                <Clock size={26} />
                <h3>{stats.progress}</h3>
                <p>Active tasks</p>
              </div>
              <div className="dashboard-panel analytics-card">
                <CircleAlert size={26} />
                <h3>{stats.overdue}</h3>
                <p>Overdue tasks</p>
              </div>
            </section>
          ) : (
            <section className="dashboard-panel alternate-panel">
              <h3>Workspace Settings</h3>
              <p>Settings and preferences will be available here.</p>
              <button className="create-task-button mt-5" onClick={logout}>
                <LogOut size={17} /> Logout
              </button>
            </section>
          )}

          <footer className="dashboard-footer">
            <span>© 2026 PulseWork AI</span>
            <span>
              <ShieldCheck size={14} /> Secure Workspace
            </span>
            <span>Intelligence in Motion</span>
          </footer>
        </div>
      </main>

      {/* CREATE / EDIT TASK MODAL */}
      {showModal && (
        <div
          className="modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <div className="task-modal">
            <div className="modal-heading">
              <div>
                <span>TASK MANAGEMENT</span>
                <h2>{editingTask ? "Edit Task" : "Create New Task"}</h2>
                <p>Assign work and keep your team moving.</p>
              </div>
              <button onClick={() => setShowModal(false)}>
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label>
                Task Title <span>*</span>
              </label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Enter task title"
                required
              />

              <label>Description</label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Describe the task and expected outcome..."
                rows={4}
              />

              <div className="modal-form-grid">
                <div>
                  <label>
                    Assign Employee <span>*</span>
                  </label>
                  <select
                    value={form.assignedTo}
                    onChange={(e) =>
                      setForm({ ...form, assignedTo: e.target.value })
                    }
                    required
                  >
                    <option value="">Select employee</option>
                    {employees.map((employee) => (
                      <option key={employee}>{employee}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>Priority</label>
                  <select
                    value={form.priority}
                    onChange={(e) =>
                      setForm({ ...form, priority: e.target.value })
                    }
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>

                <div>
                  <label>Status</label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>

                <div>
                  <label>
                    Due Date <span>*</span>
                  </label>
                  <input
                    type="date"
                    value={form.dueDate}
                    onChange={(e) =>
                      setForm({ ...form, dueDate: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit">
                  {editingTask ? <Check size={17} /> : <Plus size={17} />}
                  {editingTask ? "Save Changes" : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="dashboard-toast">
          <CheckCircle2 size={19} />
          {toast}
        </div>
      )}
    </div>
  );
}
