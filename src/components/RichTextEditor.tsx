'use client';

import React, { useRef, useEffect } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Write article content here...',
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Synchronize value prop with contentEditable content when they diverge
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const executeCommand = (command: string, arg: string = '') => {
    document.execCommand(command, false, arg);
    handleInput();
  };

  const handleUploadImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (base64) {
          insertImage(base64);
        }
      };
      reader.readAsDataURL(file);
    }
    // reset input value so user can upload same image again if needed
    e.target.value = '';
  };

  const handleInsertImageUrl = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      insertImage(url);
    }
  };

  const insertImage = (src: string) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Blog Image';
    img.className = 'my-4 rounded-xl max-w-full h-auto mx-auto shadow-sm block';
    img.style.maxHeight = '350px';
    img.style.objectFit = 'cover';

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      if (editorRef.current && editorRef.current.contains(range.commonAncestorContainer)) {
        range.deleteContents();
        range.insertNode(img);
        // Insert an empty paragraph after the image to make it easy to continue writing
        const p = document.createElement('p');
        p.innerHTML = '<br>';
        img.after(p);
        
        range.setStartAfter(p);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      } else if (editorRef.current) {
        editorRef.current.appendChild(img);
        const p = document.createElement('p');
        p.innerHTML = '<br>';
        editorRef.current.appendChild(p);
      }
    } else if (editorRef.current) {
      editorRef.current.appendChild(img);
      const p = document.createElement('p');
      p.innerHTML = '<br>';
      editorRef.current.appendChild(p);
    }
    handleInput();
  };

  return (
    <div className="flex flex-col border border-panel-border rounded-xl overflow-hidden bg-white/40 shadow-sm focus-within:border-accent transition-all duration-200">
      {/* Hidden File Input for Image Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Rich Editor Actions Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 p-2 bg-white/60 border-b border-panel-border backdrop-blur-md">
        <button
          type="button"
          onClick={() => executeCommand('bold')}
          className="px-2.5 py-1 text-xs font-bold rounded-lg hover:bg-accent/15 hover:text-accent transition-all cursor-pointer"
          title="Bold"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => executeCommand('italic')}
          className="px-2.5 py-1 text-xs italic rounded-lg hover:bg-accent/15 hover:text-accent transition-all cursor-pointer"
          title="Italic"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => executeCommand('underline')}
          className="px-2.5 py-1 text-xs underline rounded-lg hover:bg-accent/15 hover:text-accent transition-all cursor-pointer"
          title="Underline"
        >
          U
        </button>

        <div className="w-px h-5 bg-line mx-1 self-center" />

        <button
          type="button"
          onClick={() => executeCommand('formatBlock', '<h2>')}
          className="px-2.5 py-1 text-xs font-bold rounded-lg hover:bg-accent/15 hover:text-accent transition-all cursor-pointer"
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => executeCommand('formatBlock', '<h3>')}
          className="px-2.5 py-1 text-xs font-bold rounded-lg hover:bg-accent/15 hover:text-accent transition-all cursor-pointer"
          title="Heading 3"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => executeCommand('formatBlock', '<p>')}
          className="px-2.5 py-1 text-xs rounded-lg hover:bg-accent/15 hover:text-accent transition-all cursor-pointer"
          title="Paragraph"
        >
          P
        </button>

        <div className="w-px h-5 bg-line mx-1 self-center" />

        <button
          type="button"
          onClick={() => executeCommand('insertUnorderedList')}
          className="px-2 py-1.5 text-xs rounded-lg hover:bg-accent/15 hover:text-accent transition-all cursor-pointer"
          title="Bullet List"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => executeCommand('insertOrderedList')}
          className="px-2 py-1.5 text-xs rounded-lg hover:bg-accent/15 hover:text-accent transition-all cursor-pointer"
          title="Numbered List"
        >
          1. List
        </button>
        <button
          type="button"
          onClick={() => executeCommand('formatBlock', '<blockquote>')}
          className="px-2 py-1.5 text-xs italic rounded-lg hover:bg-accent/15 hover:text-accent transition-all cursor-pointer"
          title="Quote Block"
        >
          “ Quote
        </button>

        <div className="w-px h-5 bg-line mx-1 self-center" />

        {/* Image Features */}
        <button
          type="button"
          onClick={handleUploadImageClick}
          className="px-2.5 py-1.5 text-xs rounded-lg hover:bg-accent/15 hover:text-accent transition-all cursor-pointer flex items-center gap-1 font-semibold"
          title="Upload Local Image"
        >
          📷 Image
        </button>
        <button
          type="button"
          onClick={handleInsertImageUrl}
          className="px-2.5 py-1.5 text-xs rounded-lg hover:bg-accent/15 hover:text-accent transition-all cursor-pointer flex items-center gap-1 font-semibold"
          title="Insert Image Link"
        >
          🔗 Link Image
        </button>

        <div className="w-px h-5 bg-line mx-1 self-center" />

        <button
          type="button"
          onClick={() => executeCommand('removeFormat')}
          className="px-2.5 py-1.5 text-xs text-red-600 rounded-lg hover:bg-red-50 transition-all cursor-pointer ml-auto"
          title="Clear Format"
        >
          Clear
        </button>
      </div>

      {/* Editor Editable Canvas */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="p-4 min-h-[260px] max-h-[450px] overflow-y-auto outline-none bg-white/20 text-xs md:text-sm text-ink leading-relaxed
          focus:bg-white/45 transition-colors
          prose prose-sm max-w-none
          prose-headings:font-serif prose-headings:text-ink prose-headings:font-bold prose-headings:mt-4 prose-headings:mb-1
          prose-h2:text-base prose-h3:text-sm
          prose-ul:list-disc prose-ul:list-inside prose-ol:list-decimal prose-ol:list-inside
          before:content-[attr(data-placeholder)] before:text-gray-400 before:block empty:before:block before:hidden"
        data-placeholder={placeholder}
      />
    </div>
  );
};
export default RichTextEditor;
