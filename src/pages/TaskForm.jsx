import { useForm } from "react-hook-form";
import {
  Activity,
  ClipboardList,
  CalendarDays,
  UserRound,
  Flag,
  FileText,
  Tag,
  CircleDot,
  Plus,
  RotateCcw,
  LogOut,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import "./TaskForm.css";

export default function TaskForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      employee: "",
      priority: "Medium",
      dueDate: "",
      category: "",
      status: "Pending",
    },
  });

  const onSubmit = (data) => {
    console.log("========== NEW TASK CREATED ==========");
    console.log("Task Details:", data);
    console.log("======================================");

    alert("Task details submitted successfully!");

    reset();
  };

  const handleLogout = () => {
    sessionStorage.removeItem("pulseworkLoggedIn");
    sessionStorage.removeItem("pulseworkUser");
    window.location.href = "/login";
  };

  return (
    <main className="task-page">
      {/* BACKGROUND DECORATIONS */}
      <div className="task-bg-grid"></div>
      <div className="task-bg-orb task-orb-one"></div>
      <div className="task-bg-orb task-orb-two"></div>

      {/* NAVBAR */}
      <header className="task-navbar">
        <a href="/" className="task-brand">
          <span className="task-brand-icon">
            <Activity size={25} />
          </span>

          <span>
            PulseWork <strong>AI.</strong>
            <small>INTELLIGENCE IN MOTION</small>
          </span>
        </a>

        <div className="task-nav-right">
          <span className="task-user-status">
            <span></span>
            Workspace Active
          </span>

          <button className="task-logout" onClick={handleLogout} type="button">
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <section className="task-main">
        {/* PAGE HEADING */}
        <div className="task-heading">
          <div className="task-heading-icon">
            <ClipboardList size={29} />
          </div>

          <div>
            <span className="task-kicker">PULSEWORK AI WORKSPACE</span>

            <h1>
              Create New <em>Task.</em>
            </h1>

            <p>
              Organize your workflow, assign responsibilities and manage your
              team's productivity.
            </p>
          </div>
        </div>

        {/* TASK FORM CARD */}
        <div className="task-card">
          <div className="task-card-header">
            <div>
              <span className="task-section-label">TASK MANAGEMENT</span>

              <h2>Task Information</h2>

              <p>Enter the details below to create a new task.</p>
            </div>

            <div className="task-secure-badge">
              <ShieldCheck size={17} />
              Secure Workspace
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* TASK TITLE */}
            <div className="task-field full-width">
              <label>
                <ClipboardList size={17} />
                Task Title <span>*</span>
              </label>

              <input
                type="text"
                placeholder="Enter your task title"
                {...register("title", {
                  required: "Task title is required",
                  minLength: {
                    value: 3,
                    message: "Title must contain at least 3 characters",
                  },
                })}
              />

              {errors.title && (
                <small className="task-error">{errors.title.message}</small>
              )}
            </div>

            {/* DESCRIPTION */}
            <div className="task-field full-width">
              <label>
                <FileText size={17} />
                Task Description <span>*</span>
              </label>

              <textarea
                rows="4"
                placeholder="Describe the task and its objectives..."
                {...register("description", {
                  required: "Task description is required",
                  minLength: {
                    value: 10,
                    message: "Description must contain at least 10 characters",
                  },
                })}
              />

              {errors.description && (
                <small className="task-error">
                  {errors.description.message}
                </small>
              )}
            </div>

            {/* TWO COLUMN FIELDS */}
            <div className="task-fields-grid">
              {/* EMPLOYEE */}
              <div className="task-field">
                <label>
                  <UserRound size={17} />
                  Assigned Employee <span>*</span>
                </label>

                <input
                  type="text"
                  placeholder="Enter employee name"
                  {...register("employee", {
                    required: "Employee name is required",
                  })}
                />

                {errors.employee && (
                  <small className="task-error">
                    {errors.employee.message}
                  </small>
                )}
              </div>

              {/* CATEGORY */}
              <div className="task-field">
                <label>
                  <Tag size={17} />
                  Task Category <span>*</span>
                </label>

                <select
                  {...register("category", {
                    required: "Please select a category",
                  })}
                >
                  <option value="">Select category</option>
                  <option value="Development">Development</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Research">Research</option>
                  <option value="Testing">Testing</option>
                  <option value="Documentation">Documentation</option>
                  <option value="Design">Design</option>
                  <option value="Other">Other</option>
                </select>

                {errors.category && (
                  <small className="task-error">
                    {errors.category.message}
                  </small>
                )}
              </div>

              {/* PRIORITY */}
              <div className="task-field">
                <label>
                  <Flag size={17} />
                  Priority Level
                </label>

                <select {...register("priority")}>
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                  <option value="Critical">Critical Priority</option>
                </select>
              </div>

              {/* DUE DATE */}
              <div className="task-field">
                <label>
                  <CalendarDays size={17} />
                  Due Date <span>*</span>
                </label>

                <input
                  type="date"
                  min={new Date().toLocaleDateString("en-CA")}
                  {...register("dueDate", {
                    required: "Please select a due date",
                    validate: (value) =>
                      value >= new Date().toLocaleDateString("en-CA") ||
                      "Due date cannot be in the past",
                  })}
                />

                {errors.dueDate && (
                  <small className="task-error">{errors.dueDate.message}</small>
                )}
              </div>

              {/* STATUS */}
              <div className="task-field">
                <label>
                  <CircleDot size={17} />
                  Task Status
                </label>

                <select {...register("status")}>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>
            </div>

            {/* FORM FOOTER */}
            <div className="task-form-footer">
              <p>
                <ShieldCheck size={16} />
                All required fields must be completed.
              </p>

              <div className="task-buttons">
                <button
                  type="button"
                  className="task-reset-btn"
                  onClick={() => reset()}
                >
                  <RotateCcw size={17} />
                  Reset
                </button>

                <button type="submit" className="task-submit-btn">
                  <Plus size={19} />
                  Create Task
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* BOTTOM INFORMATION */}
        <div className="task-bottom-note">
          <CheckCircle2 size={17} />
          <span>PulseWork AI — Intelligent task management.</span>
        </div>
      </section>

      <footer className="task-footer">
        © {new Date().getFullYear()} PulseWork AI. All rights reserved.
      </footer>
    </main>
  );
}
