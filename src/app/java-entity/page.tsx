"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import JsonTextarea from "@/components/JsonEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader, Check, Clipboard } from "lucide-react";


const Page = () => {
  const [isJson, setIsJson] = useState(false);
  const [jsonValue, setJsonValue] = useState("");

  const [tableName, setTableName] = useState("");
  const [uri, setUri] = useState("");
  const [userName, setUserName] = useState("");

  const [loading, setLoading] = useState(false);
  const [response, setReponse] = useState("");

  const [copied, setCopied] = useState(false);

  const handleCodeChange = (value: string, isValid: boolean) => {
    setIsJson(isValid);
    setJsonValue(value);
  };

  const isDataValid = () => {
    return tableName && uri && userName;
  };

  const handleJsonSend = async () => {
    setLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/generate-entity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonValue,
    });
    setReponse(await response.text());
    setLoading(false);
  };

  const handleTextSend = async () => {
    const requestBody = {
      tableName,
      uri,
      userName,
    };
    setLoading(true);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/generate-entity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    setReponse(await response.text());
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="container px-10 sm:px-5 py-5 mx-auto w-full">
      <div className="p-2 mb-4">
        <h1 className="xl:text-5xl lg:text-4xl md:text-5xl sm:text-lg text-2xl font-medium text-center">
          Product your{" "}
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Java Entity
          </span>
        </h1>
      </div>

      <Tabs defaultValue="textInput" className="max-w-xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="jsonInput">Json Input</TabsTrigger>
          <TabsTrigger value="textInput">Text Input</TabsTrigger>
        </TabsList>
        <TabsContent value="jsonInput">
          <Card className="grid w-full mx-auto gap-2 shadow-md dark:shadow-slate-800 border-0">
            <CardHeader>
              <CardTitle>Generate Java Entity</CardTitle>
              <CardDescription>The value must be a valid JSON.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <JsonTextarea initialValue={``} onChange={handleCodeChange} />
              <Button
                disabled={!isJson || loading}
                onClick={handleJsonSend}
                className="w-full mt-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 text-white hover:bg-gradient-to-r"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin" /> Sending...
                  </>
                ) : (
                  "Send"
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="textInput">
          <Card className="grid w-full mx-auto gap-2 shadow-md dark:shadow-slate-800 border-0">
            <CardHeader>
              <CardTitle>Input the value of JSON</CardTitle>
              <CardDescription>
                The JSON value will be used to generate the entity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid gap-1">
                <Label htmlFor="tableName">Table name</Label>
                <Input
                  type="text"
                  id="tableName"
                  onChange={(e) => {
                    setTableName(e.target.value);
                  }}
                  placeholder="Example: USER_ENTITY"
                  className="focus-visible:ring-0 focus-visible:ring-offset-0"
                  autoFocus
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="uri">URI</Label>
                <Input
                  type="text"
                  id="uri"
                  onChange={(e) => {
                    setUri(e.target.value);
                  }}
                  placeholder="Example: oracle://localhost:1521/orcl"
                  className="focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                  placeholder="Example: scott"
                  className="focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <div className="grid gap-1"></div>
              <Button
                disabled={!isDataValid() || loading}
                onClick={handleTextSend}
                className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 text-white hover:bg-gradient-to-r"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin" /> Sending...
                  </>
                ) : (
                  "Send"
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {response && (
        <Card className="grid max-w-full lg:max-w-2xl md:max-w-4xl sm:max-w-full mx-auto gap-2 dark:shadow-slate-800 border-0 shadow-none mt-10">
          <CardHeader className="p-0">
            <CardTitle>Response</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative mt-4 bg-gray-900 text-white rounded-lg p-4 font-mono text-sm whitespace-pre overflow-x-auto">
              <Button
                className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white p-1 rounded transition"
                onClick={handleCopy}
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-400" />
                ) : (
                  <Clipboard className="h-4 w-4" />
                )}
              </Button>
              <code>
                {response.split("\n").map((line, index) => (
                  <div key={index} className="leading-6">
                    <span className="text-gray-400">{index + 1}</span>{" "}
                    <span
                      className={
                        line.includes("import")
                          ? "text-green-400"
                          : line.includes("class")
                          ? "text-yellow-400"
                          : line.includes("@")
                          ? "text-blue-400"
                          : line.includes("private")
                          ? "text-red-400"
                          : "text-gray-300"
                      }
                    >
                      {line}
                    </span>
                  </div>
                ))}
              </code>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Page;
