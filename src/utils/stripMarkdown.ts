export function stripMarkdown(input: string): string {
  if (!input) return "";
  let output = input;
  // Remove fenced code blocks but keep inner text
  output = output.replace(/```[a-zA-Z0-9]*\n([\s\S]*?)```/g, "$1");
  // Inline code `code`
  output = output.replace(/`([^`]*)`/g, "$1");
  // Images ![alt](url) -> keep alt text
  output = output.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "$1");
  // Links [text](url) -> keep text
  output = output.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
  // Bold/italic/strong emphasis with * or _
  output = output.replace(/(\*{1,3}|_{1,3})([^*_]+?)\1/g, "$2");
  // Strikethrough ~~text~~
  output = output.replace(/~~([^~]+)~~/g, "$1");
  // Headings like "# ", "## " at line start
  output = output.replace(/^#{1,6}\s+/gm, "");
  // Blockquotes "> " at line start
  output = output.replace(/^>\s?/gm, "");
  // Unordered list markers at line start
  output = output.replace(/^(\s*[-*+]\s+)/gm, "");
  // Ordered list markers like "1. " at line start
  output = output.replace(/^\s*\d+\.\s+/gm, "");
  // Remove residual HTML tags
  output = output.replace(/<[^>]+>/g, "");
  // Collapse extra whitespace
  output = output.replace(/\s+/g, " ").trim();
  return output;
}


