import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";

interface JsonTextareaProps {
  initialValue?: string;
  onChange?: (value: string, isValid: boolean) => void;
}

export default function JsonTextarea({
  initialValue = "",
  onChange,
}: JsonTextareaProps) {
  const [value, setValue] = useState(initialValue);
  const [isValidJson, setIsValidJson] = useState(false);

  const autoResize = () => {
    const textarea = document.getElementById(
      "json-textarea"
    ) as HTMLTextAreaElement;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useEffect(() => {
    autoResize();
    if (onChange) {
      onChange(value, isValidJson);
    }
  }, [value, isValidJson, onChange]);
  const beautifyJson = () => {
    try {
      const parsedJson = JSON.parse(value);
      const formatted = JSON.stringify(parsedJson, null, 2);
      setValue(formatted);
      setIsValidJson(true);
    } catch (error) {
      // Ignore the error in the console and make the text is align start
      console.error(error);
      setIsValidJson(false);
      setValue(value);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    try {
      JSON.parse(e.target.value);
      setIsValidJson(true);
      if (onChange) {
        onChange(e.target.value, true);
      }
    } catch (error) {
      setIsValidJson(false);
      if (onChange) {
        onChange(e.target.value, false);
      }
    }
  };
  return (
    <Card className="w-full max-w-4xl shadow-none border-none">
      <CardHeader className="p-0">
        <CardTitle className="text-sm flex justify-between align-center">
          <p className="text-gray-700 dark:text-gray-400 font-light mt-2">
            Body
          </p>
          <Button
            size={"sm"}
            disabled={!isValidJson || value === ""}
            variant={"ghost"}
            onClick={beautifyJson}
            className="hover:bg-transparent text-blue-500 hover:text-blue-400 text-xs px-0"
          >
            Beautify
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Textarea
          value={value}
          onChange={handleChange}
          onInput={autoResize}
          rows={1}
          placeholder="Enter JSON data here..."
          className="w-full overflow-hidden border-0 resize-none rounded-b-md p-4 text-sm focus:ring-0 shadow-sm border-t border-r border-l border-gray-100 dark:border-gray-800 dark:shadow-gray-900 focus:border-gray-700 focus-visible:ring-0 focus-visible:border-gray-100"
          id="json-textarea"
          disabled={false}
        />
      </CardContent>      
    </Card>
  );
}
