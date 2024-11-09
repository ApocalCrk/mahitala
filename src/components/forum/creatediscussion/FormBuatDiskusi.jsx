import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";

import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Strikethrough,
  Subscript,
  Superscript,
  Font,
  FontFamily,
  FontSize,
  FontColor,
  FontBackgroundColor,
  Highlight,
  Underline,
  Code,
  Link,
  Image,
  BlockQuote,
  CodeBlock,
  List,
  TodoList,
  Indent,
  IndentBlock,
  Alignment,
  MediaEmbed,
  PasteFromOffice,
  Table,
  TableToolbar,
  TextTransformation,
  Heading,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

const FormBuatDiskusi = () => {
  const navigate = useNavigate();
  const [editorData, setEditorData] = useState("");
  const [file, setFile] = useState(null);

  const handleEditorChange = (event, editor) => {
    setEditorData(editor.getData());
  };

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const handleDeleteFile = () => {
    setFile(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-600"
          >
            Judul
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full px-4 py-3 mt-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-[#6C7D41] focus:ring-2 focus:ring-[#6C7D41]"
            placeholder="Masukkan judul diskusi"
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-600"
          >
            Kategori
          </label>
          <select
            id="category"
            name="category"
            className="w-full px-4 py-3 mt-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-[#6C7D41] focus:ring-2 focus:ring-[#6C7D41]"
          >
            <option value="1">Pertanyaan</option>
            <option value="2">Diskusi</option>
            <option value="3">Tutorial</option>
          </select>
        </div>
      </div>

      <div className="my-6">
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-600 mb-2"
        >
          Unggah Gambar
        </label>
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer hover:border-[#6C7D41] transition-all duration-300 ease-in-out shadow-sm"
        >
          <input {...getInputProps()} id="image" name="image" />
          {file ? (
            <div className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt="Uploaded file preview"
                className="w-full h-auto rounded-lg mb-4"
              />
              <button
                type="button"
                onClick={handleDeleteFile}
                className="absolute top-0 right-0 bg-red-600 text-white text-xs py-1 px-2 rounded-full hover:bg-red-700 transition-all duration-300"
              >
                Hapus
              </button>
            </div>
          ) : (
            <p className="text-gray-600">
              Seret dan lepas file gambar atau klik untuk memilih
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-600 mb-2"
        >
          Isi Diskusi
        </label>
        <div className="shadow-sm">
          <CKEditor
            id={"content"}
            editor={ClassicEditor}
            data={editorData}
            config={{
              toolbar: {
                items: [
                  "undo",
                  "redo",
                  "|",
                  "heading",
                  "|",
                  "fontfamily",
                  "fontsize",
                  "fontColor",
                  "fontBackgroundColor",
                  "|",
                  "bold",
                  "italic",
                  "strikethrough",
                  "subscript",
                  "superscript",
                  "code",
                  "|",
                  "link",
                  "blockQuote",
                  "codeBlock",
                  "|",
                  "bulletedList",
                  "numberedList",
                  "todoList",
                  "outdent",
                  "indent",
                ],
                shouldNotGroupWhenFull: true,
              },
              plugins: [
                Essentials,
                Paragraph,
                Heading,
                Bold,
                Italic,
                Strikethrough,
                Subscript,
                Superscript,
                Font,
                FontFamily,
                FontSize,
                FontColor,
                FontBackgroundColor,
                Highlight,
                Underline,
                Code,
                Link,
                Image,
                BlockQuote,
                CodeBlock,
                List,
                TodoList,
                Indent,
                IndentBlock,
                Alignment,
                MediaEmbed,
                PasteFromOffice,
                Table,
                TableToolbar,
                TextTransformation,
              ],
            }}
            onChange={handleEditorChange}
          />
        </div>
      </div>

      <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full px-6 py-3 text-sm text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-300 font-semibold"
        >
          Kembali
        </button>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full px-6 py-3 text-sm text-white bg-[#6C7D41] rounded-lg hover:bg-[#5b6936] focus:outline-none focus:ring-2 focus:ring-[#6C7D41] transition-all duration-300 font-semibold"
        >
          Buat Diskusi
        </button>
      </div>
    </form>
  );
};

export default FormBuatDiskusi;
