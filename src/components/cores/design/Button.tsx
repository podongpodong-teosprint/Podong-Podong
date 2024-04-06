type TypeButtonProps = {
  text: string;
};

export default function Button({ text }: TypeButtonProps) {
  return <button className="bg-purple px-3 py-1 rounded-full hover:bg-purple-hover">{text}</button>;
}
