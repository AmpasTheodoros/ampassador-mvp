"use client";

import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/context/LanguageContext";

const flags: Record<string, string> = {
  en: "🇬🇧",
  gr: "🇬🇷",
};

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Select value={language} onValueChange={(value: 'en' | 'gr') => setLanguage(value)}>
      <SelectTrigger className="w-[60px] justify-center">
        <SelectValue>
          <span className="text-xl">{flags[language]}</span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">
          🇬🇧 <span className="ml-2">English</span>
        </SelectItem>
        <SelectItem value="gr">
          🇬🇷 <span className="ml-2">Ελληνικά</span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
