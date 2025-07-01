import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ChatHeader() {
  return (
    <header className="border-b dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="font-semibold text-lg">Simple Chat</h1>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-medium">
          A
        </div>
      </div>
    </header>
  );
}