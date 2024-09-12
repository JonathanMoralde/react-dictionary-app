import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Book, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

type Theme = "light" | "dark";
type Font = "serif" | "sans-serif";

const Header = () => {
  const [theme, setTheme] = useState<Theme>("light");
  const [font, setFont] = useState<Font>("serif");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      window.localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      window.localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  };

  const changeFont = (selectedFont: Font) => {
    setFont(selectedFont);
    document.body.style.fontFamily =
      selectedFont === "serif" ? "serif" : "sans-serif";
    window.localStorage.setItem("font", selectedFont);
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme") as Theme | null;
    const localFont = window.localStorage.getItem("font") as Font | null;

    if (localTheme) {
      setTheme(localTheme);
      if (localTheme === "dark") {
        document.documentElement.classList.add("dark");
      }
    } else if (window.matchMedia("(prefers-color-scheme: dark").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }

    if (localFont) {
      setFont(localFont);
      document.body.style.fontFamily =
        localFont === "serif" ? "serif" : "sans-serif";
    }
  }, []);

  return (
    <NavigationMenu className="flex justify-between max-w-full">
      <NavigationMenuList>
        <NavigationMenuItem>
          <a href="#">
            <Book />
          </a>
        </NavigationMenuItem>
      </NavigationMenuList>
      <div className="h-full flex items-center gap-2">
        <Select defaultValue={font} onValueChange={changeFont}>
          <SelectTrigger className=" border-none bg-transparent dark:bg-transparent">
            <SelectValue placeholder="Font" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sans serif">Sans Serif</SelectItem>
            <SelectItem value="serif">Serif</SelectItem>
          </SelectContent>
        </Select>

        <Separator
          orientation="vertical"
          className="h-8 bg-gray-200 dark:bg-neutral-700"
        />
        <Switch
          checked={theme === "dark"}
          onCheckedChange={toggleTheme}
          className="dark:bg-purple-500"
        />
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full h-min p-1 dark:text-purple-500"
          onClick={toggleTheme}
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </Button>
      </div>
    </NavigationMenu>
  );
};

export default Header;
