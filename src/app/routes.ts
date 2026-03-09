import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { LoginPage } from "./pages/LoginPage";
import { StudentDashboard } from "./pages/StudentDashboard";
import { ParentDashboard } from "./pages/ParentDashboard";
import { TeacherDashboard } from "./pages/TeacherDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AcademicPage } from "./pages/AcademicPage";
import { FinancialPage } from "./pages/FinancialPage";
import { RequestsPage } from "./pages/RequestsPage";
import { AnnouncementsPage } from "./pages/AnnouncementsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: LoginPage },
      { path: "student", Component: StudentDashboard },
      { path: "parent", Component: ParentDashboard },
      { path: "teacher", Component: TeacherDashboard },
      { path: "admin", Component: AdminDashboard },
      { path: "academic", Component: AcademicPage },
      { path: "financial", Component: FinancialPage },
      { path: "requests", Component: RequestsPage },
      { path: "announcements", Component: AnnouncementsPage },
      { path: "profile", Component: ProfilePage },
      { path: "*", Component: NotFound },
    ],
  },
]);
