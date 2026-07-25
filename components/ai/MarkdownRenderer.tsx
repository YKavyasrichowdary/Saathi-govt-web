import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

interface Props {
  content: string;
}

export default function MarkdownRenderer({
  content,
}: Props) {
  return (
    <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-semibold prose-p:leading-7 prose-li:leading-7 prose-code:text-primary prose-pre:rounded-xl prose-pre:border prose-pre:bg-muted">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}