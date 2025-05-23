'use client'

import React from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
// import FontSize from '@tiptap/extension-font-size'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import FontFamily from '@tiptap/extension-font-family'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'

type Props = {
  content: string
  onChange: (value: string) => void
}

const MenuButton = ({
  onClick,
  isActive,
  children,
  title,
}: {
  onClick: () => void
  isActive: boolean
  children: React.ReactNode
  title?: string
}) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={`px-3 py-1 rounded border transition-colors duration-200 ${
      isActive ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
    }`}
  >
    {children}
  </button>
)

const TextEditor = ({ content, onChange }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
        heading: {
          levels: [1, 2],
        },
      }),
      BulletList,
      OrderedList,
      ListItem,
      Underline,
      TextStyle,
      Color.configure({ types: ['textStyle'] }),      // important: configure types
      // FontSize.configure({ types: ['textStyle'] }),   // important: configure types
      FontFamily.configure({ types: ['textStyle'] }), // added font family extension
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  // Sync editor content when `content` prop changes
  React.useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, false)
    }
  }, [content, editor])

  if (!editor) return null

  return (
    <div className="border rounded shadow-sm p-4 bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-3 items-center">
        {/* Basic formatting */}
        <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} title="Bold (Ctrl+B)">
          <b>B</b>
        </MenuButton>

        <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} title="Italic (Ctrl+I)">
          <i>I</i>
        </MenuButton>

        <MenuButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} title="Underline (Ctrl+U)">
          <u>U</u>
        </MenuButton>

        {/* Headings */}
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} title="Heading 1">
          H1
        </MenuButton>

        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} title="Heading 2">
          H2
        </MenuButton>

        {/* Lists */}
        <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} title="Bullet List">
          • List
        </MenuButton>

        <MenuButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} title="Ordered List">
          1. List
        </MenuButton>

        {/* Undo / Redo */}
        <MenuButton onClick={() => editor.chain().focus().undo().run()} isActive={false} title="Undo (Ctrl+Z)">
          ↺
        </MenuButton>

        <MenuButton onClick={() => editor.chain().focus().redo().run()} isActive={false} title="Redo (Ctrl+Y)">
          ↻
        </MenuButton>

        {/* Clear formatting */}
        <MenuButton onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()} isActive={false} title="Clear Formatting">
          ✕
        </MenuButton>

        {/* Highlight */}
        <MenuButton onClick={() => editor.chain().focus().toggleHighlight().run()} isActive={editor.isActive('highlight')} title="Highlight">
          🖍️
        </MenuButton>

        {/* Text Align */}
        <MenuButton onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })} title="Align Left">
          ⇤
        </MenuButton>

        <MenuButton onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })} title="Align Center">
          ≡
        </MenuButton>

        <MenuButton onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })} title="Align Right">
          ⇥
        </MenuButton>

        <MenuButton onClick={() => editor.chain().focus().setTextAlign('justify').run()} isActive={editor.isActive({ textAlign: 'justify' })} title="Justify">
          ☰
        </MenuButton>

        {/* Color picker */}
        <input
          type="color"
          onChange={e => editor.chain().focus().setColor(e.target.value).run()}
          title="Text Color"
          className="w-8 h-8 p-0 border rounded cursor-pointer"
        />

        {/* Font size */}
        {/* <select
          onChange={e => editor.chain().focus().setFontSize(e.target.value).run()}
          defaultValue=""
          className="border rounded px-2 py-1"
          title="Font Size"
        >
          <option value="" disabled>
            Font Size
          </option>
          <option value="12px">12</option>
          <option value="14px">14</option>
          <option value="16px">16</option>
          <option value="18px">18</option>
          <option value="20px">20</option>
          <option value="24px">24</option>
          <option value="32px">32</option>
          <option value="40px">40</option>
        </select> */}

        {/* Font family */}
        <select
          onChange={e => editor.chain().focus().setFontFamily(e.target.value).run()}
          defaultValue=""
          className="border rounded px-2 py-1"
          title="Font Family"
        >
          <option value="" disabled>
            Font Family
          </option>
          <option value="Arial, sans-serif">Arial</option>
          <option value="'Times New Roman', serif">Times New Roman</option>
          <option value="'Courier New', monospace">Courier New</option>
          <option value="'Georgia', serif">Georgia</option>
          <option value="'Comic Sans MS', cursive">Comic Sans MS</option>
        </select>
      </div>

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="tiptap min-h-[250px] border border-gray-300 rounded p-4 focus:outline-none"
      />
    </div>
  )
}

export default TextEditor
