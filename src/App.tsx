import { useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useAppSelector } from "@/redux/hooks";
import { savePreference, themeStorageKey } from "@/lib/themes";

export default function App() {
  const isDarkmode = useAppSelector((state) => state.darkmode.isDarkmode);
  const theme = useAppSelector((state) => state.theme.current);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    savePreference(themeStorageKey, theme);
  }, [theme]);

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkmode);
    savePreference("IsDarkMood", String(isDarkmode));
  }, [isDarkmode]);

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
