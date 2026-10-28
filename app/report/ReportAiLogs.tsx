"use client";

import { useEffect, useState, useMemo } from "react";
import logsData from "./ai-logs-data.json";
import styles from "./ReportAiLogs.module.css";

interface LogMessage {
  role: "user" | "assistant";
  text: string;
  redacted?: boolean;
}

interface Conversation {
  id: string;
  title: string;
  date: string;
  messages: LogMessage[];
}

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-AU", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
  } catch {
    return iso;
  }
}

// Render formatted message text with code blocks, inline code, bold, lists, and paragraphs.
function FormattedMessageText({ text }: { text: string }) {
  const blocks = useMemo(() => {
    const lines = text.split("\n");
    const parsed: Array<
      | { type: "code"; lang?: string; code: string }
      | { type: "ul"; items: string[] }
      | { type: "ol"; items: string[] }
      | { type: "p"; text: string }
    > = [];

    let i = 0;
    while (i < lines.length) {
      const line = lines[i];

      // Code block
      if (line.trim().startsWith("```")) {
        const lang = line.trim().slice(3).trim();
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].trim().startsWith("```")) {
          codeLines.push(lines[i]);
          i++;
        }
        if (i < lines.length) i++; // skip closing ```
        parsed.push({ type: "code", lang, code: codeLines.join("\n") });
        continue;
      }

      // Unordered list
      if (/^\s*[-*]\s+/.test(line)) {
        const items: string[] = [];
        while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
          items.push(lines[i].replace(/^\s*[-*]\s+/, ""));
          i++;
        }
        parsed.push({ type: "ul", items });
        continue;
      }

      // Ordered list
      if (/^\s*\d+\.\s+/.test(line)) {
        const items: string[] = [];
        while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
          items.push(lines[i].replace(/^\s*\d+\.\s+/, ""));
          i++;
        }
        parsed.push({ type: "ol", items });
        continue;
      }

      // Paragraph (accumulate non-empty lines)
      if (line.trim()) {
        const pLines: string[] = [line];
        i++;
        while (
          i < lines.length &&
          lines[i].trim() &&
          !lines[i].trim().startsWith("```") &&
          !/^\s*[-*]\s+/.test(lines[i]) &&
          !/^\s*\d+\.\s+/.test(lines[i])
        ) {
          pLines.push(lines[i]);
          i++;
        }
        parsed.push({ type: "p", text: pLines.join(" ") });
        continue;
      }

      i++;
    }

    return parsed;
  }, [text]);

  const renderInline = (str: string) => {
    // Process inline code `code` and bold **bold**
    const parts = str.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
        return <code key={idx}>{part.slice(1, -1)}</code>;
      }
      if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
        return <strong key={idx}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className={styles.messageBody}>
      {blocks.map((b, idx) => {
        if (b.type === "code") {
          return (
            <pre key={idx}>
              <code>{b.code}</code>
            </pre>
          );
        }
        if (b.type === "ul") {
          return (
            <ul key={idx}>
              {b.items.map((it, itemIdx) => (
                <li key={itemIdx}>{renderInline(it)}</li>
              ))}
            </ul>
          );
        }
        if (b.type === "ol") {
          return (
            <ol key={idx}>
              {b.items.map((it, itemIdx) => (
                <li key={itemIdx}>{renderInline(it)}</li>
              ))}
            </ol>
          );
        }
        return <p key={idx}>{renderInline(b.text)}</p>;
      })}
    </div>
  );
}

export function ReportAiLogs() {
  const conversations = logsData as Conversation[];
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Sync selectedId with URL query param ?chat=<id>
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const chat = params.get("chat");
    if (chat && conversations.some(c => c.id === chat)) {
      setSelectedId(chat);
    }

    const onPopState = () => {
      const p = new URLSearchParams(window.location.search);
      setSelectedId(p.get("chat"));
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [conversations]);

  const handleSelect = (id: string | null) => {
    setSelectedId(id);
    const url = new URL(window.location.href);
    if (id) {
      url.searchParams.set("chat", id);
    } else {
      url.searchParams.delete("chat");
    }
    window.history.pushState({}, "", url.toString());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectedConv = useMemo(
    () => conversations.find(c => c.id === selectedId),
    [conversations, selectedId]
  );

  return (
    <div className={styles.container}>
      {selectedConv ? (
        <section aria-label="Conversation Details">
          <div className={styles.detailHeader}>
            <button
              type="button"
              className={styles.backButton}
              onClick={() => handleSelect(null)}
            >
              ← Back to all conversations
            </button>
            <h2 className={styles.detailTitle}>{selectedConv.title}</h2>
            <div className={styles.detailMeta}>
              <span>Started: {formatDate(selectedConv.date)}</span>
              <span>•</span>
              <span>{selectedConv.messages.length} messages</span>
            </div>
          </div>

          <div className={styles.messages}>
            {selectedConv.messages.map((msg, idx) => (
              <article
                key={idx}
                className={`${styles.message} ${
                  msg.role === "user"
                    ? styles.userMessage
                    : styles.assistantMessage
                }`}
              >
                <div className={styles.messageHeader}>
                  <span
                    className={`${styles.roleLabel} ${
                      msg.role === "user"
                        ? styles.userLabel
                        : styles.assistantLabel
                    }`}
                  >
                    {msg.role === "user" ? "My Prompt" : "AI Response"}
                  </span>
                  {msg.redacted && (
                    <span
                      className={styles.redactionBadge}
                      title="Local paths and sensitive context were redacted for public distribution"
                    >
                      Redacted
                    </span>
                  )}
                </div>
                <FormattedMessageText text={msg.text} />
              </article>
            ))}
          </div>

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <button
              type="button"
              className={styles.backButton}
              onClick={() => handleSelect(null)}
            >
              ← Back to all conversations
            </button>
          </div>
        </section>
      ) : (
        <section aria-label="All AI Conversations">
          <div className={styles.intro}>
            <h2>AI Logs</h2>
            <p>
              This log presents all recorded interactions between the student and AI coding agents during the development of Provisions Point. Tool calls, background commands, reasoning traces, and local system injections are excluded. Wording from actual prompts and replies is preserved.
            </p>
          </div>

          <div className={styles.list}>
            {conversations.map(conv => (
              <button
                key={conv.id}
                type="button"
                className={styles.listItem}
                onClick={() => handleSelect(conv.id)}
              >
                <div className={styles.itemMain}>
                  <div className={styles.itemTitle}>{conv.title}</div>
                  <div className={styles.itemMeta}>
                    <span>{formatDate(conv.date)}</span>
                    <span>•</span>
                    <span>{conv.messages.length} messages</span>
                  </div>
                </div>
                <span className={styles.itemArrow} aria-hidden="true">
                  →
                </span>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
