import "highlight.js/styles/github-dark.min.css";
import dockerfile from "highlight.js/lib/languages/dockerfile";
import groovy from "highlight.js/lib/languages/groovy";
import http from "highlight.js/lib/languages/http";
import { Check, Copy } from "lucide-react";
import { common } from "lowlight";
import { isValidElement, useRef, useState, type ComponentProps, type ReactElement } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

const languages = { ...common, dockerfile, groovy, http };

const LANGUAGE_LABELS: Record<string, string> = {
  c: "C",
  cpp: "C++",
  js: "JavaScript",
  javascript: "JavaScript",
  ts: "TypeScript",
  python: "Python",
  java: "Java",
  sql: "SQL",
  html: "HTML",
  css: "CSS",
  bash: "Terminal",
  json: "JSON",
  yaml: "YAML",
  dockerfile: "Dockerfile",
  groovy: "Jenkinsfile",
  http: "HTTP",
  gitignore: ".gitignore",
};

function CodeBlock({ children, ...props }: ComponentProps<"pre">) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const className = isValidElement(children)
    ? ((children as ReactElement<{ className?: string }>).props.className ?? "")
    : "";
  const lang = /language-([\w-]+)/.exec(className)?.[1];
  const label = lang ? (LANGUAGE_LABELS[lang] ?? lang.toUpperCase()) : "Code";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(ref.current?.innerText ?? "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard can be blocked (e.g. insecure context); nothing else to do.
    }
  };

  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-navy-900/20 bg-[#0d1117] shadow-sm break-inside-avoid">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs font-medium text-white/60">
        <span>{label}</span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded px-2 py-1 transition-colors hover:bg-white/10 hover:text-white print:hidden"
          aria-label="Copy code"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre
        ref={ref}
        {...props}
        className="overflow-x-auto text-[13.5px] leading-relaxed print:whitespace-pre-wrap [&>code]:block [&>code]:bg-transparent! [&>code]:p-4"
      >
        {children}
      </pre>
    </div>
  );
}

function Link({ href, children, ...props }: ComponentProps<"a">) {
  const external = href?.startsWith("http");
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...props}>
      {children}
    </a>
  );
}

/** Renders lesson Markdown with GitHub-flavoured tables and syntax-highlighted code. */
export function Markdown({ children, className }: { children: string; className?: string }) {
  return (
    <div
      className={cn(
        "prose prose-slate max-w-none",
        "prose-headings:scroll-mt-24 prose-headings:font-bold prose-headings:text-navy-900",
        "prose-h2:mt-12 prose-h2:border-b prose-h2:pb-2 prose-h2:text-2xl prose-h3:text-xl",
        "prose-a:font-medium prose-a:text-navy-700 hover:prose-a:text-gold-600",
        "prose-strong:text-navy-900 prose-li:marker:text-gold-600",
        "prose-blockquote:border-l-gold-500 prose-blockquote:bg-gold-100/40 prose-blockquote:py-1 prose-blockquote:font-normal prose-blockquote:not-italic",
        "prose-table:text-sm prose-th:bg-navy-50 prose-th:px-3 prose-th:py-2 prose-td:px-3 prose-td:py-2 prose-table:overflow-hidden",
        // inline code (not inside code blocks)
        "[&_:not(pre)>code]:rounded-md [&_:not(pre)>code]:bg-navy-50 [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:text-[0.875em] [&_:not(pre)>code]:font-medium [&_:not(pre)>code]:text-navy-800",
        "prose-code:before:content-none prose-code:after:content-none",
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeHighlight, { languages, plainText: ["gitignore", "text"] }]]}
        components={{ pre: CodeBlock, a: Link }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
