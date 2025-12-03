type Props = {
  text: string;
  className?: string;
  stopPropagation?: boolean;
};

export default function LinkifyContent({ text, className, stopPropagation = true }: Props) {
  if (!text) return null;
  
  const urlRegex = /https?:\/\/[^\s]+/g;

  const matches = [...text.matchAll(urlRegex)];

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;

  matches.forEach((match, i) => {
    const url = match[0];
    const index = match.index!;

    if (lastIndex < index) {
      elements.push(<span key={`text-${i}`}>{text.substring(lastIndex, index)}</span>);
    }

    elements.push(
      <a
        key={`url-${i}`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => stopPropagation && e.stopPropagation()}
      >
        {url}
      </a>
    );

    lastIndex = index + url.length;
  });

  if (lastIndex < text.length) {
    elements.push(<span key="end">{text.substring(lastIndex)}</span>);
  }

  return <p className={className}>{elements}</p>;
}
