import React from 'react';

export default function Button({ text }) {
  return <button className="bg-purple px-3 py-1 rounded-full hover:bg-purple-hover">{text}</button>;
}
